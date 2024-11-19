const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes"); // Import the auth routes
const resumeRoutes = require("./routes/resumeRoutes");

dotenv.config();

const app = express();
const cors = require("cors");

// Connect to MongoDB
connectDB();

// Middleware to parse JSON requests
app.use(express.json());

// cors setup
app.use(cors());

// Use the auth routes
app.use("/api/auth", authRoutes);

// use resume routes
app.use("/api/resume", resumeRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
