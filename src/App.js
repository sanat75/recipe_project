import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import FunctionPage from "./pages/FunctionPage";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/function" element={<FunctionPage />} />
      </Routes>
    </Router>
  );
};

export default App;
