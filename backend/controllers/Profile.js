const Profile = require("../models/Profile");
const User = require("../models/User");
const Course = require("../models/Course")
const CourseProgress = require("../models/CourseProgress")
const { uploadImageToCloudinary } = require("../utils/imageUploader");
const { convertSecondsToDuration } = require("../utils/secToDuration")

// Method for updating a profile
exports.updateProfile = async (req, res) => {
	try {
		
		const { dateOfBirth = "", about = "", contactNumber, gender } = req.body;

		
		const id = req.user.id;

		// Find the profile by id
		const userDetails = await User.findById(id);
		const profile = await Profile.findById(userDetails.additionalDetails);

		// Update the profile fields
		profile.dateOfBirth = dateOfBirth;
		profile.about = about;
		profile.contactNumber = contactNumber;
		profile.gender = gender
		// Save the updated profile
		await profile.save();
		const updatedUserDetails = await User.findById(id).populate("additionalDetails").exec();
		


		

		return res.json({
			success: true,
			message: "Profile updated successfully",
			profile,
			updatedUserDetails,

		});
	} catch (error) {
		console.log(error);
		return res.status(500).json({
			success: false,
			error: error.message,
		});
	}
};

exports.deleteAccount = async (req, res) => {
	try {
		
	
		const id = req.user.id;
	

		const user = await User.findById({ _id: id });
		if (!user) {
			return res.status(404).json({
				success: false,
				message: "User not found",
			});
		}
		// Delete Assosiated Profile with the User
		await Profile.findByIdAndDelete({ _id: user.additionalDetails });
		
		// Now Delete User
		await User.findByIdAndDelete({ _id: id });
		res.status(200).json({
			success: true,
			message: "User deleted successfully",
		});
	} catch (error) {
		console.log(error);
		res
			.status(500)
			.json({ success: false, message: "User Cannot be deleted successfully" });
	}
};

exports.getAllUserDetails = async (req, res) => {
	try {
		const id = req.user.id;
		const userDetails = await User.findById(id)
			.populate("additionalDetails")
			.exec();
		console.log(userDetails);
		res.status(200).json({
			success: true,
			message: "User Data fetched successfully",
			data: userDetails,
		});
	} catch (error) {
		return res.status(500).json({
			success: false,
			message: error.message,
		});
	}
};

exports.updateDisplayPicture = async (req, res) => {
	try {
		console.log("frist")
		const displayPicture = req.files.displayPicture
		

		const userId = req.user.id

		const image = await uploadImageToCloudinary(
			displayPicture,
			process.env.FOLDER_NAME,
			1000,
			1000
		)
		console.log(image)
		const updatedProfile = await User.findByIdAndUpdate(
			{ _id: userId },
			{ image: image.secure_url },
			{ new: true }
		)
		res.send({
			success: true,
			message: `Image Updated successfully`,
			data: updatedProfile,
		})
	} catch (error) {
		return res.status(500).json({
			success: false,
			message: "error in updating picture",
			error: error.message,
		})
	}
};

exports.getEnrolledCourses = async (req, res) => {
	
	try {
		

		const userId = req.user.id
		let userDetails = await User.findOne({
			_id: userId,
		}).populate({
			path: "courses",
			populate: {
				path: "courseContent",
				popultate: {
					path: "subSection",
					// select: "-videoUrl"
				}
			}
		}).exec()

		



		userDetails = userDetails.toObject();

		// calculate duration
		var SubsectionLength = 0;

		for (var i = 0; i < userDetails.courses.length; i++) {
			 
			
			let totalDurationInSeconds = 0
			SubsectionLength = 0

			for (var j = 0; j < userDetails.courses[i].courseContent.length; j++) {

				totalDurationInSeconds += userDetails.courses[i].courseContent[j].subSection.reduce((acc, curr) => acc + parseInt(curr.timeDuration), 0)
                     
				
				userDetails.courses[i].totalDuration = convertSecondsToDuration(totalDurationInSeconds)

				SubsectionLength += userDetails.courses[i].courseContent[j].subSection.length
			}

			
			
			let courseProgressCount = await CourseProgress.findOne({
				courseID: userDetails.courses[i]._id,
				userId:userId,
			})
			courseProgressCount = courseProgressCount?.completedVideos.length

			if(SubsectionLength === 0){
				userDetails.courses[i].progressPercentage= 100
			}else{
				const multiplier = Math.pow(10,2)
				userDetails.courses[i].progressPercentage = Math.round( (courseProgressCount / SubsectionLength )*100 *multiplier)/multiplier
			}


		}

	
 


		if (!userDetails) {
			return res.status(400).json({
				success: false,
				message: `Could not find user with id: ${userDetails}`,
			})
		}
 
		return res.status(200).json({
			success: true,
			data:userDetails.courses,
		
		})

	} catch (error) {
		return res.status(500).json({
			success: false,
			message: error.message,
		})
	}
};

exports.instructorDashboard = async (req, res) => {
	try {

		const courseDetails = await Course.find({ instructor: req.user.id })


		
		const courseData = courseDetails.map((course) => {
			
			
			const totalStudentsEnrolled = course.studentsEnrolled.length
			const totalAmountGenerated = course.price * totalStudentsEnrolled

			



			// new object for additinal fields
			const courseDataWithStats = {
				_id: course._id,
				courseName: course.courseName,
				courseDescription: course.courseDescription,
				totalStudentsEnrolled,
				totalAmountGenerated
			}

			return courseDataWithStats
		})

	

		return res.status(200).json({
			success: true,
			courses: courseData
		})

	} catch (error) {
		console.log("error in instructor Dashboard")
		console.log(error)
		return res.status(500).json({
			success: false,
			message: "Internal server Error"
		})
	}
}
