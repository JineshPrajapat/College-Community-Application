const express =require("express");
const router=express.Router();

const {login,signup}=require("../Controller/Auth");
const {auth, isStudent, isAdmin} =require("../middleware/auth");

router.post("/login",login);
router.post("/signup",signup);
 
// protected routes

router.get("/test",auth, (req,res) =>{
    res.json({
        success:true,
        message:'Welcome to test route'
    })
})

router.get("/student", auth, isStudent, (req,res) => {
    res.json({
        success:true,
        message:'Welcome to student route'
    })
})

router.get("/admin", auth, isAdmin, (req,res) =>{
    res.json({
        success:true,
        message:'Welcome to Admin route'
    })
})
module.exports=router;