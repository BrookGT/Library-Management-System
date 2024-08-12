import express from "express";
import { Admin } from "../models/admin.mjs";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const router = express.Router();

router.post("/adminLogin", async (req, res) => {
    const { email, password } = req.body;
    const admin = await Admin.findOne({ email });

    if (!admin) {
        return res.status(401).json({ message: "Admin Not Registered!" });
    }

    const validPassword = await bcrypt.compare(password, admin.password);
    if (!validPassword) {
        return res.status(401).json({ message: "Wrong Password!" });
    }

    const token = jwt.sign({ email: admin.email }, process.env.AdminKey, {
        expiresIn: "1h",
    });
    res.cookie("token", token, { httpOnly: true, secure: false }); // Set `secure` to `true` in production
    return res.status(200).json({ message: "Login successful" });
});

export { router as AdminRouter };
