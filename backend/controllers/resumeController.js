// controllers/resumeController.js
const Resume = require("../models/Resume");
const { parseResume } = require("../services/resumeService");
const fs = require("fs");

// Function to extract basic info: name, email, phone, and skills
const extractBasicInfo = (text) => {
  const extractedInfo = {
    name: "",
    email: "",
    phone: "",
    skills: [],
  };

  // Regular expressions for simple information extraction
  const emailRegex = /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/;
  const phoneRegex = /(\(?\+?[0-9]*\)?)?[0-9_\- \(\)]{7,}/;
  const skillsRegex = /Skills:\s*(.*)/i;

  // Match results
  extractedInfo.email = (text.match(emailRegex) || [])[0] || "";
  extractedInfo.phone = (text.match(phoneRegex) || [])[0] || "";
  const skillsMatch = text.match(skillsRegex);
  extractedInfo.skills = skillsMatch
    ? skillsMatch[1].split(",").map((skill) => skill.trim())
    : [];

  return extractedInfo;
};

// Upload and process resume
exports.uploadResume = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    // Parse the resume file
    const parsedText = await parseResume(req.file);

    // Extract basic information
    const extractedInfo = extractBasicInfo(parsedText);

    // Store the parsed data in MongoDB
    const resume = new Resume({
      name: extractedInfo.name,
      email: extractedInfo.email,
      phone: extractedInfo.phone,
      skills: extractedInfo.skills,
      summary: parsedText,
    });

    await resume.save();

    // Cleanup: Delete the uploaded file after parsing
    fs.unlinkSync(req.file.path);

    // Return success response
    res
      .status(200)
      .json({ message: "Resume uploaded and parsed successfully", resume });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
