import React from 'react'
import { IoMdClose } from "react-icons/io";
import { sidebarLinks } from '../../../data/dashboard-links';
import { useSelector } from 'react-redux';
import SidebarOption from './SidebarOption';


const ResponsiveSidebar = ({setSideBar}) => {
const {user} = useSelector( (state)=> state.profile)




 

  return (
    <div className='md:invisible min-w-[75px] sm:min-w-[190px] border border-richblack-800  h-[calc(100vh-3.5rem)] bg-white bg-opacity-10 backdrop-blur-md   '>



{/* close button */}
<div className='flex justify-end hover:text-pink-400 '>
  <IoMdClose onClick={()=> setSideBar(false)}  />
  </div>

  {/* options */}
  <div className='mt-2 relative'>
    {
      sidebarLinks.map( (link )=>{
        if(link.type && user?.accountType !== link.type){
          return null
        }

        return(
          <div className='w-full group'>
            {/* <span className='sm:hidden invisible group-hover:visible w-fit absolute z-20 left-16 text-[14px] py-2 px-3  text-blue-100 border-richblack-600 '>{link.name}</span> */}
            <SidebarOption
            link={link} iconName={link.icon}
            key={link.id}
            ></SidebarOption>

          </div>
        )
      })

    }
  </div>

  {/* line */}
  <div className='mx-auto mt-6 mb-6 h-[1px] w-10/12 bg-richblack-600'></div>

  {/* setting */}
   <div>
    <SidebarOption link={{name:"Settings",
  path:"/dashboard/settings"}}
  iconName={"VscSettingsGear"}></SidebarOption>
   </div>

   
  


                           
    </div>
  )
}

export default ResponsiveSidebar