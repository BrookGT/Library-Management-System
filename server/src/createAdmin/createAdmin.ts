import { Pool } from "pg";
import bcrypt from "bcrypt";

const pool = new Pool({
    user: "postgres",
    host: "localhost",
    database: "librarymanagementsystem",
    password: "root123",
    port: 5432,
});

const createAdmin = async () => {
    try {
        // Hash the password
        const hashedPassword = await bcrypt.hash("admin123123", 10);

        // Insert the admin user
        const result = await pool.query(
            "INSERT INTO admins (username, email, password) VALUES ($1, $2, $3) ON CONFLICT (email) DO NOTHING RETURNING *",
            ["admin", "admin@example.com", hashedPassword]
        );

        if (result.rows.length > 0) {
            console.log("Admin user created successfully:", result.rows[0]);
        } else {
            console.log("Admin user already exists.");
        }
    } catch (error) {
        console.error("Error creating admin user:", error);
    } finally {
        // Close the database connection
        await pool.end();
    }
};

// Run the script
createAdmin();
