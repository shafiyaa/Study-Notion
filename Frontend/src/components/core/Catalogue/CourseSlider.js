import React from 'react'
import { Swiper, SwiperSlide } from "swiper/react"
import "swiper/css"
import "swiper/css/free-mode"
import "swiper/css/pagination"
import { Autoplay, FreeMode, Navigation, Pagination } from 'swiper/modules'
import CatalogueCard from './CatalogueCard'
const CourseSlider = ({ Courses }) => {
    return (
        <>
            {
                Courses?.length ? (<div>
                    <Swiper slidesPerView={1}
                        loop={true}
                        spaceBetween={10}
                        pagination={true}
                        navigation={true}
                        modules={[Autoplay,Navigation,FreeMode ]}
                        className="mySwiper sm:w-full w-[230px] -ml-3 sm:ml:0"
                        autoplay={{
                        delay: 1000,
                        disableOnInteraction: false,
                        }}
                        breakpoints={
                            { 
                                1200:{slidesPerView:3, spaceBetween: 30,},
                                900: {
                                    slidesPerView: 2,
                                    spaceBetween: 40,
                                  },
                                  768:{
                                    slidesPerView: 1,
                                    spaceBetween: 40,
                                  }
                             }

                    }
                        

                    >

                        {
                            Courses?.map((course, index) => {
                                return (
                                    < SwiperSlide key={index}>
                                        <CatalogueCard course={course}></CatalogueCard>
                                    </SwiperSlide>
                                )
                            })
                        }
                    </Swiper>
                </div>
                ) : (
                    <div className='text-4xl text-yellow-50 grid place-items-center h-[350px]'>
                        <p>No Course is Available</p>
                    </div>)
            }
        </>
    )
}

export default CourseSlider