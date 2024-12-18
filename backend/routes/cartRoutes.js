// Import Express and Cart Controller
const express = require('express');
const router = express.Router();
const { addToCart, getCartItems, updateCartItem, deleteCartItem } = require('../controllers/cartController');
const verifyToken = require('../middleware/authMiddleware'); // Import only once
const db = require('../config/db'); // Import the MySQL connection

// Define Cart Routes
router.post('/', verifyToken, addToCart);                 // POST - Add to cart

// GET - Fetch cart items for a specific user
router.get('/:userId', verifyToken, (req, res) => {
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

// PUT - Update cart item quantity
router.put('/:id', verifyToken, updateCartItem);

router.delete('/:id', verifyToken, (req, res) => {
  const { id } = req.params;

  const query = 'DELETE FROM cart WHERE id = ?';
  db.query(query, [id], (err, result) => {
      if (err) {
          console.error('Error deleting cart item:', err.message);
          return res.status(500).json({ error: 'Failed to delete cart item.' });
      }
      res.json({ message: 'Cart item deleted successfully.' });
  });
});

module.exports = router;
