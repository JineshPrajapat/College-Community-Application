const mongoose = require("mongoose");

const experienceSchema = new mongoose.Schema({

    experienceTitle:{
        type:String,
        require: true
    },
    experienceDescription: {
        type: String,
        require: true,
    },

    userExperienceId:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"User"
    },

    upvotes:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Like",
    }],
    
    createdAt: {
        type: Date,
        default: Date.now(),
    }
});

module.exports = mongoose.model("Experience", experienceSchema);