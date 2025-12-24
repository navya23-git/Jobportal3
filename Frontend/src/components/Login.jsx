import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";

function Login({ setUser }) {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("https://jobportal-jsnh.onrender.com/api/user/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) {
        const msg = await res.text();
        toast.error(msg);
        return;
      }

      const token = await res.text();
      localStorage.setItem("token", token);

      // Decode JWT
      const payload = JSON.parse(atob(token.split(".")[1]));

      const role = payload.role; // ROLE_STUDENT or ROLE_RECRUITER

      const userData = {
        email: payload.sub,
        role: role === "ROLE_STUDENT" ? "student" : "recruiter",
      };

      setUser(userData);
      toast.success("Login successful");

      // ✅ CORRECT ROLE-BASED FLOW
      if (role === "ROLE_RECRUITER") {
        navigate("/recruiter/post-job");
      } else if (role === "ROLE_STUDENT") {
        navigate("/student/jobs");
      } else {
        navigate("/login");
      }

    } catch (err) {
      console.error(err);
      toast.error("Network error (CORS / backend down)");
    }
  };

  return (
    <div className="auth-container">
      <h2>Login</h2>

      <form onSubmit={handleLogin}>
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          required
        />

        <button type="submit">Login</button>
      </form>

      <p>
        Don't have an account? <Link to="/register">Register</Link>
      </p>
    </div>
  );
}

export default Login;








































