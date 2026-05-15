import { useState } from "react";
import BottomNavBar from "../components/Navbar";
import SemesterSelector from "../components/SemesterSelector";
import "../styles/mainpages.css";
import { Link } from "react-router-dom";

const deadlines = [
  {
    title: "Financial Aid Application Fall 2026",
    dueDate: "March 15",
    priority: "High",
  },
  {
    title: "Apply For Graduation Spring 2027",
    dueDate: "October 10",
    priority: "Medium",
  },
  {
    title: "Register for Fall 2026 Classes",
    dueDate: "April 20",
    priority: "High",
  },
];

const checklistItems = [
  "Review recommended semester classes",
  "Meet with advisor if unsure",
  "Review graduation requirements",
];

export default function Calendar() {
  const [semester, setSemester] = useState("Fall 2026");
  const [checkedItems, setCheckedItems] = useState([]);

  const toggleChecklistItem = (item) => {
    setCheckedItems((prev) =>
      prev.includes(item)
        ? prev.filter((checkedItem) => checkedItem !== item)
        : [...prev, item]
    );
  };

  return (
    <div className="page">
      <main className="page-content calendar-page-content">
        <h1 className="page-title calendar-title">Deadlines</h1>

        <SemesterSelector value={semester} onChange={setSemester} />

        <section className="page-section">
          <h2 className="section-heading">Upcoming Deadlines</h2>

          <div className="calendar-deadline-list">
            {deadlines.map((deadline) => (
              <div key={deadline.title} className="section-row calendar-deadline-row">
                <p className="section-text">
                  {deadline.title}
                  <br />
                  Due: {deadline.dueDate}
                  <br />
                  Priority: {deadline.priority}
                </p>

                <button className="small-button">
                  View Details
                </button>
              </div>
            ))}
          </div>
        </section>

        <section className="calendar-section checklist-preview-section">
          <h2 className="section-heading">Helpful Checklist</h2>

          <div className="calendar-checklist-list">
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

        <Link to="/help" className="helpful-resources-link">
          View helpful resources
        </Link>
      </main>

      <BottomNavBar />
    </div>
  );
}
