// Import MySQL Database
const db = require('../config/db');

// Controller to GET all products
const getAllProducts = (req, res) => {
    const sql = 'SELECT * FROM products';
    db.query(sql, (err, results) => {
        if (err) {
            return res.status(500).json({ error: 'Failed to fetch products' });
        }
        res.json(results);
    });
};

// Controller to GET product by ID
const getProductById = (req, res) => {
    const sql = 'SELECT * FROM products WHERE id = ?';
    db.query(sql, [req.params.id], (err, result) => {
        if (err) {
            return res.status(500).json({ error: 'Failed to fetch product' });
        }
        res.json(result[0]);
    });
};

// Controller to ADD a new product
const addProduct = (req, res) => {
    const { name, description, price, stock } = req.body;
    const sql = 'INSERT INTO products (name, description, price, stock) VALUES (?, ?, ?, ?)';
    db.query(sql, [name, description, price, stock], (err, result) => {
        if (err) {
            return res.status(500).json({ error: 'Failed to add product' });
        }
        res.json({ message: 'Product added successfully', id: result.insertId });
    });
};

// Controller to UPDATE product by ID
const updateProduct = (req, res) => {
    const { name, description, price, stock } = req.body;
    const sql = 'UPDATE products SET name = ?, description = ?, price = ?, stock = ? WHERE id = ?';
    db.query(sql, [name, description, price, stock, req.params.id], (err) => {
        if (err) {
            return res.status(500).json({ error: 'Failed to update product' });
        }
        res.json({ message: 'Product updated successfully' });
    });
};

// Controller to DELETE product by ID
const deleteProduct = (req, res) => {
    const sql = 'DELETE FROM products WHERE id = ?';
    db.query(sql, [req.params.id], (err) => {
        if (err) {
            return res.status(500).json({ error: 'Failed to delete product' });
        }
        res.json({ message: 'Product deleted successfully' });
    });
};

module.exports = { getAllProducts, getProductById, addProduct, updateProduct, deleteProduct };
