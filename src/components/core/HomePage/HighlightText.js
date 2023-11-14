import React from 'react'

const HighlightText = ({text}) => {
  return (
   <span className='font-bold gradient bg-gradient-to-t from-[#affaff] to-[#04d1d8] text-transparent bg-clip-text '>
    {" "}
    {text}
    {" "}
   </span>
  )
}

export default HighlightText