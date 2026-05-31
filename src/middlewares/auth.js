const User = require('../models/User');
const cookiesService = require('../utils/cookiesService');
const jwtService = require('../utils/jwtService');
const auth = async (req, res, next) => {
    try {
        // const { authorization } = req.headers; // Bearer <token>

        const authorization = cookiesService.getData(req, "accessToken");

        if(!authorization) {
            return res.status(401).json({
                message: "Unauthorized"
            });
        }
    
        /* const token = authorization.split(" ")[1]; */
        const token = authorization;

        const decoded = jwtService.verifyToken(token);

        /* const user = await User.findById(decoded.userId)

        if(user.block) {
            return res.status(401).json("This user is blocked")
        }

        req._user = { ...user } */
        req._user = { ...decoded }
        
        next();
    } catch (error) {
        return res.status(401).json({
            message: "Unauthorized"
        });
    }
}

module.exports = auth;