import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import IconButton from "../../common/IconButton"
import { IoChevronBackCircle } from "react-icons/io5"
import { IoIosArrowUp } from "react-icons/io"

const VideoSidebar = ({ setModal }) => {
  const [activeSection, setActiveSection] = useState("")
  const [activeSubSection, setActiveSubSection] = useState("")
  const navigate = useNavigate()
  const location = useLocation()
  const { sectionId, subSectionId, courseId } = useParams()

  const {
    courseSectionData,
    courseEntireData,
    totalNoOfLectures,
    completed,
  } = useSelector((state) => state.viewCourse)

  useEffect(() => {
    console.log("completed lectures", completed)
    const setActiveFlags = () => {
     

      // if section is empty
      if (!courseSectionData.length) {
        return
      }

      // find current section (use for highlighting)
      const currentSectionIndex = courseSectionData.findIndex((data) => data._id === sectionId)

      // current subSection
      const currentSubSectionIndex = courseSectionData?.[currentSectionIndex]?.subSection.findIndex((data) => data._id === subSectionId)

      // find the current playing video
      const activeVideo = courseSectionData[currentSectionIndex]?.subSection[currentSubSectionIndex]?._id

      // 
      setActiveSection(courseSectionData?.[currentSectionIndex]?._id)

      setActiveSubSection(activeVideo)

      
      // console.log("courseEntiredata", courseEntireData)
      // console.log("total number of lectrues", totalNoOfLectures)
      // console.log("course section data ", courseSectionData)



    }

    setActiveFlags()

  }, [courseSectionData, courseEntireData, location.pathname])

  return (
    <div className=' text-white flex flex-col w-[320px] max-w-[350px]  border-r border-richblack-700 bg-richblack-800 '>

      {/* button and heading */}
      <div className='flex justify-between items-center py-1 px-3'>
        <button onClick={() => {
          navigate(`/dashboard/enrolled-courses/${courseId}`)
        }}>
          <IoChevronBackCircle className='text-3xl' />
        </button>

        <div>
          <IconButton text="Add Review"
            onclick={() => setModal(true)} customClass={" px-4 py-2 bg-yellow-50 font-medium text-black rounded-md"}
          ></IconButton>
        </div>


      </div>



      <div className='flex flex-col gap-1 py-1 px-4 '>
        <p className='font-semibold'>{courseEntireData?.courseName}</p>
        <p className='text-richblack-200 text-sm'>{completed?.length} / {totalNoOfLectures}</p>
      </div>

      <hr className=' text-richblack-400 mx-3' />

      {/* section and subsection */}
      <div className='h-[calc(100vh - 5rem)] overflow-y-auto'>
        {

          courseSectionData.map((section, index) => (
            <div
              onClick={() => setActiveSection(section?._id)} key={index}
               className='mt-2 cursor-pointer '>

              {/* // section */}
              <div className='bg-richblack-600 p-3 flex items-center justify-between '>
                <p>{section?.sectionName}</p>
                <span className={ `${activeSection === section?._id? "rotate-180": "rotate-0"} transition-all duration-700`}>
                <IoIosArrowUp />
                </span>
                {/* add arrow and give rotation to 180 degree on opeing and closing */}
              </div>

              {/* subsection */}
              <div>
                {
                  activeSection === section?._id && (
                    <div className="transition-[height] duration-500 ease-in-out">
                      {
                        section.subSection.map((topic, index) => (
                          <div key={index}
                            className={`flex gap-3 py-2 px-5
                           ${topic._id === activeSubSection ? "bg-yellow-50 text-richblack-900 " : " hover:bg-richblack-900 text-white"} `}
                            onClick={() => {
                              navigate(`/view-course/${courseEntireData?._id}/section/${section?._id}/sub-section/${topic?._id}`)
                              setActiveSubSection(topic?._id)
                            }}
                          >
                            <input type="checkbox"
                              checked={completed.includes(topic?._id)}
                              onChange={() => {}} />
                            <span>{topic?.title}</span>
                          </div>
                        ))
                      }
                    </div>
                  )
                }
              </div>
            </div>
          ))
        }

      </div>
    </div>
  )
}

export default VideoSidebar