import React from "react";
import './Navigation.css';

function Navigation() {
    return (
        <nav className="navigation-bar">
            <div className="nav-logo">PropertyMaster</div>
            <ul className="nav-links">
                <li className="nav-item">Home</li>
                <li className="nav-item">Search</li>
                <li className="nav-item">Favourites</li>
                <li className="nav-item">Contact</li>
            </ul>
        </nav>
    );
}

export default Navigation;