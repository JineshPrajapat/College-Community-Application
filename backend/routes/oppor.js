const express = require("express");
const {
 getOppo, createOppo, updateOppo, deleteOppo
 
} = require("../Controller/opportunity");
// const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");

const router = express.Router();

router.route("/profile").get(getOppo);
router.route("/profile/new").post(createOppo);
router.route("/profile/:id").put(updateOppo);
router.route("/profile/:id").delete(deleteOppo);


module.exports = router;