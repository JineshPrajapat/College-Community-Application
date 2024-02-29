const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema({

    company: {
        type: String,
        require: true,
    },
    branch: {
        type: String,
        require: true,
    },

    year:{
        type:String,
        required: true,
    },

    questionTitle:{
        type:String,
        require:true
    },

    difficulty:{
        type:String,
        require: true
    },

    questionDescription:{
        type:String,
        require: true
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