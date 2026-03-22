import React from "react";
import "../Style/UserProfileDash.css";

function UserProfileDash() {
  // Dummy user data (replace with API later)
  const user = {
    name: "Adarsh Pandey",
    email: "adarsh@gmail.com",
    isVerified: false,
    phone: "9876543210"
  };

  const notifications = [
    "Your AC repair service is scheduled for tomorrow",
    "Payment received successfully",
    "New offers available near you"
  ];

  const orders = [
    { id: 1, service: "AC Repair", status: "Completed", date: "2026-03-10" },
    { id: 2, service: "Electrician", status: "Pending", date: "2026-03-15" },
    { id: 3, service: "Washing Machine Repair", status: "Cancelled", date: "2026-03-12" }
  ];

  return (
    <div className="dashboard">

      {/* Header */}
      <div className="dashboard-header">
        <h1>User Dashboard</h1>
        <p>Manage your account, orders, and services</p>
      </div>

      {/* Email Verification Alert */}
      {!user.isVerified && (
        <div className="verify-alert">
          ⚠️ Your email is not verified.
          <button className="verify-btn">Verify Now</button>
        </div>
      )}

      <div className="dashboard-grid">

        {/* User Info */}
        <div className="card profile-card">
          <h2>Profile Info</h2>
          <p><strong>Name:</strong> {user.name}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Phone:</strong> {user.phone}</p>
          <button className="edit-btn">Edit Profile</button>
        </div>

        {/* Notifications */}
        <div className="card">
          <h2>Notifications</h2>
          <ul className="notification-list">
            {notifications.map((note, index) => (
              <li key={index}>{note}</li>
            ))}
          </ul>
        </div>

        {/* Order History */}
        <div className="card orders-card">
          <h2>Order History</h2>
          <div className="orders-list">
            {orders.map((order) => (
              <div key={order.id} className="order-item">
                <h3>{order.service}</h3>
                <p>Date: {order.date}</p>
                <span className={`status ${order.status.toLowerCase()}`}>
                  {order.status}
                </span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}

export default UserProfileDash;