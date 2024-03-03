const express = require('express');
const router = express.Router();
const { auth } = require("../middleware/Auth");

const {
    submitInfo} = require("../controllers/SubmitInformation");

router.post("/submitInfo" , auth ,submitInfo);


module.exports = router;