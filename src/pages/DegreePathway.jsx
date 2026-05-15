import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import BottomNavBar from "../components/Navbar";
import AppButton from "../components/AppButton";
import SemesterSelector from "../components/SemesterSelector";
import "../styles/mainpages.css";

const sampleCourses = {
  "Computer Science": {
    completed: [
      { code: "CECS 100", name: "Critical Thinking in the Digital Age", units: 3 },
      { code: "CECS 174", name: "Intro to Programming", units: 3 },
      { code: "CECS 225", name: "Digital Logic", units: 3 },
      { code: "MATH 122", name: "Calculus I", units: 4 },
      { code: "ENGL 100", name: "College Writing", units: 3 },
    ],
    inProgress: [
      { code: "CECS 228", name: "Discrete Mathematics", units: 3 },
      { code: "CECS 274", name: "Data Structures", units: 3 },
      { code: "MATH 123", name: "Calculus II", units: 4 },
    ],
    remaining: [
      { code: "CECS 277", name: "Object-Oriented Programming", units: 3 },
      { code: "CECS 323", name: "Database Fundamentals", units: 3 },
      { code: "CECS 326", name: "Operating Systems", units: 3 },
      { code: "CECS 328", name: "Algorithms", units: 3 },
      { code: "CECS 343", name: "Software Engineering", units: 3 },
      { code: "CECS 448", name: "User Interface Design", units: 3 },
      { code: "PHYS 151", name: "Physics I", units: 3 },
    ],
  },
  "Undecided": {
    completed: [
      { code: "ENGL 100", name: "College Writing", units: 3 },
      { code: "MATH 103", name: "College Algebra", units: 3 },
    ],
    inProgress: [
      { code: "HIST 101", name: "World History", units: 3 },
      { code: "PSYC 100", name: "Introduction to Psychology", units: 3 },
    ],
    remaining: [
      { code: "GE", name: "Various General Education Requirements", units: 30 },
    ],
  },
};

const majorOptions = [
  "Computer Science",
  "Undecided",
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

export default function DegreePathway() {
  const navigate = useNavigate();
  const [majorValidationStep, setMajorValidationStep] = useState(0);
  const [selectedMajor, setSelectedMajor] = useState("");
  const [semester, setSemester] = useState("Fall 2026");
  const [showChangeMajor, setShowChangeMajor] = useState(false);
  const [pendingMajor, setPendingMajor] = useState("Computer Science");
  const [majorChangeStep, setMajorChangeStep] = useState("select");

  useEffect(() => {
    const major = localStorage.getItem("userMajor") || "Computer Science";
    setSelectedMajor(major);
    setPendingMajor(major);
  }, []);

  useEffect(() => {
  if (!showChangeMajor || majorChangeStep !== "comparing") return;

  setMajorValidationStep(0);

  const stepOne = setTimeout(() => setMajorValidationStep(1), 1000);
  const stepTwo = setTimeout(() => setMajorValidationStep(2), 2000);
  const stepThree = setTimeout(() => setMajorValidationStep(3), 3000);
  const complete = setTimeout(() => setMajorChangeStep("complete"), 3600);

  return () => {
    clearTimeout(stepOne);
    clearTimeout(stepTwo);
    clearTimeout(stepThree);
    clearTimeout(complete);
  };
}, [showChangeMajor, majorChangeStep]);

  const courses = sampleCourses[selectedMajor] || sampleCourses["Undecided"];

  const openChangeMajorModal = () => {
    const currentMajor = selectedMajor || localStorage.getItem("userMajor") || "Computer Science";
    setPendingMajor(currentMajor);
    setMajorChangeStep("select");
    setShowChangeMajor(true);
  };

  const closeChangeMajorModal = () => {
    setShowChangeMajor(false);
    setMajorChangeStep("select");
    setMajorValidationStep(0);
  };

  const handleRequestMajorChange = () => {
    setMajorChangeStep("warning");
  };

  const handleConfirmMajorChange = () => {
    localStorage.setItem("userMajor", pendingMajor);
    setSelectedMajor(pendingMajor);
    setMajorValidationStep(0);
    setMajorChangeStep("comparing");
  };

  const handleGoToSemesterPlanning = () => {
    setShowChangeMajor(false);
    navigate("/semester-planning", {
      state: {
        changedMajor: pendingMajor,
        autoAddRecommended: true,
      },
    });
  };

  const handleStartPlanning = () => {
    navigate("/semester-planning");
  };

  const completedUnits = courses.completed.reduce((sum, course) => sum + course.units, 0);
  const inProgressUnits = courses.inProgress.reduce((sum, course) => sum + course.units, 0);
  const totalUnits = 120; // Typical bachelor's degree
  const progressPercent = Math.round((completedUnits / totalUnits) * 100);

  return (
    <div className="page">
      <main className="page-content">
        <div className="section-row degree-header">
          <div>
            <h1 className="page-title">Degree Pathway</h1>
            <p className="degree-major" role="status" aria-live="polite">
              {selectedMajor}
            </p>
          </div>
          <button
            onClick={openChangeMajorModal}
            className="change-major-button"
            aria-label="Change your major"
          >
            Change Major
          </button>
        </div>

        <SemesterSelector value={semester} onChange={setSemester} />

        {/* Progress Summary */}
        <section className="degree-summary">
          <div className="summary-item">
            <span className="summary-label">Completed Units</span>
            <span className="summary-value">{completedUnits}</span>
          </div>
          <div className="summary-item">
            <span className="summary-label">In Progress</span>
            <span className="summary-value">{inProgressUnits}</span>
          </div>
          <div className="summary-item">
            <span className="summary-label">Total Required</span>
            <span className="summary-value">{totalUnits}</span>
          </div>
          <div className="summary-item">
            <span className="summary-label">Progress</span>
            <span className="summary-value">{progressPercent}%</span>
          </div>
        </section>

        {/* Completed Courses */}
        <section className="page-section">
          <h2 className="section-heading">Completed Requirements</h2>
          <div className="stack-sm">
            {courses.completed.map((course, index) => (
              <div key={index} className="course-item content-card content-card-hover">
                <div className="course-check">✓</div>
                <div className="course-info">
                  <div className="course-code">{course.code}</div>
                  <div className="course-name">{course.name}</div>
                </div>
                <div className="course-units">{course.units} units</div>
              </div>
            ))}
          </div>
        </section>

        {/* In Progress Courses */}
        <section className="page-section">
          <h2 className="section-heading">Currently Taking ({semester})</h2>
          <div className="stack-sm">
            {courses.inProgress.map((course, index) => (
              <div key={index} className="course-item content-card content-card-hover">
                <div className="course-check in-progress">—</div>
                <div className="course-info">
                  <div className="course-code">{course.code}</div>
                  <div className="course-name">{course.name}</div>
                </div>
                <div className="course-units">{course.units} units</div>
              </div>
            ))}
          </div>
        </section>

        {/* Remaining Courses */}
        <section className="page-section">
          <h2 className="section-heading">Remaining Requirements</h2>

          <div className="course-list">
            {courses.remaining.slice(0, 4).map((course, index) => (
              <div key={index} className="course-item content-card remaining">
                <div className="course-check empty">○</div>

                <div className="course-info">
                  <div className="course-code">{course.code}</div>
                  <div className="course-name">{course.name}</div>
                </div>

                <div className="course-units">{course.units} units</div>
              </div>
            ))}
          </div>

          <Link to="/all-remaining-req" className="text-link view-all-link">
            View all remaining requirements
          </Link>
        </section>

        {/* Action Button */}
        <div className="sticky-action">
          <AppButton
            variant="primary"
            onClick={handleStartPlanning}
            ariaLabel="Start planning your semester"
          >
            Start Semester Planning
          </AppButton>
        </div>
      </main>

      {/* Change Major Modal */}
      {showChangeMajor && (
        <div
          className="modal-overlay"
          role="dialog"
          aria-modal="true"
          aria-labelledby="change-major-title"
          onClick={closeChangeMajorModal}
        >
          <div
            className="modal-content change-major-modal"
            onClick={(e) => e.stopPropagation()}
          >
            {majorChangeStep === "select" && (
              <>
                <h2 id="change-major-title" className="modal-title">
                  Change Major
                </h2>

                <p className="change-major-help-text">
                  Choose a new major from the dropdown, then continue to review how the
                  change may affect your requirements.
                </p>

                <div className="change-major-option-card change-major-option-card-static">
                  <div>
                    <p className="change-major-option-title">
                      Current Major: {selectedMajor || "Computer Science"}
                    </p>
                  </div>
                </div>

                <div className="change-major-form">
                  <div className="change-major-card selected">
                    <label htmlFor="new-major-select" className="change-major-label">
                      Selected Major
                    </label>

                    <div className="change-major-select-wrapper">
                      <select
                        id="new-major-select"
                        value={pendingMajor}
                        onChange={(e) => setPendingMajor(e.target.value)}
                        className="change-major-select"
                        aria-label="Select a new major"
                      >
                        {majorOptions.map((major) => (
                          <option key={major} value={major}>
                            {major}
                          </option>
                        ))}
                      </select>

                      <span className="change-major-dropdown-arrow" aria-hidden="true">
                        ⌄
                      </span>
                    </div>
                  </div>
                </div>

                <div className="modal-actions">
                  <AppButton
                    variant="primary"
                    onClick={handleRequestMajorChange}
                    disabled={pendingMajor === selectedMajor}
                    ariaLabel="Continue changing major"
                  >
                    Change Major
                  </AppButton>

                  <AppButton
                    variant="secondary"
                    onClick={closeChangeMajorModal}
                    ariaLabel="Cancel changing major"
                  >
                    Cancel
                  </AppButton>
                </div>
              </>
            )}

            {majorChangeStep === "warning" && (
              <>
                <h2 id="change-major-title" className="modal-title">
                  Confirm Major Change
                </h2>

                <p className="modal-warning">
                  ⚠️ Changing your major may update your degree requirements,
                  recommended courses, semester plan, and academic milestones.
                </p>

                <div className="change-major-results">
                  <div className="change-major-result-card">
                    <h3 className="change-major-result-title">Major Change Summary</h3>
                    <ul className="change-major-result-list">
                      <li>Current Major: {selectedMajor || "Computer Science"}</li>
                      <li>New Major: {pendingMajor}</li>
                      <li>The system will compare your old pathway with the new requirements.</li>
                    </ul>
                  </div>
                </div>

                <div className="modal-actions">
                  <AppButton
                    variant="primary"
                    onClick={handleConfirmMajorChange}
                    ariaLabel="Confirm major change"
                  >
                    Confirm Change
                  </AppButton>

                  <AppButton
                    variant="secondary"
                    onClick={() => setMajorChangeStep("select")}
                    ariaLabel="Go back to major selection"
                  >
                    Back
                  </AppButton>
                </div>
              </>
            )}

            {majorChangeStep === "comparing" && (
              <div className="save-modal">
                <h2 id="change-major-title" className="modal-title">
                  Comparing Requirements...
                </h2>

                <div className="validation-steps stack-md">
                  <div className={`validation-step ${majorValidationStep >= 1 ? "complete" : ""}`}>
                    {majorValidationStep >= 1 ? "✓" : "○"} Reviewing completed courses
                  </div>

                  <div className={`validation-step ${majorValidationStep >= 2 ? "complete" : ""}`}>
                    {majorValidationStep >= 2 ? "✓" : "○"} Checking new major requirements
                  </div>

                  <div className={`validation-step ${majorValidationStep >= 3 ? "complete" : ""}`}>
                    {majorValidationStep >= 3 ? "✓" : "○"} Updating recommended courses
                  </div>
                </div>
              </div>
            )}

            {majorChangeStep === "complete" && (
              <div className="save-modal">
                <h2 id="change-major-title" className="modal-title">
                  New Major Requirements Analyzed
                </h2>

                <div className="validation-steps stack-md">
                  <div className="validation-step complete">
                    ✓ Completed courses reviewed
                  </div>

                  <div className="validation-step complete">
                    ✓ New requirements identified
                  </div>

                  <div className="validation-step complete">
                    ✓ Recommended courses updated
                  </div>
                </div>

                <p className="change-major-warning-text modal-summary-text">
                  Please go to Semester Planning to finalize your changes. Recommended
                  courses for {pendingMajor} will be automatically added to your plan.
                </p>

                <div className="modal-actions">
                  <AppButton
                    variant="primary"
                    onClick={handleGoToSemesterPlanning}
                    ariaLabel="Go to semester planning"
                  >
                    Go to Semester Planning
                  </AppButton>

                  <AppButton
                    variant="secondary"
                    onClick={closeChangeMajorModal}
                    ariaLabel="Close major change results"
                  >
                    Close
                  </AppButton>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      <BottomNavBar />
    </div>
  );
}
