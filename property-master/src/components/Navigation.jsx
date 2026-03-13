import React from "react";
import { Link } from "react-router-dom";
import { MdOutlineLightMode, MdOutlineDarkMode } from "react-icons/md";
import "./Navigation.css";

function Navigation({ theme, toggleTheme }) {
  return (
    <nav className="navigation-bar">
      <div className="nav-logo">
        <Link to="/">Grand Abode</Link>
      </div>

      <ul className="nav-links">
        <li className="nav-item">
          <Link to="/">Home</Link>
        </li>

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

        <li className="theme-toggle-item">
          <button
            className="theme-toggle-btn"
            onClick={toggleTheme}
            aria-label="Toggle Theme"
          >
            {theme === "dark" ? (
              <MdOutlineLightMode />
            ) : (
              <MdOutlineDarkMode />
            )}
          </button>
        </li>
      </ul>
    </nav>
  );
}

export default Navigation;
