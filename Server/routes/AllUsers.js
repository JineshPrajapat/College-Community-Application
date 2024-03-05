const express = require("express");
const router = express.Router();
const { auth } = require("../middleware/Auth");

const { getAllUsers } = require("../controllers/AllUsers")


router.get("/", auth, getAllUsers);


module.exports = router;