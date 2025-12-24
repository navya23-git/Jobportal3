import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "./PostJob.css";

const PostJob = () => {
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [company, setCompany] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [salary, setSalary] = useState("");
  const [durationDays, setDurationDays] = useState(1);

  const handlePostJob = async (e) => {
    e.preventDefault();

    const expiresAt = new Date(
      Date.now() + durationDays * 24 * 60 * 60 * 1000
    ).toISOString();

    const job = {
      title,
      company,
      location,
      description,
      salary: Number(salary),
      expiresAt,
    };

    // ✅ Get token correctly as a string
    const {token}= JSON.parse(localStorage.getItem("token"));
    if (!token) {
      toast.error("Please login first");
      return;
    }

    try {
      const response = await fetch("https://jobportal-jsnh.onrender.com/api/jobs/post", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token, // token directly
        },
        body: JSON.stringify(job),
      });

      if (!response.ok) {
        const errText = await response.text();
        throw new Error(errText || "Failed to post job");
      }

      toast.success("Job posted successfully ✅");
      setTimeout(() => navigate("/recruiter"), 1000);
    } catch (error) {
      console.error("Error posting job:", error);
      toast.error("Error posting job ❌");
    }
  };

  return (
    <div className="post-job-container">
      <h2>Post Job</h2>

      <form onSubmit={handlePostJob}>
        <input
          type="text"
          placeholder="Job Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Company"
          value={company}
          onChange={(e) => setCompany(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          required
        />
        <textarea
          placeholder="Job Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
        <input
          type="number"
          placeholder="Salary"
          value={salary}
          onChange={(e) => setSalary(e.target.value)}
          required
        />
        <select
          value={durationDays}
          onChange={(e) => setDurationDays(Number(e.target.value))}
        >
          <option value={1}>1 Day</option>
          <option value={2}>2 Days</option>
          <option value={3}>3 Days</option>
        </select>
        <button type="submit">Post Job</button>
      </form>
    </div>
  );
};

export default PostJob;


























