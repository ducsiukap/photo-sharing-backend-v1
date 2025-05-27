const jwt = require('jsonwebtoken');
require('dotenv').config();
const verifyToken = (req, res, next) => {
    const headers = req.headers['authorization'];
    const token = headers && headers.split(' ')[1];

    if (!token) {
        return res.json({ success: false, error: 'no-token' });
    }

    jwt.verify(token, process.env.JWT_SECRET, (error, user) => {
        if (error) {
            return res.json({
                success: false,
                error: 'expired-token'
            })
        } 
        req.user = user;
        next();
    })
    
}

module.exports = verifyToken;