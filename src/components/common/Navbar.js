import React, { useEffect, useState } from 'react'
import { Link, matchPath } from 'react-router-dom'
import Logo from "../../assets/Logo/Logo-Full-Light.png"
import { NavbarLinks } from "../../data/navbar-links"
import { useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { AiOutlineShoppingCart } from "react-icons/ai"
import ProfileDropDown from '../core/Auth/ProfileDropDown'
import { apiConnector } from '../../services/apiConnector'
import { categories } from '../../services/apiLink'
import { BiDownArrow } from "react-icons/bi"

import { GiHamburgerMenu } from "react-icons/gi"
import ResponsiveNavbar from './ResponsiveNavbar'






const Navbar = () => {

  const { token } = useSelector((state) => state.auth)
  const { user } = useSelector((state) => state.profile)
  const { totalItems } = useSelector((state) => state.cart)
  const location = useLocation()

  const [subLinks, setSubLinks] = useState([])
  const [loading, setLoading] = useState(false)

  const [hamburger, setHamburger] = useState(false)


  // this function matches the path with the route and change the style properties
  function MatchRoute(route) {
    return matchPath({ path: route }, location.pathname)
  }


  useEffect(() => {
    async function FetchLinks() {

      setLoading(true)
      try {
        const res = await apiConnector("GET", categories.CATEGORIES_API)
      


        setSubLinks(res.data.data)
      } catch (error) {
        console.log("Could not fetch Categories.", error)
      }
      setLoading(false)

    }

    FetchLinks()
  }, [])




  return (
    <div className=' md:h-18 h-24 flex  item-center justify-center border-b border-richblack-600  '>

      {/* <div className='flex  sm:w-full w-[85%] border border-blue-100 max-w-maxContent items-center md:justify-evenly justify-between gap-2 mx-16 py-2  relative'> */}

      <div className='flex flex-row lg:w-11/12 md:w-[95%] w-full  max-w-maxContent items-center justify-between md:px-8 sm:px-4  px-3 '>


        <Link to="/" className=' ' >
          <img src={Logo}  alt='Logo' className='sm:max-w-[160px] sm:h-[42px] max-w-[140px] h-[35px]'
          />
        </Link>

        {/* className='w-[120px] h-[30px] sm:w-[160px] sm:h-[42px]' */}

        {/* navbar */}
        <nav className='invisible md:visible text-[15px] lg:text-[18px]'>
          <ul className='flex gap-4 text-richblack-25 items-center justify-start '>

            {
              NavbarLinks.map((element, index) => {
                return (
                  <li key={index}>
                    {
                      element.title === "Catalogue" ? (
                        <div className='flex items-center relative gap-1 group' >
                          <p className={`text-richblack-100 cursor-pointer`}>{element.title}</p>
                          <BiDownArrow className='w-[10px]'></BiDownArrow>

                          <div className='invisible absolute bg-white right-[50%]   flex flex-col gap-2 rounded-md p-3 text-richblack-800 opcaity-0 translate-x-[50%] translate-y-[80%] transition-all duration-200 group-hover:visible  group-hover:opacity-100 lg:w-[300px] mt-1 z-10 
                          border
                           border-blue-200 bg-opacity-10 backdrop-blur-md h-fit
                            '>

                            {
                              loading ? (
                                <p className="text-center">Loading...</p>
                              ) : subLinks.length ? (
                                <>
                                  {subLinks
                                    ?.filter(
                                      (subLink) => subLink?.courses?.length > 0
                                    )
                                    ?.map((subLink, i) => (
                                      <Link
                                        to={`/catalogue/${subLink.name
                                          .split(" ")
                                          .join("-")
                                          .toLowerCase()}`}
                                        className=' 
                                   '
                                        key={i}
                                      >
                                        <div>
                                          <p className='text-white  '>{subLink.name}</p>
                                          {/* <div className='w-fit h-[2px] hover:border-b hover:border-blue-100'></div> */}
                                        </div>
                                      </Link>
                                    ))}
                                </>
                              ) : (
                                <p className="text-center text-white">No Courses Found</p>
                              )}

                          </div>



                        </div>
                      )

                        :

                        (<Link to={element?.path} className={` ${MatchRoute(element.path) ? "text-yellow-50" : "text-richblack-100"}`}>
                          {element.title}
                        </Link>)
                    }
                  </li>
                )

              })

            }

          </ul>
        </nav>

        {/* buttons */}
        <div className='flex gap-x-3 items-center invisible md:visible text-[15px] lg:text-[18px]'>


          {/* showing Cart or not */}
          {
            user && user?.accountType !== "Instructor" && (
              <Link to="/dashboard/cart" className='relative p-[6px]'>
                <AiOutlineShoppingCart className='text-white text-[26px]' />

                {
                  totalItems > 0 && (
                    <div className='border-[2px] border-blue-200 h-5 w-5 rounded-full absolute top-[-5px] right-0 flex items-center justify-center '>
                      <span className='text-blue-100  '>{totalItems}</span>

                    </div>

                  )
                }
              </Link>
            )
          }


          {/* showing login and signup button */}
          {
            token === null && (
              <div className='flex gap-3 text-richblack-100 invisible md:visible'>
                <Link to="/login">
                  <button className='border border-richblack-600 bg-richblack-800 rounded-md px-3 py-2 hover:text-blue-50'>
                    Log In
                  </button>
                </Link>

                <Link to="/signup">
                  <button className='border border-richblack-600 bg-richblack-800 rounded-md px-3 py-2 hover:text-blue-50'>
                    Sign Up
                  </button>
                </Link>
              </div>

            )
          }

          {/* when user is logged in show dashboard and other functionality */}
          {/* hw - things add in the drop down dashboard, logout, learn ref hook  */}
          {
            token !== null &&
            <ProfileDropDown></ProfileDropDown>
          }

        </div>




        {/* hamburger icon */}
        <div className='text-white text-2xl md:invisible mr-8 absolute right-0 '
          onClick={() => setHamburger(!hamburger)}>
          <GiHamburgerMenu />
        </div>
        {
          hamburger && <div className='absolute   translate-x-24 top-3 right-14 z-20  
           h-fit w-[92%]  px-6 py-4 md:invisible'>
            <ResponsiveNavbar setHamburger={setHamburger} MatchRoute={MatchRoute} subLink={subLinks} />

          </div>
        }
      </div>




    </div>
  )
}

export default Navbar