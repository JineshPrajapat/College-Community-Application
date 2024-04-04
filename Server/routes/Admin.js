const express = require("express");
const router = express.Router();
const { auth, isAdmin } = require("../middleware/Auth");
const {
    login,
    signUp,
    sendOTP } = require("../controllers/Auth");
const {
    updateProfile,
    // deleteAccount,
    getUserDetails,
    updateDisplayPicture } = require("../controllers/Profile");

// router.delete("/deleteProfile", auth, isAdmin, deleteAccount);

router.put("/updateProfile", auth, isAdmin, updateProfile);

router.get("/getUserDetails", auth, isAdmin, getUserDetails);

router.put("/updateDisplayPicture", auth, isAdmin, updateDisplayPicture);

router.post("/login", login);

router.post("/signup", signUp);

router.post("/sendotp", sendOTP);

module.exports = router;