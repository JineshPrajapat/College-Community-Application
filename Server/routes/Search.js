const express = require("express");
const router = express.Router();
const { auth } = require("../middleware/Auth");
const {
    searchHome, searchPost, searchUser, getCollegeNews
} = require("../controllers/search");

router.get("/", auth,  searchHome);
router.post("/post", searchPost);
router.post("/user", searchUser);
router.post("/news", auth,  getCollegeNews);

module.exports = router;