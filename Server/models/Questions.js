const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema({

    company: {
        type: String,
        required: true,
    },
    branch: {
        type: String,
        required: true,
    },

    year:{
        type:String,
        required: true,
    },

    questionTitle:{
        type:String,
        required:true
    },

    difficulty:{
        type:String,
        required: true
    },

    questionDescription:{
        type:String,
        required: true
    },

    questionLink:{
        type:String
    },

    userQuestionId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },

    createdAt: {
        type: Date,
        default: Date.now(),
    },
});

module.exports = mongoose.model("Question", questionSchema);