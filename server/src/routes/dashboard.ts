import express from "express";
import pool from "./db";

const router = express.Router();

// Total Books
router.get("/totalBooks", async (req, res) => {
    try {
        const result = await pool.query(
            "SELECT COUNT(*) AS total_books FROM books"
        );
        res.json(result.rows[0]);
    } catch (err) {
        console.error("Error fetching total books:", err);
        res.status(500).json({ error: "Failed to get total books" });
    }
});

// Total Users
router.get("/totalUsers", async (req, res) => {
    try {
        const result = await pool.query(
            "SELECT COUNT(*) AS total_users FROM users"
        );
        res.json(result.rows[0]);
    } catch (err) {
        console.error("Error fetching total users:", err);
        res.status(500).json({ error: "Failed to get total users" });
    }
});

// Top User
router.get("/topUser", async (req, res) => {
    try {
        const result = await pool.query(
            "SELECT u.username AS name FROM users u JOIN user_activity ua ON u.id = ua.user_id ORDER BY ua.books_borrowed_count DESC LIMIT 1"
        );
        res.json(result.rows[0]);
    } catch (err) {
        console.error("Error fetching top user:", err);
        res.status(500).json({ error: "Failed to get top user" });
    }
});

// Most Borrowed Book
router.get("/mostBorrowedBook", async (req, res) => {
    try {
        const result = await pool.query(
            "SELECT b.title, b.image_url FROM books b JOIN book_counts bc ON b.id = bc.book_id ORDER BY bc.borrow_count DESC LIMIT 1"
        );

        if (result.rows.length === 0) {
            return res.status(404).json({ error: "No data found" });
        }

        res.json(result.rows[0]);
    } catch (err) {
        console.error("Error fetching most borrowed book:", err);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

export default router;
