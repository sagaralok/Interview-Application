import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from "./components/Signup";
import Login from "./components/Login";
import CandiateTable from "./components/Candidate/CandidateTable";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Register />} />
        <Route path="/candidates" element={<CandiateTable />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
