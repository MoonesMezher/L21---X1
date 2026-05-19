const { default: mongoose } = require("mongoose");
const User = require("../models/User");
const passwordService = require("../utils/passwordService");

require("dotenv").config();
const adminSeed = async () => {
    mongoose.connect(process.env.MONGODB_URL)
        .then(() => {
            console.log("Connected to MongoDB")
        })
        .catch((err) => console.error("Could not connect to MongoDB", err));

    const data = { 
        username: process.env.ADMIN_USERNAME,
        email: process.env.ADMIN_EMAIL, 
        password: await passwordService.hashPassword(process.env.ADMIN_PASSWORD), 
        age: process.env.ADMIN_AGE, 
        phone: process.env.ADMIN_PHONE, 
        role: "admin"
    };

    const admin = await User.findOne({ role: "admin" });

    if(admin) {
        throw new Error("Admin is Already exist")
    }

    await User.create(data);
}

adminSeed()
    .then(e => {
        console.log("Create Admin Successfully");
        process.exit(0)
    })
    .catch(err => {
        console.log("Error", err.message);
        process.exit(1)
    })
    .finally(() => {
        console.log("The Actions is finished");
    })