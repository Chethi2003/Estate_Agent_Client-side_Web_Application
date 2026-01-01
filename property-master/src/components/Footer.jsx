import React from "react";
import "./Footer.css";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
  FaEnvelope,
  FaPhoneAlt,
  FaMapMarkerAlt,
} from "react-icons/fa";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Brand */}
        <div className="footer-section">
          <h3>PropertyMaster</h3>
          <p>
            Helping you find the perfect home with confidence, transparency,
            and trust.
          </p>
        </div>

        {/* Quick Links */}
        <div className="footer-section">
          <h4>Quick Links</h4>
          <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/search">Properties</a></li>
            <li><a href="/about">About Us</a></li>
            <li><a href="/contact">Contact Us</a></li>
          </ul>
        </div>

        {/* Contact info */}
        <div className="footer-section">
          <h4>Contact</h4>
          <p><FaMapMarkerAlt /> Petts Wood Road, Orpington BR5</p>
          <p><FaPhoneAlt /> +44 20 1234 5678</p>
          <p><FaEnvelope /> contact@propertymaster.co.uk</p>
        </div>

        {/* Social */}
        <div className="footer-section">
          <h4>Follow Us</h4>
          <div className="social-icons">
            <a href="#"><FaFacebookF /></a>
            <a href="#"><FaTwitter /></a>
            <a href="#"><FaInstagram /></a>
            <a href="#"><FaLinkedinIn /></a>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="footer-bottom">
        <p>© 2024 Property Master. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;
