import React from 'react'

import { FaArrowRight } from "react-icons/fa"
import { Link } from 'react-router-dom'
import HighlightText from '../components/core/HomePage/HighlightText'
import CTAbutton from '../components/core/HomePage/CTAbutton'
import Banner from '../assets/Images/banner.mp4'
import CodeBlocks from '../components/core/HomePage/CodeBlocks'
import Timeline from '../components/core/HomePage/Timeline'
import Language from '../components/core/HomePage/Language'
import Footer from '../components/common/Footer'
import thirdSectionImage from "../assets/Images/Instructor.png"
import ReviewSection from '../components/core/HomePage/ReviewSection'
import ExploreMore from '../components/core/HomePage/ExploreMore'


export const Home = () => {
    
    return (
        <div className='text-white'>
            {/* Section 1 */}
            <div>
                {/* button for signUp */}
                <Link to={"/signup"}>
                    <div className=' group mx-auto mt-16 p-1 rounded-full bg-richblack-800 text-richblack-400 transition-all duration-200 hover:scale-95 w-fit  '
                     style={{
                        boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                      }}>
                        <div className='flex flex-row items-center gap-2 rounded-full px-10 py-[5px] group:hover:bg-richblack-900 '>
                            <p className='medium'>Become an Instructor</p>
                            <p className='text-[12px]'><FaArrowRight></FaArrowRight></p>

                        </div>
                    </div>
                </Link>

                {/* heading */}
                <div className='text-center text-4xl font-semibold mt-8 text-white'>
                    Empower Your Future With
                    <HighlightText text={"Coding Skills"} />
                    {/* hw-add gradient and shadow and work on padding and border */}

                </div>

                {/* sub heading */}
                <div className='mt-6 mx-auto w-[90%] text-center text-lg font-medium text-richblack-300'>
                    With our online coding courses, you can learn at your own pace, from anywhere in the world, and get access to a wealth of resources, including hands-on projects, quizzes, and personalized feedback from instructors.

                   
                </div>

                {/* button */}
                <div className='flex  justify-center mt-8 gap-7 mx-auto '>
                    {/* check CTA button active  */}

                    <CTAbutton active={true} linkto={"/signup"}>Learn More </CTAbutton>
                    <CTAbutton active={false} linkto={"/login"}>Book a Demo </CTAbutton>
                    {/* hw-add shadow to the button */}

                </div>

                {/* video */}
                
                <div className=" my-7 shadow-[10px_-5px_50px_-5px] shadow-blue-100 w-9/12  mx-auto">
          <video
            className="sm:shadow-[20px_20px_rgba(255,255,255)]"
            muted
            loop
            autoPlay
          >
            <source src={Banner} type="video/mp4" />
          </video>
        </div>


                {/* codeblock section 1 */}
                <div className=' mt-16   mx-auto relative  px-6'>


                    <CodeBlocks

                        position={"lg:flex-row"}
                        heading={
                            <div className='text-2xl md:text-3xl font-semibold '>
                                Unlock Your
                                <HighlightText text={"Coding Potential"}></HighlightText>
                                with our online courses
                            </div>}

                        subheading={"Our courses are designed and taught by industry experts who have years of experience in coding and are passionate about sharing their knowledge with you."}
                        ctabtn1={
                            {
                                Text: "Try it Yourself",
                                linkto: "/signup",
                                active: true
                            }
                        }
                        ctabtn2={
                            {
                                Text: "Learn More",
                                linkto: "/login",
                                active: false
                            }
                        }
                        //   // copy the text from figma/example file
                        codeblock={`<!DOCTYPE html>
                        <head><title>Document</title></head>
                        <body>
                            <h1> <a href="/">Header</a></h1>
                            <nav>
                               <a href="/one">one</a>
                               <a href="/two">two</a>
                               <a href="/three">three</a>
                            </nav> 
                        </body>
                        </html>` }
                        codeColor={"text-yellow-25"}
                        backgroundGradient={<div className="codeblock1 absolute"></div>}
                    />
                </div>

                {/* codeBlock section 2 */}
                <div className='mt-16  mx-auto relative px-6 '>
                  
                    <CodeBlocks
                        position={"lg:flex-row-reverse"}
                        heading={
                            <div className='text-2xl md:text-3xl font-semibold'>
                                Start
                                <HighlightText text={"Coding in Seconds"}></HighlightText>

                            </div>}
                        // copy the text from figma/example file
                        subheading={"Go ahead, give it a try. Our hands-on learning enviroment means you'll writing real code from your very first lesson."}
                        ctabtn1={
                            {
                                Text: "Continue Lesson",
                                linkto: "/signup",
                                active: true
                            }
                        }
                        ctabtn2={
                            {
                                Text: "Learn More",
                                linkto: "/login",
                                active: false
                            }
                        }
                          // copy the text from figma/example file
                        codeblock={`import React from "react";\n import CTAButton from "./Button";\nimport TypeAnimation from "react-type";\nimport { FaArrowRight } from "react-icons/fa";\n\nconst Home = () => {\nreturn (\n<div>Home</div>\n)\n}\nexport default Home;`}

                        // codeblock={`<!DOCTYPE html>
                        // <head><title>Document</title></head>
                        // <body>
                        //     <h1> <a href="/">Header</a></h1>
                        //     <nav>
                        //        <a href="/one">one</a>
                        //        <a href="/two">two</a>
                        //        <a href="/three">three</a>
                        //     </nav> 
                        // </body>
                        // </html>` }
                        codeColor={"text-yellow-25"}
                        backgroundGradient={<div className="codeblock2 absolute"></div>}
                    />

                </div>




                <div className='  mt-4 px-3 '>
                    <ExploreMore></ExploreMore>
                </div>


            </div>

            {/* Section 2 */}
            <div className='bg-pure-greys-5 text-richblack-5 md:pt-32 pt-10 px-5    '>
                {/* checks background path */}
                <div className='homepage_bg h-[310px] '>
                    <div className='w-11/12 max-w-maxContent flex flex-col items-center gap-4 max-auto'>

                    </div>
                    {/* button part */}
                    <div className='flex flex-row gap-7 justify-center text-white mt-36'>
                        <CTAbutton active={true} linkto={"/signup"}>
                            <div className='flex gap-2 text-sm sm:text-[18px] items-center'>
                                Explore Full Catelog
                                <FaArrowRight />
                            </div>

                        </CTAbutton>
                        <CTAbutton active={false} linkto={"/signup"} >
                            <div className="text-sm t sm:text-[18px]">
                            Learn More
                            </div>
                           
                        </CTAbutton>

                    </div>

                </div>

                {/* 2nd part  */}
                <div className='w-11/12  max-w-maxContent flex flex-col  mx-auto text-black   gap-7 mt-10 '>

                    <div className='flex flex-col items-center justify-center sm:flex-row  gap-10 w-[100%] mb-10'>
                        <div className='sm:w-[45%]'>
                            <p className='text-4xl font-semibold'>Get the skills you need for a
                                <HighlightText text={"job that is in demand."}></HighlightText></p>
                        </div>

                        <div className='flex flex-col items-start gap-12 text-[16px] sm:w-[40%]'>
                            <p>The modern StudyNotion is the dictates its own terms. Today, to be a competitive specialist requires more than professional skills.</p>
                            <CTAbutton active={true} linkto={"/signup"}>Learn More</CTAbutton>
                        </div>
                    </div>

                </div>

                {/* components */}
                <Timeline></Timeline>
                <Language></Language>


            </div>

            {/* Section 3 */}
            <div className='w-11/12 mx-auto mt-10 sm:mt-20 max-w-maxContent flex flex-col items-center justify-between gap-8 '>

                {/* upper */}
                <div className='flex flex-col sm:flex-row items-center gap-12 mt-8 '>
                    {/* left part */}

                    <div className='relative w-[50%] '>

                        <div className="sm:shadow-[20px_20px_rgba(255,255,255)]">
                        <img src={thirdSectionImage} alt="content" className='relative z-2' />
                        </div>
                       

                    </div>
                    {/* right part */}
                    <div className='flex flex-col gap-6 w-[50%]'>
                        <h5 className='text-4xl font-semibold w-[40%] '>Become an  <HighlightText text={"Instructor"}></HighlightText> </h5>
                        <p className='font-medium text-base text-richblack-300'>Instructors from around the world teach millions of Student on StudyNotion.We provide the tools and skills to teach what you love</p>

                        <div className=' w-[230px]  sm:w-fit'>
                            <CTAbutton active={true} linkto={"/signup"}>
                                <div className='flex sm:gap-3 gap-1 items-center '>
                                    <p> Start Teaching Today</p>
                                    <FaArrowRight className='text-[12px]' />
                                </div>
                            </CTAbutton>
                        </div>



                    </div>

                </div>

                {/* lower- review */}
                <div className='mt-20  w-full'>
                    <h4 className='sm:text-4xl text-2xl text-richblack-100 font-semibold mb-6 text-center'>Reviews from other learners</h4>
                    <ReviewSection></ReviewSection>
                </div>






            </div>


          

            <div className='mt-10 '>
                <Footer></Footer>
            </div>
        </div>
    )
}
