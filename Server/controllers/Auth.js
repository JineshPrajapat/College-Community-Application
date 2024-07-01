const User = require("../models/User");
const OTP = require("../models/OTP");
const otpGenerator = require("otp-generator");
const bcrypt = require("bcryptjs");
const useragent = require('express-useragent');   //used for extracting device information
const Profile = require("../models/Profile");
const jwt = require("jsonwebtoken");
const mailSender = require("../utils/mailSender");
const { loginTemplate } = require("../mails/LoginTemplate");
const { passwordUpdated } = require("../mails/passwordUpdate");
require("dotenv").config();



const extractDeviceInfo = (userAgent) => {
    const deviceInfo = useragent.parse(userAgent);
    let deviceType = 'Unknown';
    if (deviceInfo.isMobile) {
        if (deviceInfo.isAndroid) {
            deviceType = 'Android';
        } else if (deviceInfo.isiPhone) {
            deviceType = 'iPhone';
        }
    } else if (deviceInfo.isDesktop) {
        deviceType = 'Laptop/Desktop';
    }
    return {
        deviceType: deviceType,
        browser: deviceInfo.browser,
        platform: deviceInfo.platform
    };
};


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

        console.log("hello", req.body);

        // match password with confirm password
        // if (password !== confirmPassword) {
        //     return res.status(405).json({
        //         success: false,
        //         message: "Password and Confirm Password doesn't match. Please try again."
        //     });
        // }

        // check is user exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(409).json({
                success: false,
                message: "User already existed."
            });
        }

        const existingEmail = await Profile.findOne({ email: email });
        if (existingEmail) {
            return res.status(410).json({
                success: false,
                message: "UserName already used, Please choose other UserName."
            });
        }

        // find most recent otp stored for user
        const recentOtp = await OTP.find({ email: email }).sort({ createdAt: -1 }).limit(1);
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
            return res.status(401).json({
                success: false,
                message: "OTP doesn't match",
            });
        }

        // hash the password
        const hashedPassword = await bcrypt.hash(password, 10);
        // create entry in the DB
        const profileDetails = await Profile.create({
            fullName: null,
            gender: null,
            profession: null,
            state: null,
            studentId: null,
        });
        const user = await User.create({
            username,
            email,
            password: hashedPassword,
            accountType,
            profileDetails: profileDetails._id,
            profileImage: `https://api.dicebear.com/5.x/initials/svg?seed=${username}`,
        });

        // creating token 
        const payload = {
            email: user.email,
            id: user._id,
            accountType: user.accountType,
            profileImage: user.profileImage,
        };

        const token = jwt.sign(payload, process.env.JWT_SECRET, {
            expiresIn: "2h",
        });

        user.token = token;
        user.password = undefined;

        const options = {
            expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
            httpOnly: true,
        };

        // create cookie and send respond
        res.cookie("token", token, options).status(200).json({
            success: true,
            token,
            user,
            message: "User is registered Successfully.",
        });

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
                profileImage: user.profileImage,
                fullName: user.profileDetails.fullName,
                profession: user.profileDetails.profession
            };

            const token = jwt.sign(payload, process.env.JWT_SECRET, {
                expiresIn: "2h",
            });

            user.token = token;
            user.password = undefined;

            const options = {
                expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
                httpOnly: true,
            };

            // Generating timeStamp
            const timeStamp = new Date().toLocaleString();

            // Extracting device information
            const device = extractDeviceInfo(req.headers['user-agent'])

            // sending mail after login
            const emailInfo = await mailSender(email, `Your Gateway to Let's Chat: Welcome Back!`, loginTemplate(user.profileDetails.fullName, "Successful", timeStamp, device))
            if (!emailInfo) {
                console.log("email not send");
            }

            // create cookie and send respond
            res.cookie("token", token, options).status(200).json({
                success: true,
                token,
                user,
                message: "Logged in successfully",
            });
        }
        else {
            return res.status(402).json({
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

// change username
exports.changeUserName = async (req, res) => {
    try {
        const userId = req.user.id;

        console.log("newUsername", newUsername)
        const userDetails = await User.findById(userId);
        if (!userDetails) {
            return res.status(404).json({
                success: false,
                message: "User not found.",
            });
        }

        userDetails.username = newUsername;
        await userDetails.save();

        return res.status(200).json({
            success: true,
            message: "Username Changed Successfully.",
            userDetails
        });

    }
    catch (err) {
        console.log(err);
        return res.status(500).json({
            success: false,
            message: "Can't change userName, try again.",
        });
    }
}

// change email
exports.changeEmail = async (req, res) => {
    try {
        const userId = req.user.id;
        const { otp, email, newEmail } = req.body;

        if (!otp || !newEmail || !email) {
            return res.status(403).json({
                success: false,
                message: "All fields are required",
            });
        }

        const recentOtp = await OTP.find({ email: email }).sort({ createdAt: -1 }).limit(1);
        console.log("Recent OTP -> ", recentOtp);

        if (recentOtp.length === 0) {
            return res.status(400).json({
                success: false,
                message: "Verification code not found",
            });
        } else if (otp !== recentOtp[0].otp) {
            // Invalid OTP
            return res.status(401).json({
                success: false,
                message: "Incorrect Verification code",
            });
        }

        const userDetails = await User.findById(userId);
        userDetails.email = newEmail;
        await userDetails.save();

        return res.status(200).json({
            success: true,
            message: "Email Changed Successfully.",
            userDetails
        });
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({
            status: false,
            message: "Email can't be registered. Please try again.",
        });
    }
}

// changePaswoord 
exports.changePassword = async (req, res) => {
    try {
        // get data from req.body
        const userId = req.user.id;
        const { currentPassword, newPassword, confirmNewPassword } = req.body;

        // get oldPassword, newPassword, confirmPassword
        const userDetails = await User.findById(userId).populate("profileDetails");
        if (!userDetails) {
            return res.status(404).json({
                success: false,
                message: "User not found.",
            });
        }
        console.log("userDetails", userDetails)

        if (newPassword !== confirmNewPassword) {
            return res.status(400).json({
                success: false,
                message: "New password doesn't match to Current confirm password.",
            });
        }

        if (await bcrypt.compare(currentPassword, userDetails.password)) {
            const saltround = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(newPassword, saltround);
            console.log("hashed Password ->", hashedPassword);
            // update pass in DB
            userDetails.password = hashedPassword;
            await userDetails.save();

            // send mail password updated
            const email = userDetails.email;
            const emailInfo = await mailSender(email, "Password updated Successfully", passwordUpdated(email, userDetails.profileDetails.fullName))

            // return response
            return res.status(200).json({
                success: true,
                message: "Password updated Successfully.",
                userDetails,
                emailInfo,
            });
        }
        else {
            return res.status(402).json({
                success: false,
                message: "Current Password is Incorrect",
            });
        }


    } catch (err) {
        console.log(err);
        return res.status(500).json({
            success: false,
            message: "Can't change Password, try again.",
        });
    }
}

// delete account
exports.deleteAccount = async (req, res) => {
    try {
        // fetch id
        const id = req.user.id;
        const { email, password } = req.body;

        console.log("id ->", id)
        // validate
        const userDetails = await User.findById(id).populate("profileDetails");
        console.log("userDetails ->", userDetails);
        if (!userDetails) {
            return res.status(404).json({
                success: false,
                message: "User not found.",
            });
        }

        if (email !== userDetails.email) {
            return res.status(404).json({
                success: false,
                message: "Incorrect Email",
            });
        }

        if (await bcrypt.compare(password, userDetails.password)) {
            // delete profile
            await Profile.findByIdAndDelete({ _id: userDetails.profileDetails });
            // delete user
            await User.findByIdAndDelete({ _id: id });

            // const email = userDetails.email;
            const emailInfo = await mailSender(email, "We're Sorry to See You Go, but You'll Always Be Welcome Back!", deleteTemplate(userDetails.profileDetails.fullName));

            // return response
            return res.status(200).json({
                success: true,
                message: "User Deleted successfully.",
            });
        }
        else{
            return res.status(402).json({
                success: false,
                message: "Incorrect Password",
            });
    
        }
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            success: false,
            message: "Unable to delete profile.",
            error: err.message,
        });
    }
};
