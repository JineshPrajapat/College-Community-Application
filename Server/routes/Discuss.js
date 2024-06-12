const express = require("express");
const router = express.Router();
const { auth } = require("../middleware/Auth");
const {
    getDiscuss, sendDiscuss,getDiscussbyTitle, getComment,getCommentsByDiscussionId, sendComment, addNestedCommet} = require("../controllers/Discuss");


router.get("/", auth, getDiscuss);
router.post("/addDiscuss", auth, sendDiscuss);
router.get("/:discussTitle", auth, getDiscussbyTitle)


// comments route are handles
router.post("/addComment" ,auth,  sendComment);
router.post("/:commentID/nestedComment/:discussionId", auth, addNestedCommet)
router.get("/:discussionId/comment" , auth, getCommentsByDiscussionId);


module.exports = router;