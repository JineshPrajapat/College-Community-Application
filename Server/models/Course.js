const mongoose = require("mongoose");

const CourseSchema = new mongoose.Schema({
    name: {
        type: String,
        enum: ["Btech","Mtech", "PHD"],
        
    },
    branch:[
        { 
            type: mongoose.Schema.Types.ObjectId, 
            ref: 'Branch' 
        }
    ]
});

module.exports = mongoose.model("Course", CourseSchema);