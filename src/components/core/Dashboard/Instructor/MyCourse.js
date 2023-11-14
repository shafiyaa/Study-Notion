import React, { useEffect, useState } from 'react'
import { RiAddFill } from "react-icons/ri"
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { fetchInstructorCourses } from '../../../../services/operations/courseAPI'
import CourseTable from './Course.js/CourseTable'


const MyCourse = () => {
    const { token } = useSelector((state) => state.auth)
    const navigate = useNavigate()
    const [courses, setCourses] = useState([])



    const fetchCourse = async () => {

        const result = await fetchInstructorCourses(token);
        console.log("Result fetch instructor courses at zero index : ", result[0]);



        if (result) {
            setCourses(result)
        }

    }
    useEffect(() => {
        fetchCourse()
    }, [])





    return (

        <div className='w-11/12 mx-auto'>

            <div className='flex justify-between items-center mt-12'>
                <h1 className='text-4xl text-richblack-5'>My Course</h1>


                <div className='flex gap-4'>
                    <button className='bg-yellow-100 py-2 px-4 text-richblack-800 flex items-center rounded-md'>
                        <p onClick={() => navigate("/dashboard/add-course")}>Add Course</p>
                        <RiAddFill />
                    </button>

                    <button className='border border-pink-400 px-4 py-2 text-pink-400 rounded-md'>
                        Delete All
                    </button>
                </div>

            </div>
            {
                courses && <CourseTable courses={courses} setCourses={setCourses} />
            }



        </div>
    )
}

export default MyCourse