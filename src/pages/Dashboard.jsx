import BottomNavBar from "../components/Navbar";
import "../styles/mainpages.css";

export default function Dashboard() {
  const progressPercent = 45;

  return (
    <div className="page">
      <main className="page-content">
        <h1 className="page-title">Hi There</h1>

        <section style={styles.progressSection}>
          <h2 className="section-heading section-heading-light">
            Degree Progress
          </h2>

          <div style={styles.progressBarBackground}>
            <div
              style={{
                ...styles.progressBarFill,
                width: `${progressPercent}%`,
              }}
            />
            <span style={styles.progressText}>
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

            <button className="small-button">View Details</button>
          </div>
        </section>

        <section className="page-section">
          <h2 className="section-heading">Recommended Next Step</h2>

          <div className="section-row">
            <p className="section-text">Plan your Fall 2026 Semester</p>

            <button className="small-button">Start Planning</button>
          </div>
        </section>
      </main>

      <BottomNavBar />
    </div>
  );
}

const styles = {
  progressSection: {
    marginTop: "clamp(54px, 14vw, 105px)",
  },

  progressBarBackground: {
    width: "100%",
    height: "clamp(32px, 8vw, 45px)",
    backgroundColor: "rgba(117, 117, 117, 0.47)",
    borderRadius: "999px",
    position: "relative",
    overflow: "hidden",
  },

  progressBarFill: {
    height: "100%",
    backgroundColor: "#28ee81",
    borderRadius: "999px",
  },

  progressText: {
    position: "absolute",
    inset: 0,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "clamp(12px, 3vw, 15px)",
    fontWeight: 700,
  },
};