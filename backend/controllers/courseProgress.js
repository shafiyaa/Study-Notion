
const  CourseProgress = require("../models/CourseProgress")
const SubSection = require("../models/SubSection")


exports.updateCourseProgress = async(req, res)=>{
 
 
    const {courseId, subSectionId} = req.body
    const userId = req.user.id
  
  
   
    try{
        const subSection = await SubSection.findById(subSectionId)

        if(!subSection){
            return res.status(404).json({
                success:false,
                message:"subSection is invalid",
                
            })
        }

        
        // check old entry
        let courseProgress = await CourseProgress.findOne({
            courseID: courseId,
            userId:userId
        })

       
        if(!courseProgress){
            return res.status(404).json({
                success:false,
                message: "Course Progress does not exist"
            })
        }
        else{

          

          
            // re-completing video/ subsection
            if(courseProgress.completedVideos.includes(subSectionId)){
               
                return res.status(400).json({
                    error:"Subsection already completed",
                });
            }
            
          
            // push the completed video
            
          
            courseProgress.completedVideos.push(subSectionId);
           
        }
     
        await courseProgress.save()
       

        
     
        return res.status(200).json({
            success:true,
            message:"Course Progress Updated Successfully",
        })

    }catch(error){
        console.log("error in update cours progress")
        console.log(error)
        return res.status(400).json({
            success:false,
            error: error.message
        })
    }

}