import React from 'react'
import HighlightText from '../HomePage/HighlightText'

const Quote = () => {
  return (
    <div className='text-richblack-50 text-3xl text-center w-9/12  mx-auto py-4'>
      <span className='text-3xl text-richblack-700 '>"</span>
        We are passionate about revolutionizing the way we learn. Our innovative platform
        <HighlightText text={"combine technology"}></HighlightText>
        <span className='text-brown-200'>
            {" "}
            expertise
            {" "}
        </span>
        , and community to create an
        <span className='gradient bg-gradient-to-t from-[#f05a2c] to-[#ffb24d] text-transparent bg-clip-text'>
            {" "}
            unparalled educational experience.
        </span>
        <span className='text-3xl text-richblack-700 '>"</span>
    </div>
  )
}

export default Quote