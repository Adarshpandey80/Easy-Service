import React from "react";
import "../Style/SuperAdmin/AdminDashboard.css";

function AdminDashboard() {

  const stats = [
    { title: "Total Users", value: "2,145", icon: "👤" },
    { title: "Total Shops", value: "320", icon: "🏪" },
    { title: "Orders Today", value: "86", icon: "📦" },
    { title: "Revenue Today", value: "₹24,500", icon: "💰" },
  ];

  const pendingShops = [
    { name: "Rahul AC Repair", owner: "Rahul Sharma", status: "Pending" },
    { name: "Priya Electric Works", owner: "Priya Singh", status: "Pending" },
    { name: "Rakesh Plumbing", owner: "Rakesh Yadav", status: "Pending" },
  ];

  return (
    <div className="admin-dashboard">

      <h1 className="dashboard-title">Super Admin Dashboard</h1>

      
      <div className="stats-container">
        {stats.map((item, index) => (
          <div className="stat-card" key={index}>
            <div className="stat-icon">{item.icon}</div>
            <div>
              <h3>{item.value}</h3>
              <p>{item.title}</p>
            </div>
          </div>
        ))}
      </div>

     
      <div className="charts-container">

        <div className="chart-box">
          <h3>Orders Overview</h3>
          <div className="chart-placeholder">
            Chart Placeholder
          </div>
        </div>

        <div className="chart-box">
          <h3>Revenue Growth</h3>
          <div className="chart-placeholder">
            Chart Placeholder
          </div>
        </div>

      </div>

    
      <div className="verification-section">

        <h2>Pending Shop Verifications</h2>

        <table className="verification-table">
          <thead>
            <tr>
              <th>Shop Name</th>
              <th>Owner</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {pendingShops.map((shop, index) => (
              <tr key={index}>
                <td>{shop.name}</td>
                <td>{shop.owner}</td>
                <td className="pending">{shop.status}</td>
                <td>
                  <button className="approve-btn">Approve</button>
                  <button className="reject-btn">Reject</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

      </div>

    </div>
  );
}

export default AdminDashboard;