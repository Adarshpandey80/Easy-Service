import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../Style/SuperAdmin/Navbar.css";

function SuperAdminNav() {

  const [profileOpen, setProfileOpen] = useState(false);

  return (
    <nav className="admin-navbar">

      {/* Logo */}
      <div className="admin-logo">
        <Link to="/admin/dashboard">Easy Service Admin</Link>
      </div>

      {/* Nav Links */}
      <ul className="admin-links">
        <li><Link to="/superadmin">Dashboard</Link></li>
        <li><Link to="/admin/users">Users</Link></li>
        <li><Link to="/admin/shops">Shop Owners</Link></li>
        <li><Link to="/admin/verifications">Verifications</Link></li>
        <li><Link to="/admin/services">Services</Link></li>
        <li><Link to="/admin/orders">Orders</Link></li>
        <li><Link to="/admin/payments">Payments</Link></li>
        <li><Link to="/admin/reports">Reports</Link></li>
      </ul>

      {/* Right Section */}
      <div className="admin-right">

        {/* Notifications */}
        <div className="admin-notification">
          🔔
        </div>

        {/* Profile Dropdown */}
        <div 
          className="admin-profile"
          onClick={() => setProfileOpen(!profileOpen)}
        >
          Admin ▾

          {profileOpen && (
            <div className="profile-menu">
              <Link to="/admin/profile">Profile</Link>
              <Link to="/admin/settings">Settings</Link>
              <Link to="/logout">Logout</Link>
            </div>
          )}

        </div>

      </div>

    </nav>
  );
}

export default SuperAdminNav;
