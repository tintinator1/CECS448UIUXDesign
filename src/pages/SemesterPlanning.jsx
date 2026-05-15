import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import BottomNavBar from "../components/Navbar";
import SemesterSelector from "../components/SemesterSelector";
import AppButton from "../components/AppButton";
import BackButton from "../components/BackButton";
import "../styles/mainpages.css";

const recommendedCoursesBySemester = {
  "Computer Science": {
    "Fall 2026": [
      { code: "CECS 277", name: "Object-Oriented Programming", units: 3, prerequisite: "CECS 274" },
      { code: "CECS 323", name: "Database Fundamentals", units: 3, prerequisite: "CECS 228" },
      { code: "PHYS 151", name: "Physics I", units: 3, prerequisite: "MATH 122" },
    ],
    "Spring 2027": [
      { code: "CECS 326", name: "Operating Systems", units: 3, prerequisite: "CECS 277" },
      { code: "CECS 328", name: "Algorithms", units: 3, prerequisite: "CECS 228" },
      { code: "CECS 343", name: "Software Engineering", units: 3, prerequisite: "CECS 277" },
    ],
    "Fall 2027": [
      { code: "CECS 378", name: "Introduction to Computer Security", units: 3, prerequisite: "CECS 326" },
      { code: "CECS 448", name: "User Interface Design", units: 3, prerequisite: "CECS 343" },
      { code: "CECS 453", name: "Mobile Application Development", units: 3, prerequisite: "CECS 277" },
    ],
    "Spring 2028": [
      { code: "CECS 491A", name: "Senior Project I", units: 3, prerequisite: "CECS 343" },
      { code: "CECS 475", name: "Software Development with Frameworks", units: 3, prerequisite: "CECS 343" },
      { code: "CECS 478", name: "Computer Security Principles", units: 3, prerequisite: "CECS 326" },
    ],
  },

  "Undecided": {
    "Fall 2026": [
      { code: "PHIL 100", name: "Introduction to Philosophy", units: 3, prerequisite: null },
      { code: "COMM 100", name: "Public Speaking", units: 3, prerequisite: null },
      { code: "BIOL 100", name: "Introduction to Biology", units: 3, prerequisite: null },
    ],
    "Spring 2027": [
      { code: "ENGL 200", name: "Critical Reading and Writing", units: 3, prerequisite: "ENGL 100" },
      { code: "HIST 101", name: "World History", units: 3, prerequisite: null },
      { code: "ART 110", name: "Introduction to Art", units: 3, prerequisite: null },
    ],
    "Fall 2027": [
      { code: "PSYC 100", name: "Introduction to Psychology", units: 3, prerequisite: null },
      { code: "SOC 100", name: "Introduction to Sociology", units: 3, prerequisite: null },
      { code: "MATH 103", name: "College Algebra", units: 3, prerequisite: null },
    ],
    "Spring 2028": [
      { code: "GEOG 100", name: "Introduction to Geography", units: 3, prerequisite: null },
      { code: "MUS 100", name: "Music Appreciation", units: 3, prerequisite: null },
      { code: "KIN 101", name: "Lifetime Fitness", units: 3, prerequisite: null },
    ],
  },
};

const getSavedSemesterPlan = (semester) => {
  try {
    return JSON.parse(localStorage.getItem(`semesterPlan_${semester}`)) || [];
  } catch {
    return [];
  }
};

export default function SemesterPlanning() {
  const navigate = useNavigate();
  const location = useLocation();
  const [selectedSemester, setSelectedSemester] = useState(
    location.state?.selectedSemester || "Fall 2026"
  );
  const [selectedCourses, setSelectedCourses] = useState([]);
  const [customCourse, setCustomCourse] = useState({ code: "", name: "", units: "" });
  const [showAddCourse, setShowAddCourse] = useState(false);
  const [showSaveModal, setShowSaveModal] = useState(false);
  const [validationStep, setValidationStep] = useState(0);
  const [major, setMajor] = useState("Computer Science");

  useEffect(() => {
    const userMajor =
      location.state?.changedMajor ||
      localStorage.getItem("userMajor") ||
      "Computer Science";

    setMajor(userMajor);
  }, [location.state]);

  useEffect(() => {
    const savedPlan = getSavedSemesterPlan(selectedSemester);
    const shouldAutoAddRecommended =
      location.state?.autoAddRecommended &&
      (location.state?.selectedSemester || "Fall 2026") === selectedSemester &&
      savedPlan.length === 0;

    if (shouldAutoAddRecommended) {
      const autoCourses =
        recommendedCoursesBySemester[location.state?.changedMajor || major]?.[selectedSemester] ||
        recommendedCoursesBySemester["Undecided"]?.[selectedSemester] ||
        [];

      setSelectedCourses(autoCourses);
      return;
    }

    setSelectedCourses(savedPlan);
  }, [selectedSemester, major, location.state]);

  
  const courses =
    recommendedCoursesBySemester[major]?.[selectedSemester] ||
    recommendedCoursesBySemester["Undecided"]?.[selectedSemester] ||
    [];

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

    localStorage.setItem(
      `semesterPlan_${selectedSemester}`,
      JSON.stringify(selectedCourses)
    );

    navigate("/degree-pathway");
  };

  const totalUnits = selectedCourses.reduce((sum, course) => sum + course.units, 0);

  const completedCourses = [
    { code: "CECS 100", name: "Critical Thinking in the Digital Age" },
    { code: "CECS 174", name: "Intro to Programming" },
    { code: "CECS 225", name: "Digital Logic" },
  ];

  const inProgressCourses =
    selectedSemester === "Fall 2026"
      ? [
          { code: "CECS 228", name: "Discrete Mathematics" },
          { code: "CECS 274", name: "Data Structures" },
        ]
      : [];

  const hasNoRecommendedCourses = courses.length === 0;

  return (
    <div className="page">
      <main className="page-content">
        <h1 className="page-title">Semester Planning</h1>

        <section className="page-section semester-planning-selector-section">
          <SemesterSelector value={selectedSemester} onChange={setSelectedSemester} />
        </section>

        {location.state?.autoAddRecommended && (
          <section className="major-change-notice content-card">
            <p className="tips-text">
              Recommended courses for your new {major} pathway were automatically added.
              Review the plan below before saving.
            </p>
          </section>
        )}

        {selectedSemester !== "Fall 2026" && selectedCourses.length === 0 && (
          <section className="major-change-notice content-card">
            <p className="tips-text">
              No course plan has been saved for {selectedSemester} yet. Add courses below,
              then save the semester plan so it appears in Degree Pathway.
            </p>
          </section>
        )}

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

          {inProgressCourses.length > 0 ? (
            <div className="completed-course-list">
              {inProgressCourses.map((course, index) => (
                <div key={index} className="course-chip in-progress">
                  <span className="chip-check">—</span>
                  <span className="chip-code">{course.code}</span>
                </div>
              ))}
            </div>
          ) : (
            <div className="content-card">
              <p className="section-text">
                No courses are currently listed for {selectedSemester}. Start planning this
                semester by adding courses below.
              </p>
            </div>
          )}
        </section>

        {/* Recommended Courses */}
        <section className="page-section">
          <h2 className="section-heading">Recommended Next Courses</h2>

          {hasNoRecommendedCourses ? (
            <div className="content-card">
              <p className="section-text">
                No recommended courses are available for {selectedSemester} yet. Use
                “Add a course” to build and save a plan for this semester.
              </p>
            </div>
          ) : (
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
          )}

          {!showAddCourse && (
            <AppButton
              variant="add"
              onClick={() => setShowAddCourse(true)}
              ariaLabel="Add a custom course"
            >
              + Add a course
            </AppButton>
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
                <AppButton
                  variant="primary"
                  onClick={handleAddCustomCourse}
                  disabled={!customCourse.code || !customCourse.name || !customCourse.units}
                  ariaLabel="Confirm add course"
                >
                  Add Course
                </AppButton>
                <AppButton
                  variant="secondary"
                  onClick={() => {
                    setShowAddCourse(false);
                    setCustomCourse({ code: "", name: "", units: "" });
                  }}
                  ariaLabel="Cancel adding course"
                >
                  Cancel
                </AppButton>
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
          <div className="disabled-button-tooltip-wrapper">
            <AppButton
              variant="primary"
              onClick={handleSavePlan}
              disabled={selectedCourses.length === 0}
              ariaLabel="Save semester plan"
            >
              Save Semester Plan
            </AppButton>

            {selectedCourses.length === 0 && (
              <span className="disabled-button-tooltip">
                Please select at least one course before saving your semester plan.
              </span>
            )}
          </div>

          <BackButton
            to="/degree-pathway"
            ariaLabel="Cancel semester planning and return to degree pathway"
          >
            Cancel
          </BackButton>
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
              <AppButton
                variant="primary"
                className="modal-done-button"
                onClick={handleModalClose}
                ariaLabel="Close and return to degree pathway"
              >
                Done
              </AppButton>
            )}
          </div>
        </div>
      )}

      <BottomNavBar />
    </div>
  );
}
