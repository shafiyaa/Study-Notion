import React from 'react'
import HighlightText from './HighlightText'
import firstImage from "../../../assets/Images/Know_your_progress.png"
import secImage from "../../../assets/Images/Compare_with_others.png"
import thirdImage from "../../../assets/Images/Plan_your_lessons.png"
import CTAbutton from './CTAbutton'

const Language = () => {
  return (
    <div className='flex flex-col items-center flex-wrap w-11/12 gap-6 text-richblack-900 mt-[150px]  '>

      <div className='text-4xl font-semibold text-center '>
        Your Swiss knife for <HighlightText text={" learning any language"}></HighlightText>
      </div>
      <p className='text-richblack-700 w-[56%] text-center text-base'>Using spin making learning multiple languages easy, with 20+  languages realistic voice-over, progress tracking custom schedule and more</p>

      <div className='flex lg:flex-row flex-col items-center mx-auto  mt-8 sm: '>

        {/* <img src={firstImage} alt="image" className='absolute z-1 right-[70%] bottom-[12%] top-[50%]' />
        <img src={secImage} alt="image" className=' z-2 relative' />
        <img src={thirdImage} alt="image" className='absolute z-3 left-[71%] bottom-[8%]' /> */}

        <img src={firstImage} alt="content" className='object-contain sm:-mr-32 ' />
        <img src={secImage} alt="content" className='object-contain ' />
        <img src={thirdImage} alt="content" className='object-contain sm:-ml-36  ' />

      </div>

      <div className='mb-16'>
        <CTAbutton active={true} linkto={"/signup"}>Learn More</CTAbutton>
      </div>



    </div>
  )
}

export default Language