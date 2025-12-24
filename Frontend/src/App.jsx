// import React, { useState } from "react";
// import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
// import { ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// import Navbar from "./components/Navbar";
// import Footer from "./components/Footer";
// import HomePage from "./components/HomePage";
// import Register from "./components/Register";
// import Login from "./components/Login";
// import Contact from "./components/Contact";

// // Student
// import StudentPage from "./components/StudentPage";
// import ApplicationForm from "./components/ApplicationForm";

// // Recruiter
// import RecruiterPage from "./components/RecruiterPage";
// import PostJob from "./components/PostJob";

// import ApplicationTest from "./components/ApplicationTest";
// import AfterTest from "./components/AfterTest";
// import MCQTest from "./components/McqTest";

// function App() {
//   const [user, setUser] = useState(() => {
//     const token = localStorage.getItem("token");
//     const role = localStorage.getItem("role");
//     return token && role ? { role } : null;
//   });

//   const handleLogout = () => {
//     localStorage.removeItem("token");
//     localStorage.removeItem("role");
//     setUser(null);
//   };

//   return (
//     <BrowserRouter>
//       <Navbar user={user} onLogout={handleLogout} />

//       <Routes>
//         {/* PUBLIC */}
//         <Route path="/" element={<HomePage />} />
//         <Route path="/register" element={!user ? <Register /> : <Navigate to="/" replace />} />
//         <Route path="/login" element={!user ? <Login setUser={setUser} /> : <Navigate to="/" replace />} />
//         <Route path="/contact" element={<Contact />} />

//         {/* STUDENT */}
//         <Route path="/student" element={user?.role === "student" ? <StudentPage /> : <Navigate to="/login" replace />} />
//         <Route path="/student/jobs" element={user?.role === "student" ? <StudentPage /> : <Navigate to="/login" replace />} />
//         <Route path="/student/apply/:jobId" element={user?.role === "student" ? <ApplicationForm /> : <Navigate to="/login" replace />} />

//         {/* RECRUITER */}
//         <Route path="/recruiter" element={user?.role === "recruiter" ? <RecruiterPage user={user} /> : <Navigate to="/login" replace />} />
//         <Route path="/recruiter/post-job" element={user?.role === "recruiter" ? <PostJob /> : <Navigate to="/login" replace />} />

//         {/* FALLBACK */}
//         <Route path="*" element={<Navigate to="/" replace />} />

//         <Route
//   path="/student/test/:applicationId"
//   element={user?.role === "student" ? <ApplicationTest /> : <Navigate to="/login" />}
// />
//     <Route
//   path="/student/test/:applicationId"
//   element={user?.role === "student" ? <MCQTest /> : <Navigate to="/login" />}
// />
// <Route
//   path="/student/test/:applicationId/result"
//   element={user?.role === "student" ? <AfterTest /> : <Navigate to="/login" />}
// />
//       </Routes>

//       <Footer />
//       <ToastContainer
//         position="top-right"
//         autoClose={3000}
//         hideProgressBar={false}
//         newestOnTop
//         closeOnClick
//         pauseOnHover
//         draggable
//       />
//     </BrowserRouter>
//   );
// }

// export default App;


import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import HomePage from "./components/HomePage";
import Register from "./components/Register";
import Login from "./components/Login";
import Contact from "./components/Contact";

// Student
import StudentPage from "./components/StudentPage";
import ApplicationForm from "./components/ApplicationForm";
import AptitudeTest from "./components/AptitudeTest";

// Recruiter
import RecruiterPage from "./components/RecruiterPage";
import PostJob from "./components/PostJob";

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // ✅ SAFE restore user
  useEffect(() => {
    const parsed = JSON.parse(localStorage.getItem("token") || "{}");

    if (parsed.token && parsed.role) {
      setUser({
        token: parsed.token,
        role: parsed.role
      });
    }

    setLoading(false);
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    setUser(null);
  };

  if (loading) return null;

  return (
    <BrowserRouter>
      <Navbar user={user} onLogout={handleLogout} />

      <Routes>
        {/* PUBLIC */}
        <Route path="/" element={<HomePage />} />
        <Route
          path="/register"
          element={!user ? <Register /> : <Navigate to="/" replace />}
        />
        <Route
          path="/login"
          element={!user ? <Login setUser={setUser} /> : <Navigate to="/" replace />}
        />
        <Route path="/contact" element={<Contact />} />

        {/* STUDENT */}
        <Route
          path="/student"
          element={user?.role === "student" ? <StudentPage /> : <Navigate to="/login" />}
        />

        <Route
          path="/student/jobs"
          element={user?.role === "student" ? <StudentPage /> : <Navigate to="/login" />}
        />

        {/* APPLICATION FORM */}
        <Route
          path="/student/apply/:jobId"
          element={
            user?.role === "student"
              ? <ApplicationForm />
              : <Navigate to="/login" replace />
          }
        />

        {/* APTITUDE TEST (COMPULSORY AFTER APPLY) */}
        <Route
          path="/aptitude-test/:applicationId"
          element={
            user?.role === "student"
              ? <AptitudeTest />
              : <Navigate to="/login" replace />
          }
        />

        {/* RECRUITER */}
        <Route
          path="/recruiter"
          element={
            user?.role === "recruiter"
              ? <RecruiterPage user={user} />
              : <Navigate to="/login" />
          }
        />

        <Route
          path="/recruiter/post-job"
          element={
            user?.role === "recruiter"
              ? <PostJob user={user} />
              : <Navigate to="/login" />
          }
        />

        {/* FALLBACK */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>

      <Footer />
      <ToastContainer position="top-right" autoClose={3000} />
    </BrowserRouter>
  );
}

export default App;

