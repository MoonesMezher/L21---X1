const Loan = require("../models/Loan");
const User = require("../models/User");
const passwordService = require("../utils/passwordService");

class UsersController {
    getAll = async (req, res) => {
        const users = await User.find();    
        res.status(200).json(users);
    }
    addDataEntry = async (req, res) => {
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

        let user = await User.create({ username, email, password: hashedPassword, age, phone, role: "data-entry" })

        user = user.toObject()

        delete user.password;

        return res.status(201).json({ message: "User created successfully", user })
    }
    getOne = async (req, res) => {
        const id = req.params.id;
        const user = await User.findById(id);
        if (!user) return res.status(404).json({ message: "User not found" });
        const loans = await Loan.find({ user: id })
            .populate("book")
            .sort({ createdAt: -1 })
            .lean();
        const payload = user.toObject();
        payload.loans = loans;
        res.status(200).json(payload);
    }
    add = async (req, res) => {
        const { username, email, age, phone } = req.body;
        const user = await User.create({ username, email, age, phone });
        res.status(201).json(user);
    }
    update = async (req, res) => {
        const id = req.params.id;
        const user = await User.findById(id);    
        if(!user) return res.status(404).json({ message: "User not found" });

        const { username, email, age, phone } = req.body;
        user.username = username || user.username;
        user.email = email || user.email;
        user.age = age || user.age;
        user.phone = phone || user.phone;
        await user.save();

        res.status(200).json(user);
    }
    remove = async (req, res) => {
        const id = req.params.id;
        const user = await User.findById(id);    
        if(!user) return res.status(404).json({ message: "User not found" });

        await User.findByIdAndDelete(id);
        res.status(200).json({ message: "User deleted successfully" });
    }
}

module.exports = new UsersController();