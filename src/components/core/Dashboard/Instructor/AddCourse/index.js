import React from 'react'
import RenderSteps from './RenderSteps'
import {AiFillThunderbolt} from "react-icons/ai"

const AddCourse = () => {
    return (
        <div  className='p-8'>
            <h1 className='text-4xl text-richblack-25'>Add Course</h1>

            <div className='flex justify-around gap-4 items-start'>
            <div className='w-7/12 mt-10'>
                <RenderSteps></RenderSteps>
            </div>


            {/* tips */}
            <div className='text-white mt-40 border border-richblack-600 bg-richblack-800 rounded-md p-4 max-w-[450px] '>
                <div className='flex items-center gap-1 m-2'>
                <AiFillThunderbolt className='text-yellow-100 h-[20px]'/>
                <p className='text-2xl '>Course Upload Tips</p>
                </div>
                <ul className='flex flex-col gap-3 list-disc ml-6 text-richblack-25 text-[15px]'>
                    <li>Set the Course Price option or make it free.</li>
                    <li>Standard size for the course thumbnail is 1024x576.</li>
                    <li>Video section controls the course overview video.</li>
                   <li>Course Builder is where you create & organize a course.</li>
                   <li>Add Topics in the Course Builder section to create lessons, quizzes, and assignments.</li>
                   <li>Information from the Additional Data section shows up on the course sigle page</li>
                   <li>Make Annoucements to notify any important</li>
                   <li>Notes to all enrolled students at once</li>
                </ul>
            </div>
            </div>

          

        </div>
    )
}

export default AddCourse