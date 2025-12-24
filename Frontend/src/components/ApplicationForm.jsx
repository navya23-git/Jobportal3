import React, { useState } from "react";
import { toast } from "react-toastify";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

function ApplicationForm() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });
  const [resume, setResume] = useState(null);
  const { jobId } = useParams();
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });
  const handleFileChange = (e) => setResume(e.target.files[0]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!resume) return toast.error("Please upload resume");

    const formData = new FormData();
    formData.append("name", form.name);
    formData.append("email", form.email);
    formData.append("phone", form.phone);
    formData.append("message", form.message);
    formData.append("jobId", jobId);
    formData.append("resume", resume);

     const {token} = JSON.parse(localStorage.getItem("token"));
    if (!token) return toast.error("Please login first");
    console.log(token);

    try {
      const res = await axios.post("https://jobportal-jsnh.onrender.com/api/applications/apply", formData, {
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "multipart/form-data",
        },
      });

      toast.success("Application submitted successfully ✅");
      navigate(`/aptitude-test/${res.data.applicationId}`);
    } catch (err) {
      console.error("Submission error:", err);
      if (err.response?.status === 403) {
        toast.error("Forbidden: Login as a student.");
      } else {
        toast.error("Submission failed. Please try again.");
      }
    }
  };

  return (
    <div className="auth-container">
      <h2>Apply for Job</h2>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <input type="text" name="name" placeholder="Full Name" value={form.name} onChange={handleChange} required />
        <input type="email" name="email" placeholder="Email" value={form.email} onChange={handleChange} required />
        <input type="text" name="phone" placeholder="Phone Number" value={form.phone} onChange={handleChange} required />
        <textarea name="message" placeholder="Message" value={form.message} onChange={handleChange} />
        <input type="file" accept=".pdf,.doc,.docx" onChange={handleFileChange} required />
        <button type="submit">Apply</button>
      </form>
    </div>
  );
}

export default ApplicationForm;
















