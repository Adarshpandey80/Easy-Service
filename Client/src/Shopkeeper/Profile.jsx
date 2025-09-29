import React, { useState } from "react";
import "../Style/ShopOwner/Profile.css";

const ShopOwnerProfile = () => {
  const [showSettings, setShowSettings] = useState(false);
  const [activeTab, setActiveTab] = useState("general");

  const profile = {
    ownerName: "Adarsh Pandey",
    role: "Shop Owner",
    email: "adarsh@example.com",
    phone: "+91 9876543210",
    address: "Lucknow, Uttar Pradesh, India",
    joined: "2023-06-15",
    shopName: "Adarsh Services",
    businessId: "GSTIN-2345XYZ",
    services: ["AC Repair", "Fridge Repair", "Electrician"],
    lastLogin: "2025-09-28 09:32 AM",
    totalOrders: 350,
    completedOrders: 320,
    earnings: "₹2,40,000",
    rating: "4.7 / 5",
  };

  return (
    <div className="profile-page">
      {/* Header */}
      <div className="profile-header">
        <div className="profile-info">
          <img
            src="https://via.placeholder.com/100"
            alt="Owner"
            className="profile-avatar"
          />
          <div>
            <h2>{profile.ownerName}</h2>
            <p>{profile.role}</p>
            <p><strong>Shop:</strong> {profile.shopName}</p>
            <p>{profile.email}</p>
          </div>
        </div>
        <div className="profile-actions">
          <button className="edit-btn">Edit Profile</button>
          <button className="settings-btn" onClick={() => setShowSettings(true)}>⚙ Settings</button>
        </div>
      </div>

      {/* Content Grid */}
      <div className="profile-grid">
        {/* Personal Info */}
        <div className="profile-card">
          <h3>Personal Information</h3>
          <p><strong>Name:</strong> {profile.ownerName}</p>
          <p><strong>Phone:</strong> {profile.phone}</p>
          <p><strong>Address:</strong> {profile.address}</p>
          <p><strong>Joined:</strong> {profile.joined}</p>
        </div>

        {/* Business Info */}
        <div className="profile-card">
          <h3>Business Information</h3>
          <p><strong>Shop:</strong> {profile.shopName}</p>
          <p><strong>Business ID:</strong> {profile.businessId}</p>
          <p><strong>Services:</strong></p>
          <div className="services-tags">
            {profile.services.map((service, i) => (
              <span key={i} className="service-tag">{service}</span>
            ))}
          </div>
        </div>

        {/* Performance */}
        <div className="profile-card stats-card">
          <h3>Performance</h3>
          <div className="stats-grid">
            <div className="stat-item">
              <h4>{profile.totalOrders}</h4>
              <p>Total Orders</p>
            </div>
            <div className="stat-item">
              <h4>{profile.completedOrders}</h4>
              <p>Completed</p>
            </div>
            <div className="stat-item">
              <h4>{profile.earnings}</h4>
              <p>Earnings</p>
            </div>
            <div className="stat-item">
              <h4>{profile.rating}</h4>
              <p>Customer Rating</p>
            </div>
          </div>
        </div>

        {/* Security */}
        <div className="profile-card">
          <h3>Security</h3>
          <p><strong>Last Login:</strong> {profile.lastLogin}</p>
          <button className="change-pass-btn">Change Password</button>
          <button className="twofa-btn">Enable 2FA</button>
        </div>
      </div>

      {/* Settings Modal */}
      {showSettings && (
        <div className="settings-modal-overlay">
          <div className="settings-modal">
            <div className="settings-header">
              <h2>Profile Settings</h2>
              <button className="close-btn" onClick={() => setShowSettings(false)}>✖</button>
            </div>

            {/* Tabs */}
            <div className="settings-tabs">
              <button
                className={activeTab === "general" ? "active" : ""}
                onClick={() => setActiveTab("general")}
              >
                General
              </button>
              <button
                className={activeTab === "notifications" ? "active" : ""}
                onClick={() => setActiveTab("notifications")}
              >
                Notifications
              </button>
              <button
                className={activeTab === "preferences" ? "active" : ""}
                onClick={() => setActiveTab("preferences")}
              >
                Preferences
              </button>
              <button
                className={activeTab === "security" ? "active" : ""}
                onClick={() => setActiveTab("security")}
              >
                Security
              </button>
            </div>

            {/* Tab Content */}
            <div className="settings-content">
              {activeTab === "general" && (
                <div>
                  <h3>Edit General Info</h3>
                  <label>Name: <input type="text" defaultValue={profile.ownerName} /></label>
                  <label>Email: <input type="email" defaultValue={profile.email} /></label>
                  <button className="save-btn">Save Changes</button>
                </div>
              )}
              {activeTab === "notifications" && (
                <div>
                  <h3>Notifications</h3>
                  <label><input type="checkbox" defaultChecked /> Email Alerts</label>
                  <label><input type="checkbox" /> SMS Alerts</label>
                </div>
              )}
              {activeTab === "preferences" && (
                <div>
                  <h3>Preferences</h3>
                  <label>Theme:
                    <select>
                      <option>Light</option>
                      <option>Dark</option>
                    </select>
                  </label>
                </div>
              )}
              {activeTab === "security" && (
                <div>
                  <h3>Security Settings</h3>
                  <div className="security-actions-btns">
                     <button className="change-pass-btn">Change Password</button>
                  <button className="twofa-btn">Enable 2FA</button>
                  </div>
                 
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ShopOwnerProfile;
