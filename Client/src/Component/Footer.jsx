import React from 'react'
import '../Style/Footer.css'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
   <>
  <footer className="footer">
      <div className="container footer-grid">
        
        {/* Column 1: Brand */}
        <div className="footer-col">
          <h2 className="footer-logo">⚡ EasyService</h2>
          <p className="footer-about">
            Find trusted electricians, AC repair, fridge repair, and other 
            service shops near you. Fast, reliable, and verified.
          </p>
        </div>

        {/* Column 2: Quick Links */}
        <div className="footer-col">
          <h3>Quick Links</h3>
          <ul className="footer-links">
            <li><Link to="/services">Services</Link></li>
            <li><Link to="/shops">Shops</Link></li>
            <li><Link to="/career">Career</Link></li>
            <li><Link to="/about">About Us</Link></li>
            <li><Link to="/contact">Contact</Link></li>
          </ul>
        </div>

        {/* Column 3: Contact */}
        <div className="footer-col">
          <h3>Contact</h3>
          <ul className="footer-links">
            <li>📍 Lucknow, India</li>
            <li>📞 +91 98765 43210</li>
            <li>✉️ support@easyservice.com</li>
          </ul>
        </div>

        {/* Column 4: Newsletter */}
        <div className="footer-col">
          <h3>Stay Updated</h3>
          <p className="newsletter-text">
            Subscribe to get updates on offers & new services.
          </p>
          <form className="newsletter-form">
            <input 
              type="email" 
              placeholder="Enter your email" 
              className="newsletter-input" 
              required 
            />
            <button type="submit" className="newsletter-btn">
              Subscribe
            </button>
          </form>
          <div className="footer-social">
            <a href="#"><i className="fab fa-facebook"></i></a>
            <a href="#"><i className="fab fa-twitter"></i></a>
            <a href="#"><i className="fab fa-instagram"></i></a>
            <a href="#"><i className="fab fa-linkedin"></i></a>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="footer-bottom">
        <p>© {new Date().getFullYear()} EasyService. All rights reserved.</p>
      </div>
    </footer>
    </>
  )
}

export default Footer