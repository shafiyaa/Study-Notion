import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { markLectureAsComplete } from '../../../services/operations/courseAPI'
import { updateCompletedLectures } from '../../../reducers/slices/viewCourseSlice'
import { Player, BigPlayButton } from 'video-react';
import 'video-react/dist/video-react.css';
import IconButton from "../../common/IconButton"

const VideoDetails = () => {

  const { courseId, sectionId, subSectionId } = useParams()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const location = useLocation()
  const playerRef = useRef()
  const { courseSectionData, courseEntireData, completed } = useSelector((state) => state.viewCourse)
  const { token } = useSelector((state) => state.auth)

  const [videoData, setVideoData] = useState([])
  const [videoEnded, setVideoEnded] = useState(false)
  const [loading, setLoading] = useState(false)
  

  useEffect(() => {
      
    const setVideoSpecificDetails = async () => {
      if (!courseSectionData.length) {
        return
      }
      else {
        const filterData = courseSectionData.filter((data) => data._id === sectionId)

        const filterVideoData = filterData?.[0].subSection.filter((data) => data._id === subSectionId)
        
        setVideoData(filterVideoData[0])
        setVideoEnded(false)
      }
    }

    setVideoSpecificDetails()

  }, [courseEntireData, courseSectionData, location.pathname])

  const isFirstVideo = () => {
    const currentSectionIndex = courseSectionData.findIndex((data) => data._id === sectionId)

    const currentSubSectionIndex = courseSectionData[currentSectionIndex].subSection.findIndex((data) => data._id === subSectionId)

    if (currentSectionIndex === 0 && currentSubSectionIndex === 0) {
      return true
    } else {
      return false
    }
  }

  const isLastVideo = () => {
    const currentSectionIndex = courseSectionData.findIndex((data) => data._id === sectionId)

    const subSectionLength = courseSectionData[currentSectionIndex].subSection.length

    const currentSubSectionIndex = courseSectionData[currentSectionIndex].subSection.findIndex((data) => data._id === subSectionId)

    if (currentSectionIndex === courseSectionData.length - 1 && currentSubSectionIndex === subSectionLength - 1) {
      return true
    } else {
      return false
    }

  }
  const goToNextVideo = () => {
    const currentSectionIndex = courseSectionData.findIndex((data) => data._id === sectionId)

    const subSectionLength = courseSectionData[currentSectionIndex].subSection.length

    const currentSubSectionIndex = courseSectionData[currentSectionIndex].subSection.findIndex((data) => data._id === subSectionId)

    // same section ki next video k liye
    if (currentSubSectionIndex !== subSectionLength - 1) {

      const nextSubSectionId = courseSectionData[currentSectionIndex].subSection[currentSubSectionIndex + 1]._id
      // move to next video
      navigate(`/view-course/${courseId}/section/${sectionId}/sub-section/${nextSubSectionId}`)
    }
    else {
      // different section ki videos pe jana hoga toh
      const nextSectionId = courseSectionData[currentSectionIndex + 1]._id
      const nextSubSectionId = courseSectionData[currentSectionIndex + 1].subSection[0]._id
      // next video
      navigate(`/view-course/${courseId}/section/${nextSectionId}/sub-section/${nextSubSectionId}`)
    }
  }

  const goToPrevVideo = () => {
    const currentSectionIndex = courseSectionData.findIndex((data) => data._id === sectionId)
    const currentSubSectionIndex = courseSectionData[currentSectionIndex].subSection.findIndex((data) => data._id === subSectionId)


    if (currentSubSectionIndex !== 0) {
      // same section , prev video
      const prevSubSectionId = courseSectionData[currentSectionIndex].subSection[currentSubSectionIndex - 1]._id

      navigate(`/view-course/${courseId}/section/${sectionId}/sub-section/${prevSubSectionId}`)
    }
    else {
      // different section , prev video
      const prevSectionId = courseSectionData[currentSectionIndex - 1]._id

      const subSectionLength = courseSectionData[currentSectionIndex - 1].subSection.length

      const prevSubSectionId = courseSectionData[currentSectionIndex - 1].subSection[subSectionLength - 1]._id

      navigate(`/view-course/${courseId}/section/${prevSectionId}/sub-section/${prevSubSectionId}`)

    }
  }

  const lectureCompletion = async () => {

   
    setLoading(true)

    const res = await markLectureAsComplete({
      courseId, subSectionId
    }, token)

    if (res) {
     
      dispatch(updateCompletedLectures(subSectionId))
    }
    setLoading(false)

  }

  const rewatch = () => {
    if (playerRef?.current) {
      playerRef.current?.seek(0);
      setVideoEnded(false)
    }
  }

  if (loading) {
    return <div className='flex justify-center items-center h-[500px]'>
      <div className='custom-loader'></div>
    </div>
  }

  return (
    <div className='text-white flex flex-col'>

      {
        !videoData ?
          (
            <div className='flex justify-center items-center h-[500px] text-pink-300 text-4xl'>
              <div> No Data Found</div>
             </div>
          ) :
          (

            <Player
            fluid={true}
              ref={playerRef}
              aspectRatio='16:9'
              playsInline
              onEnded={() => setVideoEnded(true)}
              src={videoData?.videoUrl}
            >
               <BigPlayButton position="center " />
             

              {
                videoEnded && (
                  <div className='h-full absolute inset-0 z-10 grid place-content-center font-inter'
                  style={{
                    backgroundImage:
                      "linear-gradient(to top, rgb(0, 0, 0), rgba(0,0,0,0.7), rgba(0,0,0,0.5), rgba(0,0,0,0.1)",
                  }}>
                    {/* completed button */}

                    
                    {
                      !completed.includes(subSectionId) && (
                        
                        <IconButton
                          disabled={loading}
                          onclick={() => lectureCompletion()}
                          text={!loading ? "Mark As completed" : "Loading..."}
                          customClass="text-xl max-w-max px-4 mx-auto border text-yellow-100"

                        >
                        </IconButton>
                      )
                    }

                    {/* rewacth button */}
                    {/* rewatch pe click krnse autoplay ho jye isko homework me krna h */}
                    <IconButton
                      disabled={loading}
                      customClass="text-xl max-w-max px-4 mx-auto mt-2"
                      onclick={() => {
                        if (playerRef?.current) {
                          playerRef.current?.seek(0)

                          setVideoEnded(false)
                        }
                      }}
                    >
                      Rewatch
                    </IconButton>


                    {/* previous buttton only appears when the video is not the first video */}
                    {/* see css in example code black button */}

                    <div className="mt-5 flex min-w-[250px] justify-center gap-x-4 text-lg">
                      {
                        !isFirstVideo() && (
                          <button
                            disabled={loading}
                            onClick={goToPrevVideo}
                            className='  cursor-pointer rounded-md bg-richblack-800 px-[20px] py-[8px] font-semibold text-richblack-5'
                          >Prev</button>
                        )
                      }

                      {/* next button only shows when the video is not the last video */}
                      {
                        !isLastVideo() && (
                          <button
                            disabled={loading}
                            onClick={goToNextVideo}
                            className=' cursor-pointer rounded-md bg-richblack-800 px-[20px] py-[8px] font-semibold text-richblack-5'>
                            Next
                          </button>
                        )
                      }
                    </div>


                  </div>
                )


              }


            </Player>

          )
      }


      <div className='mt-8 px-6 py-2'> 
      <p className='text-4xl'>{videoData?.title}</p>
        <p className='text-xl'>{videoData?.description}</p>
        </div>


    </div>
  )

}

export default VideoDetails