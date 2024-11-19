const express = require("express");
const { getJobs } = require("../services/adzunaService");
const router = express.Router();

router.get("/search", async (req, res) => {
  const { jobTitle, location } = req.query;

  try {
    const jobs = await getJobs(jobTitle, location);
    res.json(jobs);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch jobs" });
  }
});

module.exports = router;
