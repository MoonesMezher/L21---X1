const { default: mongoose } = require("mongoose");

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    password: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true,
        min: 15
    },
    phone: {
        type: String,
        unique: true,
        trim: true
    }
}, { timestamps: true });

const User = mongoose.model("User", userSchema);

module.exports = User;