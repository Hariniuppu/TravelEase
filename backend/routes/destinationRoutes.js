const express = require("express");
const router = express.Router();

const Destination = require("../models/Destination");

// Add Destination
router.post("/", async (req, res) => {
    try {
        const newDestination = new Destination(req.body);
        await newDestination.save();

        res.status(201).json({
            message: "Destination added successfully",
            destination: newDestination
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});
// Delete Destination
router.delete("/:id", async (req, res) => {
    try {
        const destination = await Destination.findByIdAndDelete(req.params.id);

        if (!destination) {
            return res.status(404).json({
                message: "Destination not found"
            });
        }

        res.json({
            message: "Destination deleted successfully"
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
});

// Display All Destinations
router.get("/", async (req, res) => {
    try {
        const destinations = await Destination.find();
        res.json(destinations);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;