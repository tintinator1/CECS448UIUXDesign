import BottomNavBar from "../components/Navbar";
import BackButton from "../components/BackButton";
import "../styles/mainpages.css";

const remainingCourses = [
  { code: "CECS 277", name: "Object-Oriented Programming", units: 3 },
  { code: "CECS 323", name: "Database Fundamentals", units: 3 },
  { code: "CECS 326", name: "Operating Systems", units: 3 },
  { code: "CECS 328", name: "Algorithms", units: 3 },
  { code: "CECS 343", name: "Software Engineering", units: 3 },
  { code: "CECS 448", name: "User Interface Design", units: 3 },
  { code: "PHYS 151", name: "Physics I", units: 3 },
  { code: "CECS 378", name: "Introduction to Computer Security", units: 3 },
  { code: "CECS 491A", name: "Senior Project I", units: 3 },
  { code: "CECS 491B", name: "Senior Project II", units: 3 },
];

export default function AllRemainingReq() {

  return (
    <div className="page">
      <main className="page-content">
        <h1 className="page-title">All Remaining Requirements</h1>

        <section className="page-section">
          <h2 className="section-heading">Remaining Courses</h2>

          <div className="course-list">
            {remainingCourses.map((course, index) => (
              <div key={index} className="course-item content-card remaining">
                <div className="course-check empty">○</div>

                <div className="course-info">
                  <div className="course-code">{course.code}</div>
                  <div className="course-name">{course.name}</div>
                </div>

                <div className="course-units">{course.units} units</div>
              </div>
            ))}
          </div>
        </section>

        <div className="page-action">
          <BackButton to="/degree-pathway" ariaLabel="Go back to degree pathway">
            Back
          </BackButton>
        </div>
      </main>

      <BottomNavBar />
    </div>
  );
}