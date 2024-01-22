import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { useState } from 'react'
import { HiOutlineCurrencyRupee } from 'react-icons/hi';
import { addCourseDetails, editCourseDetails, fetchCourseCategories } from '../../../../../../../services/operations/courseAPI';
import RequirementField from './RequirementField';
import { setStep, setCourse } from '../../../../../../../reducers/slices/courseSlice';
import IconButton from '../../../../../../common/IconButton';
import { toast } from 'react-hot-toast';
import { COURSE_STATUS } from '../../../../../../../utilis/constants';
import ChipInput from './ChipInput';
import Upload from '../../Upload';




const CourseInformationForm = () => {

  const { register,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
  } = useForm()

  const dispatch = useDispatch()
  const { token } = useSelector((state) => state.auth)
  const { course, editCourse } = useSelector((state) => state.course)
  const [loading, setLoading] = useState(false)
  const [courseCategories, setCourseCategories] = useState([])


  const isFormUpdated = () => {
    const currentValues = getValues()
    if (
      currentValues.courseTitle !== course.courseName ||
      currentValues.courseShortDesc !== course.courseDescription ||
      currentValues.coursePrice !== course.price ||
      currentValues.courseTags.toString() !== course.tag.toString() ||
      currentValues.courseBenefits !== course.whatYouWillLearn ||
      currentValues.courseCategory._id !== course.category._id ||
      currentValues.courseImage !== course.thumbnail ||
      currentValues.courseRequirements.toString() !== course.instructions.toString()
    ) {
      return true
    } else {
      return false
    }
  }




  useEffect(() => {

    // function for fetch the categories
    const getCategories = async () => {
      setLoading(true)
      const categories = await fetchCourseCategories()
      if (categories.length > 0) {
        setCourseCategories(categories)
      }
      setLoading(false)
    }

    // set the form values
    if (editCourse) {
      setValue("courseTitle", course.courseName)
      setValue("courseShortDesc", course.courseDescription)
      setValue("coursePrice", course.price)
      setValue("courseTags", course.tag)
      setValue("courseBenefits", course.whatYouWillLearn)
      setValue("courseCategory", course.category)
      setValue("courseRequirements", course.instructions)
      setValue("courseImage", course.thumbnail)
    }
    getCategories()
  }, [])

  async function submitHandler(data) {
    

    //  updating the details in the course
    if (editCourse) {

      if (isFormUpdated()) {
        const currentValues = getValues()
        const formData = new FormData()

        // adding all the forms value in the formdata variable
        formData.append("courseId", course._id)

        if (currentValues.courseTitle !== course.courseName) {
          formData.append("courseName", data.courseTitle)
        }

        if (currentValues.courseShortDesc !== course.courseDescription) {
          formData.append("courseDescription", data.courseShortDesc);
        }

        if (currentValues.coursePrice !== course.price) {
          formData.append("price", data.coursePrice);
        }

        if(currentValues.courseTags.toString() !== course.tag.toString()){
          formData.append("tag", JSON.stringify(data.courseTags))
        }

        if (currentValues.courseBenefits !== course.whatYouWillLearn) {
          formData.append("whatYouWillLearn", data.courseBenefits);
        }

        if (currentValues.courseCategory._id !== course.category._id) {
        
          formData.append("category", data.courseCategory._id);
        }

        if (currentValues.courseRequirements.toString() !== course.instructions.toString()) {
          formData.append("instructions", JSON.stringify(data.courseRequirements));
        }

        if(currentValues.courseImage !== course.thumbnail){
          formData.append("thumbnailImage", data.courseImage)
        }

        setLoading(true)
        const result = await editCourseDetails(formData, token)
        setLoading(false)

        if (result) {
          dispatch(setStep(2))
          dispatch(setCourse(result))
        } else {
          toast.error("NO Changes made so far");
        }
        
        return;
      }

    }

    //create a new course
    const formData = new FormData();
    formData.append("courseName", data.courseTitle);
    formData.append("courseDescription", data.courseShortDesc);
    formData.append("price", data.coursePrice);
    formData.append("whatYouWillLearn", data.courseBenefits);
    formData.append("category", data.courseCategory);
    formData.append("instructions", JSON.stringify(data.courseRequirements));
    formData.append("tag", data.tag)
    formData.append("thumbnailImage", data.courseImage)
    formData.append("status", COURSE_STATUS.DRAFT);

    setLoading(true);
    
    const result = await addCourseDetails(formData, token)


    if (result) {
     
      dispatch(setStep(2))
      dispatch(setCourse(result))
    }
    setLoading(false)
   
  }

  return (

    <div>
      {
        loading ? (
        <div className='grid place-items-center h-[100vh]'>
          <div className='custom-loader'></div>
        </div>
        ) :


          (
            <div>
              <form onSubmit={handleSubmit(submitHandler)} className='rounded-md border-richblack-700 bg-richblack-800 sm:p-6 p-2 space-y-8'>

                {/* course title */}
                <div>
                  <label htmlFor="courseTitle" className='label-style'>Course Title <sup className='text-pink-500'>*</sup> </label>
                  <input type="text" id='courseTitle' placeholder='Enter Course Title' className='w-full form-style'
                    {...register("courseTitle", { required: true })} />

                  {
                    errors.courseTitle && (
                      <span className='-mt-[1] text-pink-500 text-sm'>Course Title is Required!</span>
                    )
                  }
                </div>

                {/* course short desc */}
                <div>
                  <label htmlFor="courseShortDesc" className='label-style'>Course Short Description <sup className='text-pink-500'>*</sup> </label>
                  <textarea id="courseShortDesc" placeholder='Enter Description' className='form-style w-full min-h-[140px] '
                    {...register("courseShortDesc", { required: true })}
                  ></textarea>
                  {
                    errors.courseShortDesc && (
                      <span className='-mt-[1] text-pink-500 text-sm'>Course Description is Required!</span>
                    )

                  }
                </div>

                {/* course price */}
                <div className='relative'>
                  <label htmlFor="coursePrice" className='label-style'>Course Price <sup className='text-pink-500'>*</sup> </label>
                  <input id='coursePrice' placeholder='Enter Course Price' className='form-style w-full pl-8'
                    {...register("coursePrice", {
                      required: true,
                      valueAsNumber: true
                    })}
                  />
                  <HiOutlineCurrencyRupee className='absolute text-richblack-400 top-[55%] left-2 text-lg' />

                  {
                    errors.coursePrice && (
                      <span className='-mt-[1] text-pink-500 text-sm'>Course Price is Required!</span>
                    )
                  }
                </div>

                {/* course Category */}
                <div>
                  <label htmlFor="courseCategory" className='label-style'>Course Category <sup className='text-pink-500'>*</sup> </label>

                  <select id="courseCategory" defaultValue=""
                    className='form-style'
                    {...register("courseCategory", { required: true })}
                  >
                    <option value="" disabled>Choose a Category</option>

                    {
                      !loading && courseCategories.map((category, index) => (
                        <option value={category?._id} key={index}>
                          {category?.name}
                        </option>

                      ))
                    }
                  </select>


                  {
                    errors.courseCategory && (
                      <span className='-mt-[1] text-pink-500 text-sm'>Course Category is Required!</span>
                    )
                  }

                </div>

                {/* create custom component for tag input and media */}
                {/* Tags */}
                <ChipInput
                  label="Tags" name="courseTags" placeholder="Enter Tags"
                  register={register}
                  errors={errors}
                  setValue={setValue}
                  getValues={getValues}
                ></ChipInput>

                {/* thumbnail image */}
                <Upload
                name="courseImage"
                label="Course Thumbnail"
                register={register}
                setValue={setValue}
                errors={errors}
                editData = {editCourse ? course?. thumbnail : null}
                />



                {/* course benefits */}
                <div>
                  <label htmlFor="courseBenefits" className='label-style'>Benefits of the Course <sup className='text-pink-500'>*</sup> </label>

                  <textarea id="courseBenefits" placeholder='Enter Benefits of the course' className='form-style w-full'
                    {...register("courseBenefits", { required: true })}></textarea>

                  {
                    errors.courseBenefits && (
                      <span className='-mt-[1] text-pink-500 text-sm'>
                        Benefits of the course are required!
                      </span>
                    )
                  }

                </div>

                {/* requirement field */}
                <RequirementField
                  name="courseRequirements"
                  label="Requirements/Instructions"
                  register={register}
                  errors={errors}
                  setValue={setValue}
                  getValues={getValues}
                ></RequirementField>


                <div className='flex justify-end gap-x-2'>
                  {
                    editCourse && (
                      <button onClick={() => dispatch(setStep(2))}
                      disabled={loading}
                      className="flex cursor-pointer items-center gap-x-2 rounded-md bg-richblack-300 py-[8px] px-[20px] font-semibold text-richblack-900"
                      >Continue Without Saving</button>
                    )
                  }

                  <IconButton
                    text={!editCourse ? "Next" : "Save Changes"}
                    customClass={"bg-yellow-100 font-semibold text-richblack-800 px-3 py-1 rounded-md "}
                  ></IconButton>


                </div>
              </form>




            </div>


          )
      }
    </div>


  )
}

export default CourseInformationForm