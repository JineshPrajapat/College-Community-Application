const express = require("express");
const {
    createPro,getPros,deletePro,updatePro
 
} = require("../Controller/profile");
// const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");

const router = express.Router();

router.route("/profile").get(getPros);
router.route("/profile/new").post(createPro);
router.route("/profile/:id").put(updatePro);
router.route("/profile/:id").delete(deletePro);


module.exports = router;