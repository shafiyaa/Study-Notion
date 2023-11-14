import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai"
import {login} from "../../../services/operations/authAPI"

const LoginForm = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch();
    const [formData, setFormData] = useState(
        {
            email: "",
            password: ""
        }
    )
    // destructuring the form data
    const { email, password } = formData
    
   

    const [showPassword, setShowPassword] = useState(false)

    // changeHandler
    const changeHandler = (event) => {
        setFormData((prev) => ({
            ...prev,
            [event.target.name]: event.target.value
        }))
    }

    // submit handler
    const submitHandler = (event) => {
        event.preventDefault()
        console.log("login form submit handler")
        dispatch(login(email, password, navigate));
        console.log("Login form submit ho gaya")
       
    }
   

    return (
        <form onSubmit={submitHandler}  className='mt-6 flex w-full flex-col gap-y-4'>
            <label className='w-full' >
                <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">Email Address <sup className="text-pink-200">*</sup> </p>

                <input type="text" required name='email' value={email} placeholder='Enter email address' onChange={changeHandler}
                    className='w-full rounded-[0.5rem] bg-richblack-800 p-[12px] text-richblack-5'
                    style={{
                        boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                    }} />


            </label>

            <label className='w-full relative' >
                <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">Password <sup className="text-pink-200">*</sup> </p>

                <input
                    required
                    type={showPassword ? "text" : "password"} name='password' value={password} placeholder='Enter Password' onChange={changeHandler}
                    className='w-full rounded-[0.5rem] bg-richblack-800 p-[12px] text-richblack-5'
                    style={{
                        boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                    }} />

                <span
                    onClick={() => setShowPassword((prev) => !prev)}
                    className='absolute right-3 top-[38px] z-[10] cursor-pointer'>

                    {
                        showPassword ? (
                            <AiOutlineEye fontSize={24} fill="#AFB2BF" />
                            
                        ) : (
                            <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />   
                        )
                    }
                </span>
                <Link to="/forgot-password">
                    <p className='mt-1 ml-auto max-w-max text-xs text-blue-100'>Forgot Password</p>
                </Link>

            </label>
            <button type="submit" 
        className="mt-6 rounded-[8px] bg-yellow-50 py-[8px] px-[12px] font-medium text-richblack-900">
                Login
            </button>
        </form>
    )
}

export default LoginForm