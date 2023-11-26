import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
// import { RiArrowGoBackFill } from 'react-icons/ri'
import { useDispatch, useSelector } from 'react-redux'
import { COURSE_STATUS } from '../../../../../../../utilis/constants'
import { resetCourseState, setEditCourse, setStep } from '../../../../../../../reducers/slices/courseSlice'
import { useNavigate } from 'react-router-dom'
import { editCourseDetails } from '../../../../../../../services/operations/courseAPI'

const PublishCourse = () => {
  const { register, handleSubmit, setValue, getValues, } = useForm()
  const dispatch = useDispatch()
  const { course } = useSelector((state) => state.course)
  const { token } = useSelector((state) => state.auth)
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    if (course?.status === COURSE_STATUS.PUBLISHED) {
      setValue("public", true)
    }
  })

  const goBack = () => {
    dispatch(setStep(2))

  }
  const gotoCourse = () => {
    dispatch(resetCourseState)
    navigate("/dashboard/my-courses")
  }

  const handleCoursePublish = async () => {
    // agr course pehle se publish h toh api call ki koi need nhi h
    if (
      (course?.status === COURSE_STATUS.PUBLISHED && getValues("public") === true)
      ||
      // course ko update hi nhi kiya h
      (course?.status === COURSE_STATUS.DRAFT && getValues("public") === false)) {
      gotoCourse()
      return

    }

    // agr form update hua h
    const formData = new FormData()
    formData.append("courseId", course._id)
    const courseStatus = getValues("public") ? COURSE_STATUS.PUBLISHED : COURSE_STATUS.DRAFT
    formData.append("status", courseStatus)

    setLoading(true)
    const result = await editCourseDetails(formData, token)
    if (result) {
      gotoCourse()
    }
    setLoading(false)



  }

  const onSubmit = () => {
    handleCoursePublish()

  }
  return (
    <>
      {
        loading ? (<div className='flex items-center justify-center h-[500px]'>
          <div className='custom-loader'></div>
        </div>) : (

          // step 3 ka code
          <div className='bg-richblack-800 border border-richblack-600 rounded-md py-3 sm:px-5 px-3 flex flex-col gap-y-4'>
            <p className='text-3xl text-richblack-5'>Publish Course</p>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className='flex items-center gap-3 my-6 mb-8'>
                <input type="checkbox" id='public' className='border-gray-300 h-4 w-4 rounded bg-richblack-500 text-richblack-400 focus:ring-1 focus:ring-richblack-5 '

                  {...register("public")} />
                <label htmlFor="public" className='inline-flex items-center sm:text-lg text-base'>Make this Course as Public</label>

              </div>

              {/* buttons */}
              <div className='flex sm:gap-x-6 sm:justify-end mt-4 gap-x-3 justify-between'>
                <button disabled={loading} type='button' onClick={goBack} className='flex cursor-pointer items-center gap-x-2 rounded-md bg-richblack-300 sm:py-[8px] sm:px-[20px] py-[4px] px-[10px] font-medium text-richblack-900'>Back</button>

                <button disabled={loading} type='submit' className='bg-yellow-100 sm:py-2 sm:px-4 py-1 px-3 rounded-md text-richblack-900 font-medium'>Save changes</button>
              </div>
            </form>

          </div>
        )
      }

    </>
  )
}

export default PublishCourse