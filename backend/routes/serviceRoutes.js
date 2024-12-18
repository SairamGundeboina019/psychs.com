// Import Express and Service Controller
const express = require('express');
const router = express.Router();
const { bookService, getServicesByUser, deleteService } = require('../controllers/serviceController');
const verifyToken = require('../middleware/authMiddleware');

// Define Service Routes
router.post('/', verifyToken, bookService);                   // POST - Book a service
router.get('/:user_id', verifyToken, getServicesByUser);      // GET - Fetch bookings for a user
router.delete('/:id', verifyToken, deleteService);            // DELETE - Cancel a service

module.exports = router;
