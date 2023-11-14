import React, { useEffect, useState, useRef } from 'react'
import { AiOutlineDown } from "react-icons/ai"
import SubSectionAccordian from './SubSectionAccordian'

const Accordian = ({section , isActive, handleActive}) => {

    const contentElement = useRef(null)

    // state
    const [active, setActive] = useState(false)
    const [sectionHeight, setSectionHeight] = useState(0)

    useEffect( ()=> {
        setActive(isActive?.includes(section._id))
    },[isActive])

    useEffect( ()=>{
        setSectionHeight(active ? contentElement.current.scrollHeight : 0)
    }, [active])
  return (
    <div>

      <div className='flex justify-between cursor-pointer bg-opacity-20 px-7 py-2 bg-richblack-500 transition-[0.3s] border border-richblack-700 border-b-0 '
      onClick={()=> {handleActive(section._id)}}>

        <div className='flex items-center gap-2  '>
          <i className={ isActive.includes(section._id)? "rotate-180":"rotate-0"}>
          <AiOutlineDown />
          </i>
          <p>{section?.sectionName}</p>
        </div>

        <div className='hidden sm:inline'>
          <span className='text-yellow-25'>
            {`${section?.subSection.length || 0}  lecture(s)`}
           
          </span>
        </div>

      </div>



      <div ref={contentElement}
      className='relative h-0 overflow-hidden bg-richblack-900 transition-[height] duration-[0.35s] ease-[ease] '
      style={{
        height: sectionHeight,
      }}>

        <div className='flex flex-col gap-2 px-7 py-2 font-semibold'>
          {section?.subSection?.map( (subSection, index)=>(
            <SubSectionAccordian subSection={subSection} key={index}></SubSectionAccordian>
          ))}
        </div>

      </div>
    </div>
  )
}

export default Accordian