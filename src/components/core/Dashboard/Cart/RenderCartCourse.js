import React,  { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'




import { FiTrash2 } from "react-icons/fi"
import { removeFromCart } from '../../../../reducers/slices/cartSlice';
import ReactStars from "react-rating-stars-component"




const RenderCartCourse = () => {
  const { cart } = useSelector((state) => state.cart)
  const dispatch = useDispatch()
  // const [avgReviewCount, setAvgReviewCount] = useState(0)

  // const countRating = (rate)=>{
  //   let rating = GetAvgRating(rate)
  //   return rating
  // }
  

console.log("Cart : " , cart);

  return (
    <div className='mt-5 flex flex-col '>
      {
        cart.map((course, index) => (
          <div className='flex justify-between  gap-10 border-b border-richblack-500 py-8' key={index}>
            {/* thumbail */}
            <div>
              <img src={course?.thumbnail} alt="course-thumbnail" className='aspect-square h-[150px] w-[150px] rounded-lg ' />
            </div>

            {/* info */}
            <div className='flex flex-col gap-4'>
              <p className='text-richblack-5 text-[18px]'>{course?.courseName}</p>
              <p className='text-richblack-100 text-sm'>{course?.category?.name}</p>

              {/* review */}
              <div className='flex gap-2 text-sm'>
                <span className='text-yellow-100'>{course?.ratingAndReviews?.length}</span>
                
                {/* morning mai */}
                   {/* yhn function call krna h jo stars ko count karega */}
                  

                
                <span className='text-richblack-100 '>
                  {course?.ratingAndReviews?.length} Ratings
                </span>

              </div>
            </div>

            {/* last div */}
            <div className='flex items-center flex-col gap-2 '>
              <button onClick={() => dispatch(removeFromCart(course._id))} className='text-pink-300 flex items-center gap-2 px-3 py-1 border border-richblack-500 rounded-md bg-richblack-800'>
                <FiTrash2></FiTrash2>
                Remove</button>
              <p className='text-2xl text-yellow-50'>Rs. {course?.price}</p>
            </div>
          </div>
        ))
      }

    </div>
  )
}

export default RenderCartCourse

