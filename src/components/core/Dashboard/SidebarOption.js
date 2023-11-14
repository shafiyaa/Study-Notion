import React from 'react'
import * as Icons from "react-icons/vsc"
import { NavLink } from 'react-router-dom'
import { matchPath, useLocation } from 'react-router-dom'
// import { useDispatch} from 'react-redux'

const SidebarOption = ({ link, iconName }) => {
    const Icon = Icons[iconName]
    const location = useLocation()
    // const dispatch = useDispatch()

    const MatchRoute = (route) => {
        return matchPath({ path: route }, location.pathname)
    }
    return (
        <div className='w-full text-richblack-100 '>
            <div >
                <NavLink to={link.path} className='bg-yellow-800 '>

                    <div className={`px-4 py-2 relative
           ${MatchRoute(link.path) ? "light-bg  text-yellow-100" : "bg-none"}
            `}>

                {/* left side choti line sahi krna hai */}
                        <span
                            className={` absolute left-0 top-0 h-full w-[0.12rem] bg-yellow-50 ${MatchRoute(link.path) ? "opacity-100" : "opacity-0"
                                }`}
                        ></span>
                        <div className="flex items-center gap-x-2">
                            {/* Icon Goes Here */}
                            <Icon className="text-lg" />
                            <span>{link.name}</span>
                        </div>
                    </div>
                </NavLink>
            </div>



        </div>
    )
}

export default SidebarOption