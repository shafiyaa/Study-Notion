import React, { useRef, useState } from 'react'
import { NavbarLinks } from "../../data/navbar-links"
import { Link, useNavigate } from 'react-router-dom'
import { BiDownArrow } from "react-icons/bi"
import  useOnClickOutside from "../../hooks/useOnClickOutside"
import { useSelector, useDispatch } from 'react-redux'
import { IoIosCloseCircleOutline } from "react-icons/io"
import { logout } from '../../services/operations/authAPI'

const ResponsiveNavbar = ({ setHamburger, MatchRoute, subLink }) => {

    const { token } = useSelector((state) => state.auth)
    const { user } = useSelector((state) => state.profile)

    const dispatch = useDispatch()
    const navigate = useNavigate()


    const [openCatalogue, setOpenCatalogue] = useState(false)
    const navRef = useRef(null);
    const catalogueRef = useRef(null)

    // useOnClickOutside(navRef, () => setHamburger(false))

    useOnClickOutside(navRef , ()=> setHamburger(false))
    useOnClickOutside(catalogueRef , ()=> setOpenCatalogue(false));

    return (
        <div   ref={navRef}  onClick={(event) => event.stopPropagation()}  className='md:invisible border border-blue-100 rounded-md py-2
    bg-white bg-opacity-10 backdrop-blur-md 
    flex flex-col gap-3 items-center relative
    '>


            <div className='hover:text-pink-400 text-richblack-100  absolute right-8 text-2xl '
                onClick={() => setHamburger(false)}>
                <IoIosCloseCircleOutline />
            </div>

            <ul className='flex flex-col gap-3 items-center justify-start mt-8'
               >
                {
                    NavbarLinks.map((element, index) => (
                        <li key={index} className='cursor-pointer  py-2 px-4'>

                            {
                                element.title === "Catalogue" ? (
                                    <div onClick={() => setOpenCatalogue(!openCatalogue)}
                                        className='flex items-center gap-2 text-richblack-100 relative group'
                                    >
                                        <p className='group-hover:text-blue-100'>{element.title}</p>
                                        <BiDownArrow className={`w-[10px] group-hover:text-blue-300
                                          ${openCatalogue ? "rotate-0" : "-rotate-90 "}
                                          transition-all duration-200
                                        `
                                        }></BiDownArrow>

                                        {openCatalogue &&
                                            <div ref={catalogueRef}
                                                className={`border border-blue-200 rounded-md h-fit w-fit absolute top-[50%]  -left-4 right-10 translate-y-[25%] z-20  bg-white bg-opacity-10 backdrop-blur-md py-4 px-10 flex flex-col gap-6
                                     `}>
                                                {
                                                    subLink.length ? (

                                                        subLink.map((subLink, index) => {
                                                            return (
                                                                <Link key={index}
                                                                    to={`/catalogue/${subLink.name
                                                                        .split(" ")
                                                                        .join("-")
                                                                        .toLowerCase()}`}
                                                                    className='hover:text-blue-300 '>
                                                                    {subLink.name}
                                                                </Link>
                                                            )
                                                        })

                                                    ) :
                                                        (<div>No Data Available</div>)
                                                }
                                            </div>

                                        }






                                    </div>
                                )
                                    :
                                    (<Link
                                        to={element?.path}
                                        className={`${MatchRoute(element.path) ? "text-blue-100 " : "text-richblack-100  hover:text-blue-300"}`}                    >
                                        {element.title}
                                    </Link>)
                            }

                        </li>
                    ))
                }

            </ul>

            {/* buttons */}


            {
                token === null && (
                    <Link to="/login">
                        <button className=' py-2 px-3   rounded-lg text-richblack-100
                        hover:text-blue-300'>
                            Log in
                        </button>
                    </Link>
                )

            }

            {
                token === null && (
                    <Link to={"/signup"}>
                        <button className='py-2 px-3   rounded-lg  text-richblack-100 hover:text-blue-300   '>
                            Sign up
                        </button>
                    </Link>
                )
            }

            {
                user && user?.accountType !== "Instructor" && (
                    <Link to="/dashboard/cart" className='relative p-[6px]'>
                        {/* <AiOutlineShoppingCart className='text-white text-[26px]' /> */}
                        <p className='text-richblack-100 hover:text-blue-300'>Cart</p>
                    </Link>
                )
            }

            {
                token !== null && (
                    <Link to={"/dashboard/my-profile"}>
                        <button className='  text-richblack-100 hover:text-blue-300   '>
                            Dashboard
                        </button>
                    </Link>
                )


            }
            {
                token !== null && (
                    <Link to={"/"}
                    onClick={()=>dispatch(logout(navigate))}>
                        <button className='  text-richblack-100 hover:text-blue-300   '>
                            Logout
                        </button>
                    </Link>
                )


            }








        </div>
    )
}

export default ResponsiveNavbar