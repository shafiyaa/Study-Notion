const { contactUsEmail } = require("../mail/templates/contact")   
const mailSender = require("../utils/mailSender")



exports.contactUs = async(req,res)=>{

  console.log("Contact us ke controller mei aa gaye")

    const { email, firstname, lastname, message, phoneNumber, countrycode } = req.body
    
   
    try{
        const emailRes = await mailSender(
            email,
            "Your Data send successfully",
            contactUsEmail(email, firstname, lastname, message, phoneNumber, countrycode)
          )
          console.log("Email Res ", emailRes)
          return res.json({
            success: true,
            message: "Email send successfully",
          })

        

    }catch(error){
        console.log("Error in Contact us", error)
    console.log("Error message :", error.message)
    return res.json({
      success: false,
      message: "Something went wrong...",
    })
    }
}