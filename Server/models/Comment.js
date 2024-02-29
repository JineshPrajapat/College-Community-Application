// Mongoose intantiate
const mongoose = require("mongoose");

// Route Handler
const commentSchema = new mongoose.Schema({
    discussId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Discuss",
        required:true,
    },
    userDetails: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    body: {
        type: String,
        required: true,
    },
    commenttedAt: {
        type: Date,
        default: Date.now(),
    },
})

// Export
module.exports = mongoose.model("Comment", commentSchema);