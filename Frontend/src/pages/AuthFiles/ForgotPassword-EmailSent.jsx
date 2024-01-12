import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { BsArrowLeft } from "react-icons/bs"
import { getPasswordResetToken } from '../../services/operations/authAPI'

const ResetPassword = () => {
  const { loading } = useSelector((state) => state.auth)
  const [email, setEmail] = useState("")
  const [emailSent, setEmailSent] = useState(false)
  const dispatch = useDispatch()



  const submitHandler = (event) => {
    event.preventDefault()
    console.log("Reset password")
    dispatch(getPasswordResetToken(email, setEmailSent))
  }
  return (
    <div className='text-richblack-100 flex h-[80vh] justify-center items-center w-11/12 mx-auto max-w-maxContent '>
      {
        loading ? (
          <div className='custom-loader grid place-items-center'></div>
        ) : (
          <div className='mx-auto  flex flex-col items-center  gap-4 '>
            <h1 className='text-3xl text-white '>
              {
                emailSent ? "Check your Email" : "Reset your Password"
              }
            </h1>
            <p className='sm:w-[40%] w-[80%] text-center'>
              {
                emailSent ? `We have sent the reset password email to ${email}` : "We email you instrution to reset your password. If you dont have a access to your email we can try account recovery "
              }
            </p>

            <form onSubmit={submitHandler} >
              {
                !emailSent && (
                  <label className="mb-1 text-base leading-[1.375rem] text-richblack-5"  >
                    <p className='mt-3 mb-1 text-richblack-25'>Email Address <sup className="text-pink-200">*</sup> </p>

                    <input type="email" required name='email' value={email} placeholder='Enter Email Address' onChange={(event) => setEmail(event.target.value)}
                      className=' w-full rounded-[0.5rem] bg-richblack-800 p-[12px] text-richblack-5'
                      style={{
                        boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                      }} />
                  </label>
                )
              }
            </form>

            <button onClick={submitHandler} className="mt-3 w-[50%] rounded-[8px] bg-yellow-50 py-[8px] px-[12px] font-semibold text-richblack-900">
              {
                emailSent ? "Resend Email" : "Reset Password"
              }
            </button>

            <div className='font-medium '>
              <Link to="/login" className='flex gap-2 items-center'>
                <BsArrowLeft />
                <p>  Back to Login</p>
              </Link>
            </div>

          </div>
        )
      }
    </div>
  )
}

export default ResetPassword