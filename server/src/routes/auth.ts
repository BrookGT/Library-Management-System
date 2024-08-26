import { Router } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { jwtSecret } from "../config/jwtKey";
import Admin from "../models/adminModel";
import User from "../models/usersModel";

const router = Router();

// Sign-up route
router.post("/signup", async (req, res) => {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
        return res.status(400).json({ error: "All fields are required" });
    }

    try {
        // Check if the user already exists
        const user = await User.findOne({ where: { email } });

        if (user) {
            return res.status(400).json({ message: "User already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        // Insert the new user into the database
        const newUser = await User.create({
            username,
            email,
            password: hashedPassword,
        });

        // Create a JWT token
        const token = jwt.sign({ userId: newUser.id }, jwtSecret, {
            expiresIn: "1h",
        });

        res.status(201).json({ token });
    } catch (err) {
        console.error("Error during sign-up:", err);
        res.status(500).json({ error: "Internal server error" });
    }
});

// Sign-in route
router.post("/signin", async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ error: "All fields are required" });
    }

    try {
        // Check if the user exists
        const user = await User.findOne({ where: { email } });

        if (!user) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        // Compare the provided password with the stored hashed password
        const match = await bcrypt.compare(password, user.password);

        if (!match) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        // Authentication successful, create JWT
        const token = jwt.sign(
            { userId: user.id, username: user.username },
            jwtSecret,
            { expiresIn: "1h" }
        );

        // Send the token to the client
        res.status(200).json({
            message: "Sign-in successful",
            token: token, // Send JWT to the client
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
});

// Admin login route
router.post("/adminlogin", async (req, res) => {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
        return res.status(400).json({ error: "All fields are required" });
    }

    try {
        // Check if the admin exists
        const admin = await Admin.findOne({ where: { email, username } });

        if (!admin) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        // Compare the provided password with the stored hashed password
        const match = await bcrypt.compare(password, admin.password);

        if (!match) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        // Authentication successful
        const token = jwt.sign(
            { adminId: admin.id, username: admin.username },
            jwtSecret,
            { expiresIn: "1h" }
        );

        res.status(200).json({
            message: "Admin sign-in successful",
            token: token,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
});

export default router;
