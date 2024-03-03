const mongoose = require("mongoose");

const EnrollmentNumberSchema = new mongoose.Schema({
    enrollmentNumber: {
        type:String,
        unique:true
    },
    studentIdImage: {
        type:String,
        // required: true
    }, 
    passoutYear: {
        type:Number
    }
});

module.exports = mongoose.model("EnrollmentNumber", EnrollmentNumberSchema);