import React, { useEffect, useState } from "react";
import axios from "../axiosConfig";
import "./dashboard.css";

const Dashboard = ({ user, onLogout }) => {
  const [jobs, setJobs] = useState([]);
  const [applications, setApplications] = useState([]);

  useEffect(() => {
    if (!user) return;

    if (user.role === "student") {
      axios.get("/api/applications", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
      })
      .then(res => setApplications(res.data))
      .catch(err => console.error("Failed to fetch applications:", err));
    } else if (user.role === "recruiter") {
      axios.get("/api/jobs", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
      })
      .then(res => setJobs(res.data))
      .catch(err => console.error("Failed to fetch jobs:", err));
    }
  }, [user]);

  return (
    <div className="dashboard-container">
      <aside className="sidebar">
        <h2>Dashboard</h2>
        <ul>
          <li>Home</li>
          {user?.role === "student" && <li>Applications</li>}
          {user?.role === "recruiter" && <li>Posted Jobs</li>}
          <li>Profile</li>
          <li>Settings</li>
          <li className="logout-btn" onClick={onLogout}>Logout</li>
        </ul>
      </aside>

      <main className="dashboard-main">
        <h1>Welcome, {user?.name || "User"}!</h1>

        <div className="cards-container">
          {user?.role === "student" && (
            <div className="card">
              <h3>Applications</h3>
              <p>{applications.length}</p>
            </div>
          )}

          {user?.role === "recruiter" && (
            <div className="card">
              <h3>Posted Jobs</h3>
              <p>{jobs.length}</p>
            </div>
          )}

          <div className="card">
            <h3>Profile Completeness</h3>
            <p>80%</p>
          </div>
        </div>

        {user?.role === "student" && (
          <div className="table-section">
            <h2>Recent Applications</h2>
            <table>
              <thead>
                <tr>
                  <th>Job Title</th>
                  <th>Company</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {applications.map(app => (
                  <tr key={app.id}>
                    <td>{app.jobTitle}</td>
                    <td>{app.company}</td>
                    <td>{app.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </main>
    </div>
  );
};

export default Dashboard;


