import React from "react";
import { Link } from "react-router-dom";
import "./Navigation.css";

function Navigation() {
  return (
    <nav className="navigation-bar">
      <div className="nav-logo">
        <Link to="/">PropertyMaster</Link>
      </div>

      <ul className="nav-links">
        <li className="nav-item">
          <Link to="/">Home</Link>
        </li>

        <li className="nav-item">
          <Link to="/search">Properties</Link>
          
        </li>

        <li className="nav-item">
          <Link to="/contact">Contact</Link>
        </li>

        <li className="nav-item">
          <Link to="/signin">Sign in</Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navigation;
