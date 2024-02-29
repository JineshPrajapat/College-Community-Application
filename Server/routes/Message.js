const express = require("express");
const router = express.Router();
const { auth } = require("../middleware/Auth");

const {getMessage, sendMessage}= require("../controllers/message")

router.get("/get-messages", auth, getMessage);
router.post("/send-message", auth, sendMessage);

module.exports = router;