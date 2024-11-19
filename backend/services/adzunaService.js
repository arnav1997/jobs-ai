const axios = require("axios");
const dotenv = require("dotenv");

dotenv.config();

const ADZUNA_APP_ID = process.env.ADZUNA_APP_ID;
const ADZUNA_APP_KEY = process.env.ADZUNA_APP_KEY;

const getJobs = async (jobTitle, location) => {
  try {
    const response = await axios.get(
      `https://api.adzuna.com/v1/api/jobs/us/search/1`,
      {
        params: {
          app_id: ADZUNA_APP_ID,
          app_key: ADZUNA_APP_KEY,
          results_per_page: 10,
          what: jobTitle,
          where: location,
        },
      }
    );

    return response.data.results;
  } catch (error) {
    console.error("Error fetching jobs from Adzuna:", error.message);
    throw new Error("Failed to fetch jobs");
  }
};

module.exports = { getJobs };
