import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { getUserEnrolledCourses } from '../../../services/operations/profileAPI'
import ProgressBar from "@ramonak/react-progress-bar";
// import { BiDotsVertical } from "react-icons/bi"
// import useOnClickOutside from '../../../hooks/useOnClickOutside';


import { useNavigate } from "react-router-dom"
// import { toast } from "react-hot-toast"




const EnrolledCourses = () => {

  const { token } = useSelector((state) => state.auth)

  const [enrolledCourses, setEnrolledCourses] = useState(null)
  const [loading, setLoading] = useState(false)
  // const { courseId } = useParams()
  const navigate = useNavigate()



  useEffect(() => {
    const getEnrolledCourse = async () => {

      setLoading(true)
      try {

        const res = await getUserEnrolledCourses(token)
        console.log("res is ", res)
     

        // const filterPublishCourse = res.filter((ele) => ele.status !== "Draft")

        setEnrolledCourses(res)
      } catch (error) {
        console.log("Could not fetch enrolled courses.")
        console.log(error)
      }
      setLoading(false)

    }

    getEnrolledCourse()

  }, [])


  if (loading) {
    return (
      <div className='grid place-items-center h-[500px] '>
        <div className='custom-loader'></div>
      </div>
    )
  }

  // if (!enrolledCourses) {
  //   return (
  //     <div className='text-white text-2xl'>Enrolled course ki value abhi aayi nhi h</div>
  //   )
  // }



  return (
    <div className=' sm:ml-48 ml-2 md:ml-8'>
      <div className="text-3xl text-richblack-50">Enrolled Courses</div>
      {!enrolledCourses ? (
        <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center">

          <div className="custom-loader"></div>
        </div>
      ) : !enrolledCourses.length ? (
        <p className="grid h-[10vh] w-full place-content-center text-richblack-5">
          You have not enrolled in any course yet.
          {/* TODO: Modify this Empty State */}
        </p>
      ) : (
        <div className="my-8 text-richblack-5">
          {/* Headings */}
          <div className="flex rounded-t-lg bg-richblack-500 ">
            <p className="w-[45%] px-5 py-3">Course Name</p>
            <p className="w-1/4 px-2 py-3">Duration</p>
            <p className="flex-1 px-2 py-3">Progress</p>
          </div>
          {/* Course Names */}
          {enrolledCourses.map((course, i, arr) => (
            <div
              className={`flex items-center border border-richblack-700 ${i === arr.length - 1 ? "rounded-b-lg" : "rounded-none"
                }`}
              key={i}
            >
              <div
                className="flex w-[45%] cursor-pointer items-center gap-4 px-5 py-3"
                onClick={() => {
                  navigate(
                    `/view-course/${course?._id}/section/${course.courseContent?.[0]?._id}/sub-section/${course.courseContent?.[0]?.subSection?.[0]}`
                  )
                }}
              >
                <img
                  src={course.thumbnail}
                  alt="course_img"
                  className="h-14 w-14 rounded-lg object-cover"
                />
                <div className="flex max-w-xs flex-col gap-2">
                  <p className="font-semibold">{course.courseName}</p>
                 

                  <p className="text-xs text-richblack-300">
                    {course.courseDescription.length > 50
                      ? `${course.courseDescription.slice(0, 50)}...`
                      : course.courseDescription}
                  </p>
                </div>
              </div>
              <div className="w-1/4 px-2 py-3">{course?.totalDuration} 15 min</div>
              <div className="flex w-1/5 flex-col gap-2 px-2 py-3">
                <p>Progress: {course.progressPercentage || 0}%</p>
                <ProgressBar
                  completed={course.progressPercentage || 0}
                  height="8px"
                  isLabelVisible={false}
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default EnrolledCourses