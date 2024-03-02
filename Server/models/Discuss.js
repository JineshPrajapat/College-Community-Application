const mongoose = require("mongoose");

const discussSchema = new mongoose.Schema({

    discussTitle:{
        type:String,
        require: true
    },
    discussDescription: {
        type: String,
        require: true,
    },

    userDiscussId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Profile",
    },

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