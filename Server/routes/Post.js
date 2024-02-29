const express = require("express");
const router = express.Router();
const { auth } = require("../middleware/Auth");
const {
    likePost,
    unlikePost,
    createComment,
    savePost } = require("../controllers/like");
const {
    getPostPic,
    sendPostPic,
    // videoUpload
} = require("../controllers/post");

router.get("/", auth, getPostPic);
router.post("/like", auth, likePost )
router.post("/comment", auth, createComment);
router.post("/unlike", auth, unlikePost);
router.post("/save", auth, savePost);
router.post("/send", auth, sendPostPic);
// router.post("/send-video", videoUpload);

module.exports = router;