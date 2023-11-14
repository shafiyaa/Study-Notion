const {instance} = require("../config/razorpay");
const Course = require("../models/Course");
const User = require("../models/User");
const CourseProgress = require("../models/CourseProgress")
const mailSender = require("../utils/mailSender");
const {courseEnrollmentEmail} = require("../mail/templates/courseEnrollmentEmail");
const { default: mongoose,  } = require("mongoose");
const { paymentSuccessEmail } = require("../mail/templates/paymentSuccessEmail");
const crypto = require("crypto");




exports.capturePayment = async(req, res) =>{

    console.log("in the capture payment")
    const {courses} = req.body
    const userId = req.user.id
   console.log("userId is ", userId)

    if(courses.length === 0){
        return res.json({
            success:false,
            message:"Please provide the Course Id"
        })
    }
   
    console.log("after checking courses length")
    // find the total amount of all courses
    let totalAmount = 0

    for(const course_id of courses){
        console.log("in the for loop")
        let course
        
        try{
            course = await Course.findById(course_id)
            if(!course){
                return res.status(200).json({
                    success:false,
                    message:"Could not find the course"
                })
            }

            const uid = new mongoose.Types.ObjectId(userId)
            console.log("UID is ",uid)
            // checking the user is already enrolled in the course
            if(course.studentsEnrolled.includes(uid)){
                return res.status(200).json({
                    success:false,
                    message: "You are already Enrolled"
                })
            }

            totalAmount += course.price
            console.log("total amount is ", totalAmount)

        }catch(error){
            console.log("error while calculate the total amount")
            console.log(error)
            return res.status(500).json({
                success:false,
                message: error.message
            })

        }
    }
   

    // create the option
    // const currency = "INR"
    const options = {
        amount: totalAmount * 100,
        currency:"INR",
        receipt: Math.random(Date.now()).toString()

    }
  
    // Initializing the Order
    try{
        const paymentResponse = await instance.orders.create(options)
      
        return res.json({
            success:true,
            data: paymentResponse
        })

    }catch(error){
        console.log("Error while Initializing the order")
        console.log(error)
        return res.status(500).json({
            success:false,
            message:"Could not Initiate the Order"
        })
    }



   
}

// payment verification
exports.verifySignature = async(req, res)=>{

    try{
        console.log("in the verifySignature")
    const razorpay_order_id = req.body?.razorpay_order_id
    const razorpay_payment_id = req.body?.razorpay_payment_id
    const razorpay_signature = req.body?.razorpay_signature

    const courses = req.body?.courses
    const userId = req.user.id

    if(!razorpay_order_id || !razorpay_payment_id || !razorpay_signature || !courses || !userId){
        
        return res.status(200).json({
            success:false,
            message:"Payment Failed"
        })
    }


    let body = razorpay_order_id + "|" + razorpay_payment_id

const expectedSignature = crypto
.createHmac("sha256",process.env.RAZORPAY_SECRET)
.update(body.toString())
.digest("hex")

if(expectedSignature === razorpay_signature){
    // enrolling the student in the course
    await enrollStudents(courses, userId, res)
    return res.status(200).json({
        success:true,
        message:"Payment Verified"
    })
}

    }catch(error){
        console.log("error in verify Signature")
        return res.status(200).json({
            success:"false",
            messgae:"Payment failed - Signature in not matched"
        })
    }

}

exports.sendPaymentSuccessEmail = async(req, res) =>{
    console.log("in the send Payment Success Email")

  const {orderId, paymentId, amount} = req.body

  const userId = req.user.id

  if(!orderId || !paymentId || !amount || !userId ){
    return res.status(400).json({
        success:false, 
        message:"Please provide all the fields"
    })
  }

  try{
    const enrolledStudent = await User.findById(userId)

    await mailSender(
        enrolledStudent.email, `Payment Received`,
        paymentSuccessEmail(`${enrolledStudent.firstName}`, amount/100, orderId, paymentId)
    )
    
  }catch(error){
    console.log(" error in sending  payment success email", error)
    return res.status(500).json({success:false, message:"Could not send email"})
  }

}


// function to enroll Student in the buyed course
const enrollStudents = async(courses, userId, res)=>
{
console.log("in the enrollStudent")

    if(!courses || !userId){
        return res.status(400).json({
            success:false,
            messgae:"Couses Or UserId is not provided"
        })
    }
  

    for(const courseId of courses){

        try{
            // find the course add the student in the course
            const enrolledCourse = await Course.findByIdAndUpdate(
                {_id:courseId},
                {
                    $push:{
                        studentsEnrolled:userId
                    }
                },
                {new:true}
            )

            if(!enrolledCourse){
                return res.status(500).json({
                    success:false,
                    error: "Course not found"
                })
            }

            console.log("Updated course: ", enrolledCourse)

// add course progress 
            const courseProgress = await CourseProgress.create({
                courseID:courseId,
                userId:userId,
                completedVideos: [],
            })

            // find the student and add the course to the Student
             const enrolledStudent = await User.findByIdAndUpdate(
                userId,
                {$push:{
                    courses:courseId,
                    courseProgress: courseProgress._id,
                }},
                {new:true}
             )
             console.log("Enrolled student: ", enrolledStudent)

            //  send mail to the studnet
            const emailResponse = await mailSender(enrolledStudent.email,
                `Successfully Enrolled into ${enrolledCourse.courseName}`,
                courseEnrollmentEmail( 
                    enrolledCourse.courseName, 
                    `${enrolledStudent.firstName}
                     ${enrolledStudent.lastName}
                    `)
                )

                console.log("Email Sent Successfully", emailResponse.response);

        }catch(error){
            console.log("error in enroll students function")
            console.log(error)
            return res.status(500).json({
                success:false,
                message:error.message
            })
        }
    }
}









// ------------------------------old Code - it is for buying single Item ---------------------------------------

//capture the payment and initiate the Razorpay order

// exports.capturePayment = async (req, res) => {
//     //get courseId and UserID
//     const {course_id} = req.body;
//     const userId = req.user.id;
//     //validation
//     //valid courseID
//     if(!course_id) {
//         return res.json({
//             success:false,
//             message:'Please provide valid course ID',
//         })
//     };
//     //valid courseDetail
//     let course;
//     try{
//         course = await Course.findById(course_id);
//         if(!course) {
//             return res.json({
//                 success:false,
//                 message:'Could not find the course',
//             });
//         }

//         //user already pay for the same course
//         const uid = new mongoose.Types.ObjectId(userId);
//         if(course.studentsEnrolled.includes(uid)) {
//             return res.status(200).json({
//                 success:false,
//                 message:'Student is already enrolled',
//             });
//         }
//     }
//     catch(error) {
//         console.error(error);
//         return res.status(500).json({
//             success:false,
//             message:error.message,
//         });
//     }
    
//     //order create
//     const amount = course.price;
//     const currency = "INR";

//     const options = {
//         amount: amount * 100,
//         currency,
//         receipt: Math.random(Date.now()).toString(),
//         notes:{
//             courseId: course_id,
//             userId,
//         }
//     };

//     try{
//         //initiate the payment using razorpay
//         const paymentResponse = await instance.orders.create(options);
//         console.log(paymentResponse);
//         //return response
//         return res.status(200).json({
//             success:true,
//             courseName:course.courseName,
//             courseDescription:course.courseDescription,
//             thumbnail: course.thumbnail,
//             orderId: paymentResponse.id,
//             currency:paymentResponse.currency,
//             amount:paymentResponse.amount,
//         });
//     }
//     catch(error) {
//         console.log(error);
//         res.json({
//             success:false,
//             message:"Could not initiate order",
//         });
//     }
    

// };

//verify Signature of Razorpay and Server

// exports.verifySignature = async (req, res) => {
//     const webhookSecret = "12345678";

//     const signature = req.headers["x-razorpay-signature"];

//     const shasum =  crypto.createHmac("sha256", webhookSecret);
//     shasum.update(JSON.stringify(req.body));
//     const digest = shasum.digest("hex");

//     if(signature === digest) {
//         console.log("Payment is Authorised");

//         const {courseId, userId} = req.body.payload.payment.entity.notes;

//         try{
//                 //fulfil the action

//                 //find the course and enroll the student in it
//                 const enrolledCourse = await Course.findOneAndUpdate(
//                                                 {_id: courseId},
//                                                 {$push:{studentsEnrolled: userId}},
//                                                 {new:true},
//                 );

//                 if(!enrolledCourse) {
//                     return res.status(500).json({
//                         success:false,
//                         message:'Course not Found',
//                     });
//                 }

//                 console.log(enrolledCourse);

//                 //find the student andadd the course to their list enrolled courses me 
//                 const enrolledStudent = await User.findOneAndUpdate(
//                                                 {_id:userId},
//                                                 {$push:{courses:courseId}},
//                                                 {new:true},
//                 );

//                 console.log(enrolledStudent);

//                 //mail send krdo confirmation wala 
//                 const emailResponse = await mailSender(
//                                         enrolledStudent.email,
//                                         "Congratulations from CodeHelp",
//                                         "Congratulations, you are onboarded into new CodeHelp Course",
//                 );

//                 console.log(emailResponse);
//                 return res.status(200).json({
//                     success:true,
//                     message:"Signature Verified and COurse Added",
//                 });


//         }       
//         catch(error) {
//             console.log(error);
//             return res.status(500).json({
//                 success:false,
//                 message:error.message,
//             });
//         }
//     }
//     else {
//         return res.status(400).json({
//             success:false,
//             message:'Invalid request',
//         });
//     }


// };