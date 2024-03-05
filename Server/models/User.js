const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({

    username: {
        type: String,
        require: true,
    }, 
    email: { 
        type: String,
        require: true,
        unique:true
    },
    password: { 
        type: String,
        require: true,
    },
    accountType: {
        type: String,
        enum: ["Admin", "Student"],
        default:"Student"
    },

    // Reference to Profile
    profileDetails:{                                              
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Profile' 
    },


    // Reference to College
    college: {                                              
        type: String 
    }, 

    // Reference to Course
    selectedCourse: { 
        type: String
    }, 

    // Reference to Field
    selectedBranch: { 
        type: String 
    }, 

    passOutYear:{
        type: String
    },


    // // Reference to College
    // college: {                                              
    //     type: mongoose.Schema.Types.ObjectId, 
    //     ref: 'College' 
    // }, 

    // // Reference to Course
    // selectedCourse: { 
    //     type: mongoose.Schema.Types.ObjectId, 
    //     ref: 'Course' 
    // }, 

    // // Reference to Field
    // selectedBranch: { 
    //     type: mongoose.Schema.Types.ObjectId, 
    //     ref: 'Branch' 
    // }, 

    // Embedding enrollment information
    enrollmentInfo:{                                              
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'EnrollmentNumber' 
    },

    profileImage: {
        type: String,
        default: `https://api.dicebear.com/7.x/fun-emoji/svg?radius=50`,
    },
    
    otp:{
        type:String,
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
    
});

module.exports = mongoose.model("User", userSchema);