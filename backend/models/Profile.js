const mongoose = require("mongoose");

const profileSchema = new mongoose.Schema({
    gender:{
        type:String,
        required:true
    },
    contactNumber:{
        type:Number,
        required:true,
        // trim:true
    },
    linkedinUrl:{
        type:String,
        required:true
    },
    about:{
        type:String,
        // trim:true
    },
    location:{
        type:String,
        // trim:true
    }
});

module.exports = mongoose.model("Profile",profileSchema);