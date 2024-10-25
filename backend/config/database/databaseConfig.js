require("dotenv/config");
const mysql = require("mysql2/promise"); // Use promise-based MySQL library

const { DB_HOST, DB_USER, DB_PASS, DB_NAME } = process.env;

const pool = mysql.createPool({
  host: DB_HOST,
  user: DB_USER,
  password: DB_PASS,
  database: DB_NAME,
  waitForConnections: true,
  multipleStatements: true,
  connectionLimit: 10,
  maxIdle: 10,
  idleTimeout: 60000,
  queueLimit: 100,
  charset: "utf8mb4", 
});


const setupDatabaseSession = async () => {
  let connection;
  try {
    connection = await pool.getConnection(); // Get a connection from the pool
    console.log("Database connected");

  } catch (error) {
    console.log("error",error);
    throw error; 
  }
};

// Export the connection pool and setupDatabaseSession
module.exports = { pool, setupDatabaseSession };
