import React, { useEffect, useState } from 'react'
import Footer from '../components/common/Footer'
import { useParams } from 'react-router-dom'
import { apiConnector } from '../services/apiConnector'
import { categories } from '../services/apiLink'
import { getCatalogueData } from '../services/operations/getCatalogueData'
import CourseSlider from '../components/core/Catalogue/CourseSlider'
import CatalogueCard from '../components/core/Catalogue/CatalogueCard'

const Catalouge = () => {
    const [loading, setLoading] = useState(false)
    const { catalogueName } = useParams()

    const [cataloguePageData, setCataloguePageData] = useState(null)
    const [categoryId, setCategoryId] = useState("")
    const [active, setActive] = useState(1)

    const courseFilter = [
        {
            id: 1,
            name: "Most Popular"
        },
        // {
        //     id: 2,
        //     name: "New"
        // },
        // {
        //     id:3,
        //     name:"Trending"
        // }
    ]


    // fetching all the categories
    useEffect(() => {
        const getCategories = async () => {
            setLoading(true)
            const result = await apiConnector("GET", categories.CATEGORIES_API)
            // console.log("result", result);

            const category_id = result?.data?.data?.filter((ct) => ct.name.split(" ").join("-").toLowerCase() === catalogueName)[0]._id;


            setCategoryId(category_id)
            setLoading(false)
        }
        getCategories()

    }, [catalogueName])


    useEffect(() => {
        const getCategoryDetails = async () => {
            setLoading(true)
            try {
                const result = await getCatalogueData(categoryId);
                console.log("printing the category response", result)
                setCataloguePageData(result)

            } catch (error) {
                console.log("error in getCategoryDetails")
                console.log(error)

            }
            setLoading(false)
        }

        if (categoryId) {
            getCategoryDetails()
        }

    }, [categoryId])

    if (loading) {
        return (
            <div className='grid place-items-center h-[500px] '>
                <div className='custom-loader'></div>
            </div>
        )
    }

    return (
        <div className='text-white'>

        {/* top part */}
            <div className='w-full bg-richblack-800 py-12  pl-16'>
                <p className='text-richblack-300'>{`Home / Catalogue / `}
                    <span className='text-yellow-50'> {cataloguePageData?.data?.selectedCategory?.name}  </span>
                </p>
                <p className='text-3xl my-2'> {cataloguePageData?.data?.selectedCategory?.name} </p>
                <p className='text-richblack-200'> {cataloguePageData?.data?.selectedCategory?.description} </p>
            </div>

            <div className='w-9/12 mx-auto'>
                {/* section 1 */}
                <section className='py-4'>
                    {/* tab */}
                    <p className='md:text-4xl text-2xl my-3'>Courses to get you Started</p>

                    {/* Course Filter */}
                    <div className='relative'>
                        <div className='flex gap-8  px-16  text-lg  '>
                            {
                                courseFilter.map((data) => (

                                    <div key={data.id} 
                                    onClick={()=>setActive(data.id)}
                                    className='group relative transition-all px-4  '>
                                        <p 
                                        className={`${active === data.id ? "text-yellow-100":"text-richblack-300"} cursor-pointer relative 
                                        transition-all duration-200  `}
                                        // className='relative  cursor-pointer group-hover:text-yellow-100'
                                        >{data.name}</p>
                                        <span className=' z-10 absolute b-0 l-0 h-[2px] w-0 bg-yellow-500  transition-all duration-400 ease-linear  
                                        '></span>

                                    </div>
                                    
                                ))
                            }


                        </div>

                        <div className=' ml-16 bg-richblack-600 w-11/12 h-[2px] absolute'></div>

                    </div>




                    <div className='mt-5 px-16'>
                        <CourseSlider Courses={cataloguePageData?.data?.selectedCategory?.courses} />
                    </div>

                    <hr className='my-8 text-richblack-700' />

                </section>

                {/* section 2 */}
                <section className='py-2'>
                    <p className='md:text-4xl text-2xl my-3'>Top Courses in Other Categories
                    {cataloguePageData?.data?.selectedCategory?.name}
                    </p>
                    <div className='mt-5 px-16'>
                        <CourseSlider Courses={cataloguePageData?.data?.differentCategory?.courses}></CourseSlider>
                    </div>
                </section>
                <hr className='my-8 text-richblack-700' />
                {/* section 3 */}
                <section className='py-2'>
                    <p className='md:text-4xl text-2xl my-3'>Frequently Bought Courses</p>
                    <div className=' mt-5 px-16 grid grid-cols-1 md:grid-cols-2  md:gap-20 gap-14 '>

                        {
                            cataloguePageData?.data?.mostSellingCourses?.slice(0, 4).map((course, index) => (

                                < CatalogueCard key={index} course={course} className=""/>
                            ))

                        }
                    </div>

                </section>
            </div>

            <div className='mt-[100px]'></div>
            <Footer></Footer>
        </div>
    )
}

export default Catalouge