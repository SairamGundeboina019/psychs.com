// Import required modules
const express = require('express');
const mysql = require('mysql2');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const cors = require('cors'); // Import cors
const productRoutes = require('./routes/productRoutes');
const cartRoutes = require('./routes/cartRoutes');
const serviceRoutes = require('./routes/serviceRoutes');
const authRoutes = require('./routes/authRoutes');
const verifyToken = require('./middleware/authMiddleware'); // Import middleware

// Initialize express app
const app = express();
dotenv.config();

// Middleware
app.use(bodyParser.json());
app.use(cors()); // Enable CORS

// Configure MySQL Database
const db = mysql.createConnection({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASS || '9885',
    database: process.env.DB_NAME || 'psychs_db'
});

// Test Database Connection
db.connect((err) => {
    if (err) throw err;
    console.log('MySQL Database Connected!');
});

// Use Routes
app.use('/api/products', productRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/services', serviceRoutes);
app.use('/api/auth', authRoutes);

// Protected Route: Get cart items for a specific user
app.get('/api/cart/:userId', verifyToken, (req, res) => {
    const { userId } = req.params;

    // Ensure the logged-in user matches the userId
    if (req.user.id != userId) {
        return res.status(403).json({ error: 'Unauthorized access to cart' });
    }

    const query = 'SELECT * FROM cart WHERE user_id = ?';
    db.query(query, [userId], (err, results) => {
        if (err) return res.status(500).json({ error: 'Failed to fetch cart items' });
        res.json(results);
    });
});

// Sample Products Route
app.get('/api/products', (req, res) => {
    const query = 'SELECT * FROM products';
    db.query(query, (err, results) => {
        if (err) {
            console.error('Failed to fetch products:', err.message);
            return res.status(500).json({ error: 'Failed to fetch products' });
        }
        res.json(results);
    });
});

// Define a basic route
app.get('/', (req, res) => {
    res.send('Welcome to Psychs.com Backend API');
});

// Define Port and Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
