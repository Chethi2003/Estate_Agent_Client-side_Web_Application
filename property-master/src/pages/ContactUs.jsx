import React from "react";
import "./ContactUs.css";
import Navigation from "../components/Navigation";
import Footer from "../components/Footer";
import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope } from "react-icons/fa";

function ContactUs() {
  return (
    <>
      <Navigation />

      <div className="contact-page">
        {/* hero */}
        <section className="contact-hero">
          <h1>Contact Us</h1>
          <p>
            Have questions? Our team is here to help you find your perfect
            property.
          </p>
        </section>

        {/* content */}
        <section className="contact-content">
          {/* info */}
          <div className="contact-info">
            <h2>Get in Touch</h2>

            <div className="info-item">
              <FaMapMarkerAlt className="contact-icon" />
              <div>
                <h4>Address</h4>
                <p>Petts Wood Road, Orpington BR5, UK</p>
              </div>
            </div>

            <div className="info-item">
              <FaPhoneAlt className="contact-icon" />
              <div>
                <h4>Phone</h4>
                <p>+44 20 1234 5678</p>
              </div>
            </div>

            <div className="info-item">
              <FaEnvelope className="contact-icon" />
              <div>
                <h4>Email</h4>
                <p>contact@propertymaster.co.uk</p>
              </div>
            </div>
          </div>

          {/* form */}
          <div className="contact-form">
            <h2>Send a Message</h2>

            <form>
              <input type="text" placeholder="Full Name" />
              <input type="email" placeholder="Email Address" />
              <textarea rows="5" placeholder="Your Message"></textarea>
              <button type="submit">Send Message</button>
            </form>
          </div>
        </section>
      </div>

      <Footer />
    </>
  );
}

export default ContactUs;
