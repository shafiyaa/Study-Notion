import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";
import { Autoplay, FreeMode, Navigation, Pagination } from "swiper/modules";
import ReactStars from "react-rating-stars-component";
import { apiConnector } from "../../../services/apiConnector";
import { ratingsEndpoints } from "../../../services/apiLink";
import { FaStar } from "react-icons/fa";

const ReviewSection = () => {
  const [reviews, setReviews] = useState([]);
  const truncateWords = 12;

  const { REVIEWS_DETAILS_API } = ratingsEndpoints;

  useEffect(() => {
    const fetchAllReviews = async () => {
      const { data } = await apiConnector("GET", REVIEWS_DETAILS_API);

      if (data?.success) {
        setReviews(data?.data);
      }
    };
    fetchAllReviews();
  }, []);
  return (
    <div className=" text-white  ">

      <div className="my-[50px] max-w-maxContentTab lg:max-w-maxContent  min-h-[160px]">
        <Swiper
          slidesPerView={1}
          spaceBetween={25}
          loop={true}
          freeMode={true}
          autoplay={{ delay: 1500 }}
          modules={[FreeMode, Pagination, Autoplay]}
          breakpoints={{
            1024: {
              slidesPerView: 4,
              
            },
            768: {
              slidesPerView: 3,
            },
            640: {
              slidesPerView: 2,
            },
          }}
          className=" min-w-full mx-auto"
        >
          {reviews.map((review, index) => (
            <SwiperSlide
              key={index}
              className="flex flex-col justify-between bg-richblack-800 py-3 px-6  text-richblack-25 h-[300px]  min-h-[150px] md:min-w-[200px] lg:min-w-[170px]  rounded-xl"
            >
              <img
                src={
                  review?.user?.image
                    ? review?.user?.image
                    : `https://api.dicebear.com/5.x/initials/svg?seed=${review?.user?.firstName} ${review?.user?.lastName}`
                }
                alt="profile-pic"
                className="h-9 w-9 object-cover rounded-full"
              />

              <p className="font-semibold text-richblack-5 md:text-lg text-[16px]">
                {review?.user?.firstName} {review?.user?.lastName}
              </p>

              <p className="text-[12px] font-medium text-richblack-500  ">
                {review?.course?.courseName}
              </p>

              <p className="font-medium text-richblack-25 ">
                {review?.review.split(" ").length > truncateWords
                  ? `${review?.review
                      .split(" ")
                      .slice(0, truncateWords)
                      .join(" ")} ...`
                  : `${review?.review}`}
              </p>

              <div className="flex items-center gap-4">
                <p>{review?.rating.toFixed(1)}</p>
                {/* toFiexed se decimal aata h */}

                <ReactStars
                  count={5}
                  value={review.rating}
                  size={20}
                  edit={false}
                  activeColor="#ffd700"
                  emptyIcon={<FaStar />}
                  fullIcon={<FaStar />}
                ></ReactStars>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default ReviewSection;
