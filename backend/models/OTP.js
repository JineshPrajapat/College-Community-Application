const mongoose = require("mongoose");

const OTPSchema = new mongoose.Schema({
    email:{
        type:String,
        required:true
    },
    otp:{
        type:String,
        required:true
    },
    createdAT:{
        type:Date,
        default:Date.now(),
        expires:5*60
    }
});

// a function to send emails

async function sendVerification(email, otp){
    try{
        const mailResponse = await mailSender(email, "verification from ctae");
        console.log("Email sent successfully");
    }
    catch(error){
        console.log("error occured while sending mail");
    }
}

OTPSchema.pre("save", async function(next){
    await sendVerificationEmail(this.email, this.otp);
    next();
})

module.exports = mongoose.model("OTP", OTPSchema);
