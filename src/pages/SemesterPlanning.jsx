import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import BottomNavBar from "../components/Navbar";
import SemesterSelector from "../components/SemesterSelector";
import "../styles/mainpages.css";

const recommendedCourses = {
  "Computer Science": [
    { code: "CECS 277", name: "Object-Oriented Programming", units: 3, prerequisite: "CECS 274" },
    { code: "CECS 323", name: "Database Fundamentals", units: 3, prerequisite: "CECS 228" },
    { code: "PHYS 151", name: "Physics I", units: 3, prerequisite: "MATH 122" },
  ],
  "Undecided": [
    { code: "PHIL 100", name: "Introduction to Philosophy", units: 3, prerequisite: null },
    { code: "COMM 100", name: "Public Speaking", units: 3, prerequisite: null },
    { code: "BIOL 100", name: "Introduction to Biology", units: 3, prerequisite: null },
  ],
};

export default function SemesterPlanning() {
  const navigate = useNavigate();
  const [selectedSemester, setSelectedSemester] = useState("Fall 2026");
  const [selectedCourses, setSelectedCourses] = useState([]);
  const [customCourse, setCustomCourse] = useState({ code: "", name: "", units: "" });
  const [showAddCourse, setShowAddCourse] = useState(false);
  const [showSaveModal, setShowSaveModal] = useState(false);
  const [validationStep, setValidationStep] = useState(0);
  const [major, setMajor] = useState("Undecided");

  useEffect(() => {
    const userMajor = localStorage.getItem("userMajor") || "Undecided";
    setMajor(userMajor);
  }, []);

  const courses = recommendedCourses[major] || recommendedCourses["Undecided"];

  const handleCourseToggle = (course) => {
    setSelectedCourses((prev) => {
      const exists = prev.find((c) => c.code === course.code);
      if (exists) {
        return prev.filter((c) => c.code !== course.code);
      } else {
        return [...prev, course];
      }
    });
  };

  const handleAddCustomCourse = () => {
    if (customCourse.code && customCourse.name && customCourse.units) {
      const newCourse = {
        code: customCourse.code,
        name: customCourse.name,
        units: parseInt(customCourse.units),
        prerequisite: null,
      };
      setSelectedCourses([...selectedCourses, newCourse]);
      setCustomCourse({ code: "", name: "", units: "" });
      setShowAddCourse(false);
    }
  };

  const handleSavePlan = () => {
    if (selectedCourses.length === 0) {
      alert("Please select at least one course before saving.");
      return;
    }

    setShowSaveModal(true);
    setValidationStep(0);

    // Simulate validation steps
    setTimeout(() => setValidationStep(1), 1000);
    setTimeout(() => setValidationStep(2), 2000);
    setTimeout(() => setValidationStep(3), 3000);
  };

  const handleModalClose = () => {
    setShowSaveModal(false);
    setValidationStep(0);
    // Store the plan
    localStorage.setItem(
      `semesterPlan_${selectedSemester}`,
      JSON.stringify(selectedCourses)
    );
  };

  const totalUnits = selectedCourses.reduce((sum, course) => sum + course.units, 0);

  const completedCourses = [
    { code: "CECS 100", name: "Critical Thinking in the Digital Age" },
    { code: "CECS 174", name: "Intro to Programming" },
    { code: "CECS 225", name: "Digital Logic" },
  ];

  const inProgressCourses = [
    { code: "CECS 228", name: "Discrete Mathematics" },
    { code: "CECS 274", name: "Data Structures" },
  ];

  return (
    <div className="page">
      <main className="page-content">
        <h1 className="page-title">Semester Planning</h1>

        <section className="page-section semester-planning-selector-section">
          <SemesterSelector value={selectedSemester} onChange={setSelectedSemester} />
        </section>

        {/* Completed Courses */}
        <section className="page-section">
          <h2 className="section-heading">Completed Courses</h2>
          <div className="completed-course-list">
            {completedCourses.map((course, index) => (
              <div key={index} className="course-chip completed">
                <span className="chip-check">✓</span>
                <span className="chip-code">{course.code}</span>
              </div>
            ))}
          </div>
        </section>

        {/* In Progress Courses */}
        <section className="page-section">
          <h2 className="section-heading">Currently Taking</h2>
          <div className="completed-course-list">
            {inProgressCourses.map((course, index) => (
              <div key={index} className="course-chip in-progress">
                <span className="chip-check">—</span>
                <span className="chip-code">{course.code}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Recommended Courses */}
        <section className="page-section">
          <h2 className="section-heading">Recommended Next Courses</h2>
          <div className="course-selection-list stack-sm">
            {courses.map((course, index) => {
              const isSelected = selectedCourses.find((c) => c.code === course.code);
              return (
                <label
                  key={index}
                  className={`selectable-course content-card ${isSelected ? "selected" : ""}`}
                  htmlFor={`course-${index}`}
                >
                  <input
                    type="checkbox"
                    id={`course-${index}`}
                    checked={!!isSelected}
                    onChange={() => handleCourseToggle(course)}
                    className="course-checkbox"
                    aria-label={`Select ${course.code} - ${course.name}`}
                  />
                  <div className="course-info">
                    <div className="course-code">{course.code}</div>
                    <div className="course-name">{course.name}</div>
                    {course.prerequisite && (
                      <div className="course-prerequisite">
                        Prerequisite: {course.prerequisite}
                      </div>
                    )}
                  </div>
                  <div className="course-units">{course.units} units</div>
                </label>
              );
            })}
          </div>

          {!showAddCourse && (
            <button
              onClick={() => setShowAddCourse(true)}
              className="add-course-button"
              aria-label="Add a custom course"
            >
              + Add a course
            </button>
          )}

          {showAddCourse && (
            <div className="add-course-form content-card">
              <h3 className="form-heading">Add Custom Course</h3>
              <div className="form-row">
                <input
                  type="text"
                  placeholder="Course Code (e.g., CECS 100)"
                  value={customCourse.code}
                  onChange={(e) =>
                    setCustomCourse({ ...customCourse, code: e.target.value })
                  }
                  className="form-input"
                  aria-label="Course code"
                />
              </div>
              <div className="form-row">
                <input
                  type="text"
                  placeholder="Course Name"
                  value={customCourse.name}
                  onChange={(e) =>
                    setCustomCourse({ ...customCourse, name: e.target.value })
                  }
                  className="form-input"
                  aria-label="Course name"
                />
              </div>
              <div className="form-row">
                <input
                  type="number"
                  placeholder="Units"
                  value={customCourse.units}
                  onChange={(e) =>
                    setCustomCourse({ ...customCourse, units: e.target.value })
                  }
                  className="form-input"
                  min="1"
                  max="6"
                  aria-label="Number of units"
                />
              </div>
              <div className="form-buttons">
                <button
                  onClick={handleAddCustomCourse}
                  className="primary-button"
                  disabled={!customCourse.code || !customCourse.name || !customCourse.units}
                  aria-label="Confirm add course"
                >
                  Add Course
                </button>
                <button
                  onClick={() => {
                    setShowAddCourse(false);
                    setCustomCourse({ code: "", name: "", units: "" });
                  }}
                  className="secondary-button"
                  aria-label="Cancel adding course"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}
        </section>

        {/* Selected Courses Summary */}
        {selectedCourses.length > 0 && (
          <section className="page-section">
            <h2 className="section-heading">Your Plan ({totalUnits} units)</h2>
            <div className="stack-sm">
              {selectedCourses.map((course, index) => (
                <div key={index} className="summary-course-item">
                  <div className="course-info">
                    <span className="course-code">{course.code}</span>
                    <span className="course-name"> {course.name}</span>
                  </div>
                  <span className="course-units">{course.units} units</span>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Action Buttons */}
        <div className="semester-planning-actions">
          <button
            onClick={handleSavePlan}
            className="primary-button"
            disabled={selectedCourses.length === 0}
            aria-label="Save semester plan"
          >
            Save Semester Plan
          </button>

          <button
            onClick={() => navigate("/degree-pathway")}
            className="secondary-button"
            aria-label="Cancel semester planning and return to degree pathway"
          >
            Cancel
          </button>
        </div>
      </main>

      {/* Save Validation Modal */}
      {showSaveModal && (
        <div className="modal-overlay" role="dialog" aria-modal="true" aria-labelledby="save-modal-title">
          <div className="modal-content save-modal" onClick={(e) => e.stopPropagation()}>
            <h2 id="save-modal-title" className="modal-title">
              {validationStep === 3 ? "Semester Plan Saved!" : "Saving Semester Plan..."}
            </h2>
            <div className="validation-steps stack-md">
              <div className={`validation-step ${validationStep >= 1 ? "complete" : ""}`}>
                {validationStep >= 1 ? "✓" : "○"} Validating classes
              </div>
              <div className={`validation-step ${validationStep >= 2 ? "complete" : ""}`}>
                {validationStep >= 2 ? "✓" : "○"} Checking prerequisites
              </div>
              <div className={`validation-step ${validationStep >= 3 ? "complete" : ""}`}>
                {validationStep >= 3 ? "✓" : "○"} Saving plan
              </div>
            </div>
            {validationStep === 3 && (
              <button
                onClick={handleModalClose}
                className="primary-button"
                style={{ marginTop: "24px" }}
                aria-label="Close and return to degree pathway"
              >
                Done
              </button>
            )}
          </div>
        </div>
      )}

      <BottomNavBar />
    </div>
  );
}
