import express from "express";
import BookCount from "../models/bookCount";
import Book from "../models/bookModel";
import UserActivity from "../models/userActivity";
import User from "../models/usersModel";

const router = express.Router();

// Total Books
router.get("/totalBooks", async (req, res) => {
    try {
        const totalBooks = await Book.count();
        res.json({ total_books: totalBooks });
    } catch (err) {
        console.error("Error fetching total books:", err);
        res.status(500).json({ error: "Failed to get total books" });
    }
});

// Total Users
router.get("/totalUsers", async (req, res) => {
    try {
        const totalUsers = await User.count();
        res.json({ total_users: totalUsers });
    } catch (err) {
        console.error("Error fetching total users:", err);
        res.status(500).json({ error: "Failed to get total users" });
    }
});

// Top User
router.get("/topUser", async (req, res) => {
    try {
        const topUser = await UserActivity.findOne({
            attributes: ["user_id"],
            include: [
                {
                    model: User,
                    attributes: ["username"],
                    as: "user",
                },
            ],
            order: [["books_borrowed_count", "DESC"]],
            limit: 1,
        });

        if (!topUser || !topUser.user) {
            return res.status(404).json({ error: "No data found" });
        }

        res.json({ name: topUser.user.username });
    } catch (err) {
        console.error("Error fetching top user:", err);
        res.status(500).json({ error: "Failed to get top user" });
    }
});

// Most Borrowed Book
router.get("/mostBorrowedBook", async (req, res) => {
    try {
        const mostBorrowedBook = await BookCount.findOne({
            attributes: ["book_id"],
            include: [
                {
                    model: Book,
                    attributes: ["title", "image_url"],
                    as: "book",
                },
            ],
            order: [["borrow_count", "DESC"]],
            limit: 1,
        });

        if (!mostBorrowedBook || !mostBorrowedBook.book) {
            return res.status(404).json({ error: "No data found" });
        }

        const bookData = mostBorrowedBook.book;

        res.json({
            title: bookData.title,
            image_url: bookData.image_url,
        });
    } catch (err) {
        console.error("Error fetching most borrowed book:", err);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

export default router;
