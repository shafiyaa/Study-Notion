import React from 'react'
import { Link } from 'react-router-dom'

const CTAbutton = ({ children, active, linkto }) => {
    return (
        <Link to={linkto}>

        <div className={`text-center sm-text-[18px] sm:px-6 sm:py-3 px-4 py-1 rounded-md font-semibold 
        ${active ? "bg-yellow-50 text-black ":" bg-richblack-800 border-b-2 border-r-2 border-richblack-500"}
        hover:scale-95 transition-all duration-200
        `}>
            {children}
        </div>

    </Link>
    )
}

export default CTAbutton