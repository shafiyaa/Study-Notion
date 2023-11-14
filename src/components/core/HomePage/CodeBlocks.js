import React from 'react'
import CTAbutton from './CTAbutton'
import { FaArrowRight } from "react-icons/fa"
import { TypeAnimation } from 'react-type-animation'


const CodeBlocks = ({ position, heading, subheading, ctabtn1, ctabtn2, codeblock, backgroundGradient, codeColor }) => {
    return (
        <div className={` flex flex-col lg:flex-row  items-center   ${position} my-5 gap-6 p-3 w-full  mx-auto`}>

            {/* section 1 */}
            <div className='md:w-[50%] w-fit flex flex-col items-center gap-8 '>
                {heading}
                <div className='text-richblack-300 font-bold text-center'>
                    {subheading}
                </div>

                <div className='flex items-center justify-center lg:justify-start  gap-2  mt-4 w-full'>
                    {/* btn1 */}
                    <CTAbutton active={ctabtn1.active} linkto={ctabtn1.linkto} >
                        <div className=' h-6 flex gap-1  items-center'>
                            {ctabtn1.Text}
                            <FaArrowRight />
                        </div>
                    </CTAbutton>

                    {/* btn2 */}
                    <CTAbutton active={ctabtn2.active} linkto={ctabtn2.linkto} >
                        <div className='h-6 flex gap-1  items-center'>
                        {ctabtn2.Text}
                        </div>
                       
                    </CTAbutton>


                </div>



            </div>

            {/* section 2 */}
            <div className=' border-3   h-full flex w-full sm:w-[90%] md:w-[70%]  text-[17px]  py-4  relative backdrop-invert-0 bg-white/10 border-l border-t border-richblack-700'>
                {/* hw- add bg-gradient */}
                {backgroundGradient}

                {/* number index */}
                <div className='flex flex-col text-center w-[9%] text-richblack-400 font-bold font-inter'>
                    <p>1</p>
                    <p>2</p>
                    <p>3</p>
                    <p>4</p>
                    <p>5</p>
                    <p>6</p>
                    <p>7</p>
                    <p>8</p>
                    <p>9</p>
                    <p>10</p>
                    <p>11</p>
                </div>

                {/* code  */}
                <div className={`w-[90%] flex flex-col gap-2 font-bold font-mono ${codeColor} pr-2`}>
                    <TypeAnimation
                    sequence={[codeblock, 1000, ""]}
                    repeat={Infinity}
                    cursor={true}
                    omitDeletionAnimation={true}

                    style={
                        {
                            whiteSpace: "pre-line",
                            display:"block"
                        }
                    }
                   

                    
                    />
                </div>

            </div>



        </div>
    )
}

export default CodeBlocks