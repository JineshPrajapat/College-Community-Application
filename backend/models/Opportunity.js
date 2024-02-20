const mongoose  = require("mongoose");
const opportunitySchema = new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref: "User"
    },
    branch:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"Courses"
    },
    companyName:{
        type:String,
        required:true,
    },
    jobRole:{
        type:String,
        required:true
    },
    eligibilityCriteria:{
        type:String,
        required:true
    },
    applicationStart:{
        type:Date,
        required:true
    },
    applicationEnd:{
        type:Date,
        required:true
    }
})

module.exports = mongoose.model("Opportunity", opportunitySchema)