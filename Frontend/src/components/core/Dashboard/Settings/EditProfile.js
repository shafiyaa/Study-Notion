import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useForm } from "react-hook-form"
import { useNavigate } from 'react-router-dom'
import { updateProfile } from '../../../../services/operations/settingsAPI'
import IconButton from '../../../common/IconButton'


const genders = ["Male", "Female", "Non-Binary", "Prefer no to say", "Other"]

const EditProfile = () => {
  const { user } = useSelector((state) => state.profile)
  const { token } = useSelector((state) => state.auth)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  const submitProfileForm =(formData) => {
    
    try {
      
      dispatch(updateProfile(token, formData))
    } catch (error) {
      console.log("Error in Edit Profile while submiting: ", error.message)
    }
  }

  return (
    <div>
      <form onSubmit={handleSubmit(submitProfileForm)}>

        <div className='my-10 flex flex-col gap-y-6 rounded-md border border-richblack-700 bg-richblack-800 p-8 px-12 text-white'>
          <h2>Profile Information</h2>

          {/* first div */}
          <div className='flex flex-col gap-5 lg:flex-row'>

            {/* name */}
            <div className='flex flex-col gap-2 lg:w-[48%]'>
              <label htmlFor="firstName" className='label-style'>First Name</label>
              <input type=" text" name='firstName' id='firstName' placeholder='Enter First Name' className='form-style'
                {...register("firstName", { required: true })}
                defaultValue={user?.firstName} />

              {
                errors.firstName && (
                  <span className='mt-[-1] text-pink-500 text-sm '>Please enter your First Name</span>
                )
              }


            </div>

            {/* last name*/}
            <div className='flex flex-col gap-2 lg:w-[48%]'>
              <label htmlFor="lastName" className='label-style'>Last Name</label>
              <input type=" text" name='lastName' id='lastName'
                placeholder='Enter Last Name'
                className='form-style'
                defaultValue={user?.lastName}
                {...register("lastName", { required: true })} />

              {
                errors.lastName && (
                  <span className='-mt-1 text-sm text-pink-500'>Please enter your Last Name</span>
                )
              }

            </div>

          </div>

          {/* sec div */}
          <div className='flex flex-col gap-5 lg:flex-row'>

            {/* DOB */}
            <div className='flex flex-col gap-2 lg:w-[48%]'>
              <label htmlFor="dateOfBirth" className='label-style'>Date of Birth</label>
              <input type="date" name='dateOfBirth' id='dateOfBirth' className='form-style'
                defaultValue={user?.additionalDetails?.dateOfBirth}
                {...register("dateOfBirth", {
                  required: {
                    value: true,
                    message: "Please enter your Date of Birth"
                  },
                  max: {
                    value: new Date().toISOString().split("T")[0],
                    message: "Date of Birth cannot be in the future"
                  },
                })
                } />
              {
                errors.dateOfBirth && (
                  <span className='-mt-1 text-sm text-pink-500'>{errors.dateOfBirth.message}</span>
                )
              }

            </div>

            {/* Gennder */}
            <div className='flex flex-col gap-2 lg:w-[48%]'>
              <label htmlFor="gender" className='label-style'>Gender</label>
              <select name="gender" id="gender" type="text" className='form-style' defaultValue={user?.additionalDetails?.gender}
                {...register("gender", { required: true })}>

                {
                  genders.map((element, index) => {
                    return (
                      <option value={element} key={index}>{element}</option>

                    )
                  })
                }
              </select>
              {errors.gender && (
                <span className="-mt-1 text-sm text-pink-500">
                  Please enter your gender.
                </span>
              )}

            </div>
          </div>

          {/* third div */}
          <div className='flex flex-col gap-5 lg:flex-row'>
            {/* number */}
            <div className='flex flex-col gap-2 lg:w-[48%]'>
             <label htmlFor="contactNumber" className='label-style'>Contact Number</label>
             <input type="tel" name='contactNumber' id='contactNumber' 
             className='form-style'
             placeholder='Enter Contact Number'
             defaultValue={user?.additionalDetails?.contactNumber} 
             {...register("contactNumber",{
              required:{
                value:true,
                message:"Please enter your Contact Number"
              },
              maxLength:{
                value:12,
                message:"Invalid Contact Number"
              },
              minLength:{
                value:10,
                message:"Invalid Contact Number"
              }
             })}/>
             
             {
              errors.contactNumber && (
                <span className="-mt-1 text-sm text-pink-500">
                  {errors.contactNumber.message}
                </span>
              )
             }

            </div>


            {/* about */}
            <div className='flex flex-col gap-2 lg:w-[48%]'>
              <label htmlFor="about" className='label-style'>About</label>
              <input type="text" name='about' id='about' placeholder='Enter About Yourself'className='form-style'
              defaultValue={user?.additionalDetails?.about}
              {
                ...register("about",{
                  required:true
                })
              } />

              {
                errors.about && (
                  <span className='-mt-1 twxt-sm text-pink-500'>Please enter About Yourself</span>
                )
              }
            </div>
          </div>

          {/* fourth div  */}
          {/* buttons */}
          <div className='flex justify-end gap-5 '>
            <IconButton type={"submit"} text={"Save"} customClass={"bg-blue-100 text-richblack-900 rounded-md py-2 px-4 font-semibold"}></IconButton>

            <button onClick={()=>{navigate("/dashboard/my-profile")}}
             className='cursor-pointer rounded-md bg-richblack-700 py-2 px-5 font-semibold text-richblack-50" '>
              Cancel
            </button>
          </div>

        </div>
      </form>
    </div>
  )
}

export default EditProfile