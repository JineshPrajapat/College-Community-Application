const mongoose =require("mongoose");

const questionSchema = new mongoose.Schema({
    user:{
        type:String,
        required:true,
        ref:"User",
    },
    question:{
        type:String,
        required:true,
        trim:true
    },
    difficulty:{
        type:String,
        enum:["Easy", "Medium", "Hard"]
    },
    company:{
        type:String,
        ref:"Company"
    },
    branch:{
        type:String,
        ref:"Courses"
    }
});

module.exports = mongoose.model("Questions", questionSchema);