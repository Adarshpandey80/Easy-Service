import React from 'react'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import '../Style/Navbar.css'



const Nav = () => {
    const [isOpen, setIsOpen] = useState(false);
  return (
   <>
   <nav className="navbar">
      {/* Logo */}
      <div className="logo">
        <Link to="/"> Easy-Service-Partner</Link>
      </div>

      {/* Hamburger for mobile */}
      <div className="hamburger" onClick={() => setIsOpen(!isOpen)}>
        ☰
      </div>

      {/* Nav links */}
      <ul className={`nav-links ${isOpen ? "active" : ""}`}>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/career">Career</Link></li>
        <li><Link to="/login">Login</Link></li>
        
      </ul>
    </nav>
   </>
  )
}

export default Nav