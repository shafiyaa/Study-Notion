import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { buyCourse } from '../../../../services/operations/payment'
import { resetCart } from '../../../../reducers/slices/cartSlice'

const RenderTotalAmount = () => {
  const {totalPrice,cart} = useSelector( (state)=> state.cart)
  const{token} = useSelector((state)=> state.auth)
  const {user} = useSelector((state)=>state.profile)
  const navigate = useNavigate()
  const dispatch = useDispatch

  console.log("TotalPrice : ", totalPrice);
  

  function buyCourseHandler(){
    const courses = cart.map( (course)=> (course._id))
    buyCourse(token,courses,user,navigate,dispatch)
    // dispatch(resetCart())
    console.log("Bought these Courses", courses)
   
  }
  return (
    <div className='flex flex-col justify-center gap-y-3 text-richblack-100 mt-5 border border-richblack-500 p-5 w-[250px] bg-richblack-800 rounded-lg'>
      <p className='text-sm font-bold'>Total:</p>
      <p className='text-2xl text-yellow-50 font-bold'>Rs. {totalPrice}</p>
      <button onClick={buyCourseHandler} className='w-full rounded-md text-center font-semibold bg-yellow-100 text-richblack-900 px-6 py-2'>
        Buy Now
      </button>

    </div>
  )
}

export default RenderTotalAmount