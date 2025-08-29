import React from 'react'
import '../Style/Footer.css'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
   <>
  <footer className="footer">
      <div className="container footer-grid">
        {/* Column 1: Brand */}
        <div>
          <h2 className="footer-logo">⚡ WorkConnect</h2>
          <p className="footer-about">
            Find trusted electricians, technicians, and service shops near you.
            Fast, reliable, and verified.
          </p>
        </div>

        {/* Column 2: Quick Links */}
        <div>
          <h3>Quick Links</h3>
          <ul className="footer-links">
            <li><Link to="/services">Services</Link></li>
            <li><Link to="/shops">Shops</Link></li>
            <li><Link to="/about">About Us</Link></li>
            <li><Link to="/contact">Contact</Link></li>
          </ul>
        </div>

        {/* Column 3: Contact */}
        <div>
          <h3>Contact</h3>
          <ul className="footer-links">
            <li>📍 Lucknow, India</li>
            <li>📞 +91 98765 43210</li>
            <li>✉️ support@workconnect.com</li>
          </ul>
        </div>

        {/* Column 4: Social */}
        <div>
          <h3>Follow Us</h3>
          <div className="footer-social">
            <Link to="#"><i className="fab fa-facebook"></i></Link>
            <Link to="#"><i className="fab fa-twitter"></i></Link>
            <Link to="#"><i className="fab fa-instagram"></i></Link>
            <Link to="#"><i className="fab fa-linkedin"></i></Link>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="footer-bottom">
        <p>© {new Date().getFullYear()} WorkConnect. All rights reserved.</p>
      </div>
    </footer>
   </>
  )
}

export default Footer