import React from 'react'
import ChangeProfilePicture from './ChangeProfilePicture'
import DeleteAccount from './DeleteAccount'
import EditProfile from './EditProfile'
import UpdatePassword from './UpdatePassword'

const index = () => {
  return (
    
   <div className=' ml-10 sm:ml-[10rem] md:ml-8'>

    <div>
    <h1 className="mb-14 mt-6 text-3xl font-medium text-richblack-5">Edit Profile</h1>
    </div>

    <div className="md:w-9/12 sm:w-9/12 w-11/12 sm:mx-auto ">
       

        <ChangeProfilePicture></ChangeProfilePicture>
        <EditProfile></EditProfile>
        <UpdatePassword></UpdatePassword>
        <DeleteAccount></DeleteAccount>

    </div>
   </div>
  )
}

export default index