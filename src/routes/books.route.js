const express = require("express");
const router = express.Router();

const id = require("../middlewares/id");
const booksController = require("../controllers/books.controller");
const asyncHandler = require("../utils/asyncHandler");

router.get("/", asyncHandler(booksController.getAll))

router.get("/:id", [id], asyncHandler(booksController.getOne))

router.post("/", asyncHandler(booksController.add))

router.put("/:id", [id], asyncHandler(booksController.update))

router.delete("/:id", [id], asyncHandler(booksController.remove))

module.exports = router;