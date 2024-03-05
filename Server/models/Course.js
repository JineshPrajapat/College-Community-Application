const mongoose = require("mongoose");

const CourseSchema = new mongoose.Schema({
    name: {
        type: String,
        enum: ["Btech","Mtech", "Phd"],
        
    },
    branch:[
        { 
            type: mongoose.Schema.Types.ObjectId, 
            ref: 'Branch' 
        }
    ]
});

module.exports = mongoose.model("Course", CourseSchema);