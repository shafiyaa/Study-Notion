import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import RenderCartCourse from './RenderCartCourse'
import RenderTotalAmount from './RenderTotalAmount'
// import { resetCart } from '../../../../reducers/slices/cartSlice'

const Cart = () => {
    const {totalItems, totalPrice} = useSelector( (state)=> state.cart)
    // const dispatch = useDispatch()


  return (
    <div className='w-11/12 max-w-[1000px] p-4  sm:ml-40 ml-8 md:ml-8 '>
        <h1 className="mb-14 text-3xl font-medium text-richblack-5">Your Cart</h1>
        <p className='text-richblack-100 text-sm border-b pb-4'>{totalItems} Courses in Cart</p>
        {/* <button className='px-4 py-2 border border-pink-200 rounded-md text-white'
        onClick={()=>dispatch(resetCart())}>Empty Cart</button> */}

        {
            totalItems > 0 ? (
                <div className='flex lg:flex-row flex-col items-start justify-start lg:gap-12 gap-4 p-2'>
                    <RenderCartCourse></RenderCartCourse>

                    <RenderTotalAmount ></RenderTotalAmount>
                </div>
            ): (
                // when there is no Item in the Cart
                <div>
                <p className='text-4xl text-center text-blue-100 mt-40'>Your Cart is Empty</p>
                </div>
            )
        }

    </div>
  )
}

export default Cart