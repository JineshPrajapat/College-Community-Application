// Mongoose intantiate
const mongoose = require("mongoose");

// Route Handler
const BookMarkSchema = new mongoose.Schema({

    userId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User', 
        required: true,
        unique:true 
    },
    
    savedPosts: [{
        type: {
            type: String,
            enum: ["Experience", "Discuss"],
            required: true
        },
        postId: [{ 
            type: mongoose.Schema.Types.ObjectId, 
            refPath:'savedPosts.type',
            required: true ,
            unique:true
        }]
    }]
});
// Export
module.exports = mongoose.model("BookMark", BookMarkSchema);