const { Pool } = require("pg");
require("dotenv").config();

const pool = new Pool({
  user: process.env.DB_USER,
  host: "localhost",
  // host: "127.0.0.1", // or your database host
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
  port: 5432,
});

pool.on("error", (err) => {
  console.error("Unexpected error on idle client", err);
});

// Test the connection and log success or error
pool.connect((err, client, done) => {
  if (err) {
    console.error("Error connecting to the database:", err);
    return;
  }

  console.log("Successfully connected to the database");

  // Release the client back to the pool
  done();
});
module.exports = pool;

//psql -h your_host -d your_database -U your_user -a -f /path/to/your-migration-script.sql
