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
    <div className='my-10 flex flex-row gap-x-5 rounded-md border border-pink-700 bg-pink-900 p-8 px-12'>

      {/* left */}
      <div className='flex aspect-square h-14 w-14 items-center justify-center rounded-full bg-pink-700'>
        <FiTrash2 className='text-3xl text-pink-200'></FiTrash2>
      </div>

      {/* right */}
      <div className='flex flex-col space-y-2'>
      <h2 className="text-lg font-semibold text-richblack-5">
            Delete Account
          </h2>
          <div className="w-4/5 text-pink-25 text-sm">
            <p>Would you like to delete account?</p>
            <p>
              This account may contain Paid Courses. Deleting your account is
              permanent and will remove all the contain associated with it.
            </p>
          </div>
          
          <button onClick={DeleteAccountHandler}
          className='w-3/5 bg-blue-100 cursor-pointer italic text-richblack-900 font-bold border py-3 px-6 rounded-md'>
            I want to delete my account
          </button>


      </div>

    </div>
  )
}

export default DeleteAccount