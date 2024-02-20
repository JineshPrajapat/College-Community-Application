const mongoose =require("mongoose");

const courseSchema = new mongoose.Schema({
    courseName:{
        type:String,
        required:true,
        trim:true
    }
});

module.exports = mongoose.model("Courses", courseSchema);