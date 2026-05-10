const express = require("express");
const router = express.Router();

const id = require("../middlewares/id");
const loansController = require("../controllers/loans.controller");
const asyncHandler = require("../utils/asyncHandler");

router.get("/", asyncHandler(loansController.getAll))

router.get("/:id", [id], asyncHandler(loansController.getOne))

router.post("/", asyncHandler(loansController.makeLoan))

router.put("/return/:id", [id], asyncHandler(loansController.returnBook))

module.exports = router;