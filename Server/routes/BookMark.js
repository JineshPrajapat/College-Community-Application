const express = require("express");
const router = express.Router();
const { auth } = require("../middleware/Auth");

const {getBookmarkForUser, saveBookmarkForUser, getDiscussBookMark, getExperienceBookMark} = require("../controllers/BookMark");

// router.get("/", auth, getBookmarkForUser );
router.post("/saved", auth, saveBookmarkForUser );
router.get("/Discuss", auth, getDiscussBookMark);
router.get("/Experience", auth, getExperienceBookMark)


module.exports = router;