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

    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    
    createdAt: {
        type: Date,
        default: Date.now(),
    }
});

module.exports = mongoose.model("Experience", experienceSchema);