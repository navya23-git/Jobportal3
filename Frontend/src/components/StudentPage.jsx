import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./StudentPage.css";

function StudentPage() {
  const [jobs, setJobs] = useState([]);
  const [timeLeft, setTimeLeft] = useState({});
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Get token from localStorage
  const tokenData = localStorage.getItem("token");
  const token = tokenData ? JSON.parse(tokenData).token : null;

  // Fetch active jobs
  useEffect(() => {
    const fetchJobs = async () => {
      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const res = await axios.get("https://jobportal-jsnh.onrender.com/api/jobs/active", {
          headers: { Authorization: `Bearer ${token}` },
        });

        setJobs(res.data);

        // Initialize countdown timers
        const timers = {};
        res.data.forEach((job) => {
          timers[job.id] = calculateTimeLeft(job.expiresAt);
        });
        setTimeLeft(timers);
      } catch (err) {
        console.error("Error fetching jobs:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, [token]);

  // Update countdown every second
  useEffect(() => {
    const interval = setInterval(() => {
      const updatedTimers = {};
      jobs.forEach((job) => {
        updatedTimers[job.id] = calculateTimeLeft(job.expiresAt);
      });
      setTimeLeft(updatedTimers);
    }, 1000);

    return () => clearInterval(interval);
  }, [jobs]);

  // Calculate remaining time
  const calculateTimeLeft = (expiresAt) => {
    const now = new Date();
    const end = new Date(expiresAt);
    const diff = end - now;

    if (diff <= 0) return "Expired";

    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff / (1000 * 60)) % 60);
    const seconds = Math.floor((diff / 1000) % 60);

    return { text: `${hours}h ${minutes}m ${seconds}s`, hoursLeft: hours };
  };

  if (loading)
    return <p style={{ textAlign: "center", marginTop: "30px" }}>Loading jobs...</p>;

  return (
    <div className="student-page-container">
      <h1>Available Jobs 🎓</h1>

      {jobs.length === 0 ? (
        <p>No jobs available at the moment.</p>
      ) : (
        <div className="job-list">
          {jobs.map((job) => {
            const expired = timeLeft[job.id]?.text === "Expired";
            const urgent = !expired && timeLeft[job.id]?.hoursLeft < 1; // less than 1 hour
            return (
              <div
                key={job.id}
                className={`job-card ${expired ? "expired" : ""}`}
              >
                <h3>{job.title}</h3>
                <p><strong>Company:</strong> {job.company}</p>
                <p><strong>Location:</strong> {job.location}</p>
                <p><strong>Salary:</strong> {job.salary ? `₹${job.salary}` : "Not specified"}</p>
                <p>{job.description}</p>

                <p>
                  <strong>Time Left:</strong>{" "}
                  <span className={urgent ? "urgent-timer" : ""}>
                    {timeLeft[job.id]?.text}
                  </span>
                </p>

                <button
                  onClick={() => navigate(`/student/apply/${job.id}`)}
                  className="apply-button"
                  disabled={expired}
                >
                  {expired ? "Expired" : "Apply"}
                </button>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default StudentPage;












