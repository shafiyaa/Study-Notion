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
          <div className='flex flex-col md:flex-row justify-between gap-3 md:gap-10 border-b border-richblack-500 py-8' key={index}>
           
               {/* thumbail */}
            <div>
              <img src={course?.thumbnail} alt="course-thumbnail" className='aspect-square h-[95px] w-[95px] sm:h-[110px] sm:w-[110px] md:h-[150px] md:w-[150px] rounded-lg ' />
            </div>

            {/* info */}
            <div className='flex flex-col gap-4'>
              <p className='text-richblack-5 md:text-[18px] text-[16px]'>{course?.courseName}</p>
              <p className='text-richblack-100 text-sm invisible md:visible'>{course?.category?.name}</p>

              {/* review */}
              {/* <div className='flex gap-2 text-sm'> */}
                {/* <span className='text-yellow-100'>{course?.ratingAndReviews?.length}</span> */}
                                
                {/* <span className='text-richblack-100 '>
                  {course?.ratingAndReviews?.length} Ratings
                </span> */}

              {/* </div> */}
            </div>
            
           

            {/* last div */}
            <div className='flex flex-row gap-4 items-start md:items-center md:flex-col md:gap-2 '>
              <button onClick={() => dispatch(removeFromCart(course._id))} className='text-pink-300 flex items-center gap-1 sm:gap-2 sm:px-3 px-2  py-1 border border-richblack-500 rounded-md bg-richblack-800'>
                <FiTrash2 className='hidden sm:inline'></FiTrash2>
                Remove</button>
              <p className='text-lg md:text-2xl text-yellow-50'>Rs. {course?.price}</p>
            </div>
          </div>
        ))
      }

    </div>
  )
}

export default RenderCartCourse

