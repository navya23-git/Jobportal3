import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function RecruiterPage({ user }) {
  const [jobs, setJobs] = useState([]);
  const [passedMap, setPassedMap] = useState({});
  const [loadingJobId, setLoadingJobId] = useState(null);
  const navigate = useNavigate();

  const tokenObj = JSON.parse(localStorage.getItem("token"));
  const token = tokenObj?.token;
  console.log(token)
  // Redirect if not recruiter
  useEffect(() => {
    if (!user || user.role !== "recruiter") {
      navigate("/login");
      return;
    }
    // Fetch jobs posted by recruiter
    axios
      .get("http://localhost:8082/api/jobs/my", {
        headers: { Authorization: "Bearer " + token },
      })
      .then((res) => setJobs(res.data))
      .catch((err) => {
        console.error("Failed to load jobs", err);
        alert("Failed to load jobs");
      });
  }, [user, navigate, token]);

  // Fetch passed candidates for a job
  const loadPassedCandidates = async (jobId) => {
    try {
      setLoadingJobId(jobId);

      const res = await axios.get(
        `https://jobportal-jsnh.onrender.com/api/recruiter/jobs/${jobId}/passed`,
        {
          headers: { Authorization: "Bearer " + token },
        }
      );
console.log("Passed candidates for job", jobId, res.data);
      setPassedMap((prev) => ({
        ...prev,
        [jobId]: res.data,
      }));
    } catch (err) {
      console.error("Failed to load passed candidates", err);
      alert("Failed to load passed candidates");
    } finally {
      setLoadingJobId(null);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Recruiter Dashboard</h2>

      <button
        onClick={() => navigate("/recruiter/post-job")}
        style={{ marginBottom: "20px" }}
      >
        Post New Job
      </button>

      {jobs.length === 0 && <p>No jobs posted yet.</p>}

      {jobs.map((job) => (
        <div
          key={job.id}
          style={{
            border: "1px solid #ccc",
            padding: "15px",
            marginBottom: "20px",
            borderRadius: "6px",
          }}
        >
          <h3>{job.title}</h3>
          <p><strong>Company:</strong> {job.company}</p>
          <p><strong>Location:</strong> {job.location}</p>
          <p><strong>Description:</strong> {job.description}</p>
          <p><strong>Salary:</strong> {job.salary}</p>

          <button onClick={() => loadPassedCandidates(job.id)}>
            {loadingJobId === job.id ? "Loading..." : "View Passed Candidates"}
          </button>

          {passedMap[job.id] && (
            <div style={{ marginTop: "15px" }}>
              <h4>Passed Students</h4>

              {passedMap[job.id].length === 0 ? (
                <p>No students passed yet</p>
              ) : (
                passedMap[job.id].map((student) => (
                  <div
                    key={student.id}
                    style={{
                      padding: "10px",
                      marginBottom: "10px",
                      border: "1px solid #eee",
                      borderRadius: "4px",
                    }}
                  >
                    <p><strong>Name:</strong> {student.name}</p>
                    <p><strong>Email:</strong> {student.email}</p>
                    <p><strong>Score:</strong> {student.score}</p>
                    <p><strong>Result:</strong> {student.result}</p>
                  </div>
                ))
              )}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export default RecruiterPage;














