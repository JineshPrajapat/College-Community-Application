const express = require("express");
const router = express.Router();
const { auth } = require("../middleware/Auth");
const {
    updateProfile,
    updateAdditionalProfile,
    // deleteAccount,
    getUserDetails,
    updateDisplayPicture } = require("../controllers/Profile");

// router.delete("/deleteProfile", auth, deleteAccount);

router.put("/updateProfile", auth, updateProfile);
router.put("/additionalDetails",auth,updateAdditionalProfile);
router.get("/getUserDetails", auth, getUserDetails);



router.put("/updateDisplayPicture", auth, updateDisplayPicture);
// router.delete("/deleteProfile", auth, deleteAccount);


module.exports = router;