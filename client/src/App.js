// client/src/App.js
import React from "react";
import NavigationBar from "./components/NavigationBar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./components/HomePage";
import LoginPage from "./components/LoginPage";
import RegisterPage from "./components/RegisterPage";

function App() {
  return (
    <Router>
      <NavigationBar /> {/* NavigationBar is placed here to be visible on all pages */}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Routes>
    </Router>
  );
}

export default App;
