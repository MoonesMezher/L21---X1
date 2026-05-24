const User = require("../models/User");
const jwtService = require("../utils/jwtService");
const passwordService = require("../utils/passwordService");

class AuthController {
    register = async (req, res) => {
        const { username, email, password, age, phone } = req.body;

        const isEmailExist = await User.findOne({ email });
        if (isEmailExist) {
            return res.status(400).json({ message: "Email already exists" });
        }

        const isPhoneExist = await User.findOne({ phone });
        if (isPhoneExist) {
            return res.status(400).json({ message: "Phone already exists" });
        }

        const isUsernameExist = await User.findOne({ username });
        if (isUsernameExist) {
            return res.status(400).json({ message: "Username already exists" });
        }

        const hashedPassword = await passwordService.hashPassword(password);

        let user = await User.create({ username, email, password: hashedPassword, age, phone })

        user = user.toObject()

        delete user.password;

        return res.status(201).json({ message: "User created successfully", user })
    }
    login = async (req, res) => {
        const { email, password } = req.body;

        const user = await User.findOne({ email })

        if(!user) {
            return res.status(400).json({ message: "Invalid Credintails" });
        }

        const isValidPassword = await passwordService.verifyPassword(password, user.password);

        if(!isValidPassword) {
            return res.status(400).json({ message: "Invalid Credintails" });
        }

        const token = jwtService.genrateToken({ email, userId: user._id, role: user.role });

        res.status(200).json({ message: "Login successful", token, role: user.role })
    }
    logout = async (req, res) => {
        res.status(200).json({ message: "Logout successful" })
    }
    profile = async (req, res) => {
        const user = await User.findById(req._user.userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        const data = user.toObject();
        delete data.password;
        return res.status(200).json({ data });
    }
}

module.exports = new AuthController();