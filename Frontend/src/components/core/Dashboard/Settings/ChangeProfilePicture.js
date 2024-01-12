import React, { useState, useRef, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { updateDisplayPicture } from '../../../../services/operations/settingsAPI'

import IconButton from '../../../common/IconButton'
import { FiUpload } from "react-icons/fi"


const ChangeProfilePicture = () => {

    const { token } = useSelector((state) => state.auth)
    const { user } = useSelector((state) => state.profile)

    const dispatch = useDispatch()

    const [loading, setLoading] = useState(false)
    const [imageFile, setImageFile] = useState(null)
    const [previewSource, setPreviewSource] = useState(null)

    const fileInputRef = useRef(null)
    let randomImage

    // click() ->we when we hover this function as a mouse click
    const ClickHandler = () => {
        fileInputRef.current.click()
    }

    const fileChangeHandler = (event) => {
        const file = event.target.files[0]
        console.log("file :", file)
        if (file) {
            console.log("if k andatr")
            setImageFile(file)
            previewFile(file)

        }
    }

    
    const previewFile = (file) => {

        const reader = new FileReader()
        reader.readAsDataURL(file)
        console.log("reader", reader)


        console.log("first")
        console.log("reader ka result: ", reader.result)
        reader.onloadend = () => {
            setPreviewSource(reader.result)

            // extra
            localStorage.setItem("randomImage", JSON.stringify(previewSource))
             randomImage = localStorage.getItem("randomImage") ?   JSON.parse(localStorage.getItem("randomImage")): null
        }


    }

    const FileUploadHandler = () => {

       
       
        try {
            console.log("file is uploading...")
            setLoading(true)

            const formData = new FormData()
            
            console.log("Image file")

            formData.append("displayPicture", imageFile)

            console.log("form data:", formData)

            dispatch(updateDisplayPicture(token, formData)).then(() => {
                setLoading(false)
            })
        } catch (error) {
            console.log("Error in file Upload: ", error.message)
        }
       
    }

    useEffect(() => {
        if (imageFile) {
            previewFile(imageFile)
        }
    }, [imageFile])



    return (
       <div>
        {
            loading ? (<div className='grid place-items-center'>
                <div className='text-4xl text-white flex items-center justify-center h-[500px]'>Loading...</div>
            </div>): (
                <div className="flex items-center justify-center md:justify-between rounded-md border-[1px] border-richblack-700 bg-richblack-800 md:py-6 md:px-10 py-3 px-5 text-richblack-5">

                <div className="flex sm:flex-row flex-col items-center gap-x-4 p-1">
                    <img src={previewSource || randomImage || user?.image } alt={`profile-${user?.firstName}`}
                        className="aspect-square sm:w-[78px] w-[60px] rounded-full object-cover" />
    
                    <div className='space-y-2'>
                        <p>Change Profile Picture</p>
                        <div className='flex  items-center sm:flex-row gap-3'>
                            <input type="file"
                                ref={fileInputRef}
                                className='hidden'
                                onChange={fileChangeHandler}
                                accept='image/png, image/gif, image/jpeg'
                            />
    
                            <button
                                onClick={ClickHandler}
                                disabled={loading}
                                className="cursor-pointer rounded-md bg-richblack-700 py-2 px-5 font-semibold text-richblack-50" >
                                Select
                            </button>
    
                            <IconButton
                                className=""
                                onclick={FileUploadHandler}>
                                <div className='flex flex-row gap-2'>
                                    <span>
                                        {
                                            loading ? "Uploading..." : "Upload"
                                        }
                                    </span>
    
    
                                    <span>
                                        {
                                            !loading && (
                                                <FiUpload
                                                    className='text-lg text-richblack-25' />
                                            )
                                        }
                                    </span>
    
                                </div>
    
    
                            </IconButton>
    
                        </div>
                    </div>
    
                </div>
            </div>
            )
        }
       </div>
    )
}

export default ChangeProfilePicture