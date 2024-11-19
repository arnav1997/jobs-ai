import React, { useState } from "react";
import axios from "axios";
import SearchForm from "./SearchForm";
import JobList from "./JobList";

const App = () => {
  const [jobs, setJobs] = useState([]);

  const fetchJobs = async (keyword, location) => {
    try {
      const response = await axios.get(
        `https://api.adzuna.com/v1/api/jobs/us/search/1`,
        {
          params: {
            app_id: process.env.REACT_APP_ADZUNA_APP_ID,
            app_key: process.env.REACT_APP_ADZUNA_API_KEY,
            what: keyword,
            where: location,
          },
        }
      );
      setJobs(response.data.results);
    } catch (error) {
      console.error("Error fetching jobs:", error);
    }
  };

  return (
    <div>
      <h1>Job Finder</h1>
      <SearchForm onSearch={fetchJobs} />
      <JobList jobs={jobs} />
    </div>
  );
};

export default App;
