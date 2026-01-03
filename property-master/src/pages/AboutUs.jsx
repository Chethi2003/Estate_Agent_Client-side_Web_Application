import React from "react";
import "./AboutUs.css";
import Navigation from "../components/Navigation";
import Footer from "../components/Footer";
import { FaHome, FaHandshake, FaMapMarkerAlt } from "react-icons/fa";

function AboutUs() {
  return (
    <>
      <Navigation />

      <div className="about-page">
        {/* HERO */}
        <section className="about-hero">
          <h1>About Us</h1>
          <p>
            Your trusted partner in property buying, selling, and investing.
          </p>
        </section>

        {/* content */}
        <section className="about-content">
          <div className="about-text">
            <h2>Who We Are</h2>
            <p>
              Grand Abode is a modern real estate platform designed to make
              property discovery simple, transparent, and reliable.
            </p>
            <p>
              From first-time buyers to experienced investors, we help people
              make confident property decisions through expert insight and
              quality listings.
            </p>
          </div>

          <div className="about-highlights">
            <div className="highlight-card">
              <FaHome className="about-icon" />
              <h3>500+</h3>
              <p>Verified Properties</p>
            </div>

            <div className="highlight-card">
              <FaHandshake className="about-icon" />
              <h3>Trusted</h3>
              <p>By Thousands of Clients</p>
            </div>

            <div className="highlight-card">
              <FaMapMarkerAlt className="about-icon" />
              <h3>UK Based</h3>
              <p>Local Market Experts</p>
            </div>
          </div>
        </section>

        {/* mission */}
        <section className="about-mission">
          <h2>Our Mission</h2>
          <p>
            To connect people with homes they love by providing accurate
            information, honest pricing, and a seamless digital experience.
          </p>
        </section>
      </div>

      <Footer />
    </>
  );
}

export default AboutUs;
