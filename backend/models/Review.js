const mongoose =require("mongoose");

const reviewSchema = new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"User"
    },
    company:{
        type:mongoose.Schema.Types.ObjectId,
        required:true
    },
    experienceDescription:{
        types:String,
        required:true
    },
    rating:{
        type:Number,
        required:true
    }
});

module.exports = mongoose.model("Review", reviewSchema);