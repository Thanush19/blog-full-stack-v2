// const { Pool } = require("pg");
// require("dotenv").config();

// const pool = new Pool({
//   user: process.env.DB_USER,
//   host: "localhost",
//   database: process.env.DB_DATABASE,
//   password: process.env.DB_PASSWORD,
//   port: 5432,
// });

// pool.on("error", (err) => {
//   console.error("Unexpected error on idle client", err);
// });

// pool.connect((err, client, done) => {
//   if (err) {
//     console.error("Error connecting to the database:", err);
//     return;
//   }

//   console.log("Successfully connected to the database");

//   done();
// });

// module.exports = pool;
const { Pool } = require("pg");
require("dotenv").config();

// Extract password from environment variables
const password = process.env.DB_PASSWORD;

// Construct the connection string with the extracted password
const connectionString =
  "postgresql://Thanush19:gVCkpIl67TJm@ep-shiny-fire-69396007-pooler.ap-southeast-1.aws.neon.tech/neondb?sslmode=require";

const pool = new Pool({
  connectionString,
  // ssl: {
  //   require: true,
  // },
});

// Function to check the connection and log success or error
async function checkDatabaseConnection() {
  try {
    const client = await pool.connect();
    console.log("Connected to the database");
    client.release();
  } catch (error) {
    console.error("Error connecting to the database:", error.message);
  }
}

// Invoke the function to check the database connection
checkDatabaseConnection();

module.exports = pool;
