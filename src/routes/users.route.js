const express = require("express");
const router = express.Router();

const id = require("../middlewares/id");
const usersController = require("../controllers/users.controller");
const asyncHandler = require("../utils/asyncHandler");
const auth = require("../middlewares/auth");
const role = require("../middlewares/role");

router.get("/", [auth, role(["admin"])], asyncHandler(usersController.getAll))

router.get("/:id", [id, auth, role(["admin"])], asyncHandler(usersController.getOne))

router.post("/data-entry", [auth, role(["admin"])], asyncHandler(usersController.addDataEntry))
// router.post("/", asyncHandler(usersController.add))

// router.put("/:id", [id], asyncHandler(usersController.update))

// router.delete("/:id", [id], asyncHandler(usersController.remove))

module.exports = router;