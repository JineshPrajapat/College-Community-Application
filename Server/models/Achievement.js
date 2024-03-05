const mongoose = require("mongoose");

const achievementSchema = new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },

    heading:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },

    achievement:{
        type:String,
        required:true
    }
});

module.exports = mongoose.model("Achievement", achievementSchema);