const { Pool } = require("pg");
require("dotenv").config();

const pool = new Pool({
  user: process.env.DB_USER,
  host: "localhost",
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
  port: 5432,
});

pool.on("error", (err) => {
  console.error("Unexpected error on idle client", err);
});

pool.connect((err, client, done) => {
  if (err) {
    console.error("Error connecting to the database:", err);
    return;
  }

  console.log("Successfully connected to the database");

  done();
});
module.exports = pool;

//psql -h your_host -d your_database -U your_user -a -f /path/to/your-migration-script.sql
