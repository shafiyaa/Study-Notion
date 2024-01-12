import React, { useEffect, useState } from 'react'
import { Swiper, SwiperSlide } from "swiper/react"
import "swiper/css"
import "swiper/css/free-mode"
import "swiper/css/pagination"
import { Autoplay, FreeMode, Navigation, Pagination } from 'swiper'
import ReactStars from "react-rating-stars-component";
import { apiConnector } from '../../../services/apiConnector'
import { ratingsEndpoints } from '../../../services/apiLink'
import { FaStar } from 'react-icons/fa'

const ReviewSection = () => {

  const [reviews, setReviews] = useState([])
  const truncateWords = 15

  const { REVIEWS_DETAILS_API } = ratingsEndpoints

  useEffect(() => {
    const fetchAllReviews = async () => {
      const { data } = await apiConnector("GET", REVIEWS_DETAILS_API)
      
      if (data?.success) {
        setReviews(data?.data)
      }
      
    }
    fetchAllReviews()

  }, [])
  return (
    <div className=' text-white '>
      <div className='my-[50px] max-w-maxContentTab lg:max-w-maxContent min-h-[150px'>
        <Swiper
          slidesPerView={4}
          spaceBetween={24}
          loop={true}
          freeMode={true}
          autoplay={{ delay: 2500 }}
          // modules={[FreeMode, Pagination, Autoplay]}
          className='w-9/12  '
        >

          {
            reviews.map((review, index) => (
              <SwiperSlide key={index} className='flex flex-col gap-3 bg-richblack-800 p-3 text-[14px] text-richblack-25 h-[300px]  min-h-[150px] '>

                <img src={review?.user?.image ? review?.user?.image : `https://api.dicebear.com/5.x/initials/svg?seed=${review?.user?.firstName} ${review?.user?.lastName}`}
                  alt="profile-pic"
                  className='h-9 w-9 object-cover rounded-full' />

                <p className="font-semibold text-richblack-5">{review?.user?.firstName} {review?.user?.lastName}</p>

                <p className="text-[12px] font-medium text-richblack-500">{review?.course?.courseName}</p>

                <p className="font-medium text-richblack-25">
                  {
                    review?.review.split(" ").length > truncateWords ? `${review?.review
                      .split(" ")
                      .slice(0, truncateWords)
                      .join(" ")} ...`
                      : `${review?.review}`
                  }
                </p>

                <div className='flex items-center gap-4'>
                  <p>{review?.rating.toFixed(1)}</p>
                  {/* toFiexed se decimal aata h */}
                  
                  <ReactStars
                   count={5}
                   value={review.rating}
                   size={20}
                   edit={false}
                   activeColor="#ffd700"
                   emptyIcon={<FaStar />}
                   fullIcon={<FaStar />}></ReactStars>


                
                  
                </div>


              </SwiperSlide>
            ))
          }


        </Swiper>
      </div>
    </div>
  )
}

export default ReviewSection