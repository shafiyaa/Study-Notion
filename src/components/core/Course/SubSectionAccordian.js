import React from 'react'
import { HiOutlineVideoCamera } from "react-icons/hi"

const SubSectionAccordian = ({subSection}) => {
  return (
    <div>
        <div className='flex items-center gap-2 border-b border-richblack-800'>
            <i><HiOutlineVideoCamera/></i>
            <p>{subSection?.title}</p>
        </div>
    </div>
  )
}

export default SubSectionAccordian