const express = require("express");
const multer = require("multer");
const path = require("path");
const { uploadResume } = require("../controllers/resumeController");

const router = express.Router();

// Set up Multer for file handling
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    const fileTypes = /pdf|doc|docx/;
    const extname = fileTypes.test(
      path.extname(file.originalname).toLowerCase()
    );
    const mimeType = fileTypes.test(file.mimetype);
    if (extname && mimeType) {
      return cb(null, true);
    } else {
      return cb(new Error("Only .pdf, .doc, and .docx formats allowed!"));
    }
  },
});

// Upload resume route
router.post("/upload", upload.single("resume"), uploadResume);

module.exports = router;
