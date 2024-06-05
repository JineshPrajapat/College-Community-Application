const express = require("express");
const router = express.Router();
const {auth} = require("../middleware/Auth");

const {sendContact} = require("../controllers/Contact");

router.post("/:userName", auth, sendContact);

module.exports = router;