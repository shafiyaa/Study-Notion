import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import CountryCode from "../../data/countrycode.json"

import { apiConnector } from '../../services/apiConnector'
import { contactusEndpoint } from "../../services/apiLink"

const { CONTACT_US_API } = contactusEndpoint

const ContactForm = ({ heading, subheading }) => {
    const [loading, setLoading] = useState(false)
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitSuccess }
    } = useForm()

    useEffect(() => {
        if (isSubmitSuccess) {
            reset({
                firstname: "",
                lastname: "",
                email: "",
                phoneNo: "",
                message: ""
            })
        }
    }, [isSubmitSuccess, reset])

    const submitForm = async (data) => {
        setLoading(true)

        try {
            await apiConnector("POST", CONTACT_US_API, data)
        } catch (error) {
            console.log(error.message)
        }
        setLoading(false)
    }



    return (
        <div className='mx-auto  p-3'>
            <h1 className='text-4xl text-white'>{heading}</h1>
            <p className='sm:my-4 my-1 text-richblack-300'>{subheading}</p>

            {
                loading ? (<div className='custom-loader'></div>) : (

                    <form onSubmit={handleSubmit(submitForm)}>
                        <div className='flex flex-col gap-4 sm:mt-16 mt-8'>

                            {/* names */}
                            <div className=' gap-6  flex flex-col sm:flex-row  gap-y-2'>

                                {/* first name */}
                                <div className='flex flex-col gap-2'>
                                    <label htmlFor="firstname" className=''>First Name</label>
                                    <input type="text" name='firstname' id='firstname' placeholder='Enter first name'
                                        {...register("firstname", { required: true })}
                                        className='w-full rounded-[0.5rem] bg-richblack-800 p-[12px] text-richblack-5'
                                        style={{
                                            boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                                        }} />
                                </div>

                                {/* lastname */}
                                <div className='flex flex-col gap-2'>
                                    <label htmlFor="lastname">Last Name</label>
                                    <input type="text" name='lastname' id='lastname' placeholder='Enter last name'
                                        {...register("lastname")}
                                        style={{
                                            boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                                        }}
                                        className='w-full rounded-[0.5rem] bg-richblack-800 p-[12px] text-richblack-5' />

                                </div>

                            </div>

                            {/* emial */}
                            <div className='gap-2 flex flex-col'>
                                <label htmlFor="email">Email Address</label>
                                <input type="email" name='email' id='email' placeholder='Enter Email Address' {...register("email", { required: true })}
                                    style={{
                                        boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                                    }}
                                    className='w-full rounded-[0.5rem] bg-richblack-800 p-[12px] text-richblack-5' />
                                {
                                    errors.email && (
                                        <span>Please enter your email address</span>
                                    )
                                }
                            </div>

                            {/*Phone number */}
                            <div className='flex flex-col  gap-2'>
                                <label htmlFor="phoneNumber">Phone Number</label>

                                <div className='flex flex-col sm:flex-row sm:gap-x-6 gap-y-2'>
                                    {/* dropdown */}
                                    <select name="dropdown" id="dropdown" {...register("countrycode", { required: true })}
                                        style={{
                                            boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                                        }} className=' bg-richblack-800 text-richblack-50 p-3 w-24 rounded-[0.5rem]  '>

                                        {
                                            CountryCode.map((element, index) => {
                                                return (
                                                    <option value={element.code} key={index} >
                                                        {element.code} -    {element.country}
                                                    </option>
                                                )
                                            })
                                        }
                                    </select>

                                    {/*number  */}
                                    <input type="number" name='phoneNumber' id='phoneNumber'
                                        style={{
                                            boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                                        }}
                                        
                                        placeholder='9876543210' className=' bg-richblack-800 text-richblack-50 p-2 rounded-[0.5rem]  ' {...register("phoneNumber", {
                                            required: true,
                                            maxLength: { value: 10, message: "Invalid Phone Number" },
                                            minLength: { value: 8, message: "Invalid Phone Number" }
                                        })} />

                                    {
                                        errors.phoneNumber && (
                                            <span>{errors.phoneNumber.message}</span>
                                        )
                                    }
                                </div>

                            </div>

                            {/* message */}
                            <div className='flex flex-col gap-2'>
                                <label htmlFor="message">Message</label>
                                <textarea name="message" id="message" cols="30" rows="6" placeholder='Enter your Message' className='w-full rounded-[0.5rem] bg-richblack-800 p-[12px] text-richblack-5'
                                    style={{
                                        boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                                    }}
                                    {...register("message", { required: true })}></textarea>
                            </div>

                            {/* submit button */}


                            <button type="submit" className='rounded-md bg-yellow-50 mt-6 text-center px-6 py-2 text-[16px] font-bold text-black'>
                                send message
                            </button>


                        </div>
                    </form>
                )
            }



        </div>

    )
}

export default ContactForm

