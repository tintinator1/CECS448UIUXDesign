import { useState } from "react";
import BottomNavBar from "../components/Navbar";
import "../styles/mainpages.css";

const helpfulLinks = [
  {
    title: "Financial Aid Website",
    description: "View financial aid information, deadlines, and application details.",
    url: "#",
  },
  {
    title: "Canvas",
    description: "Access your courses, assignments, grades, and class announcements.",
    url: "#",
  },
  {
    title: "Student Center",
    description: "Check enrollment, registration, holds, fees, and academic records.",
    url: "#",
  },
  {
    title: "Tutoring",
    description: "Find tutoring support for classes, writing, math, and study skills.",
    url: "#",
  },
  {
    title: "Counseling Appointments",
    description: "Schedule appointments with academic, career, or personal counselors.",
    url: "#",
  },
];

export default function Help() {
  const [showRedirectModal, setShowRedirectModal] = useState(false);

  const handleLinkClick = (e, url) => {
    e.preventDefault();

    setShowRedirectModal(true);

    setTimeout(() => {
      setShowRedirectModal(false);
    }, 2000);
  };

  return (
    <div className="page">
      <main className="page-content">
        <h1 className="page-title">Helpful Resources</h1>

        <section className="page-section">
          <h2 className="section-heading">Campus Links</h2>

          <div className="stack-lg">
            {helpfulLinks.map((link) => (
              <div key={link.title} className="help-link-item">
                <a
                  href={link.url}
                  className="text-link help-link-title"
                  onClick={(e) => handleLinkClick(e, link.url)}
                >
                  {link.title}
                </a>

                <p className="help-link-description">
                  {link.description}
                </p>
              </div>
            ))}
          </div>
        </section>
      </main>

      {showRedirectModal && (
        <div className="modal-overlay" role="dialog" aria-modal="true">
          <div className="modal-content redirect-modal">
            <h2 className="modal-title">Redirecting...</h2>
            <p className="redirect-modal-text">
              Please wait while we send you to the selected resource.
            </p>
          </div>
        </div>
      )}

      <BottomNavBar />
    </div>
  );
}
