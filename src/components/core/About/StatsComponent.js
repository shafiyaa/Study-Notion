import React from 'react'



const stats =[
    {count:"5K", label:"Active Students"},
    {count:"10+", label:"Mentors"},
    {count:"200+", label:"Courses"},
    {count:"50+", label:"Awards"}
]
const StatsComponent = () => {
  return (
    <div>
       <div className='sm:flex sm:justify-evenly sm:gap-10  bg-richblack-800 w-full mx-auto py-10 '>
        {
            stats.map( (data, index)=>{
                return (
                    <div className=' p-4 flex flex-col items-center ' key={index}>
                        <p className='text-richblack-5 text-2xl font-semibold'>{data.count}</p>
                        <p className='text-richblack-300'>{data.label}</p>
                        <div className='h-[1px] w-[90px] bg-blue-100 sm:hidden'></div>
                    </div>
                )
            })
        }
       </div>
    </div>
  )
}

export default StatsComponent