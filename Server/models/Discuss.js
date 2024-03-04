const mongoose = require("mongoose");

const discussSchema = new mongoose.Schema({

    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },

    discussTitle:{
        type:String,
        require: true
    },
    discussDescription: {
        type: String,
        require: true,
    },

    // reference to comment
    comments: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comment"
    }],

    upvotes:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Like",
    }],
    
    createdAt: {
        type: Date,
        default: Date.now(),
    },
});

module.exports = mongoose.model("Discuss", discussSchema);