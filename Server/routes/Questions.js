const express = require("express");
const router = express.Router();
const { auth } = require("../middleware/Auth");
const {
    getQuestions, sendQuestions,} = require("../controllers/Questions");


// router.get("/", auth, getQuestions);
// router.post("/addQuestions", auth, sendQuestions)

router.get("/", getQuestions);
router.post("/addQuestions", sendQuestions)


module.exports = router;