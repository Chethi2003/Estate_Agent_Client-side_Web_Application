import React from "react";
import "./ContactUs.css";
import Navigation from "../components/Navigation";
import Footer from "../components/Footer";

function ContactUs() {
  return (
    <>
      <Navigation />

      <div className="contact-page">
        {/* HERO */}
        <section className="contact-hero">
          <h1>Contact Us</h1>
          <p>
            Have a question about a property or need expert advice?  
            We’re here to help you every step of the way.
          </p>
        </section>

        {/* CONTENT */}
        <section className="contact-content">
          {/* CONTACT INFO */}
          <div className="contact-info">
            <h2>Get in Touch</h2>
            <p>
              Reach out to us using the details below or send us a message using
              the form.
            </p>

            <div className="info-item">
              <span>📍</span>
              <div>
                <h4>Address</h4>
                <p>Petts Wood Road, Orpington BR5, UK</p>
              </div>
            </div>

            <div className="info-item">
              <span>📞</span>
              <div>
                <h4>Phone</h4>
                <p>+44 20 1234 5678</p>
              </div>
            </div>

            <div className="info-item">
              <span>✉️</span>
              <div>
                <h4>Email</h4>
                <p>contact@propertymaster.co.uk</p>
              </div>
            </div>
          </div>

          {/* CONTACT FORM */}
          <div className="contact-form">
            <h2>Send a Message</h2>

            <form>
              <div className="form-group">
                <label>Full Name</label>
                <input type="text" placeholder="John Doe" />
              </div>

              <div className="form-group">
                <label>Email Address</label>
                <input type="email" placeholder="john@example.com" />
              </div>

              <div className="form-group">
                <label>Message</label>
                <textarea rows="5" placeholder="Write your message here..." />
              </div>

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
