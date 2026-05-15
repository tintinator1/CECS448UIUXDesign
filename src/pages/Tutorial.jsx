import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AppButton from "../components/AppButton";
import { IoHomeSharp, IoSchool, IoCalendarClear, IoLink, IoPersonSharp } from "react-icons/io5";
import "../styles/mainpages.css";

const tutorialSteps = [
  {
    icon: <IoHomeSharp />,
    title: "Dashboard",
    description: "View your degree progress, upcoming deadlines, and recommended next steps all in one place.",
  },
  {
    icon: <IoSchool />,
    title: "Degree Pathway",
    description: "See your completed courses, remaining requirements, and plan your academic journey.",
  },
  {
    icon: <IoCalendarClear />,
    title: "Deadlines",
    description: "Keep track of important deadlines with detailed checklists to help you stay on top of tasks.",
  },
  {
    icon: <IoLink />,
    title: "Resources",
    description: "Find helpful campus resources like tutoring, financial aid, and counseling services.",
  },
  {
    icon: <IoPersonSharp />,
    title: "Profile",
    description: "Manage your account settings and preferences.",
  },
];

export default function Tutorial() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);

  const handleNext = () => {
    if (currentStep < tutorialSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      // Tutorial complete
      localStorage.setItem("tutorialCompleted", "true");
      navigate("/dashboard");
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSkip = () => {
    localStorage.setItem("tutorialCompleted", "true");
    navigate("/dashboard");
  };

  const currentTutorial = tutorialSteps[currentStep];

  return (
    <div className="page tutorial-page">
      <main className="page-content" style={{ paddingBottom: "40px" }}>
        <div className="tutorial-header">
          <h1 className="page-title">Getting Started</h1>
          <button onClick={handleSkip} className="skip-button" aria-label="Skip tutorial">
            Skip
          </button>
        </div>

        <div className="tutorial-content">
          <div className="tutorial-icon-container">
            <div className="tutorial-icon" aria-hidden="true">
              {currentTutorial.icon}
            </div>
            <div className="tutorial-arrow" aria-hidden="true">↓</div>
          </div>

          <div className="tutorial-info">
            <h2 className="tutorial-step-title">{currentTutorial.title}</h2>
            <p className="tutorial-step-description">{currentTutorial.description}</p>
          </div>

          <div className="tutorial-progress" role="status" aria-live="polite">
            <span className="sr-only">
              Step {currentStep + 1} of {tutorialSteps.length}
            </span>
            {tutorialSteps.map((_, index) => (
              <div
                key={index}
                className={`progress-dot ${index === currentStep ? "active" : ""}`}
                aria-current={index === currentStep ? "step" : undefined}
              />
            ))}
          </div>

          <div className="tutorial-buttons">
            <AppButton
              variant="secondary"
              onClick={handleBack}
              disabled={currentStep === 0}
              ariaLabel="Go to previous tutorial step"
            >
              Back
            </AppButton>
            
            <AppButton
              variant="primary"
              onClick={handleNext}
              ariaLabel={
                currentStep === tutorialSteps.length - 1
                  ? "Finish tutorial"
                  : "Go to next tutorial step"
              }
            >
              {currentStep === tutorialSteps.length - 1 ? "Get Started" : "Next"}
            </AppButton>
          </div>
        </div>
      </main>

      {/* Bottom nav preview showing highlighted icon */}
      <nav style={tutorialNavStyle} aria-label="Navigation preview">
        {tutorialSteps.map((step, index) => (
          <div
            key={index}
            style={{
              ...navIconStyle,
              color: index === currentStep ? "#000" : "#999",
              transform: index === currentStep ? "scale(1.2)" : "scale(1)",
            }}
            aria-current={index === currentStep ? "true" : undefined}
          >
            {step.icon}
          </div>
        ))}
      </nav>
    </div>
  );
}

const tutorialNavStyle = {
  position: "fixed",
  left: 0,
  bottom: 0,
  width: "100%",
  height: "clamp(56px, 15vw, 71px)",
  backgroundColor: "#d9d9d9",
  borderRadius: "clamp(12px, 4vw, 15px) clamp(12px, 4vw, 15px) 0 0",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-around",
  zIndex: 1000,
};

const navIconStyle = {
  fontSize: "clamp(20px, 5vw, 23px)",
  transition: "all 0.3s ease",
};
