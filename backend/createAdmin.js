require("dotenv").config();

const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const User = require("./models/User");

async function createAdmin() {
    try {
        await mongoose.connect(process.env.MONGO_URI);

        const email = process.env.ADMIN_EMAIL;
        const password = process.env.ADMIN_PASSWORD;

        if (!email || !password) {
            throw new Error("Admin email or password is missing in .env");
        }

        const existingAdmin = await User.findOne({ email });

        if (existingAdmin) {
            console.log("Admin account already exists.");
        } else {
            const hashedPassword = await bcrypt.hash(password, 10);

            await User.create({
                name: "TravelEase Admin",
                email,
                password: hashedPassword,
                role: "admin"
            });

            console.log("Admin account created successfully!");
        }
    } catch (error) {
        console.log("Error:", error.message);
    } finally {
        await mongoose.disconnect();
    }
}

createAdmin();