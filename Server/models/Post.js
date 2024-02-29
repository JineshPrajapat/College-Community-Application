const mongoose = require("mongoose");
// Mongoose intantiate

// Route Handler
const postSchema = new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true,
    },
    postImageUrl:{
        type:String,
        required:true,
    },
    caption:{
        type:String,
        required:true,
    },
    category:{
        type:String,
        default:"Casual",
    },
    postedAt:{
        type:Date,
        default:Date.now(),
    },
    likes:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Like",
    }],
    comments:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Comment",
    }]
})

// Export
module.exports = mongoose.model("Post", postSchema);