import React, { useEffect, useState } from 'react'
import { RiAddFill } from "react-icons/ri"
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { fetchInstructorCourses } from '../../../../services/operations/courseAPI'
import CourseTable from './Course.js/CourseTable'
import { deleteAllCourse } from '../../../../services/operations/courseAPI'
import ConfirmationModal from '../../../common/ConfirmationModal'


const MyCourse = () => {
    const { token } = useSelector((state) => state.auth)
    const navigate = useNavigate()
    const [courses, setCourses] = useState([])
    const [modal, setModal] = useState(false)

    const [loading, setLoading] = useState(false)



    const fetchCourse = async () => {

        const result = await fetchInstructorCourses(token);
        console.log("result ", result.instructorCourses);
        console.log("Time duration : " ,result.totalDuration)
    //   console.log("subssection duratiion", result[0].courseContent[0].subSection[0].timeDuration)



        if (result) {
            setCourses(result.instructorCourses)
        }

    }
    useEffect(() => {
        fetchCourse()
    }, [])

    const deleteAll = async () => {
        setLoading(true)
        await deleteAllCourse(token)
        
        setLoading(false) ;
        setModal(null);
    }


    if (loading) {
        return (
            <div className='flex justify-center items-center h-full'>
                <div className='custom-loader'></div>
            </div>
        )
    }


    return (

        <div className='w-11/12 mx-auto'>

            <div className='flex flex-col gap-y-4 sm:flex-row justify-between items-center mt-12 '>
                <h1 className='md:text-4xl sm:text-3xl text-2xl text-richblack-5'>My Course</h1>


                <div className='flex  gap-4'>
                    <button className='bg-yellow-100 sm:py-2 sm:px-4  py-1 px-2 text-richblack-800 flex items-center rounded-md '>
                        <p onClick={() => navigate("/dashboard/add-course")}>Add Course</p>
                        <RiAddFill className='hidden sm:inline' />
                    </button>

                    <button disabled={loading}
                     onClick={() => setModal({
                        text1: "Do you want to DELETE ALL COURSES",
                        text2: "All the Data related to the Courses will be deleted",
                        btn1Text:"Delete",
                        btn2Text :"Cancel",
                        btn1Handler: !loading ? ()=> deleteAll() : ()=>{},

                        btn2Handler: !loading? () =>setModal(null): ()=> {}
                     })}
                        className='border border-pink-400 sm:px-4 sm:py-2 py-1 px-2 text-pink-400 rounded-md '>
                        Delete All
                    </button>
                </div>

            </div>
            {
                courses && <CourseTable courses={courses} setCourses={setCourses} />
            }


            {
                modal && <ConfirmationModal modalData={modal} />
            }
        </div>
    )
}

export default MyCourse