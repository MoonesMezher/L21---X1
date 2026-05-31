const express = require("express");
const uploadLocal = require("../middlewares/multer");
const uploadsController = require("../controllers/uploads.controller");
const multer = require("multer");
const router = express.Router();

router.post("/local",
    [uploadLocal.single("file")],
    uploadsController.uploadLocal
)

router.post("/cloud",
    [multer().single("file")],
    uploadsController.uploadCloud
)

module.exports = router;