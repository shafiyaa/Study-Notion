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
    <div className='text-richblack-700 flex flex-col gap-20 w-7/12 max-w-[1000px] ml-28'>
      <div>
      <h2 className='text-4xl text-white'>My Profile</h2>
      </div>
    
      <div className='flex flex-col gap-8'>
        {/* first section*/}
        <div className='flex justify-between item-center  bg-richblack-800  p-8 px-12  outline outline-1 rounded-md'>
          {/* left */}
          <div className='flex justify-between flex-row items-center gap-x-3'>
            <img src={user?.image} alt={`profile-${user?.firstName}`} className='aspect-square w-[70px] rounded-full object-cover' />
            <div>
              <p className='text-xl text-white'> {user?.firstName + " " + user?.lastName}</p>
              <p className='text-richblack-300 text-[15px]'>{user?.email}</p>
            </div>
          </div>

        

          <IconButton onclick={() => { navigate("/dashboard/settings") }}  > 
          <div className="flex flex-row items-center py-[6px] px-6 gap-2 w-60px text-[18px] rounded-md bg-yellow-100 text-richblue-900">
          <FaRegEdit className=''></FaRegEdit>
           <p>Edit</p> 
          </div>
            </IconButton>



        </div>

        {/* sec section */}
        <div className='flex justify-between items-center bg-richblack-800  p-8 px-12 outline outline-1 rounded-md  '>
          {/* left */}
          <div >
            <p className='text-xl text-white'>About</p>
            
            <p className='text-richblack-300 text-[15px]'>
              { user?.additionalDetails?.about ?? "Write Something about Yourself"}
             
            </p>
          </div>

          {/* right */}
          <IconButton onclick={() => { navigate("/dashboard/settings") }}  > 
          <div className="flex flex-row items-center py-[6px] px-6 gap-2 w-60px text-[18px] rounded-md bg-yellow-100 text-richblue-900">
          <FaRegEdit className=''></FaRegEdit>
           <p>Edit</p> 
          </div>
            </IconButton>
        </div>

        {/* third section */}
        <div className='flex flex-col w-full justify-between  bg-richblack-800  p-8 px-12 outline outline-1 rounded-md'>
        
         
            {/* top */}
            <div className='mb-8 flex justify-between items-center '>
          {/* left */}
          
            <p className='text-xl text-white'>Personal Details</p>
            
          {/* right */}
          <IconButton onclick={() => { navigate("/dashboard/settings") }}  > 
          <div className="flex flex-row items-center py-[6px] px-6 gap-2 w-60px text-[18px] rounded-md bg-yellow-100 text-richblue-900">
          <FaRegEdit className=''></FaRegEdit>
           <p>Edit</p> 
          </div>
            </IconButton>
        </div>
           
          

            {/* bottom */}
            <div className='w-9/12 flex flex-col gap-4'>
              {/* first */}
              <div className='flex justify-between items-center gap-x-20  '>
                {/* left */}
                <div className=' '>
                  <p className=' text-richblack-500 text-sm my-1 '>First Name</p>
                  <p className='text-richblack-25 text-[15px]'>{user?.firstName}</p>
                </div>

                {/* right */}
                <div className=' w-4/12'>
                  <p className='text-sm text-richblack-500 my-1'>Last Name</p>
                  <p className='text-richblack-25 text-[15px]'>{user?.lastName}</p>
                </div>
              </div>

              {/* sec */}
              <div className='flex justify-between items-center  gap-x-20border border-blue-300 ' >
                {/* left */}
                <div className=''>
                  <p className='text-sm text-richblack-500 my-1'>Email</p>
                  <p className='text-richblack-25 text-[15px]'>{user?.email}</p>
                </div>

                {/* right */}
                <div className=' w-4/12'>
                  <p className='text-sm text-richblack-500 my-1'>Phone Number</p>
                  <p className='text-richblack-25 text-[15px]'>{user?.additionalDetails?.contactNumber ?? "Add Contact Number"}</p>
                </div>
              </div>

              {/* third */}
              <div className='flex justify-between items-center gap-x-20 '>
                {/* left */}
                <div className=''>
                  <p className='text-sm text-richblack-500 my-1 '>Gender</p>
                  <p className='text-richblack-25 text-[15px]'>{user?.additionalDetails?.gender ?? "Add Gender"}</p>
                </div>

                {/* rigth */}
                <div className=' w-4/12'>
                  <p className='text-sm text-richblack-500 my-1'>Date of Birth</p>
                  <p className='text-richblack-25 text-[15px]'>{user?.additionalDetails?.dateOfBirth ?? <p>Add Your Birthday</p>}</p>
                </div>

              </div>

            </div>
          


        
          
        </div>
      </div>

    </div>
  )
}

export default MyProfile