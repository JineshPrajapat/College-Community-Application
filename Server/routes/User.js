const express = require("express");
const router = express.Router();
const { auth} = require("../middleware/Auth");
const {
    login,
    signUp,
    sendOTP,
    deleteAccount,
    changeEmail,
    changeUserName,
    changePassword } = require("../controllers/Auth");

const {resetPasswordToken, resetPassword } = require("../controllers/resetPassword");


// ***********************************************************************************************************************************************
//                                         Authentication routes
// ***********************************************************************************************************************************************


// routes for user login
router.post("/login", login);

// route for user signup
router.post("/signup", signUp);

// route for send otp
router.post("/sendotp", sendOTP);

// routes for generating a reset password token
router.post("/reset-password-token", resetPasswordToken);

// route for ressetting user's password after verification
router.put("/reset-password", resetPassword);




// routes for changing userName
router.put("/changeusername", auth, changeUserName)

// routes for changing email
router.put("/changeemail", auth, changeEmail)

// routes for changing the password while user is loggedIn
router.put("/changepassword", auth, changePassword);

router.delete("/deleteaccount", auth, deleteAccount)

module.exports = router;