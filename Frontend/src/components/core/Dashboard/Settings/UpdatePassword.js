import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from "react-router-dom"
import {changePassword} from "../../../../services/operations/settingsAPI"
import { useForm } from "react-hook-form"
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai"
import IconButton from '../../../common/IconButton'
import { useDispatch } from 'react-redux'

const UpdatePassword = () => {

  const { token } = useSelector((state) => state.auth)
  const navigate = useNavigate()
  const dispatch = useDispatch();

  const [showOldPassword, setShowOldPassword] = useState(false)
  const [showNewPassword, setShowNewPassword] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  const submitPasswordForm = async (data) =>{

    try{
      console.log("I am in Update password")
      console.log("I am token : " , token);
      console.log("I am Data : " , data);
      dispatch(changePassword(token, data))
      //  changePassword(token, data)

    }catch(error){
      console.log("error while submit password form ", error.message)
    }
  }

  return (
    <div>
      <form onSubmit={handleSubmit(submitPasswordForm)}>
        {/* passwords */}
        <div className='my-10 flex flex-col gap-y-6 rounded-md border border-richblack-700 bg-richblack-800 p-8 px-12'>

          <h2 className='text-lg font-semibold text-richblack-5'>Password</h2>

          <div className='flex flex-col gap-5 lg:flex-row'>
            {/* old password */}
            <div className='relative flex flex-col gap-2 lg:w-[48%]'>
            <label htmlFor="oldPassword" className='label-style'>Current Password</label>
            <input type={showOldPassword? "text":"password"}
            name='oldPassword'
            id='oldPassword'
           
            className='form-style '
            {...register("oldPassword", {required:true})} />

            {/* icon */}
            <span onClick={() => setShowOldPassword((prev) => !prev)}
                className="absolute right-3 top-[38px] z-[10] cursor-pointer">
                  {
                    showOldPassword ? (
                      <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
                    ) : (
                      <AiOutlineEye fontSize={24} fill="#AFB2BF" />
                    )
                  }
                </span>

            {errors.oldPassword && (
              <span className="-mt-1 text-[12px] text-yellow-100">
              Please enter your Current Password.
            </span>
            )}

          
          </div>

          {/* new password */}
          <div className='relative flex flex-col gap-2 lg:w-[48%]'>
            <label htmlFor="newPassword" className='label-style'>New Password</label>
            <input type={showNewPassword? "text":"password"}
            name='newPassword'
            id='newPassword'
           
            className='form-style'
            {...register("newPassword", {required:true})} />

            {/* icon */}
            <span onClick={() => setShowNewPassword((prev) => !prev)}
                className="absolute right-3 top-[38px] z-[10] cursor-pointer">
                  {
                    showNewPassword ? (
                      <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
                    ) : (
                      <AiOutlineEye fontSize={24} fill="#AFB2BF" />
                    )
                  }
                </span>

            {errors.newPassword && (
              <span className="-mt-1 text-[12px] text-yellow-100">
              Please enter your new Password.
            </span>
            )}

          
          </div>


          </div>

           {/* button */}
        <div className='flex justify-center sm:justify-end gap-5  '>
         
            <IconButton type={"submit"} text={"Update"} customClass={"bg-blue-100 text-richblack-900 rounded-md py-2 px-4 font-semibold"} ></IconButton>
           

            <button onClick={()=>{navigate("/dashboard/my-profile")}}
             className='cursor-pointer rounded-md bg-richblack-700 py-2 px-5 font-semibold text-white '>
              Cancel
            </button>
          </div>
         
        </div>




      
      </form>
    </div>
  )
}

export default UpdatePassword