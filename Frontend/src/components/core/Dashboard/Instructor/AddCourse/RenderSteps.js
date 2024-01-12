import React from 'react'
import { useSelector } from "react-redux"
import { FaCheck } from 'react-icons/fa'
import CourseBuilderForm from './CourseForm/step-2/CourseBuilderForm'
import CourseInformationForm from './CourseForm/step-1/CourseInformationForm'
import PublishCourse from "./CourseForm/step-3/PublishCourse"

const RenderSteps = () => {

  const { step } = useSelector((state) => state.course)
  console.log("in the Render steps ", step)

  const steps = [
    {
      id: 1,
      title: "Course Information"
    },

    {
      id: 2,
      title: "Course Builder"
    },

    {
      id: 3,
      title: "Publish"
    }
  ]
  return (
    <div className='text-white'>

      {/* steps UI */}
      <div>

        {/* numbers */}
        <div className='relative mb-2 sm:flex w-full justify-center hidden '>
          {
            steps.map((item) => (

              <React.Fragment key={item.id}>

              <div className='flex flex-col items-center ' >

                <button 
                className={`grid cursor-default aspect-square w-[34px] place-items-center rounded-full border-[1px] ${
                  step === item.id
                    ? "border-yellow-50 bg-yellow-900 text-yellow-50"
                    : "border-richblack-700 bg-richblack-800 text-richblack-300"
                } ${step > item.id && "bg-yellow-50 text-yellow-50"}} `}
                >
                  {
                  step > item.id ? (
                    <FaCheck className='font-bold text-richblack-900'/>
                  ):(
                    item.id
                  )
                }

                </button>

              </div>

              {
                item.id !== steps.length && (
                  <>
                  <div
                   className={`h-[calc(34px/2)] w-[33%]  border-dashed border-b-2 ${
                    step > item.id  ? "border-yellow-50" : "border-richblack-500"
                  } `}>

                  </div>
                  </>
                )}            
                  </React.Fragment>
             
            ))}
        </div>



        <div className='relative mb-16 sm:flex w-full select-none justify-between hidden '>
          {
            steps.map((item) => (
          
             <div
             className="flex min-w-[130px] flex-col items-center gap-y-2"
             key={item.id}>

               <p className={`text-sm ${
                  step >= item.id ? "text-richblack-5" : "text-richblack-500"
                }`}
              >
                {item.title}
              </p>

             </div>
            
            ))
          }
        </div>

      </div>

      {/* rendering different steps */}

      <div className='mt-10'>
        {
          step === 1 &&
          <CourseInformationForm />
        }
        {
          step === 2 &&
          <CourseBuilderForm />
        }
        {
        step ===3 &&
        <PublishCourse/>
      }

      </div>






    </div>
  )
}

export default RenderSteps