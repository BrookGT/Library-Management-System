import { Router } from "express";
import jwt from "jsonwebtoken";
import { jwtSecret } from "../config/jwtKey";
import BookCount from "../models/bookCount";
import Book from "../models/bookModel";
import Borrowing from "../models/borrowing";
import UserActivity from "../models/userActivity";
import User from "../models/usersModel";

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

        // Check if the book exists
        const book = await Book.findByPk(bookId);
        if (!book) {
            return res.status(404).json({ error: "Book not found" });
        }

        // Check if the user exists
        const user = await User.findByPk(userId);
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        // Check if the user has already borrowed the book
        const existingBorrowing = await Borrowing.findOne({
            where: { user_id: userId, book_id: bookId },
        });

        if (existingBorrowing) {
            return res
                .status(400)
                .json({ error: "You've already borrowed this book!" });
        }

        // Create new borrowing record
        const newBorrowing = await Borrowing.create({
            user_id: userId,
            book_id: bookId,
        });

        // Update book count
        const [bookCount] = await BookCount.findOrCreate({
            where: { book_id: bookId },
            defaults: { book_id: bookId, borrow_count: 0 },
        });

        await BookCount.update(
            { borrow_count: (bookCount.borrow_count ?? 0) + 1 }, // Handle possible undefined
            { where: { book_id: bookId } }
        );

        // Update user activity
        const [userActivity] = await UserActivity.findOrCreate({
            where: { user_id: userId },
            defaults: {
                user_id: userId,
                books_borrowed_count: 0,
                books_returned_count: 0,
            },
        });

        await UserActivity.update(
            {
                books_borrowed_count:
                    (userActivity.books_borrowed_count ?? 0) + 1,
            }, // Handle possible undefined
            { where: { user_id: userId } }
        );

        res.status(201).json(newBorrowing);
    } catch (err) {
        if (err instanceof jwt.JsonWebTokenError) {
            return res.status(401).json({ error: "Invalid token" });
        }

        console.error("Error borrowing book:", err);
        res.status(500).json({ error: "Internal server error" });
    }
});

export default router;
