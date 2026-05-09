import { Routes, Route } from "react-router-dom";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import "./App.css";

function App() {
  return (
    <div className="app">

      <main className="content">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<Signup/>}/> 
          {/*<Route path="/dashboard" element={<Dashboard/>} />
          <Route path="/degree-pathway" element={<DegreePathway />} />
          <Route path="/semester-planning" element={<SemesterPlanning />} />
          <Route path="/calendar" element={<Calendar />} />
          <Route path="/help" element={<Help />} />*/}
        </Routes>
      </main>
    </div>
  );
}

export default App;