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

export default function DegreePathway() {
  const navigate = useNavigate();
  const [selectedMajor, setSelectedMajor] = useState("");
  const [semester, setSemester] = useState("Fall 2026");
  const [showChangeMajor, setShowChangeMajor] = useState(false);

  useEffect(() => {
    const major = localStorage.getItem("userMajor") || "Undecided";
    setSelectedMajor(major);
  }, []);

  const courses = sampleCourses[selectedMajor] || sampleCourses["Undecided"];

  const handleChangeMajor = (newMajor) => {
    localStorage.setItem("userMajor", newMajor);
    setSelectedMajor(newMajor);
    setShowChangeMajor(false);
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
            onClick={() => setShowChangeMajor(true)}
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
        <div className="modal-overlay" onClick={() => setShowChangeMajor(false)} role="dialog" aria-modal="true" aria-labelledby="change-major-title">
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h2 id="change-major-title" className="modal-title">Change Major</h2>
            <p className="modal-warning">
              ⚠️ Changing your major will update your degree requirements, recommended courses, and academic milestones.
            </p>
            <div className="major-list stack-sm">
              {Object.keys(sampleCourses).map((major) => (
                <button
                  key={major}
                  onClick={() => handleChangeMajor(major)}
                  className={`major-option ${selectedMajor === major ? "selected" : ""}`}
                  aria-pressed={selectedMajor === major}
                >
                  {major}
                </button>
              ))}
            </div>
            <AppButton
              variant="secondary"
              onClick={() => setShowChangeMajor(false)}
              ariaLabel="Cancel changing major"
            >
              Cancel
            </AppButton>
          </div>
        </div>
      )}

      <BottomNavBar />
    </div>
  );
}
