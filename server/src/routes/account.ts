import { Router } from "express";
import jwt from "jsonwebtoken";
import { jwtSecret } from "../config/jwtKey";
import UserActivity from "../models/userActivity";
import User from "../models/usersModel";

const router = Router();

// Get user account details
router.get("/account", async (req, res) => {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
        return res.status(401).json({ error: "No token provided" });
    }

    try {
        const decoded = jwt.verify(token, jwtSecret) as { userId: number };
        const userId = decoded.userId;

        // Fetch user details
        const user = await User.findByPk(userId, {
            attributes: ["id", "username", "email"],
        });

        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        // Fetch user activity
        const userActivity = await UserActivity.findOne({
            where: { user_id: userId },
            attributes: ["books_borrowed_count", "books_returned_count"],
        });

        // Respond with user details and activity
        res.status(200).json({
            user: {
                id: user.id,
                username: user.username,
                email: user.email,
            },
            activity: {
                booksBorrowedCount: userActivity?.books_borrowed_count || 0,
                booksReturnedCount: userActivity?.books_returned_count || 0,
            },
        });
    } catch (err) {
        if (err instanceof jwt.JsonWebTokenError) {
            return res.status(401).json({ error: "Invalid token" });
        }

        console.error("Error fetching account details:", err);
        res.status(500).json({ error: "Internal server error" });
    }
});

// Update user account details
router.put("/account", async (req, res) => {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
        return res.status(401).json({ error: "No token provided" });
    }

    try {
        const decoded = jwt.verify(token, jwtSecret) as { userId: number };
        const userId = decoded.userId;
        const { username, email } = req.body;

        if (!username || !email) {
            return res
                .status(400)
                .json({ error: "Username and email are required" });
        }

        // Update user details
        const [affectedRows] = await User.update(
            { username, email },
            { where: { id: userId } }
        );

        if (affectedRows === 0) {
            return res.status(404).json({ error: "User not found" });
        }

        res.status(200).json({ message: "Account updated successfully" });
    } catch (err) {
        if (err instanceof jwt.JsonWebTokenError) {
            return res.status(401).json({ error: "Invalid token" });
        }

        console.error("Error updating account details:", err);
        res.status(500).json({ error: "Internal server error" });
    }
});

export default router;
