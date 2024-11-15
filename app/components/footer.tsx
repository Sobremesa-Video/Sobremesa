import React from 'react';
import { Link } from '@remix-run/react';
import './footerCSS.css'; // Import the CSS file for styling


export default function Footer() {
  return (
    <footer className="footer-bottom">
      <div className="footer-container">
        {/* Logo and Branding */}
        <div className="footer-branding">
          <img
            className="footer-logo"
            alt="Sobremesa Logo"
            src="app/assets/logo/sobremesa.svg"
            
          />
          <h3 className="footer-title"><Link to="/">SOBREMESA</Link></h3>
        </div>

        {/* Footer Icons */}
        <div className="footer-icons">
          <div className="icon-wrapper">
            <Link to="/faq">
            <img
              className="icon"
              alt="Help Icon"
              src="app/assets/footericons/Help.png"
            /></Link>
          </div>
          <div className="icon-wrapper">
            <Link to="/accessibility">
            <img
              className="icon"
              alt="Letter Icon"
              src="app/assets/footericons/Letter.png"
            /></Link>
          </div>
          <div className="icon-wrapper">
            <img
              className="icon"
              alt="Accessibility Icon"
              src="app/assets/footericons/accessibility.png"
            />
          </div>
        </div>
      </div>
    </footer>
  );
};
