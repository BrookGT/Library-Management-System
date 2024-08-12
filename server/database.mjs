import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const Connection = async () => {
    try {
        await mongoose.connect(process.env.URL, {
            serverSelectionTimeoutMS: 30000, // Increase timeout to 30 seconds
        });
        console.log("Connected to the database successfully!");
    } catch (err) {
        console.error("Error while connecting: " + err);
    }
};

export { Connection };
