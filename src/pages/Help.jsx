import BottomNavBar from "../components/Navbar";
import "../styles/mainpages.css";

const faqItems = [
  {
    question: "What is a prerequisite?",
    answer: "A prerequisite is a course you must complete before you can enroll in another course. For example, you need to pass Calculus I before taking Calculus II.",
  },
  {
    question: "How do I know if I'm on track to graduate?",
    answer: "Check your Degree Progress on the Dashboard. It shows your completed units and percentage toward graduation. You can also meet with an academic advisor for a detailed review.",
  },
  {
    question: "What should I do if I want to change my major?",
    answer: "Go to Degree Pathway and click 'Change Major'. The system will show you how the change affects your degree requirements. It's also recommended to meet with an advisor.",
  },
  {
    question: "How many units should I take per semester?",
    answer: "Full-time students typically take 12-15 units per semester. Taking 15 units per semester helps you graduate in 4 years. If you're working or need extra support, 12 units is considered full-time.",
  },
  {
    question: "Where can I get help if I'm struggling in a class?",
    answer: "Visit the Tutoring Center (Student Services Building, Room 150) or the Writing Center (Library, 2nd Floor). Both offer free support to all students.",
  },
  {
    question: "What is FAFSA and when should I apply?",
    answer: "FAFSA (Free Application for Federal Student Aid) is how you apply for financial aid. You should apply as soon as possible after October 1st for the following academic year.",
  },
];

export default function Help() {
  return (
    <div className="page">
      <main className="page-content">
        <h1 className="page-title">Help & FAQs</h1>
        <p className="page-subtitle">
          Common questions and answers to help you navigate university life
        </p>

        <section className="page-section" style={{ marginTop: "32px" }}>
          <div className="faq-list">
            {faqItems.map((item, index) => (
              <details key={index} className="faq-item">
                <summary className="faq-question">{item.question}</summary>
                <p className="faq-answer">{item.answer}</p>
              </details>
            ))}
          </div>
        </section>

        <section className="page-section">
          <h2 className="section-heading">Still Need Help?</h2>
          <p className="section-text">
            Contact the Academic Advising Center at (562) 985-4641 or visit Library, 3rd Floor during office hours.
          </p>
        </section>

        <div style={{ height: "clamp(80px, 18vw, 95px)" }} />
      </main>

      <BottomNavBar />
    </div>
  );
}