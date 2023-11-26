import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table';
import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css"

import { TiTickOutline } from "react-icons/ti"
import { AiOutlineClockCircle } from "react-icons/ai"
import { COURSE_STATUS } from '../../../../../utilis/constants';
import { FiEdit2 } from "react-icons/fi"
import { RiDeleteBin5Line } from "react-icons/ri"
import ConfirmationModal from '../../../../common/ConfirmationModal';
import { fetchInstructorCourses } from '../../../../../services/operations/courseAPI';
import { setCourse } from '../../../../../reducers/slices/courseSlice';
import { deleteCourse } from '../../../../../services/operations/courseAPI';
import { useNavigate } from 'react-router-dom';
import { formatDate } from '../../../../../utilis/dateFormatter';
import timeInSec from "../../../../../utilis/timeInSec"

const CourseTable = ({ courses, setCourses,}) => {

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { token } = useSelector((state) => state.auth)
    const [loading, setLoading] = useState(false)
    const [modal, setModal] = useState(false)
    const TRUNCATE_LENGTH = 20
    const [timeDuration, setTimeDuration] = useState([])

    // const count = (index)=>{
    //     console.log("1")
    //     console.log("print the first course",courses[0])
    //     let time = 0
    //     courses[index]?.courseContent.forEach( (section)=>{
    //         console.log("2")
    //         section?.subSection.forEach( (lec)=> {
    //             console.log("3")
    //             const timeIn = parseInt(lec?.timeDuration)
    //             console.log("4")
    //             time += timeIn
    //         })
    //     })

    //     const timeDurationInSec = timeInSec(time)
    //     setTimeDuration(timeDurationInSec)
    // }

    // useEffect ( ()=> {
    //     count()
    // },[])
  

    const courseDelete = async (courseId) => {

        setLoading(true)
        await deleteCourse({ courseId: courseId }, token)
        const result = await fetchInstructorCourses(token)
        
        if (result) {
            setCourse(result)
        }
        setModal(null)
        setLoading(false)
    }

    return (
        <>
            loading ? (<div>
                <div
                // className='custom-loader'
                ></div></div>): (
            <div className='text-white border border-blue-100'>
                <Table className="rounded-xl border border-richblack-800 p-2  ">
                    <Thead>
                        <Tr className="flex justify-between  sm:gap-x-10 gap-x-4 rounded-t-md border-b border-b-richblack-600 sm:px-6 px-2 py-2 ">

                            <Th className=" text-sm font-medium uppercase text-richblack-100 w-7/12 text-left">Courses</Th>


                            <div className='flex justify-between  w-[25%]'>
                            <Th className=" text-sm font-medium uppercase text-richblack-100 c" >Duration</Th>
                            <Th className=" text-sm font-medium uppercase text-richblack-100">Price</Th>
                            <Th className=" text-sm font-medium uppercase text-richblack-100">Actions</Th>

                            </div>
                            
                        </Tr>
                    </Thead>

                    <Tbody>
                        {
                            courses.length === 0 ? (<Tr>
                                <div className='text-3xl text-blue-200 py-10 text-center font-medium'>No Course Created</div>
                            </Tr>
                            ) : (
                                courses?.map((course) => (
                                    <Tr key={course._id}
                                        className="flex gap-x-10 border-b border-richblack-800 px-6 py-8">
                                        <Td className='flex gap-x-4 flex-1 '>
                                            <img src={course?.thumbnail} alt="thumbnail" className='object-cover h-[148px] w-[220px] rounded-lg ' />
                                            <div className='flex flex-col justify-between'>
                                                <p className='text-lg font-medium text-richblack-5'>{course.courseName}</p>

                                                <p className='text-xs text-richblack-300'>{course.courseDescription.split(" ").length > TRUNCATE_LENGTH ? course.courseDescription.split(" ").slice(0, TRUNCATE_LENGTH).join(" ") + "..."
                                                    : course.courseDescription
                                                }</p>


                                                <p className='text-xs text-white'>Created: {formatDate(course.createdAt)} </p>
                                                {
                                                    course.status === COURSE_STATUS.DRAFT ? (<div className=' flex items-center gap-3 text-pink-500 border bg-richblack-800 rounded-md px-4 w-fit py-2'>
                                                        <AiOutlineClockCircle />
                                                        <p>DRAFTED</p>

                                                    </div>) : (<div className='text-blue-100 flex items-center gap-3 border bg-richblack-800 rounded-md px-4 py-2 w-fit'>
                                                        <TiTickOutline></TiTickOutline>
                                                        <p>PUBLISHED</p>
                                                    </div>)
                                                }
                                            </div>
                                        </Td>
                                        
                                        <Td className="text-sm font-medium text-richblack-100">{timeDuration} 10min</Td>
                                        <Td className="text-sm font-medium text-richblack-100">Rs {course?.price}</Td>

                                        <Td className="text-xl text-richblack-100">
                                            <div className='flex gap-3'>
                                                <button disabled={loading}
                                                    onClick={() => navigate(`/dashboard/edit-course/${course._id}`)}
                                                    title='Edit'
                                                    className='transiton-all duration-100 hover:text-caribbeangreen-200
                                                    hover:scale-110'
                                                ><FiEdit2 /></button>

                                                <button disabled={loading}
                                                    onClick={() => setModal({
                                                        text1: "Do you want to delete this Course?",
                                                        text2: "All the data related to this course will be deleted",
                                                        btn1Text: "Delete",
                                                        btn2Text: "Cancel",
                                                        btn1Handler: !loading ? () => courseDelete(course._id) : () => { },
                                                        btn2Handler: !loading ? () => setModal(null) : () => { }
                                                    })}
                                                    title="Delete"
                                                    className='transiton-all duration-100 hover:text-pink-400
                                                    hover:scale-110'
                                                ><RiDeleteBin5Line /></button>
                                            </div>
                                        </Td>

                                    </Tr>
                                ))

                            )
                        }

                    </Tbody>
                </Table>
                {
                    modal && <ConfirmationModal modalData={modal} />
                }

            </div>
            )
        </>

    )
}

export default CourseTable