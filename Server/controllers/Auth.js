const User = require("../models/User");
const OTP = require("../models/OTP");
const otpGenerator = require("otp-generator");
const bcrypt = require("bcryptjs");
const Profile = require("../models/Profile");
const jwt = require("jsonwebtoken");
const mailSender = require("../utils/mailSender");
const { passwordUpdated } = require("../mails/passwordUpdate");
require("dotenv").config();

// sendOTP
exports.sendOTP = async (req, res) => {
    try {

        // fetch email form req.body
        const { email } = req.body;
        // check user already exists or not
        const checkUserPresent = await User.findOne({ email });

        // if user already exists then return a response
        if (checkUserPresent) {
            return res.status(401).json({
                success: false,
                message: "User already exists",
            });
        }
        console.log(email);
        // generate OTP
        var otp = otpGenerator.generate(6, {
            upperCaseAlphabet: false,
            lowerCaseAlphabets: false,
            specialChars: false,
        });
        console.log("OTP generated : ", otp);

        // is otp unique
        let result = await OTP.findOne({ otp: otp });

        while (result) {
            otp = otpGenerator.generate(6, { upperCaseAlphabets: false, specialChars: false });
            result = await OTP.findOne({ otp: otp });
        }

        const otpPayload = { email, otp };

        // create an entry in DB for OTP
        const otpBody = await OTP.create(otpPayload);
        console.log("otpbody -> ", otpBody);

        // return success response
        res.status(200).json({
            success: true,
            message: "OTP sent Successfully",
            otp: otpPayload.otp,
        });

    } catch (err) {
        // console.log("error -> ", err);
        res.status(500).json({
            success: false,
            message: err.message,
        });
    }
}

// signUp
exports.signUp = async (req, res) => {
    try {

        // data fetch from req.body
        const {
            username,
            email,
            password,
            accountType,
            otp
        } = req.body;


        console.log(req.body);

        // data validation
        if (!username || !email || !password || !otp) {
            return res.status(403).json({
                success: false,
                message: "All fields are required",
            });
        }

        console.log("hello",req.body);

        // match password with confirm password
        // if (password !== confirmPassword) {
        //     return res.status(403).json({
        //         success: false,
        //         message: "Password and Confirm Password doesn't match. Please try again."
        //     });
        // }

        // check is user exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: "User already existed."
            });
        }

                    const existingEmail = await Profile.findOne({email:email});
                    if(existingEmail){
                        return res.status(400).json({
                            success: false,
                            message: "UserName already used, Please choose other UserName."
                        });
                    }

        // find most recent otp stored for user
        const recentOtp = await OTP.find({email:email}).sort({ createdAt: -1 }).limit(1);
        console.log("Recent OTP -> ", recentOtp);

        // console.log("otp -> ", otp);
        console.log("recentOtp.otp -> ", recentOtp[0].otp);
        // validation of otp
        if (recentOtp.length === 0) {
            // OTP not found
            return res.status(400).json({
                success: false,
                message: "OTP not found",
            });
        } else if (otp !== recentOtp[0].otp) {
            // Invalid OTP
            return res.status(400).json({
                success: false,
                message: "OTP doesn't match",
            });
        }

        // hash the password
        const hashedPassword = await bcrypt.hash(password, 10);
        // create entry in the DB
        const profileDetails = await Profile.create({
            fullName:null,
            gender:null,
            profession:null,
            state:null,
            studentId:null,
        });
        const user = await User.create({
            username,
            email,
            password: hashedPassword,
            accountType,
            profileDetails: profileDetails._id,
            profileImage: `https://api.dicebear.com/5.x/initials/svg?seed=${username}`,
        });

        // // creating token 
        // const token = jwt.sign(payload, process.env.JWT_SECRET, {
        //     expiresIn: "2h",
        // });

        // user.token = token;
        // user.password = undefined;

        // const options = {
        //     expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
        //     httpOnly:true,
        // };

        // return successfull repsonse with token
        return res.status(200).json({
            success: true, 
            message: "User is registered Successfully.",
        
            user,
        });

        // // return successfull response
        // return res.status(200).json({
        //     success: true,
        //     user,
        //     token,
        // });

    } catch (err) {
        console.log(err);
        return res.status(500).json({
            status: false,
            message: "User can't be registered. Please try again.",
        });
    }
}

// login
exports.login = async (req, res) => {
    try {
        // get data from req.body
        const { email, password } = req.body;
        // validate data
        if (!email || !password) {
            return res.status(403).json({
                success: false,
                message: "All fields are required, please try again.",
            });
        }
        // check user exists or not
        const user = await User.findOne({ email }).populate("profileDetails");
        if (!user) {
            return res.status(401).json({
                success: false,
                message: "User is not registered. Please signup first",
            });
        }
        // generate JWT, after password matching
        if (await bcrypt.compare(password, user.password)) {
            const payload = {
                email: user.email,
                id: user._id,
                accountType: user.accountType,
                profileImage:user.profileImage,
                fullName: user.profileDetails.fullName,
                profession:user.profileDetails.profession
            };

            const token = jwt.sign(payload, process.env.JWT_SECRET, {
                expiresIn: "2h",
            });
    
            user.token = token;
            user.password = undefined;

            const options = {
                expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
                httpOnly:true,
            };

            // create cookie and send respond
            res.cookie("token", token, options).status(200).json({
                success: true, 
                token,
                user,
                message: "Logged in successfully",
            });
        }
        else {
            return res.status(401).json({
                success: false,
                message: "Password do not match.",
            });
        }
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            success: false,
            message: "Login Failure, try again.",
        });

    }
}

// changePaswoord
exports.changePassword = async (req, res) => {
    try {

        // get data from req.body
        const userId = req.user.id;
        const { newPassword, confirmNewPassword } = req.body;

        // get oldPassword, newPassword, confirmPassword
        const userDetails = await User.findById(userId);
        if (!userDetails) {
            return res.status(404).json({
                success: false,
                message: "User not found.",
            });
        }

        if (newPassword !== confirmNewPassword) {
            return res.status(400).json({
                success: false,
                message: "Cuurent password doesn't match to Current confirm password.",
            });
        }
        const saltround = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(newPassword, saltround);
        console.log("hashed Password ->", hashedPassword);
        // update pass in DB
        userDetails.password = hashedPassword;
        await userDetails.save();

        // send mail password updated
        const email = userDetails.email;
        const emailInfo = await mailSender(email, "Password updated Successfully", passwordUpdated(email, userDetails.firstName))

        // return response
        return res.status(200).json({
            success: true,
            message: "Password updated Successfully.",
            userDetails,
            emailInfo,
        });

    } catch (err) {
        console.log(err);
        return res.status(500).json({
            success: false,
            message: "Can't change Password, try again.",
        });
    }
}