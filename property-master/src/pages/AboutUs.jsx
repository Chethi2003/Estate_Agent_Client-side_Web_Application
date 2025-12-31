import React from "react";
import "./AboutUs.css";
import Navigation from "../components/Navigation";
import Footer from "../components/Footer";

function AboutUs() {
  return (
    <>
      <Navigation />

      <div className="about-page">
        {/* HERO SECTION */}
        <section className="about-hero">
          <h1>About Us</h1>
          <p>
            Your trusted partner in finding the perfect home and making smart
            property investments.
          </p>
        </section>

        {/* ABOUT CONTENT */}
        <section className="about-content">
          <div className="about-text">
            <h2>Who We Are</h2>
            <p>
              PropertyMaster is a modern real estate platform dedicated to
              helping buyers, sellers, and renters make confident property
              decisions. With a strong focus on transparency, quality listings,
              and user experience, we aim to simplify the property journey.
            </p>

            <p>
              Whether you're searching for your first home, upgrading your
              lifestyle, or investing in property, our expert-driven approach
              ensures you always get the best value.
            </p>
          </div>

          <div className="about-highlights">
            <div className="highlight-card">
              <h3>🏡 500+</h3>
              <p>Verified Properties</p>
            </div>

            <div className="highlight-card">
              <h3>🤝 Trusted</h3>
              <p>By Thousands of Clients</p>
            </div>

            <div className="highlight-card">
              <h3>📍 UK Based</h3>
              <p>Local Market Experts</p>
            </div>
          </div>
        </section>

        {/* MISSION & VALUES */}
        <section className="about-mission">
          <h2>Our Mission</h2>
          <p>
            To connect people with properties they love by providing reliable
            information, expert insights, and a seamless digital experience.
          </p>

          <div className="values">
            <div className="value-card">
              <h4>Transparency</h4>
              <p>
                Clear property details, honest pricing, and no hidden surprises.
              </p>
            </div>

            <div className="value-card">
              <h4>Quality</h4>
              <p>
                Carefully curated listings that meet our high standards.
              </p>
            </div>

            <div className="value-card">
              <h4>Customer First</h4>
              <p>
                Your goals guide everything we do.
              </p>
            </div>
          </div>
        </section>
      </div>

      <Footer />
    </>
  );
}

export default AboutUs;
