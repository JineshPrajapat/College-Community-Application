const express = require("express");
const router = express.Router();
const { auth } = require("../middleware/Auth");

const { getAllUsers,
    getEachUserDetailsById} = require("../controllers/AllUsers")


router.get("/", auth, getAllUsers);
router.get("/:userName", getEachUserDetailsById);


module.exports = router;