const express = require("express");
const router = express.Router();
const { auth } = require("../middleware/Auth");
const {
    getDiscuss, sendDiscuss,getDiscussbyTitle, getComment,getCommentsByDiscussionId, sendComment} = require("../controllers/Discuss");


router.get("/", auth, getDiscuss);
router.post("/addDiscuss", auth, sendDiscuss);
router.get("/:discussTitle", auth, getDiscussbyTitle)

router.get("/:discussionId/comment" , auth, getCommentsByDiscussionId);
router.post("/addComment" ,auth,  sendComment);



// fghj
// router.get("/", getDiscuss);
// router.post("/addDiscuss", sendDiscuss);

// router.get("/comment" ,  getComment);
// router.get("/addComment" ,  sendComment);


module.exports = router;