import React from "react";
import { Link } from "react-router-dom";
import "./Navigation.css";

function Navigation() {
  return (
    <nav className="navigation-bar">
      <div className="nav-logo">
        <Link to="/">Grand Abode</Link>
      </div>

      <ul className="nav-links">
        <li className="nav-item">
          <Link to="/">Home</Link>
        </li>

        {/*Scrolls to search panel */}
        <li className="nav-item">
          <Link to="/#search">Search</Link>
        </li>

        <li className="nav-item">
          <Link to="/about">About Us</Link>
        </li>

        <li className="nav-item">
          <Link to="/search">Properties</Link>
        </li>

        <li className="nav-item">
          <Link to="/contact">Contact Us</Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navigation;
