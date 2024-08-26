import { Router } from "express";
import authRoutes from "./routes/auth";
import usersRoutes from "./routes/users";
import booksRoutes from "./routes/books";
import borrowRouter from "./routes/borrow";
import returnRouter from "./routes/return";
import accountRouter from "./routes/account";
import dashboardRoutes from "./routes/dashboard";

const router = Router();

router.use("/api", authRoutes);
router.use("/api", usersRoutes);
router.use("/api", booksRoutes);
router.use("/api", borrowRouter);
router.use("/api", returnRouter);
router.use("/api", accountRouter);
router.use("/api", dashboardRoutes);

export default router;
