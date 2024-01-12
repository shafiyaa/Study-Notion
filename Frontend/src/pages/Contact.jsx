import React from 'react'
import { BsFillChatLeftFill } from "react-icons/bs"
import { RiEarthFill } from "react-icons/ri"
import { IoIosCall } from "react-icons/io"
import ContactForm from "../components/common/ContactForm"
import Footer from "../components/common/Footer"
import ReviewSection from '../components/core/HomePage/ReviewSection'

const Contact = () => {



    return (
        <div className='text-richblack-25'>

            {/* section 1 */}
            <div className=' flex flex-col-reverse md:flex-row gap-40 w-11/12 max-w-maxContent mx-auto mt-20 p-6 '>

                {/* left */}
                <div className='bg-richblack-800 h-max rounded-xl sm:w-6/12 w-9/12 mx-auto'>

                    <div className='flex gap-3 p-4 text-richblack-100'>
                        <div className='mt-1 '><BsFillChatLeftFill /></div>
                        <div>
                            <p className='text-richblack-5 font-semibold text-[18px]'>Chat on us</p>
                            <p>Our friendly team is here to help</p>
                            <p>@mailaddress</p>
                        </div>
                    </div>

                    <div className='flex gap-3 p-4 text-richblack-100'>
                        <div className='mt-1 '> <RiEarthFill /></div>
                        <div>
                            <p className='text-richblack-5 font-semibold text-[18px]'>Visit us</p>
                            <p>Come and say hello at our office HQ</p>
                            <p>Here is the location/address</p>
                        </div>
                    </div>
                    <div>

                        <div className='flex gap-3 p-4 text-richblack-100'>
                            <div className='mt-1 '><IoIosCall /></div>
                            <div>
                                <p className='text-richblack-5 font-semibold text-[18px]'>Call us</p>
                                <p>Mon-Fri from 8am to 5pm</p>
                                <p>+123 456 7890</p>
                            </div>
                        </div>
                    </div>
                </div>


                {/* right */}
                <div className='lg:border lg:border-richblack-700 rounded-xl lg:py-10 lg:px-8 py-5 px-6
                 
                '>
                    <ContactForm heading={"Got a Idea? We've got the skills. Lets team up"} subheading={"Tell us more about yourself and what your're got in mind"} className="mx-auto "></ContactForm>
                </div>


            </div>


            {/* section 2 */}
            <section className='my-10  py-8'>
            <p className='text-4xl text-richblack-100 font-semibold  text-center'>Review from other learners</p>
           
           <ReviewSection></ReviewSection>
            </section>
          

            {/*  footer*/}
            <Footer />

        </div>
    )
}

export default Contact