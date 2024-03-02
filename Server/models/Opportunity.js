const mongoose = require("mongoose");

const opportunitySchema = new mongoose.Schema({


    profile:{
        type:String,
        require: true
    },
    company: {
        type: String,
        require: true,
    },
    branch: {
        type: String,
        require: true,
    },

    positionType:{
        type:String,
        required: true,
    },

    yearOfExperience:{
        type:String,
        require:true
    },

    opportunityLink:{
        type:String
    },

    applicationDeadline:{
        type:Date,
    },

    userOppotunityId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },

    createdAt: {
        type: Date,
        default: Date.now(),
    },
});

module.exports = mongoose.model("Opportunity", opportunitySchema);