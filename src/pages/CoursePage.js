import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { fetchCourseDetails } from '../services/operations/courseAPI'
import avgRating from "../utilis/avgRating"
import RatingStars from '../components/common/RatingStar'
import { FiArrowDown } from "react-icons/fi"
import { PiShareFatDuotone } from "react-icons/pi"
import { toast } from "react-hot-toast"
import { buyCourse } from '../services/operations/payment'
import Error from "./Error"
import ConfirmationalModal from "../components/common/ConfirmationModal"
import { formatDate } from '../utilis/dateFormatter'
import { PiGlobe } from "react-icons/pi"
import { BsArrowRightShort } from "react-icons/bs"
import copy from 'copy-to-clipboard';
import { ACCOUNT_TYPE } from '../utilis/constants'
import { addToCart } from '../reducers/slices/cartSlice'
import { AiOutlineArrowDown } from "react-icons/ai"
import { Link } from 'react-router-dom'
import Accordian from '../components/core/Course/Accordian'
// import { apiConnector } from '../services/apiConnector'
// import { courseEndpoints } from '../services/apiLink'

const CoursePage = () => {
    const [loading, setLoading] = useState(false)
    const { courseId } = useParams()
    const { token } = useSelector((state) => state.auth)
    const { user } = useSelector((state) => state.profile)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [avgReviewCount, setAvgReviewCount] = useState(0)
    const [coursePageData, setCoursePageData] = useState(null)
    const [modal, setModal] = useState(null)
    const [isActive, setIsActive] = useState(Array(0))


    // fetch the course details
    useEffect(() => {
        const getCourseDetails = async () => {
            setLoading(true)
            try {
                const result = await fetchCourseDetails(courseId)
                // console.log("printing the course response", result?.data)
                console.log("result is ", result)
                setCoursePageData(result)
                console.log("Instructions : ",  result?.data?.courseDetails?.instructions)

            } catch (error) {
                console.log("error in get Course Details in Course Page")
                console.log(error)
            }
            setLoading(false)
        }
        getCourseDetails()

   }, [courseId])



    // compare this code 
    // calculate the rating
    useEffect(() => {
        const count = avgRating(coursePageData?.data?.courseDetails?.ratingandReviews)
        setAvgReviewCount(count)
    }, [courseId])

    const handleBuyCourse = async () => {
        if (token) {
            buyCourse(token, [courseId], user, navigate, dispatch)
            return
        }
        else {

            setModal({
                text1: "you are not Logged in",
                text2: "Please login to purchase the course",
                btn1Text: "Login",
                btn2Text: "Cancel",
                btn1Handler: () => navigate("/login"),
                btn2Handler: () => setModal(null),
            })
        }
    }

    const handleAddToCart = async () => {
        if (user && user?.accountType === ACCOUNT_TYPE.INSTRUCTOR) {
            toast.error("You are an Instructor, you can't buy a course")
        }
        else if (user && user?.accountType === ACCOUNT_TYPE.STUDENT) {
            console.log("CourseDetal ke data ke andr : ", coursePageData?.data?.courseDetails)
            dispatch(addToCart(coursePageData?.data?.courseDetails))
        } else {
            setModal({
                text1: "you are not Logged in",
                text2: "Please login to add the course to the cart",
                btn1Text: "Login",
                btn2Text: "Cancel",
                btn1Handler: () => navigate("/login"),
                btn2Handler: () => setModal(null),
            })
        }

    }

    const handleShare = async () => {
        // copy the current url

        copy(window.location.href)
        toast.success("Link copied to clipboard")
    }

    const handleActive = async (id) => {
        setIsActive(
            isActive.includes(id) ?
                isActive.filter((e) => e !== id) :
                isActive.concat(id)
        )
    }

    // const trialCourse = async (token) => {
    //     if (!token) {
    //         toast.error("If you want to try this course, you have to login first!")
    //     } else {
    //         navigate(`/course-trial-page/${coursePageData?.data?._id}`)
    //     }
    // }






    if (loading) {

        return (
            <div className='grid place-items-center h-[500px] '>
                <div className='custom-loader'></div>
            </div>
        )
    }




    return (
        <div className=' flex flex-col gap-10 items-start lg:relative'>
            {/* top div */}
            <div className='text-white w-full bg-richblack-800 py-20 px-20 flex flex-col gap-y-2  '>
                <p className='text-3xl'>{coursePageData?.data?.courseDetails?.courseName}</p>
                <p className=' text-richblack-200 my-2 sm:w-5/12 w-10/12'>{coursePageData?.data?.courseDetails?.courseDescription}</p>


                {/* rating */}
                <div className='flex flex-col sm:flex-row sm:gap-x-3 gap-1'>
                    <span className='text-yellow-25'>
                        { avgReviewCount || 0}
                    </span>

                    <RatingStars
                        Review_Count={avgReviewCount}
                        Star_Size={22}

                    ></RatingStars>

                    <span className='text-richblack-400'>{coursePageData?.data?.courseDetails?.ratingAndReviews?.length} Reviews</span>

                    <p>{coursePageData?.data?.studentsEnrolled?.length || 0} {" "}students enrolled</p>



                </div>

                <p>Created By {coursePageData?.data?.courseDetails?.instructor?.firstName} {" "} {coursePageData?.data?.courseDetails?.instructor?.lastName}
                </p>

                <div className='flex flex-col sm:flex-row sm:gap-4 gap-1'>
                    <p>
                        Created At {formatDate(coursePageData?.data?.courseDetails?.createdAt)}
                    </p>

                    <p className='flex items-center gap-1'><PiGlobe /> <span>English</span> </p>
                </div>

                {/* <div>

                    <button onClick={() => trialCourse(token)}
                        className='border border-blue-100 py-3 px-5'>Try this Course for Free</button>


                </div> */}


                {/* buynow div */}

                <div className='mt-10 text-white flex flex-col gap-y-2 p-4 rounded-lg bg-richblack-700 lg:absolute lg:top-4 lg:right-[15%] sm:w-[380px] w-[270px] -ml-9 sm:ml-0  '>
                    <img src={coursePageData?.data?.courseDetails?.thumbnail} alt="thumbnail" className='rounded-lg  min-h-[200px] max-h-[300px] max-w-[400px]' />
                    <p className='text-xl'>Rs.{coursePageData?.data?.courseDetails?.price}</p>

                    {/* buttons */}
                    <div className='flex flex-col gap-2'>

                        <button
                            className='text-richblack-900 py-2 px-6 bg-yellow-100 w-full rounded-md'
                            onClick={
                                user && coursePageData?.data?.courseDetails?.studentsEnrolled.includes(user?._id) ? () => navigate("/dashboard/enrolled-courses") : handleBuyCourse}
                        >
                            {
                                user && coursePageData?.data?.courseDetails?.studentsEnrolled.includes(user?._id) ? "Go to Course" : "Buy Now"
                            }
                        </button>


                        {
                            !coursePageData?.data?.courseDetails?.studentsEnrolled.includes(user?._id) && (
                                <button
                                    onClick={handleAddToCart}
                                    className='py-2 px-6 w-full bg-richblack-900 rounded-md'>Add to Cart
                                </button>
                            )
                        }



                    </div>

                    <p className='text-[16px] text-richblack-300'>30 Day Money back Gurantee</p>

                    <div>
                        <p className='text-[20px]'>This Course Includes</p>

                        <div className='flex flex-col gap-y-2 mb-2'>

                            {
                                coursePageData?.data?.courseDetails?.instructions?.map((item, index) => (
                                    <p key={index}
                                        className='flex items-center gap-[6px]  text-caribbeangreen-300'>
                                        <BsArrowRightShort className='text-[20px]' />
                                        <span>
                                            {
                                                item
                                            }
                                        </span>
                                    </p>
                                ))

                            }
                        </div>
                    </div>

                    <button
                        onClick={handleShare}
                        className='flex items-center gap-1 justify-center text-yellow-100 '> <PiShareFatDuotone /> <span>Share</span></button>
                </div>
            </div>










            {/* what will you learn section */}

            <div className='xl:w-7/12   md:w-6/12  w-9/12 xl:ml-24 lg:ml-12 px-4 mx-auto  '>
                {/* what will you learn div */}
                <div className='mt-8 p-5 border border-richblack-500 px-10 text-white w-10/12  '>
                    <p className='sm:text-2xl text-xl font-semibold'>What You'll Learn</p>
                    <p>{coursePageData?.data?.courseDetails?.whatYouWillLearn}</p>

                </div>


                {/* course Content */}
                <div className='text-white mt-10 w-10/12'>
                    <p className='sm:text-2xl text-xl'>Course Content</p>

                    <div className='flex sm:flex-row flex-col gap-y-1 justify-between flex-wrap '>
                        <div className='flex md:flex-row flex-col md:gap-3 gap-1'>
                            <p>{coursePageData?.data?.courseDetails?.courseContent?.length} section(s)</p>

                            <p>{coursePageData?.data?.totalLectures} lecture(s)</p>

                            <p>{coursePageData?.data?.totalDuration} total length</p>
                        </div>


                        <button className='flex items-center mt-3 sm:mt-0 gap-[6px]  w-fit px-2 py-1  text-yellow-100'>
                            <AiOutlineArrowDown />
                            <span
                                onClick={() => setIsActive([])}
                            >Collapse Sections</span>
                        </button>


                    </div>



                    {/* Accordion */}
                    <div className='py-4 '>
                        {
                            coursePageData?.data?.courseDetails?.courseContent?.map((section, index) => (
                                <Accordian
                                    section={section}
                                    key={index}
                                    isActive={isActive}
                                    handleActive={handleActive}

                                ></Accordian>
                            ))
                        }


                    </div>


                </div>

            </div>













            {/* Instructor Details */}
            <div className="md:w-7/12 md:ml-24 w-10/12 mx-auto text-white border-t ">
                <p className="text-[28px] font-semibold ">Author</p>
                <div className="flex items-center gap-4 py-4 ">
                    <img
                        src={
                            coursePageData?.data?.courseDetails?.instructor?.image
                                ? coursePageData?.data?.courseDetails?.instructor.image
                                : `https://api.dicebear.com/5.x/initials/svg?seed=${coursePageData?.data?.courseDetails?.instructor.firstName} ${coursePageData?.data?.courseDetails?.instructor.lastName}`
                        }
                        alt="Author"
                        className="h-14 w-14 rounded-full object-cover"
                    />
                    <p className="text-lg">{`${coursePageData?.data?.courseDetails?.instructor.firstName} ${coursePageData?.data?.courseDetails?.instructor.lastName}`}</p>
                </div>
                <p className="text-richblack-50">
                    {coursePageData?.data?.courseDetails?.instructor?.additionalDetails?.about}
                </p>
            </div>




            {
                modal && <ConfirmationalModal modalData={modal} />
            }
        </div>
    )
}

export default CoursePage