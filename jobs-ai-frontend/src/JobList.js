import React from "react";

const JobList = ({ jobs }) => {
  if (!jobs || jobs.length === 0) return <p>No jobs found</p>;

  return (
    <ul>
      {jobs.map((job) => (
        <li key={job.id}>
          <h3>{job.title}</h3>
          <p>{job.location.display_name}</p>
          <p>{job.description}</p>
        </li>
      ))}
    </ul>
  );
};

export default JobList;
