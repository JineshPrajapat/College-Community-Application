const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User"
    },
    company: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
<<<<<<< HEAD
    experienceDescription:{
        types:String,
        required:true
=======
    experienceDescription: {
        types: String,
        required: true
    },
    rating: {
        type: Number,
        required: true
>>>>>>> aa4615fbd98a8c03e31ab015f5deb3e9a424b55f
    }
    
});

module.exports = mongoose.model("Review", reviewSchema);
