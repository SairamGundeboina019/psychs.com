// Import Express and Product Controller
const express = require('express');
const router = express.Router();
const { getAllProducts, getProductById, addProduct, updateProduct, deleteProduct } = require('../controllers/productController');
const verifyToken = require('../middleware/authMiddleware');

// Define Product Routes
router.get('/', getAllProducts);                    // GET all products (Public)
router.get('/:id', getProductById);                 // GET product by ID (Public)

// Protected Routes
router.post('/', verifyToken, addProduct);          // POST - Add a new product (Private)
router.put('/:id', verifyToken, updateProduct);     // PUT - Update product by ID (Private)
router.delete('/:id', verifyToken, deleteProduct);  // DELETE - Remove product by ID (Private)

module.exports = router;
