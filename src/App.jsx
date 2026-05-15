import { Routes, Route } from "react-router-dom";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Forgotpw from "./pages/Forgotpw";
import Dashboard from "./pages/Dashboard";
import Onboarding from "./pages/Onboarding";
import Tutorial from "./pages/Tutorial";
import AllRemainingReq from "./pages/AllRemainingReq";
import Help from "./pages/Help";
import DegreePathway from "./pages/DegreePathway";
import Deadlines from "./pages/Deadlines";
import SemesterPlanning from "./pages/SemesterPlanning";
import Profile from "./pages/Profile";

import "./App.css";

function App() {
  return (
    <div className="app">

      <main className="content">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<Signup/>}/> 
          <Route path="/forgot-password" element={<Forgotpw/>}/>
          <Route path="/dashboard" element={<Dashboard/>} />
          <Route path="/onboarding" element={<Onboarding/>}/>
          <Route path="/tutorial" element={<Tutorial/>}/>
          <Route path="/degree-pathway" element={<DegreePathway />} />
          <Route path="/semester-planning" element={<SemesterPlanning />} />
          <Route path="/deadlines" element={<Deadlines />} />
          <Route path="/help" element={<Help />} />
          <Route path="/all-remaining-req" element={<AllRemainingReq />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;