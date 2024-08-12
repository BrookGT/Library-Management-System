import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import "./database.mjs";
import { AdminRouter } from "./routes/auth.mjs";

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());
app.use(cookieParser());
app.use("/auth", AdminRouter);

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}!`);
});
