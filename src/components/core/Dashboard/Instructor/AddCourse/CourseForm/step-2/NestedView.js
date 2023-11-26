import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RxDropdownMenu } from "react-icons/rx"
import { MdEdit } from "react-icons/md"
import { RiDeleteBin6Line } from "react-icons/ri"
import { BiDownArrow } from "react-icons/bi"
import { AiOutlinePlus } from "react-icons/ai"
import { deleteSection, deleteSubSection } from '../../../../../../../services/operations/courseAPI'
import { setCourse } from '../../../../../../../reducers/slices/courseSlice'
import SubSectionModal from './SubSectionModal'
import ConfirmationModal from '../../../../../../common/ConfirmationModal'

const NestedView = ({ handleChangeEditSectionName }) => {
  const { course } = useSelector((state) => state.course)
  const { token } = useSelector((state) => state.auth)
  const dispatch = useDispatch()

  const [addSubSection, setAddSubSection] = useState(null)
  const [viewSubSection, setViewSubSection] = useState(null)
  const [editSubSection, setEditSubSection] = useState(null)

  const [modal, setModal] = useState(null)

  const handleDeleteSection = async (sectionId) => {

    const result = await deleteSection({
      sectionId,
      courseId: course._id,
    },
      token)
    // console.log("section is deleted")
    if (result) {
      dispatch(setCourse(result))
    }
    setModal(null)
  }

  const handleDeleteSubSection = async (subSectionId, sectionId) => {
    const result = await deleteSubSection({
      subSectionId, sectionId,
    }, token)
    if (result) {
      const updatedCourseContent = course.courseContent.map((section) => section._id === sectionId ? result : section)

      const updatedCourse = { ...course, courseContent: updatedCourseContent }

      dispatch(setCourse(updatedCourse))
    }
    setModal(null)

  }
  return (
    <div className='text-richblack-5 mt-5'>


      <div className='rounded-lg bg-richblack-700 py-6 md:px-8 sm:px-4 px-1 '>
        {
          course?.courseContent?.map((section) => {
            return (

              <details key={section._id} open className='mt-6 '>
                {/* section */}
                <summary className='flex items-center justify-between gap-x-3 border-b-2 border-b-richblack-600 cursor-pointer py-2 '>
                  <div className='flex sm:flex-row items-center sm:gap-x-3 gap-x-[6px]  px-3 w-full'>


                    <RxDropdownMenu className='md:text-2xl sm:text-xl text-lg text-richblack-50 ' />

                    <p className='md:font-semibold text-[16px] sm:text-[19px] text-richblack-50 ' >{section.sectionName}</p>

                    <div className='flex items-center md:gap-x-3 sm:gap-x-2 gap-x-1 '
                    >
                      {/* edit buton */}
                      <button onClick={() => handleChangeEditSectionName(section._id, section.sectionName)}>
                        <MdEdit className='sm:text-xl text-lg text-richblack-300' />
                      </button>

                      {/* delete button */}
                      <button onClick={() => {
                        setModal({
                          text1: "Delete this Section",
                          text2: "All the lectures in this section wil be deleted",
                          btn1Text: "Delete",
                          btn2Text: "Cancel",
                          btn1Handler: () => handleDeleteSection(section._id),
                          btn2Handler: () => setModal(null),
                        })
                      }}>
                        <RiDeleteBin6Line className='md:text-xl text-lg text-richblack-300'
                        />
                      </button>

                      {/* horizontal line */}
                      <span className='font-medium text-richblack-300 hidden sm:inline '>|</span>

                      {/* dropdown arrow */}
                      <BiDownArrow className={` text-richblack-300 md:text-xl text-lg hidden sm:inline `} />
                    </div>

                  </div>
                </summary>

                {/* subsection */}
                <div className='sm:ml-8 ml-6 '>
                  {
                    section?.subSection?.map((data) => (
                      <div key={data?._id}
                        className=' flex items-center  cursor-pointer md:justify-around justify-between gap-x-3 border-b-2 border-b-richblack-600 py-2 '
                        onClick={() => setViewSubSection(data)}>

                        {/* title */}
                        <div className='flex items-center gap-x-3 py-2'>
                          <RxDropdownMenu className='text-lg text-richblack-50' />
                          <p className=' text-richblack-50'>{data.title}</p>
                        </div>

                        {/*  button */}
                        <div className='flex items-center gap-x-3 '
                          onClick={(event) => event.stopPropagation()}>

                          {/* edit buitton */}
                          <button onClick={() => setEditSubSection(
                            {
                              ...data,
                              sectionId: section._id
                            })
                          }><MdEdit className='sm:text-xl text-lg text-richblack-300' /></button>

                          {/* delete button */}
                          <button onClick={() => setModal({
                            text1: "Delete this Sub Section",
                            text2: "selected Lecture will be deleted",
                            btn1Text: "Delete",
                            btn2Text: "Cancel",
                            btn1Handler: () => handleDeleteSubSection(data._id, section._id),
                            btn2Handler: () => setModal(null),
                          })}>
                            <RiDeleteBin6Line className='sm:text-xl text-lg text-richblack-300' />
                          </button>


                        </div>

                      </div>
                    ))
                  }

                  {/* Add lecture button */}
                  <button onClick={() => setAddSubSection(section._id)}
                    className='mt-2 flex items-cneter gap-2 text-yellow-50'>
                    <AiOutlinePlus className='text-lg' />
                    <p>Add Lecture</p>
                  </button>

                </div>

              </details>
            )

          })
        }

      </div>

      {/* all modals */}
      {
        addSubSection ? (<SubSectionModal
          modalData={addSubSection}
          setModalData={setAddSubSection}
          add={true}
        />) :
          viewSubSection ? (<SubSectionModal
            modalData={viewSubSection}
            setModalData={setViewSubSection}
            view={true}
          />) :
            editSubSection ? (<SubSectionModal
              modalData={editSubSection}
              setModalData={setEditSubSection}
              edit={true} />) :
              (<div></div>)
      }

      {
        modal ? (
          <ConfirmationModal modalData={modal} />
        ) : (<div></div>)
      }


    </div>
  )
}

export default NestedView