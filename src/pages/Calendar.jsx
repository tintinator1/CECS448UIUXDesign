import { useState } from "react";
import BottomNavBar from "../components/Navbar";
import "../styles/mainpages.css";

const deadlines = [
  {
    id: 1,
    title: "Financial Aid Application Fall 2026",
    date: "March 15, 2026",
    priority: "high",
    description: "Submit your FAFSA application for Fall 2026 financial aid consideration.",
    checklist: [
      { id: 1, text: "Gather tax documents and financial information", completed: false },
      { id: 2, text: "Create an FSA ID at studentaid.gov", completed: false },
      { id: 3, text: "Complete the FAFSA form online", completed: false },
      { id: 4, text: "Submit and save confirmation number", completed: false },
    ],
    resources: [
      "Financial Aid Office - Student Services Building, Room 201",
      "FAFSA Help Hotline: 1-800-4-FED-AID",
    ],
  },
  {
    id: 2,
    title: "Fall 2026 Course Registration",
    date: "April 10, 2026",
    priority: "high",
    description: "Register for your Fall 2026 classes. Priority registration begins for continuing students.",
    checklist: [
      { id: 1, text: "Review your degree requirements", completed: false },
      { id: 2, text: "Create a semester plan", completed: false },
      { id: 3, text: "Check for prerequisite requirements", completed: false },
      { id: 4, text: "Register through student portal on your assigned date", completed: false },
    ],
    resources: [
      "Academic Advising Center - Library, 3rd Floor",
      "Registration Support: (562) 985-4641",
    ],
  },
  {
    id: 3,
    title: "Scholarship Application Deadline",
    date: "May 1, 2026",
    priority: "medium",
    description: "Submit applications for Fall 2026 scholarships and grants.",
    checklist: [
      { id: 1, text: "Search available scholarships on portal", completed: false },
      { id: 2, text: "Prepare personal statement and essays", completed: false },
      { id: 3, text: "Request letters of recommendation", completed: false },
      { id: 4, text: "Submit completed applications", completed: false },
    ],
    resources: [
      "Scholarship Office - Administration Building, Room 110",
      "Email: scholarships@university.edu",
    ],
  },
];

export default function Calendar() {
  const [selectedDeadline, setSelectedDeadline] = useState(null);
  const [checklistState, setChecklistState] = useState({});

  const handleChecklistToggle = (deadlineId, itemId) => {
    setChecklistState((prev) => ({
      ...prev,
      [`${deadlineId}-${itemId}`]: !prev[`${deadlineId}-${itemId}`],
    }));
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "high":
        return "#ef4444";
      case "medium":
        return "#f59e0b";
      case "low":
        return "#10b981";
      default:
        return "#6b7280";
    }
  };

  const getPriorityLabel = (priority) => {
    switch (priority) {
      case "high":
        return "High Priority";
      case "medium":
        return "Medium Priority";
      case "low":
        return "Low Priority";
      default:
        return "Normal";
    }
  };

  return (
    <div className="page">
      <main className="page-content">
        <h1 className="page-title">Deadlines & Calendar</h1>

        {!selectedDeadline ? (
          <>
            <p className="page-subtitle">
              Stay on track with important academic deadlines
            </p>

            <section className="page-section" style={{ marginTop: "32px" }}>
              <h2 className="section-heading">Upcoming Deadlines</h2>
              <div className="deadline-list">
                {deadlines.map((deadline) => (
                  <div key={deadline.id} className="deadline-card">
                    <div className="deadline-header">
                      <div>
                        <h3 className="deadline-title">{deadline.title}</h3>
                        <p className="deadline-date">Due: {deadline.date}</p>
                      </div>
                      <span
                        className="deadline-priority"
                        style={{ backgroundColor: getPriorityColor(deadline.priority) }}
                        aria-label={getPriorityLabel(deadline.priority)}
                      >
                        {getPriorityLabel(deadline.priority)}
                      </span>
                    </div>
                    <button
                      onClick={() => setSelectedDeadline(deadline)}
                      className="small-button"
                      style={{ marginTop: "12px" }}
                      aria-label={`View details for ${deadline.title}`}
                    >
                      View Details
                    </button>
                  </div>
                ))}
              </div>
            </section>
          </>
        ) : (
          <>
            <button
              onClick={() => setSelectedDeadline(null)}
              className="back-link"
              aria-label="Back to all deadlines"
            >
              ← Back to all deadlines
            </button>

            <section className="deadline-detail" role="article">
              <div className="deadline-detail-header">
                <h2 className="deadline-detail-title">{selectedDeadline.title}</h2>
                <span
                  className="deadline-priority"
                  style={{ backgroundColor: getPriorityColor(selectedDeadline.priority) }}
                  aria-label={getPriorityLabel(selectedDeadline.priority)}
                >
                  {getPriorityLabel(selectedDeadline.priority)}
                </span>
              </div>
              <p className="deadline-date" style={{ marginTop: "8px" }}>
                Due: {selectedDeadline.date}
              </p>
              <p className="deadline-description">{selectedDeadline.description}</p>

              <div className="checklist-section">
                <h3 className="checklist-title">Steps to Complete</h3>
                <div className="checklist">
                  {selectedDeadline.checklist.map((item) => {
                    const isChecked = checklistState[`${selectedDeadline.id}-${item.id}`];
                    return (
                      <label key={item.id} className="checklist-item">
                        <input
                          type="checkbox"
                          checked={isChecked || false}
                          onChange={() =>
                            handleChecklistToggle(selectedDeadline.id, item.id)
                          }
                          className="checklist-checkbox"
                          aria-label={item.text}
                        />
                        <span className={isChecked ? "checked" : ""}>{item.text}</span>
                      </label>
                    );
                  })}
                </div>
              </div>

              <div className="resources-section">
                <h3 className="resources-title">Helpful Resources</h3>
                <ul className="resources-list">
                  {selectedDeadline.resources.map((resource, index) => (
                    <li key={index} className="resource-item">
                      {resource}
                    </li>
                  ))}
                </ul>
              </div>
            </section>
          </>
        )}
      </main>

      <BottomNavBar />
    </div>
  );
}