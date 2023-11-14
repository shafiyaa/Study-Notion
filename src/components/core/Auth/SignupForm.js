
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { ACCOUNT_TYPE } from '../../../utilis/constants'
import { toast } from "react-hot-toast"
import { setSignupData } from "../../../reducers/slices/authSlice"
import { sendOtp } from "../../../services/operations/authAPI"
import Tab from '../../common/Tab'
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai"
import countryCode from "../../../data/countrycode.json"

const SignupForm = () => {

    const navigate = useNavigate()
    const dispatch = useDispatch()

    // account type - default- student
    const [accountType, setAccountType] = useState(ACCOUNT_TYPE.STUDENT)

    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phoneNumber:"",
        password: "",
        confirmPassword: "",
    })

    // destructutring the form data
    const { firstName, lastName, email, password, confirmPassword,phoneNumber } = formData

    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)

    // this function handles the chnage in the form
    const changeHandler = (event) => {
        setFormData((prevData) => (
            {
                ...prevData,
                [event.target.name]: event.target.value
            }
        ))
    }

    // this function handles the form submission
    const submitHandler = (event) => {
        event.preventDefault()

        // check the passwords
        if (formData.password !== formData.confirmPassword) {
            toast.error("Passwords Do Not Match")
        }

        const signupData = {
            ...formData, accountType
        }
        //  setting the state
        // this function call after otp verification
        dispatch(setSignupData(signupData))
        // send otp to user for verification

        dispatch(sendOtp(formData.email, navigate))

        // after the user is signup we have to restart the formdata and accountType
        setFormData({
            firstName: "",
            lastName: "",
            email: "",
            phoneNumber:"",
            password: "",
            confirmPassword: "",
        })
        setAccountType(ACCOUNT_TYPE.STUDENT)
    }

    // Tab Component Data
    const tabData = [
        {
            id: 1,
            tabName: "Student",
            type: ACCOUNT_TYPE.STUDENT
        },
        {
            id: 2,
            tabName: "Instructor",
            type: ACCOUNT_TYPE.INSTRUCTOR
        }
    ]


    return (
        <div>
            {/* tab component */}
            <Tab tabData={tabData} field={accountType} setField={setAccountType} />

            {/* FORM */}
            <form onSubmit={submitHandler} className="flex w-full flex-col gap-y-4">
                {/* firstname lastname */}
                <div className='flex flex-row gap-x-4'>
                    {/* firstName */}
                    <label className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
                        <p>
                            First Name <sup className="text-pink-200">*</sup>
                        </p>
                        <input type="text" required name='firstName' value={firstName} onChange={changeHandler}
                            placeholder='first name'
                            className='w-full rounded-[0.5rem] bg-richblack-800 p-[12px] text-richblack-5'
                            style={{
                                boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                            }}
                        />
                    </label>

                    {/* last name */}
                    <label className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
                        <p>
                            Last Name <sup className="text-pink-200">*</sup>
                        </p>
                        <input type="text" required name='lastName' value={lastName} onChange={changeHandler}
                            placeholder=' last name'
                            className='w-full rounded-[0.5rem] bg-richblack-800 p-[12px] text-richblack-5'
                            style={{
                                boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                            }}
                        />
                    </label>
                </div>

                {/* email */}
                <label className='w-full'>
                    <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
                        Email Address <sup className="text-pink-200">*</sup>
                    </p>
                    <input type="text" required name='email' value={email} onChange={changeHandler} placeholder='email address'
                        className='w-full rounded-[0.5rem] bg-richblack-800 p-[12px] text-richblack-5'
                        style={{
                            boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                        }}
                    />
                </label>

                {/* -------write this later--------- */}
                {/* phone number */}
                <div >
                    {/* <label >
                        <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">Phone Number
                            <span className="text-pink-200">*</span>
                        </p>
                        <div className='flex gap-x-8'> */}
                            {/* country-code */}
                            {/* <select name="country-code" id="country-code" required={true}  className=' bg-richblack-800 text-richblack-50 p-3 w-24 rounded-[0.5rem] '>
                                {
                                    countryCode.map( (element,index)=>{
                                        return(
                                            <option key={index} value={element.code}>
                                                 {element.code} - {element.country}
                                            </option>
                                        )
                                    })
                                }

                            </select> */}

                            {/* nmber */}
                            {/* <input type="number" required onChange={changeHandler} name='phoneNumber' value={phoneNumber} placeholder='12345789'
                           className='w-full rounded-[0.5rem] bg-richblack-800 p-[12px] text-richblack-5'
                           style={{
                               boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                           }}  />
                        </div>

                    </label> */}


                </div>

                {/* password */}
                <div className='flex gap-x-4'>
                    {/* create password */}
                    <label className='relative'>
                        <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
                            Create Password <sup className="text-pink-200">*</sup>
                        </p>
                        <input type={showPassword ? "text" : "password"} required name='password' placeholder='password' value={password} onChange={changeHandler}
                            className='w-full rounded-[0.5rem] bg-richblack-800 p-[12px] pr-10 text-richblack-5'
                            style={{
                                boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                            }}
                        />
                        <span
                            onClick={() => setShowPassword((prev) => !prev)}
                            className="absolute right-3 top-[38px] z-[10] cursor-pointer"
                        >
                            {
                                showPassword ? (<AiOutlineEye fontSize={24} fill="#AFB2BF" />
                               ) : ( <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />)
                            }
                        </span>
                    </label>

                    {/* confirm password */}
                    <label className='relative' >
                        <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
                            Confirm Password <sup className="text-pink-200">*</sup>
                        </p>

                        <input type={showConfirmPassword ? "text" : "password"} required name='confirmPassword' value={confirmPassword} onChange={changeHandler} placeholder='confirm password'
                            className='w-full rounded-[0.5rem] bg-richblack-800 p-[12px] pr-10 text-richblack-5'
                            style={{
                                boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                            }}
                        />

                        <span onClick={() => setShowConfirmPassword((prev) => !prev)}
                            className='absolute right-3 top-[38px] z-[10] cursor-pointer'>
                            {
                                showConfirmPassword ? (  <AiOutlineEye fontSize={24} fill="#AFB2BF"/>
                                  
                                ) : (
                                    <AiOutlineEyeInvisible fontSize={24} className='text-richblack-200'/>
                                )
                            }

                        </span>

                    </label>

                </div>

                {/* create account button */}

                <button type="submit" className="mt-6 rounded-[8px] bg-yellow-50 py-[8px] px-[12px] font-medium text-richblack-900">
                    Create Account
                </button>


            </form>


        </div>
    )
}

export default SignupForm