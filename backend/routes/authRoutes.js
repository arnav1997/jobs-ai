const express = require("express");
const { register, login } = require("../controllers/authController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

// Public route for user registration
router.post("/register", register);

// Public route for user login
router.post("/login", login);

// Protected route example: Get user profile (you can add more protected routes)
router.get("/profile", authMiddleware, (req, res) => {
  res.json({ message: "This is the protected user profile", user: req.user });
});

module.exports = router;
