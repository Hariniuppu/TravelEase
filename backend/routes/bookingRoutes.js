const { authMiddleware, adminOnly } = require("../middleware/authMiddleware");
const express = require("express");
const router = express.Router();

const Booking = require("../models/booking");

// Add Booking
router.post("/", async (req, res) => {
    try {
        const newBooking = new Booking(req.body);
        await newBooking.save();

        res.status(201).json({
            message: "Booking successful",
            booking: newBooking
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// View All Bookings
router.get("/", async (req, res) => {
    try {
        const bookings = await Booking.find();
        res.json(bookings);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;