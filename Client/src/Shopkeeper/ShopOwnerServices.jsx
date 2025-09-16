import React, { useState } from "react";
import "../Style/ShopOwner/ShopOwnerServices.css";

const ShopOwnerServices = () => {
  const [services, setServices] = useState([
    { id: 1, name: "AC Repair", price: 500, status: "Active", icon: "❄️" },
    { id: 2, name: "Washing Machine Repair", price: 400, status: "Inactive", icon: "🌀" },
    { id: 3, name: "Fridge Repair", price: 450, status: "Active", icon: "🥶" },
    { id: 4, name: "Electrician Service", price: 300, status: "Active", icon: "⚡" },
  ]);

  const toggleStatus = (id) => {
    setServices(services.map(s =>
      s.id === id ? { ...s, status: s.status === "Active" ? "Inactive" : "Active" } : s
    ));
  };

  return (
    <div className="services-page">
      <div className="services-header">
        <h1>My Services</h1>
        <button className="add-btn">+ Add New Service</button>
      </div>

      <div className="services-grid">
        {services.map(service => (
          <div key={service.id} className="service-card">
            <div className="service-icon">{service.icon}</div>
            <h3>{service.name}</h3>
            <p>₹{service.price}</p>
            <span className={`status ${service.status.toLowerCase()}`}>
              {service.status}
            </span>
            <div className="actions">
              <button onClick={() => toggleStatus(service.id)}>
                {service.status === "Active" ? "Deactivate" : "Activate"}
              </button>
              <button>Edit</button>
              <button className="delete-btn">Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ShopOwnerServices;
