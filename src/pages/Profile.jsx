import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import BottomNavBar from "../components/Navbar";
import "../styles/mainpages.css";

export default function Profile() {
  const navigate = useNavigate();
  const [major, setMajor] = useState("");

  useEffect(() => {
    const userMajor = localStorage.getItem("userMajor") || "Undecided";
    setMajor(userMajor);
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <div className="page">
      <main className="page-content">
        <h1 className="page-title">Profile & Settings</h1>

        <section className="page-section">
          <h2 className="section-heading">Account Information</h2>
          <div className="profile-info">
            <div className="info-row">
              <span className="info-label">Name:</span>
              <span className="info-value">Student Name</span>
            </div>
            <div className="info-row">
              <span className="info-label">Email:</span>
              <span className="info-value">student@university.edu</span>
            </div>
            <div className="info-row">
              <span className="info-label">Major:</span>
              <span className="info-value">{major}</span>
            </div>
            <div className="info-row">
              <span className="info-label">Student ID:</span>
              <span className="info-value">012345678</span>
            </div>
          </div>
        </section>

        <section className="page-section">
          <h2 className="section-heading">Actions</h2>
          <button
            onClick={() => navigate("/onboarding")}
            className="profile-action-button"
            aria-label="Retake tutorial"
          >
            Retake Tutorial
          </button>
          <button
            onClick={handleLogout}
            className="profile-action-button logout"
            aria-label="Log out of account"
          >
            Log Out
          </button>
        </section>

        <div style={{ height: "clamp(80px, 18vw, 95px)" }} />
      </main>

      <BottomNavBar />
    </div>
  );
}
