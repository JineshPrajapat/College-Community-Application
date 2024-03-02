const express = require("express");
const router = express.Router();
const { auth } = require("../middleware/Auth");
const {
    getDiscuss, sendDiscuss,getComment, sendComment} = require("../controllers/Discuss");


router.get("/", auth, getDiscuss);
router.post("/addDiscuss", auth, sendDiscuss);

router.get("/comment" , auth, getComment);
router.get("/addComment" ,auth,  sendComment);



// fghj
// router.get("/", getDiscuss);
// router.post("/addDiscuss", sendDiscuss);

// router.get("/comment" ,  getComment);
// router.get("/addComment" ,  sendComment);


module.exports = router;