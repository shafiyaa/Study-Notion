import React, { useState } from 'react'
import { useForm } from "react-hook-form"
import { MdAddCircleOutline } from "react-icons/md"
import { FiEdit3 } from "react-icons/fi"
import NestedView from './NestedView'
import { useDispatch, useSelector } from 'react-redux'
import { setCourse, setEditCourse, setStep } from '../../../../../../../reducers/slices/courseSlice'
import toast from 'react-hot-toast'
import { createSection, updateSection } from '../../../../../../../services/operations/courseAPI'

const CourseBuilderForm = () => {

  const { register, handleSubmit, setValue, formState: { errors } } = useForm()
  const [editSectionName, setEditSectionName] = useState(null)
  const { course } = useSelector((state) => state.course)
  const { token } = useSelector((state) => state.auth)
  const [loading, setLoading] = useState(false)
  const dispatch = useDispatch()

  const cancelEdit = () => {
    setEditSectionName(null)
    // yhn pe use form ka use kr rhe hain uske wajah se value bhi empty set krni padegi
    setValue(editSectionName, "")

  }

  const goBack = () => {
    dispatch(setStep(1))
    dispatch(setEditCourse(true))

  }

  const gotoNext = () => {
    if (course?.courseContent?.length === 0) {
      toast.error("Please add Atleast one Section")
      return
    }
    if (course?.courseContent.some((section) => section.subSection.length === 0)) {
      toast.error("Please add atleast one lecture in each section")
      return
    }

    dispatch(setStep(3))

  }

  const submitHandler = async (data) => {
    setLoading(true)
    let result

    if (editSectionName) {
      // when section is edit state
      result = await updateSection(
        {
          sectionName: data.sectionName,
          sectionId: editSectionName,
          courseId: course._id,
        },
        token
      )
    }
    else {
      // when we create the section
      result = await createSection({
        sectionName: data.sectionName,
        courseId: course._id,
      },
        token)
    }

    // when we update the course
    if (result) {
      dispatch(setCourse(result))
      setEditSectionName(null)
      setValue("sectionName", "")
    }
    setLoading(false)


  }

  const handleChangeEditSectionName = (sectionId, sectionName)=>{

    if(editSectionName ===sectionId){
      cancelEdit()
      return
    }

    setEditSectionName(sectionId)
    setValue("SectionName", sectionName)

  }

  return (
    <>
      {
        loading ? (
          <div className='grid place-items-center h-[100vh]'>
            <div className='custom-loader'></div>
          </div>
        ) : (
          <div className='space-y-8 rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-6 '>
            <p className='text-3xl font-medium text-richblack-5'>Course Builder</p>

            <form onSubmit={handleSubmit(submitHandler)} className="space-y-4" >

              {/* section name */}
              <div>
                <label htmlFor="sectionName" className='label-style'>Section Name
                  <sup className='text-pink-500'>*</sup>
                </label>

                <input type="text" id='sectionName' placeholder='Add a section name'
                  className='form-style w-full'
                  {...register("sectionName", { required: true })} />

                {
                  errors.sectionName && (
                    <span className='-mt-[1] text-pink-500 text-sm'>Section Name is Required!</span>
                  )
                }
              </div>

              {/* create section */}
              <div className='mt-3 w-fit ' type="submit ">


                {
                  editSectionName && (


                    <div className='flex gap-3 items-center'>
                      <button type='submit' className='flex gap-[6px] items-center border py-2 px-4 rounded-md text-yellow-100  '>

                        <p>Edit Section Name</p>
                        <FiEdit3 />
                      </button>

                      <div>
                        <button type='button' onClick={cancelEdit} className='text-sm text-richblack-400 underline '>Cancel Edit</button>
                      </div>

                    </div>

                  )
                }
                {/* create section button */}
                {
                  !editSectionName && (
                    <button type='submit' className='flex gap-1 items-center border py-2 px-4 rounded-md text-yellow-100 '>
                      <p>Create Section</p>
                      <MdAddCircleOutline />
                    </button>

                  )
                }

              </div>
              
            </form>




            {/* nested view */}
            {
              course?.courseContent?.length > 0 && (
                <NestedView handleChangeEditSectionName={handleChangeEditSectionName}></NestedView>
              )
            }

             

            <div className='flex justify-end gap-x-3 mt-5'>
              <button onClick={goBack} className='rounded-md border cursor-pointer flex items-center py-2 px-4'>Back</button>
              <button onClick={gotoNext} className='rounded-md border cursor-pointer flex items-center py-2 px-4'>Next</button>
            </div>

          </div>
        )
      }
    </>
  )
}

export default CourseBuilderForm