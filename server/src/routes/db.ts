import { Pool } from "pg";

const pool = new Pool({
    user: "postgres",
    host: "localhost",
    database: "librarymanagementsystem",
    password: "root123",
    port: 5432,
});

// pool.on("connect", () => {
//     console.log("Connected to the PostgreSQL database.");
// });

// pool.on("error", (err) => {
//     console.error("Failed to connect database!", err);
//     process.exit(-1);
// });

export default pool;
