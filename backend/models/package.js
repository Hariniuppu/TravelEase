const mongoose = require("mongoose");

const packageSchema = new mongoose.Schema({
    packageId: String,
    packageName: String,
    destination: String,
    duration: String,
    numberOfPersons: Number,
    price: Number,
    hotelName: String,
    travelMode: String,
    status: String
});

module.exports = mongoose.model("Package", packageSchema);