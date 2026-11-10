require("dotenv").config();

const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const User = require("./models/User");

async function resetAdmin() {
    try {
        await mongoose.connect(process.env.MONGO_URI);

        const email = process.env.ADMIN_EMAIL;
        const password = process.env.ADMIN_PASSWORD;

        const hashedPassword = await bcrypt.hash(password, 10);

        const admin = await User.findOneAndUpdate(
            { email },
            {
                password: hashedPassword,
                role: "admin"
            },
            { new: true }
        );

        if (!admin) {
            console.log("Admin email not found:", email);
        } else {
            console.log("Admin password updated successfully!");
        }
    } catch (error) {
        console.log("Error:", error.message);
    } finally {
        await mongoose.disconnect();
    }
}

resetAdmin();