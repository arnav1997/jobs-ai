const express = require("express");
const router = express.Router();

router.post("/register", (req, res) => {
  const { name, email, password } = req.body;
  // This is where the user registration logic will go
  res.status(201).json({ message: "User registered", data: { name, email } });
});

module.exports = router;
