const role = (roles) => {
    return (req, res, next) => {
        if(roles.includes(req._user.role)) {
            next();
        } else {
            return res.status(401).json({ message: "This User cannot make this action" })
        }
    }
}

module.exports = role