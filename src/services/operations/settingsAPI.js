import { toast } from "react-hot-toast";

import { setLoading, setUser } from "../../reducers/slices/profileSlice";
import { apiConnector } from "../apiConnector";
import { settingsEndpoints } from "../apiLink";
import { logout } from "./authAPI"

const {
    UPDATE_DISPLAY_PICTURE_API,
    UPDATE_PROFILE_API,
    CHANGE_PASSWORD_API,
    DELETE_PROFILE_API,
} = settingsEndpoints

export function updateDisplayPicture(token, formData) {

    return async (dispatch) => {
        dispatch(setLoading(true))

        try {
          
            const response = await apiConnector("PUT",
                UPDATE_DISPLAY_PICTURE_API,
                formData,
                {
                    "Content-Type": "multipart/form-data",
                    Authorization: `Bearer ${token}`
                })

           

            if (!response.data.success) {
                console.log("updating failed")
                throw new Error(response.data.message)
            }

            localStorage.removeItem("randomImage")
            toast.success("Diplay picture is Updated")

            localStorage("user", JSON.stringify(response.data.data))

            dispatch(setUser(response.data.data))




        } catch (error) {
            console.log("error in Update Profle Picute: ", error)
            toast.error("Display Picture is not Update")
        }
        dispatch(setLoading(false))
    }
}


export function updateProfile(token, formData) {
    return async (dispatch) => {

        dispatch(setLoading(true))
        const toastId = toast.loading("Loading...");
       

        try {
            
            const response = await apiConnector("PUT",
                UPDATE_PROFILE_API, formData, {
                Authorization: `Bearer ${token}`
            })
          

            if (!response.data.success) {
                throw new Error(response.data.message)
            }

            const userImage = response.data.updatedUserDetails.image ? response.data.updatedUserDetails.image :
                `https://api.dicebear.com/5.x/initials/svg?seed=${response.data.updatedUserDetails.firstName} ${response.data.updatedUserDetails.lastName}`

            dispatch(setUser({ ...response.data.updatedUserDetails, image: userImage }))

            toast.success("Profile Updated")

        } catch (error) {
            console.log("Error in update Profile: ", error)
            toast.error("Profile is not Updated!!!")

        }
        toast.dismiss(toastId)
        dispatch(setLoading(false))

    }

}


export  function changePassword(token, data) {
   
    
   return async(dispatch)=>{
    
    dispatch(setLoading(true))
    const toastId = toast.loading("Loading...")
    try {
        const response = await apiConnector("POST", CHANGE_PASSWORD_API, data, {
            Authorization: `Bearer ${token}`,
        })

        if (!response.data.success) {
            throw new Error(response.data.message)
        }

        toast.success("Password Changed Successfully")
    } catch (error) {
            console.log("error in chnage password(service): ", error)
            toast.error("Problem in updating password")
    }
    toast.dismiss(toastId)
    dispatch(setLoading(false))
   }
    
   

}


export function deleteProfile (token, navigate) {
    return async(dispatch)=>{
        const toastId = toast.loading("Loading...")
        dispatch(setLoading(true))

        try{
            const response = await apiConnector("DELETE", DELETE_PROFILE_API, null, {
                Authorization: `Bearer ${token}`
            })
           
            if (!response.data.success) {
                throw new Error(response.data.message)
              }
              toast.success("Profile Deleted Successfully")
              dispatch(logout(navigate))

        }catch(error){
            console.log("error in delete profile(service)", error)
            toast.error("Could Not Delete Profile")

        }
        toast.dismiss(toastId)
        dispatch(setLoading(false))
    }
    
}