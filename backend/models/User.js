const mongoose=require("mongoose");

const userSchema = new mongoose.Schema({
    firstName:{
        type:String,
        required:true,
        trim:true,
    },
    lastName:{
        type:String,
        required:true,
        trim:true,
    },
    email:{
        type:String,
        required:true,
        trim:true,
    },
    password:{
        type:String,
        required:true,
    },
    accountType:{
        type:String,
        enum:["Admin", "Student", "Visitor"],
        required:true
    },
    branch:{
        type:mongoose.Types.ObjectId,
        ref:"Courses"
    },
    additionalDetails:{
        type:mongoose.Types.ObjectId,
        required:true,
        ref:"Profile"
    },
    image:{
        type:String,
        required:true,
    }

});

module.exports = mongoose.model("User",userSchema);