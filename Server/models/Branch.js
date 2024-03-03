const mongoose = require("mongoose");

const BranchSchema = new mongoose.Schema({
    name: {
        type: String,
        enum: ["Computer Science","Artificial Intelligence and Data Science", "Electrical Engineering","ECE", "AG", "MG"],
        
    },
    enrollmentNumber:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'EnrollmentNumber'
        }
    ],
});

module.exports = mongoose.model("Branch", BranchSchema);