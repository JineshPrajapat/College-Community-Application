const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({

    name: {
        type: String,
        require: true,
    },
    email: {
        type: String,
        require: true,
    },
    password: {
        type: String,
        require: true,
    },
    confirmPassword:{
        type: String,
        require: true,
    },
    
    accountType: {
        type: String,
        enum: ["Admin", "Student"],
        default:"Student"
    },
    additionalDetails: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Profile",
    },
    discussDetails:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Discuss",
    },
    
    token: {
        type: String,
    },
    resetPasswordExpires: {
        type: Date,
    },

    createdAt: {
        type: Date,
        default: Date.now(),
    },


    // pendingFollower: [{
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: "User",
    // }],
    // pendingFollowing: [{
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: "User",
    // }],
    // following: [{
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: "User",
    // }],
    // follower: [{
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: "User",
    // }],
    // notification: [{
    //     type: String,
    // }],
    // activity: [{
    //     type: String,
    // }],
    // news: [{
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: "Post",
    // }],
    

});

module.exports = mongoose.model("User", userSchema);