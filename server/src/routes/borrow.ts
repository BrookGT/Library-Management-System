import { Router } from "express";
import pool from "./db";
import jwt from "jsonwebtoken";
import { jwtSecret } from "../config";

const router = Router();

// Borrow a book
router.post("/borrow", async (req, res) => {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
        return res.status(401).json({ error: "No token provided" });
    }

    try {
        const decoded = jwt.verify(token, jwtSecret) as { userId: number };

        const { bookId } = req.body;
        const userId = decoded.userId;

        if (!bookId || !userId) {
            return res
                .status(400)
                .json({ error: "Book ID and User ID are required" });
        }

        // Check if the user has already borrowed the book
        const existingBorrowing = await pool.query(
            "SELECT * FROM borrowings WHERE user_id = $1 AND book_id = $2",
            [userId, bookId]
        );

        if (existingBorrowing.rows.length > 0) {
            return res
                .status(400)
                .json({ error: "You've already borrowed this book!" });
        }

        const result = await pool.query(
            "INSERT INTO borrowings (user_id, book_id, borrow_date) VALUES ($1, $2, NOW()) RETURNING *",
            [userId, bookId]
        );

        await pool.query(
            `INSERT INTO book_counts (book_id, borrow_count)
             VALUES ($1, 1)
             ON CONFLICT (book_id) 
             DO UPDATE SET borrow_count = book_counts.borrow_count + 1`,
            [bookId]
        );

        await pool.query(
            `INSERT INTO user_activity (user_id, books_borrowed_count)
         VALUES ($1, 1)
         ON CONFLICT (user_id) 
         DO UPDATE SET books_borrowed_count = user_activity.books_borrowed_count + 1`,
            [userId]
        );

        res.status(201).json(result.rows[0]);
    } catch (err) {
        if (err instanceof jwt.JsonWebTokenError) {
            return res.status(401).json({ error: "Invalid token" });
        }

        console.error("Error borrowing book:", err);
        res.status(500).json({ error: "Internal server error" });
    }
});

export default router;
