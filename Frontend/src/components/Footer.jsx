import React from "react";
import "./Footer.css";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section">
          <h3>JobPortal</h3>
          <p>Your one-stop solution for jobs and careers.</p>
        </div>
        <div className="footer-section">
          <h4>Quick Links</h4>
          <ul>
            <li><a href="#home">Home</a></li>
            <li><a href="#about">About</a></li>
            <li><a href="#jobs">Jobs</a></li>
            <li><a href="#contact">Contact</a></li>
          </ul>
        </div>
        <div className="footer-section">
          <h4>Contact</h4>
          <p>Email: support@jobportal.com</p>
          <p>Phone: +91 1234567890</p>
        </div>
      </div>
      <p className="copyright">© 2025 JobPortal. All rights reserved.</p>
    </footer>
  );
}

export default Footer;
