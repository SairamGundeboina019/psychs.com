// Import Express and Auth Controller
const express = require('express');
const router = express.Router();
const { registerUser, loginUser, verifyToken } = require('../controllers/authController');



// Define Authentication Routes
router.post('/register', registerUser);      // POST - Register a new user
router.post('/login', loginUser);            // POST - Log in a user
router.get('/verify', verifyToken);          // GET - Verify JWT token

module.exports = router;
