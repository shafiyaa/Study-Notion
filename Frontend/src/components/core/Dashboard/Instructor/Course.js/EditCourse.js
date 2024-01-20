import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import RenderSteps from '../AddCourse/RenderSteps'
import { getFullDetailsOfCourse,editCourseDetails } from '../../../../../services/operations/courseAPI'
import { setEditCourse,setCourse } from '../../../../../reducers/slices/courseSlice'


const EditCourse = () => {
    const dispatch = useDispatch()
    const {courseId} = useParams()
    const {course } = useSelector((state) => state.course)
    const {token} = useSelector((state)=> state.auth)
    const [loading, setLoading] = useState(false)

    useEffect( ()=>{
        const fetchEditCourse = async()=>{
            setLoading(true)
         
            const result = await getFullDetailsOfCourse(courseId, token)
          
            if(result?.courseDetails){
                dispatch(setEditCourse(true))
                dispatch(setCourse(result?.courseDetails))
            }
           
            setLoading(false)
        }
        fetchEditCourse()
    },[])

  return (
    <div className='text-white'>
        <h1 className='text-4xl p-4'>Edit Course</h1>

        {
            loading ? (<div className='flex justify-center items-center h-[400px]'>
                <div className='custom-loader'></div>

            </div>)

            :(<div className='mt-12 w-7/12 mx-auto'>
                {
                    course ? (<RenderSteps/>): (<div className='flex justify-center items-center h-[500px]'>
                        <p className='text-pink-400 text-4xl'>Course Not Found!</p>
                    </div>)
                }

            </div>)
        }
    </div>
  )
}

export default EditCourse