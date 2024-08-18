import { Router } from "express";
import pool from "./db";
import jwt from "jsonwebtoken";
import { jwtSecret } from "../config";

const router = Router();

// Return a book
router.post("/return", async (req, res) => {
    const token = req.header("Authorization")?.split(" ")[1];

    if (!token) {
        return res.status(401).json({ error: "No token provided." });
    }

    try {
        const decoded = jwt.verify(token, jwtSecret) as { userId: number };

        const { bookId } = req.body;
        const userId = decoded.userId;

        const unborrowedReturn = await pool.query(
            "SELECT * FROM borrowings WHERE user_id = $1 AND book_id = $2",
            [userId, bookId]
        );
        if (unborrowedReturn.rows.length === 0) {
            return res
                .status(400)
                .json({ error: "you haven't borrowed this book!" });
        }

        const result = await pool.query(
            "UPDATE borrowings SET return_date = NOW() WHERE book_id = $1 AND user_id = $2 AND return_date IS NULL RETURNING *",
            [bookId, userId]
        );

        await pool.query(
            `INSERT INTO user_activity (user_id, books_returned_count)
         VALUES ($1, 1)
         ON CONFLICT (user_id) 
         DO UPDATE SET books_returned_count = user_activity.books_returned_count + 1`,
            [userId]
        );

        if (result.rowCount === 0) {
            return res.status(404).json({
                error: "No active returning found !",
            });
        }

        res.status(200).json(result.rows[0]);
    } catch (err) {
        console.error("Error returning book:", err);
        res.status(500).json({ error: "Internal server error" });
    }
});

export default router;
