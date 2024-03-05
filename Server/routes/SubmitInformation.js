const express = require('express');
const router = express.Router();
const { auth } = require("../middleware/Auth");

const {
    submitInfo, getUserData} = require("../controllers/SubmitInformation");

router.post("/submitInfo" , auth ,submitInfo);
router.get("/", auth, getUserData);



module.exports = router;