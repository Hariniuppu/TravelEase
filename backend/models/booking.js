const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
    customerName: String,
    email: String,
    packageId: String,
    packageName: String,
    numberOfPersons: Number,
    totalPrice: Number,
    status: {
        type: String,
        default: "Booked"
    }
});

module.exports = mongoose.model("Booking", bookingSchema);