import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Navbar.css";

function Navbar({ user, onLogout }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <nav className="navbar">
      {/* Logo */}
      <div className="logo" onClick={() => navigate("/")}>JobPortal</div>

      {/* Menu Links */}
      <ul className={`nav-links ${menuOpen ? "active" : ""}`}>
        {/* Always visible */}
        <li onClick={() => { setMenuOpen(false); navigate("/"); }}>Home</li>
        {!user && (
          <>
            <li onClick={() => { setMenuOpen(false); navigate("/register"); }}>Register</li>
            <li onClick={() => { setMenuOpen(false); navigate("/login"); }}>Login</li>
          </>
        )}

        {/* Role-based Dashboard Links */}
        {user && user.role === "student" && (
          <li onClick={() => { setMenuOpen(false); navigate("/student"); }}>Student Dashboard</li>
        )}
        {user && user.role === "recruiter" && (
          <li onClick={() => { setMenuOpen(false); navigate("/recruiter"); }}>Recruiter Dashboard</li>
        )}

        {/* Always visible */}
        <li onClick={() => { setMenuOpen(false); navigate("/contact"); }}>Contact</li>

        {/* Logout */}
        {user && (
          <li>
            <button
              className="logout-btn"
              onClick={() => { onLogout(); setMenuOpen(false); navigate("/login"); }}
            >
              Logout
            </button>
          </li>
        )}
      </ul>

      {/* Hamburger Menu */}
      <div className="menu-icon" onClick={() => setMenuOpen(!menuOpen)}>
        <div className={menuOpen ? "bar change" : "bar"}></div>
        <div className={menuOpen ? "bar change" : "bar"}></div>
        <div className={menuOpen ? "bar change" : "bar"}></div>
      </div>
    </nav>
  );
}

export default Navbar;



















