import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

export const generateToken = (userId, isAdmin, store) => {
    const secretKey = process.env.JWT_SECRET;
    return jwt.sign({ userId, isAdmin, store }, secretKey, { expiresIn: '1h' });
};

// Middleware to verify JWT
export const verifyToken = (req, res, next) => {
    const token = req.header('Authorization')?.replace('Bearer ', '');

    if (!token) {
        return res.status(401).json({ error: 'Access denied, token missing' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET); // Verify the token with the secret key
        req.user = decoded; // Attach the decoded user info to the request object
        next(); // Proceed to the next middleware or route handler
    } catch (error) {
        return res.status(403).json({ error: 'Invalid or expired token' });
    }
};
