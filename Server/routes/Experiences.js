const express = require("express");
const router = express.Router();
const { auth } = require("../middleware/Auth");
const {
    getExperiences, sendExperiences,} = require("../controllers/Experience");


router.get("/", auth, getExperiences);
// router.post("/addExperience", auth, sendExperiences)



// router.get("/", getExperiences);
router.post("/addExperience", sendExperiences)


module.exports = router;