require('dotenv').config();
const jwt = require('jsonwebtoken');

class JwtService {
    genrateToken(payload) {
        return jwt.sign(payload, process.env.JWT_SECERET_KEY, { expiresIn: '1h' });
    }

    verifyToken(token) {
        return jwt.verify(token, process.env.JWT_SECERET_KEY);
    }
}

module.exports = new JwtService();