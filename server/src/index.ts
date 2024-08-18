import express from "express";
import cors from "cors";
import authRoutes from "./routes/auth";
import usersRoutes from "./routes/users";
import booksRoutes from "./routes/books";
import borrowRouter from "./routes/borrow";
import returnRouter from "./routes/return";
import accountRouter from "./routes/account";
import dashboardRoutes from "./routes/dashboard";

const app = express();
const port = 5000;

app.use(express.json());
app.use(
    cors({
        origin: "http://localhost:5173",
    })
);

app.use("/api", authRoutes);
app.use("/api", usersRoutes);
app.use("/api", booksRoutes);
app.use("/api", borrowRouter);
app.use("/api", returnRouter);
app.use("/api", accountRouter);
app.use("/api", dashboardRoutes);

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
