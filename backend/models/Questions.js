const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema({
<<<<<<< HEAD
    user:{
        type:String,
        required:true,
        ref:"User",
=======
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User",
>>>>>>> aa4615fbd98a8c03e31ab015f5deb3e9a424b55f
    },
    question: {
        type: String,
        required: true,
        trim: true
    },
    difficulty: {
        type: String,
        enum: ["Easy", "Medium", "Hard"]
    },
<<<<<<< HEAD
    company:{
        type:String,
        ref:"Company"
    },
    branch:{
        type:String,
        ref:"Courses"
=======
    company: {
        type: mongoose.Types.ObjectId,
        ref: "Company"
    },
    branch: {
        type: mongoose.Types.ObjectId,
        ref: "Courses"
>>>>>>> aa4615fbd98a8c03e31ab015f5deb3e9a424b55f
    }
});

module.exports = mongoose.model("Questions", questionSchema);