import { useState } from "react";
import { Link } from "react-router-dom";
import BottomNavBar from "../components/Navbar";
import SemesterSelector from "../components/SemesterSelector";
import AppButton from "../components/AppButton";
import "../styles/mainpages.css";

const deadlinesBySemester = {
  "Fall 2026": [
    {
      id: "fall-2026-financial-aid",
      title: "Financial Aid Application Fall 2026",
      dueDate: "March 15",
      sortDate: "2026-03-15",
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
      id: "fall-2026-registration",
      title: "Register for Fall 2026 Classes",
      dueDate: "April 20",
      sortDate: "2026-04-20",
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
      id: "spring-2027-graduation",
      title: "Apply For Graduation Spring 2027",
      dueDate: "October 10",
      sortDate: "2026-10-10",
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
  ],
  "Spring 2027": [
    {
      id: "spring-2027-tuition",
      title: "Spring 2027 Tuition Payment Deadline",
      dueDate: "January 12",
      sortDate: "2027-01-12",
      priority: "High",
      consequence: "Missing this deadline may place a hold on your account or drop your classes.",
      steps: [
        "Open Student Center",
        "Review your current balance",
        "Confirm financial aid or payment plan status",
        "Pay the remaining balance",
        "Save the payment confirmation",
      ],
      resources: ["Student Center", "Financial Aid Website"],
    },
    {
      id: "spring-2027-add-drop",
      title: "Spring 2027 Add/Drop Deadline",
      dueDate: "February 5",
      sortDate: "2027-02-05",
      priority: "Medium",
      consequence: "Missing this deadline may make schedule changes harder or require advisor approval.",
      steps: [
        "Review your current schedule",
        "Check whether each course fits your degree plan",
        "Meet with an advisor if you are unsure",
        "Add or drop courses before the deadline",
      ],
      resources: ["Student Center", "Counseling Appointments"],
    },
    {
      id: "spring-2027-advising-check",
      title: "Spring 2027 Advising Check-In",
      dueDate: "March 10",
      sortDate: "2027-03-10",
      priority: "Medium",
      consequence: "Missing this check-in may make it harder to prepare for your next registration period.",
      steps: [
        "Review your Degree Pathway page",
        "Write down any questions about remaining requirements",
        "Schedule a counseling appointment",
        "Confirm your next semester planning goals",
      ],
      resources: ["Counseling Appointments", "Degree Pathway"],
    },
  ],
  "Fall 2027": [
    {
      id: "fall-2027-registration",
      title: "Register for Fall 2027 Classes",
      dueDate: "April 18",
      sortDate: "2027-04-18",
      priority: "High",
      consequence: "Missing this deadline may reduce access to required upper-division courses.",
      steps: [
        "Review your saved semester plan",
        "Check prerequisites for upper-division courses",
        "Clear any registration holds",
        "Register for classes in Student Center",
      ],
      resources: ["Student Center", "Degree Pathway"],
    },
    {
      id: "fall-2027-financial-aid",
      title: "Financial Aid Renewal Fall 2027",
      dueDate: "May 8",
      sortDate: "2027-05-08",
      priority: "Medium",
      consequence: "Missing this deadline may delay your financial aid renewal.",
      steps: [
        "Log in to the Financial Aid website",
        "Review renewal requirements",
        "Submit any requested documents",
        "Confirm your aid status in Student Center",
      ],
      resources: ["Financial Aid Website", "Student Center"],
    },
    {
      id: "fall-2027-degree-audit",
      title: "Fall 2027 Degree Audit Review",
      dueDate: "September 22",
      sortDate: "2027-09-22",
      priority: "Medium",
      consequence: "Missing this review may cause you to overlook a required course or milestone.",
      steps: [
        "Open Degree Pathway",
        "Review completed and remaining requirements",
        "Compare your plan with graduation milestones",
        "Save any needed semester planning updates",
      ],
      resources: ["Degree Pathway", "Counseling Appointments"],
    },
  ],
  "Spring 2028": [
    {
      id: "spring-2028-grad-check",
      title: "Graduation Requirement Check Spring 2028",
      dueDate: "February 14",
      sortDate: "2028-02-14",
      priority: "High",
      consequence: "Missing this deadline may delay graduation clearance or final advising review.",
      steps: [
        "Open Degree Pathway",
        "Review remaining requirements",
        "Schedule a counseling appointment",
        "Confirm your graduation checklist is complete",
      ],
      resources: ["Degree Pathway", "Counseling Appointments"],
    },
    {
      id: "spring-2028-career-fair",
      title: "Spring 2028 Career Fair Registration",
      dueDate: "March 3",
      sortDate: "2028-03-03",
      priority: "Low",
      consequence: "Missing this deadline may limit access to employer networking opportunities.",
      steps: [
        "Review career fair event details",
        "Update your resume",
        "Register through the campus career portal",
        "Save the event confirmation",
      ],
      resources: ["Canvas", "Counseling Appointments"],
    },
    {
      id: "spring-2028-final-plan-review",
      title: "Final Semester Plan Review Spring 2028",
      dueDate: "April 12",
      sortDate: "2028-04-12",
      priority: "High",
      consequence: "Missing this review may delay final graduation preparation.",
      steps: [
        "Review your saved semester plan",
        "Confirm all remaining requirements are accounted for",
        "Meet with an advisor if anything is unclear",
        "Save the final updated plan",
      ],
      resources: ["Degree Pathway", "Counseling Appointments"],
    },
  ],
};

const checklistItems = [
  "Review recommended semester classes",
  "Meet with advisor if unsure",
  "Review graduation requirements",
];

export default function Deadlines() {
  const [semester, setSemester] = useState("Fall 2026");
  const [checkedItems, setCheckedItems] = useState([]);
  const [completedDeadlines, setCompletedDeadlines] = useState({});
  const [selectedDeadline, setSelectedDeadline] = useState(null);
  const [detailChecklist, setDetailChecklist] = useState([]);
  const [showCompletionMessage, setShowCompletionMessage] = useState(false);

  const semesterDeadlines = deadlinesBySemester[semester] || [];
  const currentCompletedIds = completedDeadlines[semester] || [];

  const visibleDeadlines = semesterDeadlines
    .filter((deadline) => !currentCompletedIds.includes(deadline.id))
    .sort((a, b) => new Date(a.sortDate) - new Date(b.sortDate));

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

    setCompletedDeadlines((prev) => ({
      ...prev,
      [semester]: [...(prev[semester] || []), selectedDeadline.id],
    }));

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

          {visibleDeadlines.length > 0 ? (
            <div className="stack-lg">
              {visibleDeadlines.map((deadline) => (
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
            <p className="section-text">
              No upcoming deadlines for {semester}. Nice work!
            </p>
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
                  This deadline has been removed from your {semester} deadlines.
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
