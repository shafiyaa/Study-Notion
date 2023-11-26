import React from 'react'

import { FiTrash2 } from "react-icons/fi"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"

import { deleteProfile } from '../../../../services/operations/settingsAPI'

const DeleteAccount = () => {
  const { token} = useSelector( (state)=> state.auth)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const DeleteAccountHandler = ()=>{
     try{
      dispatch(deleteProfile(token, navigate))
     }catch(error){
      console.log("error while delete the account",error)
     }
  }
  return (
    <div className='my-10 flex flex-col items-center md:items-start md:flex-row gap-x-5 gap-y-5 rounded-md border border-pink-700 bg-pink-900 md:py-8 md:px-10 py-4 px-6'>

      {/* left */}
      <div className='flex aspect-square h-14 w-14 items-center justify-center rounded-full bg-pink-700'>
        <FiTrash2 className='lg:text-3xl sm:text-2xl text-xl text-pink-200'></FiTrash2>
      </div>

      {/* right */}
      <div className='flex flex-col space-y-2 '>
      <h2 className="text-lg font-semibold text-richblack-5">
            Delete Account
          </h2>
          <div className="  text-pink-25 text-sm">
            <p className=' '>Would you like to delete account?</p>
            <p className=''>
              This account may contain Paid Courses. Deleting your account is
              permanent and will remove all the contain associated with it.
            </p>
          </div>
          
          <button onClick={DeleteAccountHandler}
          className='lg:w-4/5 w-full bg-blue-100 cursor-pointer md:text-[16px] text-[14px] italic text-richblack-900 font-bold border lg:py-3 lg:px-6 py-2 sm:px-3 px-2 rounded-md'>
            I want to delete my account
          </button>


      </div>

    </div>
  )
}

export default DeleteAccount