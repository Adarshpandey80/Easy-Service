import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../Style/ShopOwner/ShopOwnerNavbar.css';

const Nav = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isWorkerOpen, setIsWorkerOpen] = useState(false);
  const location = useLocation();  

  return (
    <nav className="navbar">
      <div className="logo">
        <Link to="/owner">Service-Partner</Link>
      </div>

      <div className="hamburger" onClick={() => setIsOpen(!isOpen)}>
        ☰
      </div>

      <ul className={`nav-links ${isOpen ? "active" : ""}`}>
        <li className={location.pathname === "/" ? "active" : ""}>
          <Link to="/">Dashboard</Link>
        </li>
        <li className={location.pathname === "/career" ? "active" : ""}>
          <Link to="/services">My Services</Link>
        </li>

        {/* Workers Dropdown */}
        <li className={`dropdown ${location.pathname.startsWith("/workers") ? "active" : ""}`}>
          <span onClick={() => setIsWorkerOpen(!isWorkerOpen)}>Workers ▾</span>
          {isWorkerOpen && (
            <ul className="dropdown-menu">
              <li className={location.pathname === "/workers/add" ? "active" : ""}>
                <Link to="/owner/addworkerform">Add Worker</Link>
              </li>
              <li className={location.pathname === "/workers/list" ? "active" : ""}>
                <Link to="/owner/workerlist">Worker List</Link>
              </li>
              {/* <li className={location.pathname === "/workers/cards" ? "active" : ""}>
                <Link to="/workers/cards">Worker Cards</Link>
              </li> */}
            </ul>
          )}
        </li>

        <li className={location.pathname === "/orders" ? "active" : ""}>
          <Link to="/owner/orders">Orders</Link>
        </li>
        <li className={location.pathname === "/payment" ? "active" : ""}>
          <Link to="/owner/payment">Payment</Link>
        </li>
        <li className={location.pathname === "/messages" ? "active" : ""}>
          <Link to="/owner/messages">Message</Link>
        </li>
        <li className={location.pathname === "/profile" ? "active" : ""}>
          <Link to="/owner/profile">Profile</Link>
        </li>
        <li><Link to="/owner/logout">Logout</Link></li>
      </ul>
    </nav>
  );
};

export default Nav;
