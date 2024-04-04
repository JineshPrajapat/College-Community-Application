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

    profession: {
        type: String,
        require: true,
    },

    state: {
        type: String,
        require: true,
    },

    about:{
        type: String,
        trim: true,
    },

    position:{
        type:String,
        trim:true
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

    links: [
        {
            type: {
                type: String,
                enum: ["LinkedIn", "GitHub", "Twitter", "YouTube"],
            },
            url: {
                type: String,
            }
        }
    ],

    // links:[
    //     {
    //         type:String
    // }],

    languages:[
        {
            type:String
    }],

    // profileImage: {
    //     type: String,
    //     default: `https://api.dicebear.com/7.x/fun-emoji/svg?radius=50`,
    // },

    coverImage: {
        type: String,
        default: `https://cdn.wallpapersafari.com/98/2/mNQZRI.jpg`,
    },
    
    userProfileId:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
     
});

module.exports = mongoose.model("Profile", profileSchema);