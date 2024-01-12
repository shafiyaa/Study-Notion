import React, { useState } from 'react'
import HighlightText from '../components/core/HomePage/HighlightText'
import BannerImage1 from "../assets/Images/aboutus1.webp"
import BannerImage2 from "../assets/Images/aboutus2.webp"
import BannerImage3 from "../assets/Images/aboutus3.webp"
import FoundingStoryImg from "../assets/Images/FoundingStory.png"
import Quote from '../components/core/About/Quote'
import StatsComponent from '../components/core/About/StatsComponent'
import Grid from '../components/core/About/Grid'
import ContactForm from '../components/common/ContactForm'
import Footer from '../components/common/Footer'
import ReviewSection from '../components/core/HomePage/ReviewSection'



const About = () => {
  const [read, setRead] = useState(false)

  return (
    <div className='text-white '>
      <div className=''>
        {/* section 1 */}
        <section className=' text-center pt-20  relative mx-auto bg-richblack-800 pb-[150px] '>
          <div className='w-7/12 mx-auto'>
            <h1 className='text-richblack-25 text-3xl font-semibold'>Driving Innovation in Online Educaion for a
              <HighlightText text={"Brighter Future"}></HighlightText>

            </h1>
            <p className='text-richblack-200 mt-4'>Studynotion is at the forefront of driving innovation in online education. We're passionate about creating a brighter future by offering cutting-edge courses, leveraging emerging technologies, and nurturing a vibrant learning community.</p>
          </div>

          {/* imnages */}
          <div className='flex flex-row justify-center  md:gap-x-4 mt-8  mx-8   '>

            <img src={BannerImage1} alt='aboutus1' loading='lazy' className='' />
            <img src={BannerImage2} alt='aboutus2' loading='lazy' className=' hidden md:inline' />
            <img src={BannerImage3} alt='aboutus3' loading='lazy' className='hidden xl:inline' />




          </div>
        </section>

        {/* ssection 2 */}
        <section className=' p-10 mt-[30px] '>   <Quote /> </ section>


        {/* section 3 */}

        {/* image ko col krna h read more read less ko sahi krna */}

        <section className='border-t border-richblack-600 w-11/12 max-w-maxContent mx-auto'>
          {/* top boxes */}
          <div className='flex flex-col lg:flex-row  items-center justify-evenly gap-10 mt-10 mb-10 border'>
            {/* left */}
            <div className='lg:w-6/12 w-10/12 flex flex-col gap-y-8 text-richblack-300 p-8 '>
              <h1 className=' text-3xl font-semibold gradient bg-gradient-to-t from-[#fc5842] to-[#e70892] text-transparent bg-clip-text'>Our Founding Story</h1>

              <p>Our e-learning platform was born out of a shared vision and passion for transforming education. It all began with a group of educators, technologists, and lifelong learners who recognized the need for accessible, flexible, and high-quality learning opportunities in a rapidly evolving digital world.
              </p>
              <p className={`${read ? "hidden" : "inline"}`}>As experienced educators ourselves, we witnessed firsthand the limitations and challenges of traditional education systems. We believed that education should not be confined to the walls of a classroom or restricted by geographical boundaries. We envisioned a platform that could bridge these gaps and empower individuals from all walks of life to unlock their full potential.</p>
              <p onClick={() => setRead(!read)} className='cursor-pointer text-yellow-50 text-[15px] '>READ
                 {
                  read && (
                    <span> MORE</span>
                  )
                 } 
                 {!read && (
                  <span> LESS</span>
                 )}
                </p>
            </div>


            {/* right */}
            <div className='relative '>
              <div className='lg:h-[150px] lg:w-[300px] rounded-full  bg-pink-500 absolute -left-4 top-10  filter blur-2xl'></div>
              <img src={FoundingStoryImg} alt="Founding-story" className='mt-8 relative z-10' />
            </div>

          </div>

          {/* bottom boxes */}
          <div className=' flex flex-col lg:flex-row items-center gap-20 text-richblack-300 w-11/12 mx-auto'>
            {/* left */}
            <div className=' p-6'>
              <h1 className='text-3xl font-semibold  gradient bg-gradient-to-t from-[#f59e75] to-[#fa6915] text-transparent bg-clip-text mb-6'>Our Vision</h1>
              <p>With this vision in mind, we set out on a journey to create an e-learning platform that would revolutionize the way people learn. Our team of dedicated experts worked tirelessly to develop a robust and intuitive platform that combines cutting-edge technology with engaging content, fostering a dynamic and interactive learning experience.</p>
            </div>
            {/* right */}
            <div className=' p-6  '>
              <h1 className='text-3xl font-semibold  gradient bg-gradient-to-t from-[#8feffd] to-[#01a2d3ce] text-transparent bg-clip-text mb-6 '>
                Our Mission
              </h1>
              <p className=''>Our mission goes beyond just delivering courses online. We wanted to create a vibrant community of learners, where individuals can connect, collaborate, and learn from one another. We believe that knowledge thrives in an environment of sharing and dialogue, and we foster this spirit of collaboration through forums, live sessions, and networking opportunities.</p>
            </div>
          </div>
        </section>

        {/* section-4 */}

        <section className='mt-20'>
          <StatsComponent />
        </section>

        {/* section 5 */}

        <section className='mt-20'>
          <Grid />
        </section>

        {/* section 6 */}

        <section className=' grid place-items-center my-16 '>
          <ContactForm heading={"Get in Touch"} subheading={"We'd love to here for you, Please fill out this form"} className="mx-auto "></ContactForm>
        </section>


        {/* section7 */}


        <section className='my-10'>
          <p className='text-4xl text-richblack-100 font-semibold  text-center'>Reviews from other Learners</p>
          <ReviewSection></ReviewSection>

        </section>

      </div>



      {/* footer */}
      <Footer></Footer>

    </div>
  )
}

export default About