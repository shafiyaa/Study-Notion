import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { getInstructorData } from '../../../../../services/operations/profileAPI';
import { fetchInstructorCourses } from '../../../../../services/operations/courseAPI';
import InstructorChart from './InstructorChart';
import { Link } from 'react-router-dom';

const Instructor = () => {
    const [loading, setLoading] = useState(false)
    const [instructorData, setInstructorData] = useState(null)
    const [courses, setCourses] = useState([])
    const { token } = useSelector((state) => state.auth);
    const { user } = useSelector((state) => state.profile);


    useEffect(() => {
        const getStats = async () => {
            setLoading(true)

            const instructorApiData = await getInstructorData(token)
            const result = await fetchInstructorCourses(token)
            console.log("instructor api data ", instructorApiData);

            if (instructorApiData.length)
                setInstructorData(instructorApiData);

            if (result) {
                setCourses(result);
            }

            setLoading(false)
        }

        getStats()
    }, [])

    const totalStudents = instructorData?.reduce((acc, curr) => acc + curr.totalStudentsEnrolled, 0)

    const totalAmount = instructorData?.reduce((acc, curr) => acc + curr.totalAmountGenerated, 0)


    return (
        <div className='text-white flex flex-col gap-10 md:py-10 py-6 md:px-16 sm:px-10 px-4
         sm:ml-[7.5rem] md:ml-1 ml-9 '>
            <div className=' '>
                <h1 className="text-2xl font-bold text-richblack-5 mb-2">Hi {user?.firstName} {user?.lastName} 👋</h1>
                <p className="font-medium text-richblack-200">Let's start something new</p>
            </div>

            {
                loading ? (<div className='flex justify-center items-center h-[500px]'>
                    <div className='custom-loader'>

                    </div>
                </div>) : courses.length > 0 ? (
                    <div className="sm:my-4 flex md:flex-row md:items-start flex-col items-center gap-y-8 sm:space-x-4 ">
                        {/* if there is student enrolled */}

                        {totalAmount > 0 || totalStudents > 0 ? (
                            <div className='md:w-9/12 sm:w-10/12 w-11/12'><InstructorChart courses={instructorData}></InstructorChart></div>

                        ) : (<div className="flex-1 rounded-md bg-richblack-800 p-6">
                            <p className="text-lg font-bold text-richblack-5">Visualize</p>
                            <p className="mt-4 text-xl font-medium text-richblack-50">
                                Not Enough Data To Visualize
                            </p>
                        </div>)

                        }

                        {/* data */}
                        <div className="flex md:min-w-[200px]  flex-col rounded-md bg-richblack-800 md:py-6 md:px-6 py-8 px-16">
                            <p className="text-lg font-bold text-richblack-5">Statistics</p>
                            <div className="my-2 space-y-2">
                                <p className="lg:text-lg sm:text-[16px] text-[15px] text-richblack-200">Total Courses</p>
                                <p className="lg:text-3xl sm:text-xl text-lg font-semibold text-richblack-50">{courses.length}</p>
                            </div>

                            <div className="my-2 space-y-2">
                                <p className="lg:text-lg sm:text-[16px] text-[15px] text-richblack-200">Total Students</p>
                                <p className="lg:text-3xl sm:text-xl text-lg font-semibold text-richblack-50">{totalStudents}</p>
                            </div>

                            <div className="my-2 space-y-2">
                                <p className="lg:text-lg sm:text-[16px] text-[15px] text-richblack-200">Total Income</p>
                                <p className="lg:text-3xl sm:text-xl text-lg font-semibold text-richblack-50">{totalAmount}</p>
                            </div>
                        </div>

                    </div>) :

                    (<div>
                        <p>You are not created any Course</p>
                        <Link to={"/dashboard/addCourse"}>Create a Course</Link>
                    </div>)

            }

{/* course */} 

            <div className='mt-8 border-t border-richblack-600 hidden sm:inline'>

            <div className='pt-3'>
                            <p className="text-lg font-bold text-richblack-5">Your Courses</p>
                            <Link to="/dashboard/my-courses">
                                <p className="text-sm font-semibold text-yellow-50 my-2" >View all</p>
                            </Link>
                        </div>
                        <div className='my-4 flex items-start space-x-6'>
                            {
                                courses.slice(0, 3).map((course) => (
                                    <div key={course._id} className="w-1/3">
                                        <img  className="h-[201px] w-full rounded-md object-cover"
                                            src={course.thumbnail}
                                        />
                                        <div className="mt-3 w-full flex-col justify-start ">
                                            <p className="text-base font-medium text-richblack-50">{course.courseName}</p>
                                            <div className="mt-1 flex md:flex-row flex-col md:items-center md:space-x-2 ">
                                                <p className="text-xs font-medium text-richblack-300">{course.studentsEnrolled.length} students</p>
                                                <p className="text-xs font-medium text-richblack-300 hidden md:inline"> | </p>
                                                <p className="text-xs font-medium text-richblack-300"> Rs {course.price}</p>
                                            </div>

                                        </div>
                                    </div>
                                ))

                            }
                        </div>
            </div>

        </div>
    )
}

export default Instructor