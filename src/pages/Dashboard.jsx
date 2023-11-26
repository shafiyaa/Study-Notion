import React from 'react'
import { useSelector } from 'react-redux'
import { Outlet } from 'react-router-dom'
import Sidebar from '../components/core/Dashboard/Sidebar'

const Dashboard = () => {
    const { laoding: authLoading } = useSelector((state) => state.auth)
    const { loading: profileLoading } = useSelector((state) => state.profile)

    if (authLoading || profileLoading) {
        return (
            <div className='custom-loader flex justify-center items-center h-full'></div>
        )
    }
    return (
        <div className='relative flex min-h-[calc(100vh-3.5rem)]'>

            <Sidebar ></Sidebar>

            <div className='h-[calc(100vh-3.5rem)] w-11/12 overflow-auto'>
                <div  >
                    <Outlet></Outlet>
                    <div className='h-[100px]'></div>
                </div>

            </div>

               

        </div>
    )

}

export default Dashboard