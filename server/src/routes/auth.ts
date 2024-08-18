import { Router } from "express";
import pool from "./db";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { jwtSecret } from "../config";

const router = Router();

// Sign-up route
router.post("/signup", async (req, res) => {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
        return res.status(400).json({ error: "All fields are required" });
    }

    try {
        // Check if the user already exists
        const userCheck = await pool.query(
            "SELECT * FROM users WHERE email = $1",
            [email]
        );

        if (userCheck.rows.length > 0) {
            return res.status(400).json({ message: "User already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        // Insert the new user into the database
        const newUser = await pool.query(
            "INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING *",
            [username, email, hashedPassword]
        );

        const userId = newUser.rows[0].id;
        // Create a JWT token
        const token = jwt.sign({ userId }, jwtSecret, { expiresIn: "1h" });

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
        const userResult = await pool.query(
            "SELECT * FROM users WHERE email = $1",
            [email]
        );

        if (userResult.rows.length === 0) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        const user = userResult.rows[0];

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
        const adminResult = await pool.query(
            "SELECT * FROM admins WHERE email = $1 AND username = $2",
            [email, username]
        );

        if (adminResult.rows.length === 0) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        const admin = adminResult.rows[0];

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
