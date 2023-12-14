import React from 'react'
import { useSelector } from 'react-redux'
import frameImage from "../../../assets/Images/frame.png"
import SignupForm from "./SignupForm"
import LoginForm from "./LoginForm"

const Template = ({ title, description1, description2, image, formType }) => {

    const { loading } = useSelector((state) => state.auth)
    

    return (
        <div className='grid min-h-[calc(100vh-10rem)] place-items-start md:mt-30 mt-10 px-10 lg:px-2 '>
            {
                loading ? (
                    <div className='custom-loader' />
                ) : (
                    <div className='mx-auto  11/12 max-w-maxContent flex flex-col-reverse justify-between gap-y-12 py-12 md:flex-row md:gap-y-0 md:gap-x-12 '>

                        {/* left side */}
                        <div className="mx-auto w-11/12 max-w-[450px] md:mx-0">

                            <h1 className="text-[1.875rem] font-semibold leading-[2.375rem] text-richblack-5">{title}</h1>
                            <p className="mt-4 text-[1.125rem] leading-[1.625rem]">
                                <span className="text-richblack-100">{description1}</span>
                                <span className="font-edu-sa font-bold italic text-blue-100">{description2}</span>
                            </p>
                            {/* here we write form type code */}
                            {
                                formType === "signup" ? <SignupForm /> : <LoginForm />

                            }

                           
                        </div>

                         {/* rigth side */}
                         <div className="relative mx-auto w-11/12 max-w-[450px] md:mx-0">
                                <img src={frameImage}
                                    alt="Pattern"
                                    width={558}
                                    height={504}
                                    loading="lazy" />
                                    
                                <img src={image}
                                    alt="Students"
                                    width={558}
                                    height={504}
                                    loading="lazy"
                                    className="absolute -top-4 right-4 z-10" />
                            </div>
                    </div>
                )
            }


        </div>
    )
}

export default Template