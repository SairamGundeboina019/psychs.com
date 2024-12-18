// Import Required Modules
const db = require('../config/db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

// Controller to REGISTER a new user
const registerUser = async (req, res) => {
    const { name, email, password } = req.body;

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert user into the database
    const sql = 'INSERT INTO users (name, email, password) VALUES (?, ?, ?)';
    db.query(sql, [name, email, hashedPassword], (err) => {
        if (err) {
            return res.status(500).json({ error: 'Registration failed or email already exists' });
        }
        res.json({ message: 'User registered successfully' });
    });
};

// Controller to LOGIN a user
const loginUser = (req, res) => {
    const { email, password } = req.body;

    // Check if user exists
    const sql = 'SELECT * FROM users WHERE email = ?';
    db.query(sql, [email], async (err, results) => {
        if (err || results.length === 0) {
            return res.status(401).json({ error: 'Invalid email or password' });
        }

        const user = results[0];

        // Verify password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ error: 'Invalid email or password' });
        }

        // Generate JWT Token
        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET || 'secretkey', { expiresIn: '1h' });
        res.json({ message: 'Login successful', token });
    });
};

// Controller to VERIFY JWT token
const verifyToken = (req, res) => {
    const token = req.headers['authorization'];

    if (!token) {
        return res.status(403).json({ error: 'No token provided' });
    }

    jwt.verify(token.split(' ')[1], process.env.JWT_SECRET || 'secretkey', (err, decoded) => {
        if (err) {
            return res.status(401).json({ error: 'Unauthorized' });
        }
        res.json({ message: 'Token is valid', userId: decoded.id });
    });
};

module.exports = { registerUser, loginUser, verifyToken };
