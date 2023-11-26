import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { useDispatch, useSelector } from 'react-redux'
import { createSubSection, updateSubSection } from '../../../../../../../services/operations/courseAPI'
import { setCourse } from "../../../../../../../reducers/slices/courseSlice"
import { RxCross1 } from 'react-icons/rx'
import Upload from '../../Upload'
import IconButton from '../../../../../../common/IconButton'

const SubSectionModal = ({ modalData, setModalData, add = false, view = false, edit = false }) => {

    const { register, handleSubmit, setValue, getValues, formState: { errors } } = useForm()

    const dispatch = useDispatch()
    const { course } = useSelector((state) => state.course)
    const { token } = useSelector((state) => state.auth)
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        // assuming the subsection is already Added
        if (view || edit) {
            setValue("lectureTitle", modalData.title)
            setValue("lectureDesc", modalData.description)
            setValue("lectureVideo", modalData.videoUrl)
        }

    }, [])

    const isFormUpdate = () => {
        const currentValue = getValues()

        if (currentValue.lectureTitle !== modalData.title ||
            currentValue.lectureDesc !== modalData.description ||
            currentValue.lectureVideo !== modalData.videoUrl) {
            return true
        }
        else {
            return false
        }
    }

    //  edit the subseciton
    const handleEditSubSection = async () => {

        const currentValue = getValues()
        const formData = new FormData()

        formData.append("sectionId", modalData.sectionId)
        formData.append("subSectionId", modalData._id)

        if (currentValue.lectureTitle !== modalData.title) {
            formData.append("title", currentValue.lectureTitle)
        }

        if (currentValue.lectureDesc !== modalData.description) {
            formData.append("description", currentValue.lectureDesc)
        }

        if (currentValue.lectureVideo !== modalData.videoUrl) {
            formData.append("video", currentValue.lectureVideo)
        }

        setLoading(true)
        const result = await updateSubSection(formData, token)
        if (result) {
            const updatedCourseContent = course.courseContent.map((section) => section._id === modalData.sectionId ? result : section)

            const updatedCourse = { ...course, courseContent: updatedCourseContent }

            dispatch(setCourse(updatedCourse))
        }

        setModalData(null)
        setLoading(false)


    }

    const submitHandler = async (data) => {

        if (view) {
            return
        }
        if (edit) {
            if (!isFormUpdate) {
                toast.error("No changes made in the subsection")
            } else {
                handleEditSubSection()
            }
            return
        }

        // Add a new SubSection
        const formData = new FormData()
        formData.append("sectionId", modalData)
        formData.append("title", data.lectureTitle)
        formData.append("description", data.lectureDesc)
        formData.append("video", data.lectureVideo)
        setLoading(true)
        console.log("before call the create subsection")
        const result = await createSubSection(formData, token)

        if (result) {
            const updatedCourseContent = course.courseContent.map((section) => section._id === modalData ? result : section)

            const updatedCourse = { ...course, courseContent: updatedCourseContent }

            dispatch(setCourse(updatedCourse))
        }
        setModalData(null)
        setLoading(false)

    }

    return (
        <div>
            {
                loading ? (
                    <div className='flex items-center , justify-center h-[400px]'>
                        <div className='custom-loader'></div>
                    </div>
                ) : (
                    <div className="fixed inset-0 z-[1000] !mt-0 grid h-screen w-screen place-items-center overflow-auto bg-white bg-opacity-10 backdrop-blur-sm">

                        <div className="my-10 w-11/12 max-w-[700px] rounded-lg border border-richblack-400 bg-richblack-800">

                            {/* Header */}
                            <div className="flex items-center justify-between rounded-t-lg bg-richblack-700 p-5">
                                <p className="text-xl font-semibold text-richblack-5">
                                    {view && "Viewing"}
                                    {edit && "Editing"}
                                    {add && "Adding"}
                                    {"   "}
                                    Lecture
                                </p>

                                <button onClick={() => (!loading ? setModalData(null) : {})}>
                                    <RxCross1 className='text-2xl text-richblack-5'/>
                                </button>
                            </div>


                            {/*Modal form  */}
                            <form onSubmit={handleSubmit(submitHandler)} className='space-y-8 px-8 py-10'>
                                <Upload name="lectureVideo"
                                    label="Lecture Video"
                                    register={register}
                                    setValue={setValue}
                                    errors={errors}
                                    video={true}
                                    viewData={view ? modalData.videoUrl : null}
                                    editData={edit ? modalData.videoUrl : null}
                                />

                                {/* lecture title */}
                                <div className='flex flex-col space-y-2'>
                                    <label htmlFor="lectureTitle" className='label-style'>Lecture Title
                                    {!view && <sup className='text-pink-500'>*</sup>}
                                    </label>

                                    <input id='lectureTtle'
                                        placeholder='Enter Lecture Title' className='w-full form-style'
                                        {...register("lectureTitle", { required: true })} />

                                    {
                                        errors.lectureTitle && (
                                            <span className='text-pink-300 text-sm'>Lecture title is Required!</span>
                                        )
                                    }

                                </div>

                                {/* Lecture Description */}
                                <div className='flex flex-col space-y-2'>
                                    <label htmlFor="lectureDesc" className='label-style'>Lecture Description
                                    {!view && <sup className='text-pink-500'>*</sup>}</label>

                                    <textarea id='lectureDesc' placeholder='Enter lecture Description' className='form-style resize-x-none w-full min-h-[130px]'
                                        {...register("lectureDesc", { required: true })}></textarea>

                                    {
                                        errors.lectureDesc && (
                                            <span className='text-sm text-pink-300'>Lecture Description is Required!</span>
                                        )
                                    }


                                </div>

                                {
                                    !view && (
                                        <div className='flex justfy-end'>
                                            <IconButton
                                                text={edit ? "Save Changes" : "Add New SubSection"}
                                                customClass="rounded-md py-2 px-4 text-richblack-800 bg-yellow-100 font-semibold"
                                            ></IconButton>
                                        </div>
                                    )
                                }


                            </form>
                        </div>





                    </div>
                )
            }
        </div>
    )
}

export default SubSectionModal