const express = require("express");
const router = express.Router();
const { auth } = require("../middleware/Auth");
const {
    updateProfile,
    deleteAccount,
    getUserDetails,
    updateDisplayPicture } = require("../controllers/Profile");

router.delete("/deleteProfile", auth, deleteAccount);
router.post("/updateProfile", auth, updateProfile);


router.get("/getUserDetails", auth, getUserDetails);
router.put("/updateDisplayPicture", auth, updateDisplayPicture);

router.post("/updateProfile", auth, updateProfile);
router.put("/updateProfile", updateProfile);

module.exports = router;