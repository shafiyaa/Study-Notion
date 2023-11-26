import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
// import { useDispatch } from 'react-redux'
import {FaRegEdit} from 'react-icons/fa'
import IconButton from '../../common/IconButton'

const MyProfile = () => {
  const { user } = useSelector((state) => state.profile)
  const navigate = useNavigate()
  // const dispatch = useDispatch()


  return (
    <div className='text-richblack-700 flex flex-col gap-20 sm:w-9/12 w-10/12 ml-12 sm:ml-40 md:ml-24 lg:ml-20 p-2 max-w-[1000px] '>
      <div>
      <h2 className='sm:text-4xl text-3xl text-white'>My Profile</h2>
      </div>
    
      <div className='flex flex-col gap-8 '>
        {/* first section*/}
        <div className='flex flex-row lg:justify-between justify-around item-center  bg-richblack-800  py-8 lg:px-12  outline outline-1 rounded-md'>
          {/* left */}
          <div className='flex flex-col   justify-center sm:flex-row sm:items-center items-start gap-x-3 '>
            <img src={user?.image} alt={`profile-${user?.firstName}`} className='aspect-square sm:w-[70px] w-[40px] rounded-full object-cover' />
            <div>
              <p className='  text-lg text-white'> {user?.firstName + " " + user?.lastName}</p>
              <p className='text-richblack-300  text-[15px] '>{user?.email}</p>
            </div>
          </div>

        

          <IconButton onclick={() => { navigate("/dashboard/settings") }}  > 
          <div className="hidden  sm:flex flex-row items-center  py-[6px] px-6 gap-2  text-[18px] rounded-md bg-yellow-100 text-richblue-900">
          <FaRegEdit className=''></FaRegEdit>
           <p>Edit</p> 
          </div>
            </IconButton>



        </div>

        {/* sec section */}
        <div className='flex flex-row  lg:justify-between justify-around  items-center bg-richblack-800  py-8 px-3 lg:px-12 outline outline-1 rounded-md  '>
          {/* left */}
          <div className='' >
            <p className='text-xl text-white'>About</p>
            
            <p className='text-richblack-300 text-[15px]'>
              { user?.additionalDetails?.about ?? "Write Something about Yourself"}
             
            </p>
          </div>

          {/* right */}
          <IconButton onclick={() => { navigate("/dashboard/settings") }}  > 
          <div className="hidden sm:flex flex-row items-center py-[6px] px-6 gap-2 w-60px text-[18px] rounded-md bg-yellow-100 text-richblue-900">
          <FaRegEdit className=''></FaRegEdit>
           <p>Edit</p> 
          </div>
            </IconButton>
        </div>

        {/* third section */}
        <div className='flex flex-col lg:justify-between justify-around w-full   bg-richblack-800  py-8 px-3 lg:px-12 outline outline-1 rounded-md'>
        
         
            {/* top */}
            <div className='mb-8 flex justify-between items-center '>
          {/* left */}
          
            <p className='text-xl text-white'>Personal Details</p>
            
          {/* right */}
          <IconButton onclick={() => { navigate("/dashboard/settings") }}  > 
          <div className="hidden sm:flex flex-row items-center py-[6px] px-6 gap-2 w-60px text-[18px] rounded-md bg-yellow-100 text-richblue-900">
          <FaRegEdit className=''></FaRegEdit>
           <p>Edit</p> 
          </div>
            </IconButton>
        </div>
           
          

            {/* bottom */}
            <div className='w-9/12 flex flex-col gap-4'>
              {/* first */}
              <div className='flex flex-col sm:flex-row justify-between items-start sm:items-center gap-x-20  '>
                {/* left */}
                <div className=' '>
                  <p className=' text-richblack-500 text-sm my-1 '>First Name</p>
                  <p className='text-richblack-25 text-[15px]'>{user?.firstName}</p>
                </div>

                {/* right */}
                <div className='sm:w-4/12'>
                  <p className='text-sm text-richblack-500 my-1'>Last Name</p>
                  <p className='text-richblack-25 text-[15px]'>{user?.lastName}</p>
                </div>
              </div>

              {/* sec */}
              <div className='flex flex-col sm:flex-row items-start justify-between sm:items-center  gap-x-20border border-blue-300 ' >
                {/* left */}
                <div className=''>
                  <p className='text-sm text-richblack-500 my-1'>Email</p>
                  <p className='text-richblack-25 text-[15px]'>{user?.email}</p>
                </div>

                {/* right */}
                <div className=' sm:w-4/12'>
                  <p className='text-sm text-richblack-500 my-1'>Phone Number</p>
                  <p className='text-richblack-25 text-[15px]'>{user?.additionalDetails?.contactNumber ?? "Add Contact Number"}</p>
                </div>
              </div>

              {/* third */}
              <div className='flex flex-col sm:flex-row justify-between items-start sm:items-center gap-x-20 '>
                {/* left */}
                <div className=''>
                  <p className='text-sm text-richblack-500 my-1 '>Gender</p>
                  <p className='text-richblack-25 text-[15px]'>{user?.additionalDetails?.gender ?? "Add Gender"}</p>
                </div>

                {/* rigth */}
                <div className=' sm:w-4/12'>
                  <p className='text-sm text-richblack-500 my-1'>Date of Birth</p>
                  <p className='text-richblack-25 text-[15px]'>{user?.additionalDetails?.dateOfBirth ?? <p>Add Your Birthday</p>}</p>
                </div>

              </div>

            </div>
          


        
          
        </div>


        {/* edit button that only shows on mobile screeen */}
        <div className=' flex justify-center '>
        <IconButton onclick={() => { navigate("/dashboard/settings") }}  > 
          <div className="flex flex-row sm:hidden items-center  py-[6px] px-6 gap-2  text-[18px] rounded-md bg-yellow-100 text-richblue-900">
          <FaRegEdit className=''></FaRegEdit>
           <p>Edit</p> 
          </div>
            </IconButton>
        </div>
      </div>

    </div>
  )
}

export default MyProfile