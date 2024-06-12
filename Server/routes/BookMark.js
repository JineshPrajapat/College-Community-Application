const express = require("express");
const router = express.Router();
const { auth } = require("../middleware/Auth");

const {getBookmarkForUser, saveBookmarkForUser, getDiscussBookMark,bookmarkStatebyId, getExperienceBookMark} = require("../controllers/BookMark");

router.post("/saved", auth, saveBookmarkForUser );
router.get("/Discuss", auth, getDiscussBookMark);
router.get("/Discuss/:postId", auth, bookmarkStatebyId);
router.get("/Experience", auth, getExperienceBookMark)


module.exports = router;