const jwtService = require('../utils/jwtService');
const auth = (req, res, next) => {
    try {
        const { authorization } = req.headers; // Bearer <token>
    
        if(!authorization) {
            return res.status(401).json({
                message: "Unauthorized"
            });
        }
    
        const token = authorization.split(" ")[1];

        const decoded = jwtService.verifyToken(token);

        // console.log(decoded);
        
        next();
    } catch (error) {
        return res.status(401).json({
            message: "Unauthorized"
        });
    }
}

module.exports = auth;