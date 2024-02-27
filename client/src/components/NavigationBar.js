import React from 'react';
import { Link } from 'react-router-dom';
import './NavigationBar.css'; // Import the CSS file here

const NavigationBar = () => {
  return (
    <nav className="navbar"> {/* Add the class name here */}
      <Link to="/">Home</Link>
      <Link to="/login">Login</Link>
  </nav>
  );
};

export default NavigationBar;
