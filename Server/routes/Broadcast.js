const express = require("express");
const router = express.Router();
const { auth, isLecturer, isCollege } = require("../middleware/Auth");

const { sendBroadCast, getBroadCast} = require("../controllers/broadcast");

router.get("/get-broadcast", auth, getBroadCast);
router.post("/send-broadcast", auth, isLecturer, sendBroadCast);

module.exports = router;