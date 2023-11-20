import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setLoading } from '../../reducers/slices/authSlice'
import { resetPassword } from '../../services/operations/authAPI'
import { useLocation } from 'react-router-dom'
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai"
import { Link } from 'react-router-dom'
import { BsArrowLeft } from "react-icons/bs"
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'

function UpdatePassword(){
    const { loading } = useSelector((state) => state.auth)
    const dispatch = useDispatch()
    const location = useLocation()
    const navigate = useNavigate();

    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)

    const [formData, setFormData] = useState({
        password: "",
        confirmPassword: "",
    })
    const { password, confirmPassword } = formData

    function changeHandler(event) {
        setFormData((prev) => (
            {
                ...prev,
                [event.target.name]: event.target.value,
            }
        ))
    }

    function submitHandler(event) {
        event.preventDefault()

        if (formData.password !== formData.confirmPassword) {
            toast.error("New Password and Confirm New Password doesn't match")
        } else {
            dispatch(setLoading(true))
            const token = location.pathname.split("/").at(-1)
            dispatch(resetPassword(password, confirmPassword, token,navigate))
        }

    }
    return (
        <div>
            {
                loading ? (
                    <div className='custom-loader w-full h-full flex items-center justify-center'></div>
                ) : (
                    <div className='mx-auto sm:w-[50%] w-[80%] flex flex-col gap-4 text-richblack-100 mt-20' >
                        <h1 className='text-3xl text-white'>Choose new Password</h1>
                        <p>Almost Done. Enter your new password and You're all set.</p>

                        <form className='border border-blue-100  relative' >
                            <label className=" " >
                                <p className='mt-3 mb-1 text-richblack-25'>New Password <sup className="text-pink-200">*</sup> </p>

                                <input type={showPassword ? "text" : "password"} required name='password' value={password} placeholder='New Password' onChange={changeHandler}
                                    className='w-full  rounded-[0.5rem] bg-richblack-800 p-[12px] text-richblack-5'
                                    style={{
                                        boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                                    }} />
                                <span
                                    onClick={() => setShowPassword((prev) => !prev)}
                                    className=" absolute   right-5 top-[50px]  z-[10] cursor-pointer p-1 "
                                >
                                    {
                                        showPassword ? (<AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />) :
                                            (<AiOutlineEye fontSize={24} fill="#AFB2BF" />)
                                    }
                                </span>
                            </label>

                            <label className="" >
                                <p className='mt-3 mb-1 text-richblack-25'>Confirm New Password <sup className="text-pink-200">*</sup> </p>
                                <input type={showConfirmPassword ? "text" : "password"} required  placeholder='Confirm password' name='confirmPassword' value={confirmPassword} onChange={changeHandler}
                                    className='w-full rounded-[0.5rem] bg-richblack-800 p-[12px] text-richblack-5'
                                    style={{
                                        boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                                    }}
                                />
                                <span onClick={() => setShowConfirmPassword((prev) => !prev)}
                                    className='absolute right-5 top-[136px] z-[10] cursor-pointer p-1'>
                                    {
                                        showConfirmPassword ? (
                                            <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
                                        ) : (
                                            <AiOutlineEye fontSize={24} fill="#AFB2BF" />
                                        )
                                    }

                                </span>


                            </label>

                            <button onClick={submitHandler} className="mt-6 rounded-[8px] bg-yellow-50 py-[8px] px-[12px] font-medium text-richblack-900">
                                Reset Password
                            </button>
                        </form>

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

export default UpdatePassword