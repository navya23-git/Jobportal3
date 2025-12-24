import React, { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import axios from "axios";

import "./JobDetailes.css";

function JobDetailes() {
  const { id } = useParams();
  const { state } = useLocation(); // 👈 this is where we get successMessage
  const [job, setJob] = useState(null);
  const [message, setMessage] = useState("");

  useEffect(() => {
    axios
      .get(`https://jobportal-jsnh.onrender.com/api/jobs/${id}`)
      .then((res) => setJob(res.data))
      .catch((err) => console.error("Error loading job details:", err));
  }, [id]);

  const handleApply = () => {
    setMessage("✅ Application submitted successfully!");
  };

  if (!job) {
    return <h2>Loading job details...</h2>;
  }

  return (
    <>
      <Navbar userRole="student" />
      <div className="job-details">
        {/* 👇 Display success message if navigated from recruiter */}
        {state?.successMessage && (
          <p className="success-msg">{state.successMessage}</p>
        )}

        <h1>{job.title}</h1>
        <p><b>Company:</b> {job.company}</p>
        <p><b>Location:</b> {job.location}</p>
        <p><b>Salary:</b> {job.salary}</p>
        <p><b>Description:</b> {job.description}</p>

        <button onClick={handleApply} className="apply-btn">Apply Now</button>
        {message && <p className="success-msg">{message}</p>}
      </div>
    </>
  );
}

export default JobDetailes;


