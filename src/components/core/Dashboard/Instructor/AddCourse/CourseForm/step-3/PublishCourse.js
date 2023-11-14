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
          <div className='bg-richblack-800 border border-richblack-600 rounded-md py-3 px-5 flex flex-col gap-y-4'>
            <p className='text-3xl text-richblack-5'>Publish Course</p>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className='flex items-center gap-3 my-6 mb-8'>
                <input type="checkbox" id='public' className='border-gray-300 h-4 w-4 rounded bg-richblack-500 text-richblack-400 focus:ring-1 focus:ring-richblack-5 '

                  {...register("public")} />
                <label htmlFor="public" className='inline-flex items-center text-lg'>Make this Course as Public</label>

              </div>

              {/* buttons */}
              <div className='flex gap-x-6 justify-end mt-4'>
                <button disabled={loading} type='button' onClick={goBack} className='flex cursor-pointer items-center gap-x-2 rounded-md bg-richblack-300 py-[8px] px-[20px] font-medium text-richblack-900'>Back</button>

                <button disabled={loading} type='submit' className='bg-yellow-100 py-2 px-4 rounded-md text-richblack-900 font-medium'>Save changes</button>
              </div>
            </form>

          </div>
        )
      }

    </>
  )
}

export default PublishCourse