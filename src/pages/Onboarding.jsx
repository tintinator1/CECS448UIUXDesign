import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/mainpages.css";

const majors = [
  "Computer Science",
  "Computer Engineering",
  "Electrical Engineering",
  "Mechanical Engineering",
  "Business Administration",
  "Psychology",
  "Biology",
  "English",
  "Mathematics",
  "Nursing",
];

export default function Onboarding() {
  const navigate = useNavigate();
  const [selectedMajor, setSelectedMajor] = useState("");

  const handleContinue = () => {
    // Store the selected major in localStorage for use throughout the app
    if (selectedMajor) {
      localStorage.setItem("userMajor", selectedMajor);
    }
    navigate("/tutorial");
  };

  const handleContinueUndecided = () => {
    localStorage.setItem("userMajor", "Undecided");
    navigate("/tutorial");
  };

  return (
    <div className="page onboarding-page">
      <main className="page-content" style={{ paddingBottom: "40px" }}>
        <h1 className="onboarding-title">Welcome!</h1>
        <p className="onboarding-subtitle">
          Let's get started by setting up your academic pathway
        </p>

        <section className="page-section" style={{ marginTop: "48px" }}>
          <h2 className="section-heading">Select Your Major</h2>

          <div className="major-dropdown">
            <select
              value={selectedMajor}
              onChange={(e) => setSelectedMajor(e.target.value)}
              className="major-select"
              aria-label="Select your major"
            >
              <option value="">Choose a major...</option>
              {majors.map((major) => (
                <option key={major} value={major}>
                  {major}
                </option>
              ))}
            </select>
          </div>

          <div className="tips-section">
            <p className="tips-heading">Tips:</p>
            <p className="tips-text">
              Not sure what to study yet? That's okay! You can continue as
              undecided and explore your options. You can always change your
              major later.
            </p>
          </div>
        </section>

        <div className="onboarding-buttons">
          <button
            onClick={handleContinue}
            disabled={!selectedMajor}
            className="primary-button"
            aria-label="Continue with selected major"
          >
            Continue with Selected Major
          </button>

          <button
            onClick={handleContinueUndecided}
            className="secondary-button"
            aria-label="Continue without selecting a major"
          >
            Continue as Undecided
          </button>
        </div>
      </main>

      {/* Bottom nav is grayed out during onboarding */}
      <nav style={disabledNavStyle} aria-label="Navigation (disabled during onboarding)">
        <div style={navItemStyle} aria-disabled="true"></div>
        <div style={navItemStyle} aria-disabled="true"></div>
        <div style={navItemStyle} aria-disabled="true"></div>
        <div style={navItemStyle} aria-disabled="true"></div>
        <div style={navItemStyle} aria-disabled="true"></div>
      </nav>
    </div>
  );
}

const disabledNavStyle = {
  position: "fixed",
  left: 0,
  bottom: 0,
  width: "100%",
  height: "clamp(56px, 15vw, 71px)",
  backgroundColor: "#e5e5e5",
  borderRadius: "clamp(12px, 4vw, 15px) clamp(12px, 4vw, 15px) 0 0",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-around",
  zIndex: 1000,
  opacity: 0.5,
};

const navItemStyle = {
  width: "clamp(20px, 5vw, 23px)",
  height: "clamp(20px, 5vw, 23px)",
  backgroundColor: "#999",
  borderRadius: "50%",
};
