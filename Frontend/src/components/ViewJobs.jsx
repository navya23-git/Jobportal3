import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function ViewJobs() {
  const [jobs, setJobs] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/jobs") // backend endpoint
      .then((response) => setJobs(response.data))
      .catch((error) => console.error("Error fetching jobs:", error));
  }, []);

  return (
    <div className="viewjobs-container">
      <h2>Available Jobs</h2>
      {jobs.length === 0 ? (
        <p>No jobs available at the moment.</p>
      ) : (
        <div className="job-list">
          {jobs.map((job) => (
            <div key={job.id} className="job-card">
              <h3>{job.title}</h3>
              <p><strong>Company:</strong> {job.company}</p>
              <p><strong>Location:</strong> {job.location}</p>
              <p><strong>Salary:</strong> {job.salary ? `₹${job.salary}` : "Not specified"}</p>
              <p>{job.description}</p>

              {/* Apply button for students */}
              <button
                onClick={() => navigate(`/apply/${job.id}`)}
                className="apply-btn"
              >
                Apply
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ViewJobs;




