const mongoose = require("mongoose");

const BranchSchema = new mongoose.Schema({
    name: {
        type: String,
        enum: ["Computer Science Engineering", "Artificial Intelligence and Data Science Engineering",  "Electrical Engineering", "Electronics and Communication Engineering", "Mining Engineering", "Mechanical Engineering","Civil Engineering", "Agriculture Engineering" ],
        
    },
    enrollmentNumber:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'EnrollmentNumber'
        }
    ],
});

module.exports = mongoose.model("Branch", BranchSchema);