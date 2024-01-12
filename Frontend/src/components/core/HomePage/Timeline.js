import React from 'react'
import Logo1 from "../../../assets/TimeLineLogo/Logo1.svg"
import Logo2 from "../../../assets/TimeLineLogo/Logo2.svg"
import Logo3 from "../../../assets/TimeLineLogo/Logo3.svg"
import Logo4 from "../../../assets/TimeLineLogo/Logo4.svg"

import timelineImage from "../../../assets/Images/TimelineImage.png"

const timeline = [
    {
        Logo: Logo1,
        heading: "Leadership",
        description: "Fully commetted to  success of the company"
    },
    {
        Logo: Logo2,
        heading: "Responsibility",
        description: "Students will always be our Priority"
    },
    {
        Logo: Logo3,
        heading: "Flexibility",
        description: "The ability to switch is an important skill"
    },
    {
        Logo: Logo4,
        heading: "Solve the Problem",
        description: "Code your way to a solution"
    }
]

const Timeline = () => {
    return (
        <div className='bg-pure-greys-25'>
            <div className='  flex lg:flex-row flex-col items-center gap-8 lg:gap-14'>

                {/* left */}
                <div className='flex flex-col justify-center items-center gap-5 w-[45%] py-10 px-4'>

                    {
                        timeline.map((element, index) => {
                            return (
                                <div className='flex flex-row gap-8 mb-6  sm:w-full w-[50vw] ' key={index}>

                                    <div className='md:w-12 md:h-12 w-8 h-8 rounded-full bg-white flex  items-center justify-center '>
                                        {/* hw- add the dotted lines */}
                                        <img src={element.Logo} alt="" className="sm:w-[25px] sm:h-[25px] w-[18px] h-[18px] " />
                                    </div>
                                    <div className='flex flex-col'>
                                        <p className='text-richblack-800 font-semibold text-[18px] '>{element.heading}</p>
                                        <p className='text-richblack-500 text-base'>{element.description}</p>

                                    </div>


                                </div>
                            )
                        })
                    }

                </div>

                {/* right */}
                <div className='relative  '>

                    <div className='h-80 w-[700px] rounded-full sm:bg-blue-300  filter blur-3xl  absolute bottom-[90px] z-[2]'></div>

                    <img src={timelineImage} alt="content" className='z-[4] relative' />

                    <div className='flex flex-col  sm:flex-row sm:items-center sm:justify-between bg-caribbeangreen-700 sm:p-6 p-2  sm:gap-4 absolute z-[6] -bottom-[9%]  left-[12%]'>

                        <div className='flex flex-row  items-center gap-6 w-[45%] '>
                            <p className='text-white text-4xl font-bold'>10</p>
                            <p className='text-caribbeangreen-200 text-sm  w-[35%] uppercase'>Years of Experiences</p>
                        </div>

                        <div className=' h-16 border-r border-caribbeangreen-50 invisible sm:visible ' ></div>
                        <div className=' w-48 border-t border-caribbeangreen-50 absolute top-[50%] sm:invisible visible ' ></div>

                        <div className='flex flex-row items-center gap-6 w-[40%] '>
                            <p className='text-white text-4xl font-bold'>250</p>
                            <p className='text-caribbeangreen-200 text-sm uppercase w-[35%]'>Types of Courses</p>
                        </div>


                    </div>
                </div>

            </div>
        </div>
    )
}

export default Timeline