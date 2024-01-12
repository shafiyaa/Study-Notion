import { toast } from "react-hot-toast"
import { setLoading, setUser } from "../../reducers/slices/profileSlice"
import {logout} from "./authAPI"
import { apiConnector } from "../apiConnector"
import { profileEndpoints } from "../apiLink"


const { GET_USER_DETAILS_API,
    GET_USER_ENROLLED_COURSES_API,
    GET_INSTRUCTOR_DATA_API 
} = profileEndpoints


export function getUserDetails(token, navigate) {

    return async (dispatch) => {

        dispatch(setLoading(true))
        const toastId = toast.loading("Loading...")

        try {
            const response = await apiConnector("GET",
                GET_USER_DETAILS_API,
                null,
                { Authorization: `Bearer ${token}` })

           

            if (!response.data.success) {
                throw new Error(response.data.message)
            }

            // get the image
            const userImage = response.data.data.image ? response.data.data.image : `https://api.dicebear.com/5.x/initials/svg?seed=${response.data.data.firstName} ${response.data.data.lastName}`

            // get user details
            const userDetails = response.data.data

            dispatch(setUser({ userDetails, image: userImage }))

        } catch (error) {
            dispatch(logout(navigate))
            console.log("error in get user details api ", error)
            toast.error("User Details is not Found")
        }
        dispatch(setLoading(false))
        toast.dismiss(toastId)
    }
}

export async function getUserEnrolledCourses(token) {
  
 let result = []


 try{
        const response = await apiConnector(
            "GET",
        GET_USER_ENROLLED_COURSES_API,
        null,
        {
            Authorization: `Bearer ${token}`,   
        }
        )
             
        if(!response.data.success){
            throw new Error(response.data.message)
        }

        
        result = response.data.data
    

 }catch(error){
    console.log("error in profile api  get user Enrolled course")
    console.log(error)
 }

  return result

}

export async function getInstructorData(token){

    let result =[]
    try{

        const response = await apiConnector("GET",GET_INSTRUCTOR_DATA_API,null,
        {
            Authorization: `Bearer ${token}`,
        })

        
        result = response?.data?.courses

    }
    catch(error){
        console.log("GET_INSTRUCTOR_API ERROR", error);
    }
    return result
}