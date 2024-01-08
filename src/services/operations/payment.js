import {toast} from "react-hot-toast"
import { studentEndpoints } from "../apiLink"
import { apiConnector } from "../apiConnector"
import rzpLogo from "../../assets/Logo/rzp_logo.png"
import { resetCart } from "../../reducers/slices/cartSlice"
// import { setPaymentLoading } from "../../reducers/slices/courseSlice"

const {COURSE_PAYMENT_API, COURSE_VERIFY_API, SEND_PAYMENT_SUCCESS_EMAIL_API} = studentEndpoints;

const key = "rzp_test_bGuCXBdp5wORnM"


// this function adds the script in the runtime of the code
function loadScript(src) {
    return new Promise((resolve) => {
        const script = document.createElement("script");
        script.src = src;

        script.onload = () => {
            resolve(true);
        }
        script.onerror= () =>{
            resolve(false);
        }
        document.body.appendChild(script);
    })
}

export async function buyCourse(token, courses,userDetails, navigate, dispatch){
    const toastId = toast.loading("Loading...")
   
    try{
     
        // load the script
        const res = await loadScript("https://checkout.razorpay.com/v1/checkout.js");
          

        if(!res) {
            toast.error("RazorPay SDK failed to load");
            return;
        }

        // initiate the order
       
        const orderResponse = await apiConnector("POST", COURSE_PAYMENT_API, {courses}, {
            Authorization: `Bearer ${token}`
        })
        

        if(!orderResponse.data.success){
            console.log("error in buyCourse")
            throw new Error(orderResponse.data.message)
        }
       
      
// create the options
        const options =
        {
            key : key,
            currency: orderResponse.data.data.currency,
            amount: `${orderResponse.data.data.amount}`,
            order_id: orderResponse.data.data.id,
            name:"StudyNotion",
            description: "Thank You for Purchasing the Course",
            image:rzpLogo,
            prefill: {
                name:`${userDetails.firstName}`,
                email:userDetails.email
            },

           
            handler: function(response) {
                //send successful wala mail
                sendPaymentSuccessEmail(response, orderResponse.data.data.amount,token );

                //verifyPayment
                verifyPayment({...response, courses}, token, navigate, dispatch);
            }

        }
       
        
        // it shows the paymentwindow
     
        const paymentObject = new window.Razorpay(options)
        paymentObject.open()
        paymentObject.on("payment.failed", function(response){
            toast.error("payment failed")
            console.log("payment is failed")
            console.log(response.error)
        })

    }catch(error){
        console.log("error in buy course")
        console.log(error)
        toast.error("Could not make the Payment")
    }
    toast.dismiss(toastId)
}

async function sendPaymentSuccessEmail(response, amount, token){
    
    try{
        
         await apiConnector("POST",
        SEND_PAYMENT_SUCCESS_EMAIL_API, {
            orderId : response.raxorpay_order_id,
            paymentId: response.raxorpay_payment_id,
            amount
        },{
            Authorization: `Bearer ${token}`
        })
       
       
            toast.success("Enrollment Email is Sent")
       

    }catch(error){
        console.log("error in send Payment Success Email")
       
    }

}

// verify payment
async function verifyPayment(bodyData,token, navigate,dispatch) {
   
    const toastId = toast.loading("Verifying Payment...")
   
   

    try{

        const response = await apiConnector("POST", COURSE_VERIFY_API, bodyData, {
            Authorization:`Bearer ${token}`
        })
        if(!response.data.success) {
            throw new Error(response.data.message);
        }

        
        dispatch(resetCart());
        toast.success("payment Successful, you are addded to the course");
        navigate("/dashboard/enrolled-courses");

        
     
       
        
    }catch(error){
        console.log("Error in verify payment")
        console.log(error)
        
    }

    toast.dismiss(toastId);
    
}