import express from "express";
import cors from "cors";
import routes from "./routes";
import BookCount from "./models/bookCount";
import Book from "./models/bookModel";
import Borrowing from "./models/borrowing";
import UserActivity from "./models/userActivity";
import User from "./models/usersModel";
import sequelize from "./config/db";

Book.associate();
BookCount.associate();
Borrowing.associate();
UserActivity.associate();
User.associate();

// Sync models
sequelize.sync({ force: false }).then(() => {});

const app = express();
const port = 5000;

app.use(express.json());
app.use(
    cors({
        origin: "http://localhost:5173",
    })
);

app.use(routes);

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
