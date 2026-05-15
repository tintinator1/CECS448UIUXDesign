import { useNavigate } from "react-router-dom";
import BottomNavBar from "../components/Navbar";
import AppButton from "../components/AppButton";
import { useState } from "react";
import "../styles/mainpages.css";

export default function Profile() {
  const navigate = useNavigate();
  const [highContrast, setHighContrast] = useState(false);
  const [largerText, setLargerText] = useState(false);

  const user = {
    name: "Tin Nguyen",
    email: "tin@email.com",
    major: "Computer Science",
    degree: "B.S. Computer Science",
    expectedGraduation: "Spring 2027",
    currentSemester: "Fall 2026",
  };

  const handleChangePassword = () => {
    navigate("/forgot-password");
  };

  const handleSignOut = () => {
    navigate("/");
  };

  return (
    <div className="page">
      <main className="page-content">
        <div className="profile-header">
          <div>
            <h1 className="page-title">Profile</h1>
            <p className="profile-subtitle">Manage your account and academic information</p>
          </div>

          <button
            type="button"
            className="sign-out-button"
            onClick={handleSignOut}
            aria-label="Sign out"
          >
            Sign Out
          </button>
        </div>

        <section className="page-section profile-user-card content-card">
          <div className="profile-avatar" aria-hidden="true">
            {user.name.charAt(0)}
          </div>

          <div>
            <h2 className="profile-name">{user.name}</h2>
            <p className="profile-email">{user.email}</p>
          </div>
        </section>

        <section className="page-section">
          <h2 className="section-heading">Academic Information</h2>

          <div className="stack-sm">
            <div className="profile-info-row content-card">
              <span className="profile-info-label">Major</span>
              <span className="profile-info-value">{user.major}</span>
            </div>

            <div className="profile-info-row content-card">
              <span className="profile-info-label">Degree</span>
              <span className="profile-info-value">{user.degree}</span>
            </div>

            <div className="profile-info-row content-card">
              <span className="profile-info-label">Expected Graduation</span>
              <span className="profile-info-value">{user.expectedGraduation}</span>
            </div>

            <div className="profile-info-row content-card">
              <span className="profile-info-label">Current Semester</span>
              <span className="profile-info-value">{user.currentSemester}</span>
            </div>
          </div>
        </section>

        <section className="page-section">
          <h2 className="section-heading">Account Information</h2>

          <div className="stack-sm">
            <div className="profile-info-row content-card">
              <span className="profile-info-label">Name</span>
              <span className="profile-info-value">{user.name}</span>
            </div>

            <div className="profile-info-row content-card">
              <span className="profile-info-label">Email</span>
              <span className="profile-info-value">{user.email}</span>
            </div>

            <div className="profile-info-row content-card">
              <span className="profile-info-label">Password</span>
              <span className="profile-info-value">••••••••</span>
            </div>
          </div>
        </section>

        <div className="profile-actions">
          <AppButton
            variant="primary"
            onClick={handleChangePassword}
            ariaLabel="Change password"
          >
            Change Password
          </AppButton>
        </div>

        <section className="page-section profile-preferences-section">
          <h2 className="section-heading">App Preferences</h2>

          <div className="stack-sm">
            <label className="profile-info-row content-card profile-checkbox-row">
              <span className="profile-info-label">High Contrast Mode</span>

              <input
                type="checkbox"
                checked={highContrast}
                onChange={() => setHighContrast(!highContrast)}
                className="profile-checkbox"
                aria-label="Toggle high contrast mode"
              />
            </label>

            <label className="profile-info-row content-card profile-checkbox-row">
              <span className="profile-info-label">Larger Text</span>

              <input
                type="checkbox"
                checked={largerText}
                onChange={() => setLargerText(!largerText)}
                className="profile-checkbox"
                aria-label="Toggle larger text"
              />
            </label>
          </div>
        </section>
      </main>

      <BottomNavBar />
    </div>
  );
}