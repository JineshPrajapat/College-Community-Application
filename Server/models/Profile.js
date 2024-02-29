const mongoose = require("mongoose");

const profileSchema = new mongoose.Schema({

    fullName:{
        type:String,
        require :true,
    },
    gender: {
        type: String,
        require: true,
    },

    branchName: {
        type: String,
        require :true,
    },

    enrollmentNumber: {
        type: String,
        require: true,
    },

    position: {
        type: String,
        require: true,
    },

    state: {
        type: String,
        require: true,
    },

    // studentId: {
    //     type: String,
    //     default: `https://api.dicebear.com/7.x/fun-emoji/svg?radius=50`,
    // },
    
    about:{
        type: String,
        trim: true,
    },
    experience:{
        type:String,
    },

    skills:[
        {
          type:String  
    }],

    hobbies:[
        {
          type:String  
    }],

    links:[
        {
            type:String
    }],

    languages:[
        {
            type:String
    }],


    coverImage: {
        type: String,
        default: `https://api.dicebear.com/7.x/fun-emoji/svg?radius=50`,
    },
    profileImage: {
        type: String,
        default: `https://api.dicebear.com/7.x/fun-emoji/svg?radius=50`,
    },
    
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
     
});

module.exports = mongoose.model("Profile", profileSchema);