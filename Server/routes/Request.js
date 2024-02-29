const express = require("express");
const router = express.Router();
const { auth } = require("../middleware/Auth");
const {
    getPendingFollowingRequests,
    getPendingFollowerRequest,
    sendFollowRequest,
    acceptRequest
} = require("../controllers/request");

router.get("/follow", auth,  getPendingFollowingRequests);
router.get("/", auth, getPendingFollowerRequest);
router.post("/send-request", auth,  sendFollowRequest);
router.post("/accept-request", auth, acceptRequest);

module.exports = router;