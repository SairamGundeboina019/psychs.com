// Import MySQL and dotenv
const mysql = require('mysql2');
require('dotenv').config();

// Create a MySQL database connection
const db = mysql.createConnection({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASS || '9885',
    database: process.env.DB_NAME || 'psychs_db'
});

// Connect to the database
db.connect((err) => {
    if (err) {
        console.error('Database connection failed:', err.message);
        process.exit(1);
    }
    console.log('MySQL Database Connected Successfully!');
});

module.exports = db;
