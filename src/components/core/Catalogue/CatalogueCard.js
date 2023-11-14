import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import RatingStars from "../../common/RatingStar"
import avgRating from "../../../utilis/avgRating"

const CatalogueCard = ({ course }) => {

    const [avgReviewCount, setAvgReviewCount] = useState(0)

    useEffect(() => {
        const count = avgRating(course.ratingandReviews)
        setAvgReviewCount(count)
    }, [course])

    return (

      
        <>
            <Link to={`/courses/${course._id}`}>
                <div className='flex flex-col gap-y-1  w-full   '>
                    <img src={course?.thumbnail} alt="course-thumbnail" className='sm:w-full w-[370px]   rounded-md object-fit
                     lg:h-[300px] md:h-[250px] h-[260px]'  />
                    <p className='text-xl'> {course?.courseName} </p>
                    <p className='text-richblack-200'> {course?.instructor?.firstName} {course?.instructor?.lastName} </p>
                    {/* reviews and rating */}
                    <div className='flex lg:flex-row flex-col lg:gap-3 gap-1 '>
                        <span className='text-yellow-25'> {avgReviewCount || 0} </span>
                        <RatingStars 
                        Review_Count={avgReviewCount}
                        ></RatingStars>

                        <span className='text-richblack-400'>{course?.ratingandReviews?.length || 0} Ratings</span>
                    </div>

                    <p> Rs. {course?.price} </p>


                </div>

            </Link>
        </>
    )
}

export default CatalogueCard