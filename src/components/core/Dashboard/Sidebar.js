import React, { useState } from 'react'
import { sidebarLinks } from '../../../data/dashboard-links'
import { logout } from '../../../services/operations/authAPI'
import { useDispatch, useSelector } from 'react-redux'
import SidebarOption from './SidebarOption'
import ConfirmationModal from '../../common/ConfirmationModal'
import { useNavigate } from 'react-router-dom'
import { VscSignOut } from 'react-icons/vsc'

const Sidebar = () => {
    const { user, loading: profileLoading } = useSelector((state) => state.profile)
    const { loading: authLoading } = useSelector((state) => state.auth)

    const dispatch = useDispatch()
    const navigate = useNavigate

    const [confirmationModal, setConfirmationModal] = useState(null)



    if (profileLoading || authLoading) {
        return (
            <div className=' text-4xl mt-20 text-white '>Loading</div>
        )
    }

    return (
        <div className='text-white relative'>
            <div className='flex flex-col  min-w-[222px]  border-r border-richblack-700 h-[calc(100vh-3.5rem)] bg-richblack-800 py-4'>

                {/* options */}
                <div className='flex flex-col'>
                    {
                        sidebarLinks.map((link) => {
                            if (link.type && user?.accountType !== link.type) {
                                return null
                            }
                            return (
                                <div className='w-full'>
                                    <SidebarOption link={link} iconName={link.icon} key={link.id} />
                                </div>
                            )


                        })
                    }
                </div>

                {/* separation line */}
                <div className='mx-auto mt-6 mb-6 h-[1px] w-10/12 bg-richblack-600'></div>


                {/* setting */}
                <div className='flex flex-col'>
                    <SidebarOption
                        link={{ name: "Settings", path: "/dashboard/settings" }} iconName="VscSettingsGear"> </SidebarOption>

                    {/* Logout */}
                    <button
                        onClick={() => setConfirmationModal({
                            text1: "Are You Sure ?",
                            text2: "You will be logged out of your Account",
                            btn1Text: "Logout",
                            btn2Text: "Cancel",
                            btn1Handler: () => dispatch(logout(navigate)),
                            btn2Handler: () => setConfirmationModal(null),
                        })}
                        className='text-sm font-medium text-richblack-300'
                    >
                        <div className='flex items-center gap-x-2 ml-4 mt-2 text-richblack-100 textlg'>
                            <VscSignOut className='text-lg' />
                            <span>Logout</span>
                        </div>

                    </button>



                </div>

            </div>

            {confirmationModal &&
                <ConfirmationModal modalData={confirmationModal} />}
        </div>
    )
}



export default Sidebar