const User = require("../models/User");
const mailSender = require("../utils/mailSender");
const bcrypt = require("bcryptjs");
const { resetPassword } = require("../mails/resetPassword");

// resetPasswordToken
exports.resetPasswordToken = async (req, res) => {
    try {
        // get email from req.body
        const { email } = req.body;

        // check user for email, email validation
        const user = await User.findOne({ email: email });
        if (!user) {
            return res.status(401).json({
                success: false,
                message: "Your email is not registered with us."
            });
        }
        const name = user.fullname;
        // generate token
        const token = crypto.randomUUID();

        // update user by adding toke expiration time
        const updatedDetails = await User.findOneAndUpdate(
            { email: email },
            {
                token: token,
                resetPasswordExpires: Date.now() + 5 * 60 * 1000,
            },
            { new: true });

        // create url
        const url = `http://localhost:3000/update-password/${token}`

        // send mail cataining the url
        await mailSender(email, "Password reset Link", resetPassword(email, name, url));

        // return response
        return res.json({
            success: true,
            message: "Email sent successfully,  please check email and change password.",
            updatedDetails: updatedDetails,
        });

    } catch (err) {
        console.log(err);
        return res.status(500).json({
            success: true,
            message: "Something went wrong while sending the reset password mail.",
        });
    }
}

// resetpassword
exports.resetPassword = async (req, res) => {
    try {

        // fetch the data
        const { password, confirmPassword, token } = req.body;
        console.log(req.body);
        // validation
        if (req.body.password[0] !== req.body.confirmPassword[0]) {
            return res.status(401).json({
                success: false,
                message: "Password don't match.",
            });
        }

        // get user details from DB using the token
        const userDetails = await User.findOne({ token: token });
        console.log("userDetails", userDetails);

        // if no entry found - invalid token
        if (!userDetails) {
            return res.status(404).json({
                success: false,
                message: "Token is invalid",
            });
        }

        // check token expiration time
        if (userDetails.resetPasswordExpires < Date.now()) {
            return res.status(402).json({
                success: false,
                message: "Token is expired. Plaease regenerate your token.",
            });
        }

        // Extract the string from the array
        const newPassword = req.body.password[0];      
        console.log(newPassword);
        
        // hash password
        const hashedPassword = await  bcrypt.hash(newPassword, 10);
        console.log("hashedPassword",hashedPassword)

        // update the password
        const updatedUser = await User.findOneAndUpdate(
            { token },
            { password: hashedPassword },
            { new: true }
        );

        console.log("updatedUser", updatedUser);
        if (!updatedUser) {
            return res.status(500).json({
                success: false,
                message: "Failed to update password.",
            });
        }

        // return reponse
        return res.status(200).json({
            success: true,
            message: "Password reset successfully.",
        });

    } catch (err) {
        console.log(err);
        return res.status(500).json({
            success: true,
            message: "Something went wrong while reseting the password.",
        });
    }
}

