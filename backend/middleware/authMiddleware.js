const jwt = require('jsonwebtoken');

function verifyToken(req, res, next) {
    const authHeader = req.header('Authorization');
    if (!authHeader) {
        return res.status(403).json({ error: 'Access Denied. Token is missing.' });
    }

    const token = authHeader.split(' ')[1];
    if (!token) {
        return res.status(403).json({ error: 'Access Denied. Token is invalid.' });
    }

    try {
        const verified = jwt.verify(token, process.env.JWT_SECRET || 'secret_key'); // Validate the token
        req.user = verified; // Attach the decoded token to the request
        next(); // Proceed to the next middleware or route
    } catch (err) {
        res.status(403).json({ error: 'Invalid or expired token.' });
    }
}

module.exports = verifyToken;
