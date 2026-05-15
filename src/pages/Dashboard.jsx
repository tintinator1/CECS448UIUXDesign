import BottomNavBar from "../components/Navbar";
import "../styles/mainpages.css";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const progressPercent = 45;
  const navigate = useNavigate();

  return (
    <div className="page">
      <main className="page-content">
        <h1 className="page-title">Dashboard</h1>

        <section className="progress-section">
          <h2 className="section-heading section-heading-light">
            Degree Progress
          </h2>

          <div className="progress-bar-background">
            <div
              className="progress-bar-fill"
              style={{ width: `${progressPercent}%` }}
            />
            <span className="progress-bar-text">
              {progressPercent}% Complete
            </span>
          </div>
        </section>

        <section className="page-section">
          <h2 className="section-heading">Upcoming Deadline</h2>

          <div className="section-row">
            <p className="section-text">
              Financial Aid Application Fall 2026
              <br />
              Due: March 15
            </p>

            <button
              className="small-button"
              onClick={() => navigate("/calendar")}
            >
              View Details
            </button>
          </div>
        </section>

        <section className="page-section">
          <h2 className="section-heading">Recommended Next Step</h2>

          <div className="section-row">
            <p className="section-text">Plan your Fall 2026 Semester</p>

            <button
              className="small-button"
              onClick={() => navigate("/semester-planning")}
            >
              Start Planning
            </button>
          </div>
        </section>
      </main>

      <BottomNavBar />
    </div>
  );
}
