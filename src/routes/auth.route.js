const express = require("express");
const router = express.Router();

const asyncHandler = require("../utils/asyncHandler");
const authController = require("../controllers/auth.controller");
const auth = require("../middlewares/auth");
const { loginLimiter } = require("../middlewares/limiter");

router.get('/profile', [auth], asyncHandler(authController.profile))

router.post('/register', asyncHandler(authController.register))

router.post('/login', [loginLimiter], asyncHandler(authController.login))

router.post('/logout', [auth], asyncHandler(authController.logout))

module.exports = router;