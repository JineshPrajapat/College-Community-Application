const mongoose =require("mongoose");

const questionSchema = new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
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
        type:mongoose.Types.ObjectId,
        ref:"Company"
    },
    branch:{
        type:mongoose.Types.ObjectId,
        ref:"Courses"
    }
});

module.exports = mongoose.model("Questions", questionSchema);