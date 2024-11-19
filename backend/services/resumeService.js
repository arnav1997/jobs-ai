const fs = require("fs");
const pdfParse = require("pdf-parse");
const mammoth = require("mammoth");

// Helper function to parse PDF
const parsePdf = async (filePath) => {
  const dataBuffer = fs.readFileSync(filePath);
  const pdfData = await pdfParse(dataBuffer);
  return pdfData.text;
};

// Helper function to parse DOC/DOCX
const parseDoc = async (filePath) => {
  const result = await mammoth.extractRawText({ path: filePath });
  return result.value;
};

// Function to handle parsing based on file type
const parseResume = async (file) => {
  const filePath = file.path;
  const ext = file.mimetype;

  let parsedText = "";

  if (ext === "application/pdf") {
    parsedText = await parsePdf(filePath);
  } else if (
    ext ===
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document" ||
    ext === "application/msword"
  ) {
    parsedText = await parseDoc(filePath);
  }

  // Extract basic information after parsing
  return parsedText;
};

// Function to extract basic information from text
const extractBasicInfo = (text) => {
  const info = {
    name: "", // Placeholder for future implementation
    email: "",
    phoneNumber: "",
    skills: [],
  };

  // Extract email
  const emailMatch = text.match(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-z]{2,}/g);
  info.email = emailMatch ? emailMatch[0] : "";

  // Extract phone number
  const phoneMatch = text.match(
    /(?:\+?\d{1,3})?[-.\s]?(\d{3})[-.\s]?(\d{3})[-.\s]?(\d{4})/g
  );
  info.phoneNumber = phoneMatch ? phoneMatch[0] : "";

  // Extract skills by looking for keywords (can be expanded)
  const skillKeywords = ["JavaScript", "Python", "Java", "SQL", "Node.js"];
  skillKeywords.forEach((skill) => {
    if (text.toLowerCase().includes(skill.toLowerCase())) {
      info.skills.push(skill);
    }
  });

  return info;
};

module.exports = { parseResume, extractBasicInfo };
