const Course = require("../models/Course");
const Category = require("../models/Category");
const User = require("../models/User");
const { uploadImageToCloudinary } = require("../utils/imageUploader");
const Section = require("../models/Section")
const SubSection = require("../models/SubSection");
const CourseProgress = require("../models/CourseProgress");
const {convertSecondsToDuration} = require("../utils/secToDuration")


// Function to create a new course
exports.createCourse = async (req, res) => {
	try {
		// Get user ID from request object
		const userId = req.user.id;
	


		// Get all required fields from request body
		let {
			courseName,
			courseDescription,
			whatYouWillLearn,
			price,
			tag,
			category,
			status,
			instructions,
		} = req.body;

		// Get thumbnail image from request files
		const thumbnail = req.files.thumbnailImage;

		// Check if any of the required fields are missing
		if (
			!courseName ||
			!courseDescription ||
			!whatYouWillLearn ||
			!price ||
			!tag ||
			!thumbnail ||
			!category
		) {
			return res.status(400).json({
				success: false,
				message: "All Fields are Mandatory",
			});
		}
		if (!status || status === undefined) {
			status = "Draft";
		}
		// Check if the user is an instructor
		const instructorDetails = await User.findById(userId, {
			accountType: "Instructor",
		});

		if (!instructorDetails) {
			return res.status(404).json({
				success: false,
				message: "Instructor Details Not Found",
			});
		}

		// Check if the tag given is valid
		const categoryDetails = await Category.findById(category);
		if (!categoryDetails) {
			return res.status(404).json({
				success: false,
				message: "Category Details Not Found",
			});
		}
		// Upload the Thumbnail to Cloudinary
		const thumbnailImage = await uploadImageToCloudinary(
			thumbnail,
			process.env.FOLDER_NAME
		);
		// console.log(thumbnailImage);

		// Create a new course with the given details
		const newCourse = await Course.create({
			courseName,
			courseDescription,
			instructor: instructorDetails._id,
			whatYouWillLearn: whatYouWillLearn,
			price,
			tag: tag,
			category: categoryDetails._id,
			thumbnail: thumbnailImage.secure_url,
			status: status,
			instructions: instructions,
		});

		// Add the new course to the User Schema of the Instructor
		await User.findByIdAndUpdate(
			{
				_id: instructorDetails._id,
			},
			{
				$push: {
					courses: newCourse._id,
				},
			},
			{ new: true }
		);
		// Add the new course to the Categories
		await Category.findByIdAndUpdate(
			{ _id: category },
			{
				$push: {
					courses: newCourse._id,
				},
			},
			{ new: true }
		);
		// Return the new course and a success message
		res.status(200).json({
			success: true,
			data: newCourse,
			message: "Course Created Successfully",
		});
	} catch (error) {
		// Handle any errors that occur during the creation of the course
		console.error(error);
		res.status(500).json({
			success: false,
			message: "Failed to create course",
			error: error.message,
		});
	}
};

exports.getAllCourses = async (req, res) => {
	try {
		const allCourses = await Course.find(
			{status: "Published"},
			{
				courseName: true,
				price: true,
				thumbnail: true,
				instructor: true,
				ratingAndReviews: true,
				studentsEnroled: true,
			}
		)
			.populate("instructor")
			.exec();
		return res.status(200).json({
			success: true,
			data: allCourses,
		});
	} catch (error) {
		console.log(error);
		return res.status(404).json({
			success: false,
			message: `Can't Fetch Course Data`,
			error: error.message,
		});
	}
};

//getCourseDetails
exports.getCourseDetails = async (req, res) => {
	
	try {
		//get id
		const { courseId } = req.body;

		const courseDetails = await Course.findOne(
			{ _id: courseId })
			.populate(
				{
					path: "instructor",
					populate: {
						path: "additionalDetails",
					},
				}
			)
			.populate("category")
			.populate("ratingAndReviews")
			.populate({
				path: "courseContent",
				populate: {
					path: "subSection",
					select: "-videoUrl"
				},
			})
			.exec();

		//validation
		if (!courseDetails) {
			return res.status(400).json({
				success: false,
				message: `Could not find the course with ${courseId}`,
			});
		}

// calculate the lectures
   let totalLectures = 0
   courseDetails.courseContent.forEach((section)=> {
	totalLectures += section.subSection.length || 0
   })

		// calculate the duration
		let totalDurationInSeconds = 0
		courseDetails.courseContent.forEach((content) => {
		  content.subSection.forEach((subSection) => {
			const timeDurationInSeconds = parseInt(subSection.timeDuration)
			totalDurationInSeconds += timeDurationInSeconds
		  })
		})
	
		const totalDuration = convertSecondsToDuration(totalDurationInSeconds)

		//return response
		return res.status(200).json({
			success: true,
			message: "Course Details fetched successfully",
			data: {courseDetails,
				totalDuration,
				totalLectures
			}
		})

	}
	catch (error) {
		console.log(error);
		return res.status(500).json({
			success: false,
			message: error.message,
		});
	}
}

// edit Course
exports.editCourse = async (req, res) => {

	try {
		const { courseId } = req.body
		const updates = req.body
		const course = await Course.findById(courseId)

		if (!course) {
			console.log("Course not Found")
			return res.status(404).json({
				error: "Course not Found"
			})
		}
		// if thumbnail is not found
		if (req.files) {
			console.log("thumbnail update")
			const thumbnail = req.files.thumbnailImage
			const thumbnailImage = await uploadImageToCloudinary(
				thumbnail,
				process.env.FOLDER_NAME
			)
			course.thumbnail = thumbnailImage.secure_url
		}

		// update only fields that are present in the request body
		for (const key in updates) {
			if (key === "tag" || key === "instructions") {
				course[key] = JSON.parse(updates[key])
			} else {
				course[key] = updates[key]
			}
		}

		await course.save()

		const updatedCourse = await Course.findOne({ _id: courseId }).populate({
			path: "instructor",
			populate: {
				path: "additionalDetails"
			},
		}).populate("category")
			.populate("ratingAndReviews")
			.populate({
				path: "courseContent",
				populate: {
					path: "subSection"
				}
			}).exec()

		return res.json({
			success: true,
			message: "Course is updated successfully",
			data: updatedCourse
		})

	}
	catch (error) {
		console.log("error while updating the course", error)
		res.status(500).json({
			success: false,
			message: "internal server error",
			error: error.messgae
		})

	}
}

// get a list of course of particular instructor
exports.getInstructorCourses = async (req, res) => {
	try {


		const instructorId = req.user.id
		const instructorCourses = await Course.find({
			instructor: instructorId,
		}).sort({ createdAt: -1 }).populate({
			path: "courseContent",
			populate: {
				path: "subSection",
			},
		})
 console.log("instructor courses", instructorCourses)

 return res.status(200).json({
			success: true,
			data: instructorCourses,
			
		})

	} catch (error) {
		console.log("error in getInstructorCourses: ", error)
		res.status(500).json({
			success: false,
			message: "Failed to get instructor Courses",
			error: error.message
		})
	}
}


// Delete the course 
exports.deleteCourse = async (req, res) => {


	try {

		const { courseId } = req.body

		const course = await Course.findById(courseId)

		if (!course) {
			return res.status(404).json({
				message: "Course not found"
			})
		}

		// if there is studendt enrolled in the course
		const studentsEnrolled = course.studentsEnrolled
		for (const studentId of studentsEnrolled) {
			await User.findByIdAndUpdate(studentId, {
				$pull: { courses: courseId }
			})
		}

		// Delete sections and subsections
		const courseSections = course.courseContent

		for (const sectionId of courseSections) {
			const section = await Section.findById(sectionId)

			if (section) {
				const subSections = section.subSection
				for (const subSectionId of subSections) {
					await SubSection.findByIdAndDelete(subSectionId)

				}
			}
			await Section.findByIdAndDelete(sectionId)

		}

		await Course.findByIdAndDelete(courseId)
		return res.status(200).json({
			success: true,
			message: "Course deleted successfully",
		})

	} catch (error) {
		console.log(error)
		return res.status(500).json({
			success: false,
			message: "Error while deleting the Course",
			error: error.message
		})
	}

}

// delete all course
exports.deleteAllCourse = async(req, res)=>{
	try{
		const instructorId = req.user.id
   
		const allCourse = await Course.find({
			instructor: instructorId
		})

		
	}catch(error){
		console.log("error in the delete all course", error)
		res.status(500).json({
			success:false,
			message:"failed to delete all course",
			error: error.message
		})
	}
	
}

exports.getFullCourseDetails = async (req, res) => {
	try {
		
		const { courseId } = req.body
	
		const userId = req.user.id
		
		

		const courseDetails = await Course.findOne({
			_id: courseId,
		  })
			.populate({
			  path: "instructor",
			  populate: {
				path: "additionalDetails",
			  },
			})
			.populate("category")
			.populate("ratingAndReviews")
			.populate({
			  path: "courseContent",
			  populate: {
				path: "subSection",
			  },
			})
			.exec()

		
		let courseProgressCount = await CourseProgress.findOne({
			courseID: courseId,
			userId: userId
		})
 console.log("priting in the getFullCourseDetails in Course Controller")
		console.log("courseProgressCount: ", courseProgressCount)

		if(!courseDetails){
			return res.status(400).json({
				success:false,
				message:`Could not find the course with id: ${courseId} `,
				error:error.message
			})
		}

		

		// if (courseDetails.status === "Draft") {
			//   return res.status(403).json({
			//     success: false,
			//     message: `Accessing a draft course is forbidden`,
			//   });
			// }

			let totalDurationInSeconds = 0

			courseDetails.courseContent.forEach((content)=>{

				content.subSection.forEach((subSection)=>{
					const timeDurationInSeconds = parseInt(subSection.timeDuration)
					totalDurationInSeconds += timeDurationInSeconds
				})
			})
             
			

			const totalDuration = convertSecondsToDuration(totalDurationInSeconds)

			// console.log("duration",totalDuration)

			return res.status(200).json({
				success:true,
				data: {
					courseDetails,
					totalDuration,
					completedVideos:courseProgressCount?.completedVideos? courseProgressCount?.completedVideos : []
				}
			})


	} catch (error) {
		return res.status(500).json({
			success: false,
			message: "error in getting full Course Details for Edit Course"
		})
	}
}

