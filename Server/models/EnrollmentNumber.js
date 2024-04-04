const mongoose = require("mongoose");

const EnrollmentNumberSchema = new mongoose.Schema({
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    enrollmentNumber: {
        type:String,
        unique:true
    },
    studentIdImage: {
        type:String,
        required: true
    }, 
    passoutYear: {
        type:Number
    },
});

module.exports = mongoose.model("EnrollmentNumber", EnrollmentNumberSchema);