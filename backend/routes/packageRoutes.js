
const express = require("express");
const router = express.Router();

const Package = require("../models/package.js");

// Add Package
router.post("/", async (req, res) => {
    try {
        const newPackage = new Package(req.body);
        await newPackage.save();
        res.status(201).json(newPackage);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// View All Packages
router.get("/", async (req, res) => {
    try {
        const packages = await Package.find();
        res.json(packages);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// View Single Package
router.get("/:id", async (req, res) => {
    try {
        const travelPackage = await Package.findById(req.params.id);

        if (!travelPackage) {
            return res.status(404).json({ message: "Package not found" });
        }

        res.json(travelPackage);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Update Package
router.put("/:id", async (req, res) => {
    try {
        const updatedPackage = await Package.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );

        if (!updatedPackage) {
            return res.status(404).json({ message: "Package not found" });
        }

        res.json(updatedPackage);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Delete Package
router.delete("/:id", async (req, res) => {
    try {
        const deletedPackage = await Package.findByIdAndDelete(req.params.id);

        if (!deletedPackage) {
            return res.status(404).json({ message: "Package not found" });
        }

        res.json({ message: "Package deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
