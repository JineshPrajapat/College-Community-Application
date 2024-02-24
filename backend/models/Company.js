const mongoose = require("mongoose");

const companySchema = new mongoose.Schema({
    companyName: {
        type: String,
        required: true,
        trim: true
    },
    location: {
        type: String,
        required: true,
    },
    companyURL: {
        type: URL,
        required: true
    }
});

module.exports = mongoose.model("Company", companySchema);