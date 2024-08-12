import express from "express";
import bcrypt from "bcrypt";
import { Admin } from "./models/admin.mjs";
import { Connection } from "./database.mjs";

const initialize = async () => {
    await Connection(); // Ensure database is connected before proceeding

    async function adminAccount() {
        try {
            const adminCount = await Admin.countDocuments();
            if (adminCount === 0) {
                const hashPassword = await bcrypt.hash("adminPassword", 10);
                const newAdmin = new Admin({
                    email: "admin@gmail.com",
                    password: hashPassword,
                });
                await newAdmin.save();
                console.log("Account created successfully!");
            } else {
                console.log("Sorry, Admin account already exists!");
            }
        } catch (error) {
            console.error("Error occurred while adding admin: " + error);
        }
    }

    await adminAccount();
};

initialize();
