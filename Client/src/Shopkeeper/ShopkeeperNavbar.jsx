import React, { useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../Style/ShopOwner/ShopOwnerNavbar.css';

const Nav = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isWorkerOpen, setIsWorkerOpen] = useState(false);
  const location = useLocation();
  const workerDropdownRef = useRef(null);

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (workerDropdownRef.current && !workerDropdownRef.current.contains(event.target)) {
        setIsWorkerOpen(false);
      }
    };

    document.addEventListener('mousedown', handleOutsideClick);
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, []);

  useEffect(() => {
    setIsWorkerOpen(false);
    setIsOpen(false);
  }, [location.pathname]);


  const checkToken = localStorage.getItem("shopowner");

  const logout = () => {
    localStorage.removeItem("shopowner");
    window.location.href = "shopOwnerLoginForm";
  };
  return (
    <>
      {checkToken ? (
        <nav className="navbar">
      <div className="logo">
        <Link to="/owner/dashboard">Service-Partner</Link>
      </div>

      <div className="hamburger" onClick={() => setIsOpen(!isOpen)}>
        ☰
      </div>

      <ul className={`nav-links ${isOpen ? "active" : ""}`}>
        <li className={location.pathname === "/owner/dashboard" ? "active" : ""}>
          <Link to="/owner/dashboard">Dashboard</Link>
        </li>
        <li className={location.pathname === "/owner/services" ? "active" : ""}>
          <Link to="/owner/services">My Services</Link>
        </li>

        {/* Workers Dropdown */}
        <li ref={workerDropdownRef} className={`dropdown ${location.pathname.startsWith("/workers") ? "active" : ""}`}>
          <span onClick={() => setIsWorkerOpen(!isWorkerOpen)}>Workers ▾</span>
          {isWorkerOpen && (
            <ul className="dropdown-menu">
              <li className={location.pathname === "/workers/add" ? "active" : ""}>
                <Link to="/owner/addworkerform" onClick={() => setIsWorkerOpen(false)}>Add Worker</Link>
              </li>
              <li className={location.pathname === "/workers/list" ? "active" : ""}>
                <Link to="/owner/workerlist" onClick={() => setIsWorkerOpen(false)}>Worker List</Link>
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
        <li className={location.pathname === "/kyc" ? "active" : ""}>
          <Link to="/owner/kyc">KYC</Link>
        </li>
        <li><Link to="/owner/logout" onClick={logout}>Logout</Link></li>
      </ul>
        </nav>
      ) : (
        <nav className="navbar">
          <div className="logo">
            <Link to="/">Service-Partner</Link>
          </div>

          <div className="hamburger" onClick={() => setIsOpen(!isOpen)}>
            ☰
          </div>

          <ul className={`nav-links ${isOpen ? "active" : ""}`}>
            <li><Link to="/owner/ShopOwnerLoginForm">Login</Link></li>
            <li><Link to="/owner/shopkeeperSignup">Sign Up</Link></li>
          </ul>
        </nav>
      )}
    </>
  );
};

export default Nav;
