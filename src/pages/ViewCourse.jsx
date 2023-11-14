import React, { useEffect, useState } from 'react'
import VideoSidebar from '../components/core/Video/VideoSidebar'
import { Outlet, useParams } from 'react-router-dom'
import ReviewModal from '../components/core/Video/ReviewModal'
import { useDispatch, useSelector } from 'react-redux'
import { getFullDetailsOfCourse } from '../services/operations/courseAPI'
import { setCompletedLectures, setCourseSectionData, setEntireCourseData, setTotalNoOfLectures } from '../reducers/slices/viewCourseSlice'

const ViewCourse = () => {
    const [modal, setModal] = useState(false)
    const { courseId } = useParams()
    const { token } = useSelector((state) => state.auth)
    const dispatch = useDispatch()



    useEffect(() => {
        const getCourseInfo = async () => {
            const courseData = await getFullDetailsOfCourse(courseId, token)
            dispatch(setCourseSectionData(courseData?.courseDetails?.courseContent))
            dispatch(setEntireCourseData(courseData.courseDetails))
            dispatch(setCompletedLectures(courseData.completedVideos))

            let lectures = 0
            courseData?.courseDetails?.courseContent?.forEach((section) => {
                lectures += section.subSection.length
            })
            dispatch(setTotalNoOfLectures(lectures))

        }

        getCourseInfo()
    }, [])

    return (
        <div className='relative flex min-h-[calc(100vh-3.5rem)]'>
        
                <VideoSidebar setModal={setModal} ></VideoSidebar>
         

            <div className='h-[calc(100vh-3.5rem)] w-11/12  overflow-auto'>
                <Outlet />
                <div className='h-[200px]'></div>
            </div>

            {
                modal && <ReviewModal setModal={setModal} />
            }
        </div>
    )
}

export default ViewCourse 