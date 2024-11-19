import { Link } from "@remix-run/react";

import Footer from "../components/footer";
import "app/styles/contacts.css";

export default function ContactPage() {
  return (
    <div>
        <header className="headerr">
          <img className="logo" src="app/assets/logo/sobremesa.svg" alt="Sobremesa Logo" />
          <h2 className="header-title">Sobremesa</h2>
        </header>
        <h1 className="title">Contact Us</h1>
      <div className="contact-container">
       
        <form className="contact-form">
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="first-name">First Name:</label>
              <input className="bgcolor" type="text" id="first-name" name="firstName" required />
            </div>
            <div className="form-group">
              <label htmlFor="last-name">Last Name:</label>
              <input className="bgcolor" type="text" id="last-name" name="lastName" required />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="email">Email:</label>
              <input  className="bgcolor" type="email" id="email" name="email" required />
            </div>
            <div className="form-group">
              <label htmlFor="phone">Phone Number:</label>
              <input className="bgcolor" type="tel" id="phone" name="phone" required />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="subject">Subject:</label>
              <input className="bgcolor" type="text" id="subject" name="subject" required />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group full-width">
              <label htmlFor="message">Message:</label>
              <textarea  className="bgcolor" id="message" name="message" rows={5} required></textarea>
            </div>
          </div>

          <button type="submit" className="submit-button">Submit</button>
        </form>
      </div>
      <Footer />
    </div>
  );
}
