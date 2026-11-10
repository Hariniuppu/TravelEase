const mongoose = require("mongoose");

const destinationSchema = new mongoose.Schema({
    name: String,
    country: String,
    description: String,
    image: String
});

module.exports = mongoose.model("Destination", destinationSchema);