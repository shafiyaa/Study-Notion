import React from 'react'
import ChangeProfilePicture from './ChangeProfilePicture'
import DeleteAccount from './DeleteAccount'
import EditProfile from './EditProfile'
import UpdatePassword from './UpdatePassword'

const index = () => {
  return (
    
   <div>

    <div>
    <h1 className="mb-14 text-3xl font-medium text-richblack-5">Edit Profile</h1>
    </div>

    <div className="w-8/12 mx-auto">
       

        <ChangeProfilePicture></ChangeProfilePicture>
        <EditProfile></EditProfile>
        <UpdatePassword></UpdatePassword>
        <DeleteAccount></DeleteAccount>

    </div>
   </div>
  )
}

export default index