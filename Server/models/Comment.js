// Mongoose intantiate
const mongoose = require("mongoose");

// Route Handler
const commentSchema = new mongoose.Schema({

    // reference to discuss
    // discussId: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: "Discuss",
    //     required:true,
    // },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    body: {
        type: String,
        required: true,
    },

    // Array of replies to this comment
    replies: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comment",                     // Assuming comments can reply to each other
    }],

    commenttedAt: {
        type: Date,
        default: Date.now(),
    },
})

// Export
module.exports = mongoose.model("Comment", commentSchema);