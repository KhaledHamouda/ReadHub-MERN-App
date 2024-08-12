// middlewares/authMiddleware.js
const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
        return res.status(401).json({ error: 'No token provided' });
    }

    try {
        console.log(token)
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
        req.userId = decoded.id;
        req.isAdmin = decoded.admin;
        next();
    } catch (e) {
        res.status(401).json({ error: 'Invalid token' });
    }
};

module.exports = authMiddleware;
