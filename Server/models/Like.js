// Mongoose intantiate
const mongoose = require("mongoose");

// Route Handler
const likeSchema = new mongoose.Schema({
    
    postType: {
        type: String,
        enum: ["Experience", "Discuss"],
    },

    likes: [{
        post: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Post",
        },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: "User",
        },
    }],
})

// Export
module.exports = mongoose.model("Like", likeSchema);