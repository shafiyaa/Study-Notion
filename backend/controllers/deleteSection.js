const Section = require("../models/Section");
const Course = require("../models/Course");

// DELETE a section
exports.deleteSection = async (req, res) => {
    console.log("backend k delete section mai hain");

    try {
        const { sectionId, courseId } = req.body;
        await Course.findByIdAndUpdate(courseId, {
            $pull: {
                courseContent: sectionId
            }
        });

        const section = await Section.findById(sectionId);
        console.log(sectionId, courseId);
        console.log("pritng the Section", section);

        if (!section) {
            return res.status(404).json({
                success: false,
                message: "Section is not Found"
            });
        }

       
        await SubSection.deleteMany({
            _id: {
                $in: section.subSection
            }
        });

        console.log("before delete the seciton");
        await Section.findByIdAndDelete(sectionId);

        // find the updated course and return
        console.log("updating the seciton after deleting");
        const course = await Course.findById(courseId).populate({
            path: "courseContent",
            populate: {
                path: "subSection"
            }
        }).exec();

        res.status(200).json({
            success: true,
            message: "Section deleted",
            data: course
        });

    } catch (error) {
        console.error("Error deleting section:", error);
        res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
};
