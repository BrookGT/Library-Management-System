import express from "express";
import pool from "./db";

const router = express.Router();

// Endpoint to get all users
router.get("/users", async (req, res) => {
    try {
        const result = await pool.query(`
      SELECT users.id, users.username, users.email, 
             COALESCE(user_activity.books_borrowed_count, 0) AS books_borrowed,
             COALESCE(user_activity.books_returned_count, 0) AS books_returned
      FROM users
      LEFT JOIN user_activity ON users.id = user_activity.user_id
      ORDER BY users.id
    `);
        res.json(result.rows);
    } catch (error) {
        console.error("Error fetching users:", error);
        res.status(500).send("Server error");
    }
});

export default router;
