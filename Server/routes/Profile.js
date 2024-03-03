const express = require("express");
const router = express.Router();
const { auth } = require("../middleware/Auth");
const {
    updateProfile,
    deleteAccount,
    getUserDetails,
    updateDisplayPicture } = require("../controllers/Profile");

router.delete("/deleteProfile", auth, deleteAccount);
router.put("/updateProfile", auth, updateProfile);


router.get("/getUserDetails", auth, getUserDetails);
router.put("/updateDisplayPicture", auth, updateDisplayPicture);


module.exports = router;