// client/src/App.js
import React from "react";
import Header from "./components/Header"; // Updated from NavigationBar to Header
import Footer from "./components/Footer"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./components/HomePage";
import LoginPage from "./components/LoginPage";
import RegisterPage from "./components/RegisterPage";

function App() {
  return (
    <Router>
      <Header /> {/* Updated to Header */}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Routes>
      <Footer /> {/* Footer is placed here to be visible on all pages */}
    </Router>
  );
}

export default App;
