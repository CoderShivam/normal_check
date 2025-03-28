import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css"; // Link to the custom CSS file

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <ul className="navbar-links">
          
          
          <li>
            <Link to="/login" className="navbar-link">
              Login
            </Link>
          </li>
          {/* <li>
            <Link to="/arena" className="navbar-link">
              Arena
            </Link>
          </li> */}
          <li>
            <Link to="/register" className="navbar-link">
              Register
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
