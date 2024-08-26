import { Router } from "express";
import jwt from "jsonwebtoken";
import { jwtSecret } from "../config/jwtKey";
import BookCount from "../models/bookCount";
import Borrowing from "../models/borrowing";
import UserActivity from "../models/userActivity";

const router = Router();

// Return a book
router.post("/return", async (req, res) => {
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

        // Check if the user has borrowed the book
        const existingBorrowing = await Borrowing.findOne({
            where: { user_id: userId, book_id: bookId },
        });

        if (!existingBorrowing) {
            return res
                .status(400)
                .json({ error: "You haven't borrowed this book!" });
        }

        // Delete the borrowing record
        await Borrowing.destroy({
            where: { user_id: userId, book_id: bookId },
        });

        // Update book count
        const [bookCount] = await BookCount.findOrCreate({
            where: { book_id: bookId },
            defaults: { book_id: bookId, borrow_count: 0 },
        });

        const newBorrowCount = (bookCount.borrow_count ?? 0) - 1;
        if (newBorrowCount < 0) {
            throw new Error("Borrow count cannot be negative");
        }

        await BookCount.update(
            { borrow_count: newBorrowCount },
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

        const newReturnedCount = (userActivity.books_returned_count ?? 0) + 1;

        await UserActivity.update(
            { books_returned_count: newReturnedCount },
            { where: { user_id: userId } }
        );

        res.status(200).json({ message: "Book returned successfully" });
    } catch (err) {
        if (err instanceof jwt.JsonWebTokenError) {
            return res.status(401).json({ error: "Invalid token" });
        }

        console.error("Error returning book:", err);
        res.status(500).json({ error: "Internal server error" });
    }
});

export default router;
