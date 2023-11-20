import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import OTPInput from 'react-otp-input'
import { setLoading } from '../../reducers/slices/authSlice'
import { sendOtp, signUp } from '../../services/operations/authAPI'
import { useNavigate } from 'react-router-dom'
// import toast from 'react-hot-toast'
import { Link } from 'react-router-dom'
import { BsArrowLeft } from "react-icons/bs"
import { PiClockCounterClockwiseBold } from "react-icons/pi"
import CTAbutton from '../../components/core/HomePage/CTAbutton'

const VerifyEmail = () => {
  const { loading, signupData } = useSelector((state) => state.auth)

  const [otp, setOTP] = useState("")
  const dispatch = useDispatch()
  const navigate = useNavigate()


  // agr signup data empty hua toh 
  // useEffect(() => {
  //   if (!signupData) {
  //     toast.error("You are not Signup yet!")
  //     navigate("/signup")
  //   }
  // }, [])

  function submitHandler(event) {
    console.log("verify-page submit handler")
    event.preventDefault()
    // dispatch(setLoading(true))

    // destructuring the signUp data
    const { accountType, firstName, lastName, email, password, confirmPassword} = signupData

    dispatch(signUp(accountType, firstName, lastName, email, password, confirmPassword, otp, navigate))
  }

  return (
    <div className='' >
      {
        loading ? (
          <div className="grid place-items-center h-[70vh]">
            <div className='custom-loader'></div>
          </div>
        ) : (
          <div className='text-richblack-100 w-11/12 max-w-maxContent  mx-auto gap-4 min-h-[calc(100vh-3.5rem)] justify-center text-left flex flex-col items-center    '>

            <div className='max-w-[500px] md:p-6 lg:p-8 p-3  '>
              <h1 className="text-richblack-5 font-semibold  text-[1.875rem] leading-[2.375rem] text-center sm:text-start">Verify Email
              </h1>

              <p className="text-[1.125rem] leading-[1.625rem] my-4 text-richblack-100">A verification code has been sent to you. Enter the code below</p>

              <form className='flex flex-col items-center justify-between gap-y-4 '>
                <OTPInput
                  value={otp}
                  onChange={setOTP}
                  numInputs={6}
                              
                  renderInput={(props) =>(
                     <input 
                     {...props}
                     placeholder='-'
                      style={ {boxShadow:"inset 0px -1px 0px rgba(255, 255, 255, 0.18)", }}

                      className="w-[40px] sm:w-[48px] lg:w-[56px]  bg-richblack-800 rounded-[0.5rem] text-richblack-5 aspect-square text-center outline-none focus:outline-2
                      focus:outline-yellow-50  "

                      />
                  )}

                  containerStyle={{
                    justifyContent: "space-between ",
                    gap: "0 14px",
                  }}
                 
               
                />

                <button onClick={submitHandler} className='lg:w-full  sm:w-[90%] w-[80%]'>
                  <CTAbutton active={true} >Verify Email</CTAbutton>
                </button>

              </form>

              <div className='flex justify-between mt-4 gap-x-16 py-2'>

                <div className=' mr-10  '>
                  <Link to="/signup" className='flex  gap-2 items-center'>
                    <BsArrowLeft className='hidden sm:inline' />
                    <p className="text-richblack-5 flex items-center gap-x-2">  Back to Login</p>
                  </Link>
                </div>

                <div onClick={() => dispatch(sendOtp(signupData.email, navigate))} className='cursor-pointer flex items-center text-blue-100 gap-x-2'>
                  <PiClockCounterClockwiseBold className='text-[25px] hidden sm:inline'/>
                  <p>Resend it</p>
                </div>
              </div>
            </div>

          </div>
        )
      }
    </div>
  )
}

export default VerifyEmail