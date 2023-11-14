import React from 'react'
import IconButton from './IconButton'

const ConfirmationModal = ({modalData}) => {
  console.log("in the Confirmation modal")
  return (
    <div className=' fixed inset-0 grid place-items-center z-50 overflow-auto bg-white bg-opacity-10  backdrop-blur-sm '>
        <div className='border border-richblack-400 bg-richblue-900 rounded-lg p-8 max-w-[350px]'>
            <p className='text-2xl font-semibold text-richblack-5'>{modalData.text1}</p>
            <p className='mt-3 mb-5 leading-6 text-richblack-200'>{modalData.text2}</p>

            {/* buttons */}
            <div className='flex items-center gap-x-4'>
                <IconButton onclick={modalData?.btn1Handler} 
                text={modalData?.btn1Text} customClass={"bg-pink-400 py-2 px-5 font-semibold rounded-md text-richblack-800"}></IconButton>
              
              <button onClick={modalData?.btn2Handler} className='cursor-pointer rounded-md bg-blue-100 py-2 px-5 font-semibold text-richblack-900 '
              >
                {modalData?.btn2Text}
              </button>
            </div>
        </div>
    </div>
  )
}

export default ConfirmationModal