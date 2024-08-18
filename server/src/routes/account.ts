import { Router } from "express";
import pool from "./db";
import jwt from "jsonwebtoken";
import { jwtSecret } from "../config";

const router = Router();

// Get account details
router.get("/account", async (req, res) => {
    const token = req.header("Authorization")?.split(" ")[1];

    if (!token) {
        return res.status(401).json({ error: "No token provided." });
    }

    try {
        const decoded = jwt.verify(token, jwtSecret) as { userId: number };

        const userId = decoded.userId;

        const userResult = await pool.query(
            "SELECT username, email FROM users WHERE id = $1",
            [userId]
        );

        const borrowReturnCount = await pool.query(
            "SELECT books_borrowed_count, books_returned_count FROM user_activity WHERE user_id = $1",
            [userId]
        );

        if (userResult.rows.length === 0) {
            return res.status(404).json({ error: "User not found." });
        }

        const user = userResult.rows[0];
        const counts = borrowReturnCount.rows[0] || {
            books_borrowed_count: 0,
            books_returned_count: 0,
        };

        res.status(200).json({
            username: user.username,
            email: user.email,
            borrowed: counts.books_borrowed_count,
            returned: counts.books_returned_count,
        });
    } catch (err) {
        console.error("Error fetching account details:", err);
        res.status(500).json({ error: "Internal server error" });
    }
});

// Update account details
router.put("/account", async (req, res) => {
    const token = req.header("Authorization")?.split(" ")[1];

    if (!token) {
        return res.status(401).json({ error: "No token provided." });
    }

    try {
        const decoded = jwt.verify(token, jwtSecret) as { userId: number };
        const { username, email } = req.body;

        const userId = decoded.userId;

        const result = await pool.query(
            "UPDATE users SET username = $1, email = $2 WHERE id = $3 RETURNING *",
            [username, email, userId]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({ error: "User not found." });
        }

        res.status(200).json(result.rows[0]);
    } catch (err) {
        console.error("Error updating account details:", err);
        res.status(500).json({ error: "Internal server error" });
    }
});

export default router;
