import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { MdClose } from "react-icons/md"

const ChipInput = ({ label, name, placeholder, register, errors, setValue, getValues }) => {

    const [chip, setChip] = useState([])
    const { editCourse, course } = useSelector((state) => state.course)

    useEffect(() => {
        if (editCourse) {
            console.log("printing course in Chip Input:", course)
            setChip(course?.tag)
        }
        register(name, {
            required: true,
            validate: (value) => value.length > 0
        }
        )
    }, [])

    useEffect(() => {
        setValue(name, chip)
    }, [chip])

    //  add the  chips
    const addChipHandler = (event) => {
        // if enter is press
        if (event.key === "Enter" || event.key === ",") {
            event.preventDefault()
            // remove the space
            const chipValue = event.target.value.trim()

            // checnking if tag already added as chip
            if (chipValue && !chip.includes(chipValue)) {
                // now add the chip in the array
                const newChip = [...chip, chipValue]
                setChip(newChip)
                // clear the input field
                event.target.value = ""
            }
        }
    }

    // remove the chips
    const removeChipHandler = (chipIndex) => {
        const newChip = chip.filter((_, index) => index !== chipIndex)
        setChip(newChip)
    }


    return (
        <div>
            <label htmlFor={name} className='label-style'>{label} <sup className='text-pink-500'>*</sup></label>

            {/* Rendering the chip */}
            <div className='flex w-full flex-wrap gap-y-2'>
                {
             chip.map( (chip, index)=> (
                <div key={index} 
                className="m-1 flex items-center rounded-full  px-2 py-1 text-sm text-richblack-5 bg-opacity-30 bg-yellow-100">
                    {chip}

                    {/* button that remove the chip */}
                <button
                type='button' className='ml-2 focus:outline-none'
                onClick={()=> removeChipHandler(index)}>
                <MdClose className='text-sm'/>
                </button>
                </div>
             ))
                }

            </div>


            <input id={name} name={name} type='text' placeholder={placeholder} className='form-style w-full' onKeyDown={addChipHandler} />

            {/* errors */}
            {
                errors[name] && (
                    <span className='-mt-[1] text-pink-500 text-sm'> {label} is Required!</span>
                )
            }
        </div>
    )
}

export default ChipInput