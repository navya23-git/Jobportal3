import React from "react";
import { Link } from "react-router-dom";
import './HomePage.css';

function HomePage() {
  return (
    <section id="home" className="home">
      <div className="home-content">
        <h1>Welcome to JobPortal</h1>
        <p>Your dream job is just a click away.</p>

        {/* Navigate to View Jobs */}
        <Link to="/viewjobs" className="btn">
  View Jobs
</Link>

      </div>
    </section>
  );
}

export default HomePage;

