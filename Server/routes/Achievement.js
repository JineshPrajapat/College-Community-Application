const express = require("express");
const router = express.Router();
const {auth} = require("../middleware/Auth");

const {
        sendAchievement, 
        getAchievement      } = require("../controllers/Achievement");

router.get("/", auth, getAchievement);
router.post("/addAchivement", auth, sendAchievement);


module.exports = router;

