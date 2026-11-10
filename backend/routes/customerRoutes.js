const { authMiddleware, adminOnly } = require("../middleware/authMiddleware");
const express = require("express");
const router = express.Router();

const Customer = require("../models/customer");

// Add Customer
router.post("/", async (req, res) => {
    try {
        console.log("Received Data:", req.body);

        const newCustomer = new Customer(req.body);
        await newCustomer.save();

        res.status(201).json({
            message: "Customer registered successfully",
            customer: newCustomer
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// View All Customers
router.get("/", async (req, res) => {
    try {
        const customers = await Customer.find();
        res.json(customers);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;