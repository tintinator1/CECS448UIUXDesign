import { useState } from "react";
import { Link } from "react-router-dom";
import BottomNavBar from "../components/Navbar";
import SemesterSelector from "../components/SemesterSelector";
import AppButton from "../components/AppButton";
import "../styles/mainpages.css";

const initialDeadlines = [
  {
    id: 1,
    title: "Financial Aid Application Fall 2026",
    dueDate: "March 15",
    priority: "High",
    consequence: "Missing this deadline may delay or reduce your financial aid award.",
    steps: [
      "Log in to the Financial Aid website",
      "Complete the Fall 2026 financial aid application",
      "Upload any required documents",
      "Review your application for accuracy",
      "Submit the application before March 15",
    ],
    resources: ["Financial Aid Website", "Student Center"],
  },
  {
    id: 2,
    title: "Register for Fall 2026 Classes",
    dueDate: "April 20",
    priority: "High",
    consequence: "Missing this deadline may limit class availability for your next semester.",
    steps: [
      "Review recommended semester classes",
      "Meet with an advisor if you are unsure",
      "Check prerequisites and registration holds",
      "Add classes to your shopping cart",
      "Register before April 20",
    ],
    resources: ["Student Center", "Canvas", "Tutoring"],
  },
  {
    id: 3,
    title: "Apply For Graduation Spring 2027",
    dueDate: "October 10",
    priority: "Medium",
    consequence: "Missing this deadline may delay your graduation review or ceremony eligibility.",
    steps: [
      "Open Student Center",
      "Confirm your expected graduation term",
      "Review completed and remaining degree requirements",
      "Submit the graduation application",
      "Save or screenshot the confirmation page",
    ],
    resources: ["Student Center", "Counseling Appointments"],
  },
];

const checklistItems = [
  "Review recommended semester classes",
  "Meet with advisor if unsure",
  "Review graduation requirements",
];

export default function Deadlines() {
  const [semester, setSemester] = useState("Fall 2026");
  const [checkedItems, setCheckedItems] = useState([]);
  const [deadlines, setDeadlines] = useState(initialDeadlines);
  const [selectedDeadline, setSelectedDeadline] = useState(null);
  const [detailChecklist, setDetailChecklist] = useState([]);
  const [showCompletionMessage, setShowCompletionMessage] = useState(false);

  const toggleChecklistItem = (item) => {
    setCheckedItems((prev) =>
      prev.includes(item)
        ? prev.filter((checkedItem) => checkedItem !== item)
        : [...prev, item]
    );
  };

  const openDeadlineDetails = (deadline) => {
    setSelectedDeadline(deadline);
    setDetailChecklist([]);
    setShowCompletionMessage(false);
  };

  const closeDeadlineDetails = () => {
    setSelectedDeadline(null);
    setDetailChecklist([]);
    setShowCompletionMessage(false);
  };

  const toggleDetailStep = (step) => {
    setDetailChecklist((prev) =>
      prev.includes(step)
        ? prev.filter((checkedStep) => checkedStep !== step)
        : [...prev, step]
    );
  };

  const handleMarkCompleted = () => {
    if (!selectedDeadline) return;

    setDeadlines((prev) =>
      prev.filter((deadline) => deadline.id !== selectedDeadline.id)
    );
    setShowCompletionMessage(true);

    setTimeout(() => {
      closeDeadlineDetails();
    }, 1500);
  };

  const allDetailStepsChecked =
    selectedDeadline && detailChecklist.length === selectedDeadline.steps.length;

  return (
    <div className="page">
      <main className="page-content calendar-page-content">
        <h1 className="page-title">Deadlines</h1>

        <SemesterSelector value={semester} onChange={setSemester} />

        <section className="page-section">
          <h2 className="section-heading">Upcoming Deadlines</h2>

          {deadlines.length > 0 ? (
            <div className="stack-lg">
              {deadlines.map((deadline) => (
                <div key={deadline.id} className="section-row calendar-deadline-row">
                  <p className="section-text">
                    {deadline.title}
                    <br />
                    Due: {deadline.dueDate}
                    <br />
                    Priority: {deadline.priority}
                  </p>

                  <AppButton
                    variant="small"
                    onClick={() => openDeadlineDetails(deadline)}
                    ariaLabel={`View details for ${deadline.title}`}
                  >
                    View Details
                  </AppButton>
                </div>
              ))}
            </div>
          ) : (
            <p className="section-text">No upcoming deadlines. Nice work!</p>
          )}
        </section>

        <section className="page-section">
          <h2 className="section-heading">Helpful Checklist</h2>

          <div className="stack-md">
            {checklistItems.map((item) => {
              const isChecked = checkedItems.includes(item);

              return (
                <label key={item} className="calendar-checklist-row">
                  <input
                    type="checkbox"
                    checked={isChecked}
                    onChange={() => toggleChecklistItem(item)}
                    className="calendar-checklist-box"
                  />
                  <span className={isChecked ? "calendar-checklist-text checked" : "calendar-checklist-text"}>
                    {item}
                  </span>
                </label>
              );
            })}
          </div>
        </section>

        <Link to="/help" className="text-link helpful-resources-link">
          View helpful resources
        </Link>
      </main>

      {selectedDeadline && (
        <div className="modal-overlay" role="dialog" aria-modal="true" aria-labelledby="deadline-detail-title">
          <div className="modal-content deadline-detail-modal">
            {showCompletionMessage ? (
              <div className="completion-message">
                <h2 className="modal-title">Task Completed</h2>
                <p className="deadline-detail-text">
                  This deadline has been removed from your upcoming deadlines.
                </p>
              </div>
            ) : (
              <>
                <div className="deadline-detail-header">
                  <div>
                    <h2 id="deadline-detail-title" className="modal-title">
                      {selectedDeadline.title}
                    </h2>
                    <p className="deadline-detail-text">
                      Due: {selectedDeadline.dueDate}
                      <br />
                      Priority: {selectedDeadline.priority}
                    </p>
                  </div>
                </div>

                <div className="deadline-detail-section">
                  <h3 className="deadline-detail-heading">Required Steps</h3>

                  <div className="stack-md">
                    {selectedDeadline.steps.map((step) => {
                      const isChecked = detailChecklist.includes(step);

                      return (
                        <label key={step} className="calendar-checklist-row">
                          <input
                            type="checkbox"
                            checked={isChecked}
                            onChange={() => toggleDetailStep(step)}
                            className="calendar-checklist-box"
                          />
                          <span className={isChecked ? "calendar-checklist-text checked" : "calendar-checklist-text"}>
                            {step}
                          </span>
                        </label>
                      );
                    })}
                  </div>
                </div>

                <div className="deadline-detail-section">
                  <h3 className="deadline-detail-heading">Consequence</h3>
                  <p className="deadline-detail-text">{selectedDeadline.consequence}</p>
                </div>

                <div className="deadline-detail-section">
                  <h3 className="deadline-detail-heading">Related Resources</h3>
                  <p className="deadline-detail-text">
                    {selectedDeadline.resources.join(", ")}
                  </p>
                </div>

                <div className="modal-actions">
                  <AppButton
                    variant="primary"
                    disabled={!allDetailStepsChecked}
                    onClick={handleMarkCompleted}
                    ariaLabel="Mark deadline as completed"
                  >
                    Mark as Completed
                  </AppButton>

                  <AppButton
                    variant="secondary"
                    onClick={closeDeadlineDetails}
                    ariaLabel="Cancel deadline details"
                  >
                    Cancel
                  </AppButton>
                </div>
              </>
            )}
          </div>
        </div>
      )}

      <BottomNavBar />
    </div>
  );
}
