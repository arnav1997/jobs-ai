// models/User.js
const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true, // Ensures that each username is unique
  },
  email: {
    type: String,
    required: true,
    unique: true, // Ensures that each email is unique
    match: [/.+\@.+\..+/, "Please fill a valid email address"], // Validates email format
  },
  password: {
    type: String,
    required: true,
    minlength: 6, // Ensures that the password is at least 6 characters long
  },
  date: {
    type: Date,
    default: Date.now, // Sets the default date to now
  },
});

// Create the User model
const User = mongoose.model("User", UserSchema);

module.exports = User;
