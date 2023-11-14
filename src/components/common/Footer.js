import React from 'react'
import { FooterLink2 } from "../../data/footer-links"
import { Link } from "react-router-dom"
import HighlightText from '../core/HomePage/HighlightText'

// image logo

import Logo from "../../assets/Logo/Logo-Small-Light.png"

//Icons
import { FaFacebook, FaGoogle, FaTwitter, FaYoutube } from "react-icons/fa";

const Company = ["About", "Careers", "Affiliates"]

const Support = ["Help Center"]

const Resources = ["Articles", "Blog", "Chart Sheet", "Code Challenges", "Docs", "Projects", "Videos", "Workspaces"]

const Plans = ["Paid memberships", "For Students", "Business Solutions"]

const Community = ["Forums", "Chapters", "Events"]

const BottomFooter = ["Privacy Policy", "Cookie Policy", "Terms"]


const Footer = () => {
  return (
    <div className='bg-richblack-800 text-richblack-200 '>
      {/* top */}
      <div className='w-11/12 max-w-maxContent mx-auto leading-6  py-14 px-4  '>

        <div className='border-b border-richblack-700 w-[100%] flex flex-col lg:flex-row pb-5'>

          {/* left side */}
          <div className='flex flex-wrap flex-row justify-between  lg:w-[50%] lg:border-r lg:border-richblack-700 gap-1'>

            {/* first col */}
            <div className='w-[35%] lg:w-[30%] flex flex-col  gap-4 mb-7  '>
              {/* logo */}
              <img src={Logo} alt='Logo' className='w-[40px] mr-10' />
              {/* heading */}
              <h1 className='text-richblack-50 font-semibold text-base'>Company</h1>
              {/* links */}
              <div className='flex flex-col gap-2'>
                {
                  Company.map((element, index) => {
                    return (
                      <div key={index} className='text-[14px] cursor-pointer hover:text-richblack-50 transiton-all duration-200'>
                        <Link to={element.toLowerCase()}>{element}</Link>
                      </div>
                    )
                  })
                }
              </div>
              {/* icons */}
              <div className='flex flex-row gap-4 text-lg'>
                <FaFacebook />
                <FaGoogle />
                <FaTwitter />
                <FaYoutube />
              </div>
            </div>

            {/* sec col */}
            <div className='w-[40%] lg:w-[30%] flex flex-col  gap-4 mb-7 '>
              <h1 className='text-richblack-50 font-semibold text-base'>Resources</h1>
              {/* links */}
              <div className='flex flex-col gap-2'>
                {
                  Resources.map((element, index) => {
                    return (
                      <div key={index} className='text-[14px] cursor-pointer hover:text-richblack-50 transiton-all duration-200'>
                        <Link to={element.toLowerCase()} >{element}</Link>
                      </div>
                    )
                  })
                }

              </div>

              <h1 className='text-richblack-50 font-semibold text-base'>Support</h1>
              {/* links */}
              <div className='flex flex-col gap-2'>
                {
                  Support.map((element, index) => {
                    return (
                      <div key={index} className='text-[14px] cursor-pointer hover:text-richblack-50 transiton-all duration-200'>
                        <Link to={element.toLowerCase()}>{element}</Link>
                      </div>
                    )
                  })
                }

              </div>

            </div>

            {/* third col */}
            <div className='w-[40%] lg:w-[38%]  flex flex-col gap-4 mb-7'>
              <h1 className='text-richblack-50 font-semibold text-base'>Plans</h1>
              {/* links */}
              <div className='flex flex-col gap-2'>
                {
                  Plans.map((element, index) => {
                    return (
                      <div key={index} className='text-[14px] cursor-pointer hover:text-richblack-50 transiton-all duration-200'>
                        <Link to={element.toLowerCase()}>{element}</Link>
                      </div>
                    )
                  })
                }
              </div>

              <h1 className='text-richblack-50 font-semibold text-base'>Community</h1>
              {/* links */}
              <div className='flex flex-col gap-2'>
                {
                  Community.map((element, index) => {
                    return (
                      <div key={index} className='text-[14px] cursor-pointer hover:text-richblack-50 transiton-all duration-200'>
                        <Link to={element.toLowerCase()}>{element}</Link>
                      </div>
                    )
                  })
                }
              </div>

            </div>

          </div>

          {/* right side */}
          <div className='flex flex-wrap flex-row justify-between  lg:w-[50%]  gap-1' >


            {
              FooterLink2.map((element, index) => {
                return (
                  <div key={index} className="w-[48%] lg:w-[30%] mb-7 pl-8">
                    <h1 className='font-semibold textt-base text-richblack-50'>
                      {element.title}
                    </h1>

                    {/* now using map to get the links */}
                    <div className="flex flex-col gap-2 mt-2">
                      {
                        element.links.map((link, i) => {
                          return (
                            <div key={index}
                              className="text-[14px] cursor-pointer hover:text-richblack-50 transition-all duration-200">

                              <Link to={link.link}>{link.title}</Link>
                            </div>
                          )
                        })
                      }
                    </div>

                  </div>
                )
              })
            }
          </div>

        </div>

      </div>

      {/* bottom */}
      <div className='flex flex-col sm:flex-row justify-between items-center w-11/12 max-w-maxContent mx-auto leading-6 pt-10 pb-6 text-sm  ' >

        <div className='flex justify-center sm:items-start gap-1 w-[100%] '>
          {
            BottomFooter.map((element, index) => {
              return (
                <div key={index} className=' flex cursor-pointer hover:text-richblack-50 transiton-all duration-200  pr-2'>
                  <Link to={element.split(" ").join("-").toLocaleLowerCase()}>{element}</Link>
                  <div className=' mt-1 px-1 border-r  border-richblack-600 h-[13px]'></div>
                </div>

              )
            })
          }

        </div>

        <div className='text-center w-full mt-2 sm:mt-0'>Made By: <HighlightText text={"SHAFIYA"}></HighlightText> </div>

      </div>

    </div>
  )
}
export default Footer