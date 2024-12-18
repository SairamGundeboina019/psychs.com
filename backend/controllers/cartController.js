// Import MySQL Database
const db = require('../config/db');

// Controller to ADD an item to the cart
const addToCart = (req, res) => {
    const { user_id, product_id, quantity } = req.body;
    const sql = 'INSERT INTO cart (user_id, product_id, quantity) VALUES (?, ?, ?)';
    db.query(sql, [user_id, product_id, quantity], (err) => {
        if (err) {
            return res.status(500).json({ error: 'Failed to add item to cart' });
        }
        res.json({ message: 'Item added to cart successfully' });
    });
};

// Controller to GET cart items for a user
const getCartItems = (req, res) => {
    const sql = `
        SELECT cart.id, products.name, products.price, cart.quantity
        FROM cart
        JOIN products ON cart.product_id = products.id
        WHERE cart.user_id = ?
    `;
    db.query(sql, [req.params.user_id], (err, results) => {
        if (err) {
            return res.status(500).json({ error: 'Failed to fetch cart items' });
        }
        res.json(results);
    });
};

// Controller to UPDATE cart item quantity
const updateCartItem = (req, res) => {
    const { quantity } = req.body;
    const sql = 'UPDATE cart SET quantity = ? WHERE id = ?';
    db.query(sql, [quantity, req.params.id], (err) => {
        if (err) {
            return res.status(500).json({ error: 'Failed to update cart item' });
        }
        res.json({ message: 'Cart item updated successfully' });
    });
};

// Controller to DELETE a cart item
const deleteCartItem = (req, res) => {
    const sql = 'DELETE FROM cart WHERE id = ?';
    db.query(sql, [req.params.id], (err) => {
        if (err) {
            return res.status(500).json({ error: 'Failed to delete cart item' });
        }
        res.json({ message: 'Cart item removed successfully' });
    });
};

module.exports = { addToCart, getCartItems, updateCartItem, deleteCartItem };
