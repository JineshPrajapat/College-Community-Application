const express = require("express");
const router = express.Router();
const { auth } = require("../middleware/Auth");
const {
    getOpportunity, sendOpportunity,} = require("../controllers/Opportunity");


router.get("/", auth, getOpportunity);
router.post("/addOpportunity", auth, sendOpportunity)

module.exports = router;