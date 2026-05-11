import { Routes, Route } from "react-router-dom";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Forgotpw from "./pages/Forgotpw";
import Onboarding from "./pages/Onboarding";
import Tutorial from "./pages/Tutorial";
import Dashboard from "./pages/Dashboard";
import DegreePathway from "./pages/DegreePathway";
import SemesterPlanning from "./pages/SemesterPlanning";
import Calendar from "./pages/Calendar";
import Resources from "./pages/Resources";
import Profile from "./pages/Profile";
import Help from "./pages/Help";

import "./App.css";

function App() {
  return (
    <div className="app">
      <main className="content">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/forgot-password" element={<Forgotpw />} />
          <Route path="/onboarding" element={<Onboarding />} />
          <Route path="/tutorial" element={<Tutorial />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/degree-pathway" element={<DegreePathway />} />
          <Route path="/semester-planning" element={<SemesterPlanning />} />
          <Route path="/calendar" element={<Calendar />} />
          <Route path="/resources" element={<Resources />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/help" element={<Help />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;