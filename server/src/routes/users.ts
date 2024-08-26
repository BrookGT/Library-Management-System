import express from "express";
import sequelize from "../config/db";
import UserActivity from "../models/userActivity";
import User from "../models/usersModel";

const router = express.Router();

router.get("/users", async (req, res) => {
    const { page = 1, limit = 8 } = req.query;
    const offset = (Number(page) - 1) * Number(limit);

    try {
        const totalUsers = await User.count();

        const users = await User.findAll({
            attributes: [
                "id",
                "username",
                "email",
                [
                    sequelize.fn(
                        "COALESCE",
                        sequelize.fn(
                            "SUM",
                            sequelize.col("UserActivity.books_borrowed_count")
                        ),
                        0
                    ),
                    "books_borrowed",
                ],
                [
                    sequelize.fn(
                        "COALESCE",
                        sequelize.fn(
                            "SUM",
                            sequelize.col("UserActivity.books_returned_count")
                        ),
                        0
                    ),
                    "books_returned",
                ],
            ],
            include: [
                {
                    model: UserActivity,
                    as: "UserActivity",
                    attributes: [],
                },
            ],
            group: ["User.id"],
            order: [["id", "ASC"]],
            limit: Number(limit),
            offset: Number(offset),
        });

        res.json({
            users,
            totalUsers,
            totalPages: Math.ceil(totalUsers / Number(limit)),
            currentPage: Number(page),
        });
    } catch (error) {
        console.error("Error fetching users:", error);
        res.status(500).send("Server error");
    }
});

export default router;
