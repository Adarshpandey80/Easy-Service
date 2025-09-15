import React from "react";
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell,
  BarChart, Bar
} from "recharts";
import { FaUsers, FaTools, FaCheckCircle, FaRupeeSign } from "react-icons/fa";
import '../Style/ShopOwner/ShopOwnerDashboard.css';

const Dashboard = () => {
  // Dummy Data
  const orderData = [
    { day: "Mon", orders: 5 },
    { day: "Tue", orders: 8 },
    { day: "Wed", orders: 6 },
    { day: "Thu", orders: 10 },
    { day: "Fri", orders: 7 },
    { day: "Sat", orders: 12 },
    { day: "Sun", orders: 4 },
  ];

  const workerData = [
    { name: "Available", value: 6 },
    { name: "Busy", value: 3 },
    { name: "Offline", value: 1 },
  ];
  const COLORS = ["#22c55e", "#f97316", "#ef4444"];

  const revenueData = [
    { month: "Jan", revenue: 15000 },
    { month: "Feb", revenue: 12000 },
    { month: "Mar", revenue: 18000 },
    { month: "Apr", revenue: 22000 },
    { month: "May", revenue: 19500 },
  ];

  return (
    <div className="dashboard">
      <h1 className="dashboard-title">📊 ShopOwner Dashboard</h1>

      {/* KPI Cards */}
      <div className="kpi-cards">
        <div className="card">
          <FaUsers className="icon" />
          <h3>Workers</h3>
          <p>10</p>
        </div>
        <div className="card">
          <FaTools className="icon" />
          <h3>Active Orders</h3>
          <p>5</p>
        </div>
        <div className="card">
          <FaCheckCircle className="icon" />
          <h3>Completed</h3>
          <p>48</p>
        </div>
        <div className="card">
          <FaRupeeSign className="icon" />
          <h3>Pending Payments</h3>
          <p>₹12,500</p>
        </div>
      </div>

      {/* Charts Section */}
      <div className="charts">
        <div className="chart-box">
          <h2>Orders Trend</h2>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={orderData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="orders" stroke="#4f46e5" strokeWidth={3} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="chart-box">
          <h2>Worker Availability</h2>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={workerData}
                cx="50%"
                cy="50%"
                outerRadius={80}
                dataKey="value"
                label
              >
                {workerData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="chart-box">
          <h2>Revenue (₹)</h2>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={revenueData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="revenue" fill="#22c55e" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Recent Activities */}
      <div className="activities">
        <div className="activity-box">
          <h2>Recent Orders</h2>
          <ul>
            <li>AC Repair - Amit Sharma - Pending</li>
            <li>Washing Machine - Priya Singh - Assigned</li>
            <li>Electrician - Rahul Mehta - Completed</li>
          </ul>
        </div>
        <div className="activity-box">
          <h2>Notifications</h2>
          <ul>
            <li>✅ Worker Ramesh completed an order</li>
            <li>💳 Payment ₹1,200 received from Priya</li>
            <li>🆕 New order placed by Anjali</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
