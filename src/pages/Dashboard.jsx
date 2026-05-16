import BottomNavBar from "../components/Navbar";
import "../styles/mainpages.css";
import { useNavigate } from "react-router-dom";
import AppButton from "../components/AppButton";

export default function Dashboard() {
  const progressPercent = 45;
  const navigate = useNavigate();

  return (
    <div className="page">
      <main className="page-content">
        <h1 className="page-title">Dashboard</h1>

        <section className="progress-section">
          <h2 className="section-heading">
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

            <AppButton
              variant="small"
              onClick={() => navigate("/deadlines")}
              ariaLabel="View deadline details"
            >
              View Details
            </AppButton>
          </div>
        </section>

        <section className="page-section">
          <h2 className="section-heading">Recommended Next Step</h2>

          <div className="section-row">
            <p className="section-text">Plan your Fall 2026 Semester</p>

            <AppButton
              variant="small"
              onClick={() => navigate("/semester-planning")}
              ariaLabel="Start semester planning"
            >
              Start Planning
            </AppButton>
          </div>
        </section>
      </main>

      <BottomNavBar />
    </div>
  );
}
