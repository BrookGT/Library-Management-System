import { Router } from "express";
import { Op } from "sequelize";
import { parsePaginationParams } from "../utils/requestFormatter";
import { formatPaginatedResponse } from "../utils/responseFormatter";
import Book from "../models/bookModel";

const router = Router();

// Fetch all books
router.get("/books", async (req, res) => {
    try {
        const { page, limit, search } = parsePaginationParams(req);
        const offset = (page - 1) * limit;
        const whereClause = search
            ? {
                  [Op.or]: [
                      { title: { [Op.iLike]: `%${search}%` } },
                      { author: { [Op.iLike]: `%${search}%` } },
                  ],
              }
            : {};

        const totalBooks = await Book.count({ where: whereClause });

        // Fetch books with pagination
        const books = await Book.findAll({
            where: whereClause,
            limit: Number(limit),
            offset: offset,
            order: [["id", "ASC"]],
        });

        const response = formatPaginatedResponse(
            books,
            totalBooks,
            page,
            Math.ceil(totalBooks / limit)
        );

        res.json({
            response,
            books,
            totalBooks,
            totalPages: Math.ceil(totalBooks / Number(limit)),
            currentPage: Number(page),
        });
    } catch (err) {
        console.error("Error fetching books:", err);
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

        // Create a new book record
        const newBook = await Book.create({
            title,
            author,
            description,
            image_url,
        });

        console.log("Book added successfully:", newBook);
        res.status(201).json(newBook);
    } catch (err) {
        console.error("Error adding book:", err);
        res.status(500).json({ error: "Internal server error" });
    }
});

// Remove a book by ID
router.delete("/books/:id", async (req, res) => {
    const { id } = req.params;

    try {
        // Find the book by ID
        const book = await Book.findByPk(id);

        if (!book) {
            return res.status(404).json({ error: "Book not found" });
        }

        // Delete the book
        await book.destroy();

        res.status(200).json({ message: "Book removed successfully" });
    } catch (err) {
        console.error("Error removing book:", err);
        res.status(500).json({ error: "Internal server error" });
    }
});

export default router;
