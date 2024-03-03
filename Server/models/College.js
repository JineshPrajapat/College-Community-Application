const mongoose = require("mongoose");

const CollegeSchema = new mongoose.Schema({
    name: {
        type: String,
        enum: ["College of Technology And Engineering", " ", " "],
        default:"College of Technology And Engineering",
        
    },
    courses: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Course'
        }
    ]
});

module.exports = mongoose.model("College", CollegeSchema);