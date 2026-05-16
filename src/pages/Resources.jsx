import BottomNavBar from "../components/Navbar";
import "../styles/mainpages.css";

const resources = [
  {
    category: "Academic Support",
    items: [
      { name: "Academic Advising Center", location: "Library, 3rd Floor", contact: "(562) 985-4641" },
      { name: "Tutoring Center", location: "Student Services Building, Room 150", contact: "tutoring@university.edu" },
      { name: "Writing Center", location: "Library, 2nd Floor", contact: "(562) 985-5162" },
    ],
  },
  {
    category: "Financial Aid",
    items: [
      { name: "Financial Aid Office", location: "Student Services Building, Room 201", contact: "(562) 985-4641" },
      { name: "Scholarship Office", location: "Administration Building, Room 110", contact: "scholarships@university.edu" },
    ],
  },
  {
    category: "Student Wellness",
    items: [
      { name: "Counseling & Psychological Services", location: "Student Health Center, 2nd Floor", contact: "(562) 985-4001" },
      { name: "Student Health Center", location: "1250 Bellflower Blvd", contact: "(562) 985-4771" },
      { name: "Career Development Center", location: "Career Center Building", contact: "(562) 985-4506" },
    ],
  },
  {
    category: "Technical Support",
    items: [
      { name: "IT Help Desk", location: "Library, 1st Floor", contact: "helpdesk@university.edu" },
      { name: "Student Portal Support", location: "Online Support", contact: "(562) 985-4505" },
    ],
  },
];

export default function Resources() {
  return (
    <div className="page">
      <main className="page-content">
        <h1 className="page-title">Campus Resources</h1>
        <p className="page-subtitle">
          Find support services and helpful resources to succeed in your academic journey
        </p>

        {resources.map((section, index) => (
          <section key={index} className="page-section">
            <h2 className="section-heading">{section.category}</h2>
            <div className="resource-grid">
              {section.items.map((item, idx) => (
                <div key={idx} className="resource-card">
                  <h3 className="resource-name">{item.name}</h3>
                  <p className="resource-detail">📍 {item.location}</p>
                  <p className="resource-detail">📞 {item.contact}</p>
                </div>
              ))}
            </div>
          </section>
        ))}

        <div style={{ height: "clamp(80px, 18vw, 95px)" }} />
      </main>

      <BottomNavBar />
    </div>
  );
}
