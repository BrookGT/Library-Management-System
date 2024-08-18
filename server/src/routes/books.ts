import { Router } from "express";
import pool from "./db";

const router = Router();

// Fetch all books
router.get("/books", async (req, res) => {
    const { page = 1, limit = 6 } = req.query;
    const offset = (Number(page) - 1) * Number(limit);

    try {
        const totalBooksQuery = await pool.query("SELECT COUNT(*) FROM books");
        const totalBooks = parseInt(totalBooksQuery.rows[0].count, 10);

        const booksQuery = await pool.query(
            "SELECT * FROM books ORDER BY id LIMIT $1 OFFSET $2",
            [limit, offset]
        );

        res.json({
            books: booksQuery.rows,
            totalBooks,
            totalPages: Math.ceil(totalBooks / Number(limit)),
            currentPage: Number(page),
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Server error" });
    }
});

// Add a new book
router.post("/books", async (req, res) => {
    const { title, author, description, image_url } = req.body;

    if (!title || !author || !description || !image_url) {
        return res.status(400).json({ error: "All fields are required" });
    }

    try {
        console.log("Inserting book into database:", {
            title,
            author,
            description,
            image_url,
        });
        const result = await pool.query(
            "INSERT INTO books (title, author, description, image_url) VALUES ($1, $2, $3, $4) RETURNING *",
            [title, author, description, image_url]
        );
        console.log("Book added successfully:", result.rows[0]);
        res.status(201).json(result.rows[0]);
    } catch (err) {
        console.error("Error adding book:", err);
        res.status(500).json({ error: "Internal server error" });
    }
});

// Remove a book by ID
router.delete("/books/:id", async (req, res) => {
    const { id } = req.params;

    try {
        const result = await pool.query(
            "DELETE FROM books WHERE id = $1 RETURNING *",
            [id]
        );
        if (result.rowCount === 0) {
            return res.status(404).json({ error: "Book not found" });
        }
        res.status(200).json({ message: "Book removed successfully" });
    } catch (err) {
        console.error("Error removing book:", err);
        res.status(500).json({ error: "Internal server error" });
    }
});

export default router;
