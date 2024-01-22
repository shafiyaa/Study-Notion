

import { toast } from "react-hot-toast";
import { setLoading, setToken } from "../../reducers/slices/authSlice"
import { resetCart } from "../../reducers/slices/cartSlice"
import { setUser } from "../../reducers/slices/profileSlice"
import { apiConnector } from "../apiConnector";
import { endpoints } from "../apiLink";
// import { useNavigate } from "react-router-dom";

// destructuring the API's
const { SENDOTP_API, SIGNUP_API, LOGIN_API, RESETPASSWORD_API, RESETPASSTOKEN_API } = endpoints

// sendOtp function
export function sendOtp(email, navigate) {
    return async (dispatch) => {

        // dispatch(setLoading(true))
        const toastId = toast.loading("Loading...")

        try {
            const response = await apiConnector("POST", SENDOTP_API, {
                email,
                checkUserPresent: true
            })



            if (!response.data.success) {
                throw new Error(response.data.message)
            }

            toast.success("OTP Sent Successfully")
            navigate("/verify-email")

        } catch (error) {
            console.log("send OTP API error: ", error)
            toast.error("Error in OTP Sending")
        }

        // dispatch(setLoading(false))
        toast.dismiss(toastId)

    }
}


// signup function
export function signUp(accountType, firstName, lastName, email, password, confirmPassword, otp, navigate) {
    return async (dispatch) => {

        dispatch(setLoading(true))

        try {

            const response = await apiConnector("POST", SIGNUP_API,
                {
                    accountType,
                    firstName,
                    lastName,
                    email,
                    password,
                    confirmPassword,
                    otp,
                })

            if (!response.data.success) {
                throw new Error(response.data.message)
            }

            
            toast.success("Signup Successfully")
            navigate("/login")


        } catch (error) {
          
            toast.error("Signup Failed")
            navigate("/signup")
        }
        dispatch(setLoading(false))

    }
}

// login function
export function login(email, password, navigate) {
    return async (dispatch) => {

        dispatch(setLoading(true))
       

        try {
            const response = await apiConnector("POST", LOGIN_API, { email, password });

            if (!response.data.success) {
                throw new Error(response.data.message)
            }
            toast.success("Login Successfully")
            dispatch(setToken(response.data.token))

            // agr image ayi toh image set kr denge nhi toh initials set kr denge
            const userImage = response.data?.user?.image ? response.data.user.image :
                `https://api.dicebear.com/5.x/initials/svg?seed=${response.data.user.firstName} ${response.data.user.lastName}`

            dispatch(setUser({ ...response.data.user, image: userImage }))

            localStorage.setItem("token", JSON.stringify(response.data.token))
            localStorage.setItem("user", JSON.stringify(response.data.user))

            navigate("/dashboard/my-profile")

        } catch (error) {
            console.log("Lgin API error: ", error)
            toast.error("Login Failed")
        }
        dispatch(setLoading(false))
       

    }
}


// password reset token
export function getPasswordResetToken(email, setEmailSent) {
    return async (dispatch) => {

        dispatch(setLoading(true))


        try {

            const response = await apiConnector("POST", RESETPASSTOKEN_API, {
                email,
            })


         
            if (!response.data.success) {
                throw new Error(response.data.message)
            }

            toast.success("Reset Email Sent")
            setEmailSent(true)


        } catch (error) {
            console.log("reset password token error: ", error)
            toast.error("Failed To Send Reset Email")
        }

        dispatch(setLoading(false))
    }
}

// reset password
export function resetPassword(password, confirmPassword, token, navigate) {



    return async (dispatch) => {

        dispatch(setLoading(true))
        try {
          
            const response = await apiConnector("POST", RESETPASSWORD_API, {
                password,
                confirmPassword,
                token,
            })
            
            if (!response.data.success) {
                
                throw new Error(response.data.message)
            }

            toast.success("Password Reset Successfully")
            navigate("/login");
        } catch (error) {
            
            console.log("reset password error: ", error)
            toast.error("Failed To Reset Password")
        }

        dispatch(setLoading(false))
    }

}

//   logout
export function logout(navigate) {
    return (dispatch) => {
        dispatch(setToken(null))
        dispatch(setUser(null))
        dispatch(resetCart())
        localStorage.removeItem("token")
        localStorage.removeItem("user")
        toast.success("Logged Out")
        navigate("/")
    }
}