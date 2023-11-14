import React, { useEffect } from 'react'
import { AiOutlineClose } from "react-icons/ai"
import { useSelector } from 'react-redux'
import { useForm } from 'react-hook-form';
import ReactStars from "react-rating-stars-component";
import { createRating } from '../../../services/operations/courseAPI';

const ReviewModal = ({ setModal }) => {

  const { user } = useSelector((state) => state.profile)
  const { token } = useSelector((state) => state.auth)
  const { courseEntireData } = useSelector((state) => state.viewCourse)

  const {
    register, handleSubmit, setValue, formState: { errors }
  } = useForm()

  useEffect(() => {
    console.log("in the Review Modal")
    setValue("courseExperience", "")
    setValue("courseRating", 0)
  }, [])

  const ratingChange = (newRating) => {
    setValue("courseRating", newRating)
  }

  const onSubmit = async (data) => {
    console.log("submit the review")
    await createRating({
      courseId: courseEntireData._id,
      rating: data.courseRating,
      review: data.courseExperience
    }, token)

    setModal(false)
  }
  return (
    <div className='text-white fixed inset-0 z-50 grid place-items-center h-screen w-screen overflow-auto bg-white  bg-opacity-10 backdrop-blur-sm '>

      <div className="my-10 w-11/12 max-w-[700px] rounded-lg border border-richblack-500 bg-richblack-800">

        {/* head */}
        <div className="flex items-center justify-between rounded-t-lg bg-richblack-700 p-5">
          <p className="text-xl font-semibold text-richblack-5">Add Review</p>
          <button onClick={() => setModal(false)}
          className="text-2xl text-richblack-5"
          ><AiOutlineClose /></button>
        </div>

        {/* body */}
        <div className="p-6">
          <div className="flex items-center justify-center gap-x-4">
            <img src={user?.image} alt="user-Image"
              className='aspect-square  w-[50px] rounded-full object-cover' />
            <div>
              <p className='font-semibold tracking-wider'>{user?.firstName} {user?.lastName}</p>
              <p className='text-sm'>Posting Publicly</p>
            </div>

          </div>

          <form onSubmit={handleSubmit(onSubmit)} className='mt-6 flex flex-col items-center'>

            <ReactStars
              count={5}
              onChange={ratingChange}
              size={24}
              activeColor="#ffd700"></ReactStars>

            <div className="flex w-11/12 flex-col space-y-2">

              <label htmlFor="courseExperience" className='label-style'>Add Your Experience
              <sup className="text-pink-200">*</sup>
              </label>
              <textarea id='courseExperience' placeholder='Add your experience here' className='form-style resize-x-none min-h-[130px] w-full'
                {...register("courseExperience", { required: true })}
              ></textarea>

              {
                errors.courseExperience && (
                  <span className='text-sm text-pink-500'>Please add your Experience</span>
                )
              }

            </div>

            {/* buttons */}
            <div className="mt-6 flex w-11/12 justify-end gap-x-2">
              <button onClick={() => setModal(false)}
              className='cursor-pointer rounded-md bg-richblack-300 py-[8px] px-[20px] font-semibold text-richblack-900'
              >Cancel</button>

              <button type='submit' className='cursor-pointer rounded-md bg-yellow-100 py-[8px] px-[20px] font-semibold text-richblack-800'>Save</button>
              {/* if student already review the course and it again going to review then show them a toast of you already review the course */}
            </div>



          </form>

        </div>

      </div>


    </div>
  )
}

export default ReviewModal