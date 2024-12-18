// Import MySQL Database
const db = require('../config/db');

// Controller to BOOK a new service
const bookService = (req, res) => {
    const { user_id, service_type, description, booking_date } = req.body;
    const sql = 'INSERT INTO services (user_id, service_type, description, booking_date) VALUES (?, ?, ?, ?)';
    db.query(sql, [user_id, service_type, description, booking_date], (err) => {
        if (err) {
            return res.status(500).json({ error: 'Failed to book service' });
        }
        res.json({ message: 'Service booked successfully' });
    });
};

// Controller to GET services by user ID
const getServicesByUser = (req, res) => {
    const sql = 'SELECT * FROM services WHERE user_id = ?';
    db.query(sql, [req.params.user_id], (err, results) => {
        if (err) {
            return res.status(500).json({ error: 'Failed to fetch services' });
        }
        res.json(results);
    });
};

// Controller to DELETE a booked service
const deleteService = (req, res) => {
    const sql = 'DELETE FROM services WHERE id = ?';
    db.query(sql, [req.params.id], (err) => {
        if (err) {
            return res.status(500).json({ error: 'Failed to cancel service' });
        }
        res.json({ message: 'Service cancelled successfully' });
    });
};

module.exports = { bookService, getServicesByUser, deleteService };
