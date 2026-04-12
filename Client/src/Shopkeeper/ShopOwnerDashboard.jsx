import React from "react";
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell,
  BarChart, Bar
} from "recharts";
import { FaUsers, FaTools, FaCheckCircle, FaRupeeSign, FaClock, FaCheck } from "react-icons/fa";
import '../Style/ShopOwner/ShopOwnerDashboard.css';
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";


const Dashboard = () => {
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [shopOwnerID, setShopOwnerID] = useState(null);

  const token = localStorage.getItem("shopowner");
  const decodedToken = token ? jwtDecode(token) : null;
  const shopOwnerId = decodedToken ? decodedToken.id : null;

  useEffect(() => {
    setShopOwnerID(shopOwnerId);
  }, [token]);

  useEffect(() => {
    if (!shopOwnerId) return;
    
    setLoading(true);
    const api = import.meta.env.VITE_API_URL;
    axios.get(`${api}/shopowner/dashboard/${shopOwnerId}`)
      .then(response => {
        setDashboardData(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error("Error fetching shop data:", error);
        setLoading(false);
      });
  }, [shopOwnerId]);

  const COLORS = ["#22c55e", "#f97316", "#ef4444"];

  // Use real data if available, otherwise show loading
  if (loading) {
    return (
      <div className="dashboard">
        <h1 className="dashboard-title">📊 ShopOwner Dashboard</h1>
        <div style={{ textAlign: "center", padding: "50px", fontSize: "18px", color: "#666" }}>
          Loading dashboard data...
        </div>
      </div>
    );
  }

  if (!dashboardData) {
    return (
      <div className="dashboard">
        <h1 className="dashboard-title">📊 ShopOwner Dashboard</h1>
        <div style={{ textAlign: "center", padding: "50px", fontSize: "18px", color: "#e74c3c" }}>
          Failed to load dashboard data
        </div>
      </div>
    );
  }

  const { kpis = {}, workerStatus = {}, recentOrders = [], revenueData = [] } = dashboardData;




  return (
    <div className="dashboard">
      <h1 className="dashboard-title">📊 ShopOwner Dashboard</h1>

      {/* KPI Cards */}
      <div className="kpi-cards">
        <div className="card">
          <FaUsers className="icon" />
          <h3>Total Workers</h3>
          <p className="kpi-value">{kpis.totalWorkers || 0}</p>
        </div>
        <div className="card">
          <FaClock className="icon" />
          <h3>Active Orders</h3>
          <p className="kpi-value">{kpis.activeOrders || 0}</p>
        </div>
        <div className="card">
          <FaCheckCircle className="icon" />
          <h3>Completed Orders</h3>
          <p className="kpi-value">{kpis.completedOrders || 0}</p>
        </div>
        <div className="card">
          <FaRupeeSign className="icon" />
          <h3>Pending Payments</h3>
          <p className="kpi-value">₹{(kpis.pendingPayments || 0).toLocaleString('en-IN')}</p>
        </div>
      </div>

      {/* Charts Section */}
      <div className="charts">
        <div className="chart-box">
          <h2>Revenue Trend (₹)</h2>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={revenueData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip formatter={(value) => `₹${value.toLocaleString('en-IN')}`} />
              <Bar dataKey="revenue" fill="#3b82f6" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="chart-box">
          <h2>Worker Status</h2>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={[
                  { name: "Available", value: workerStatus.available || 0 },
                  { name: "Busy", value: workerStatus.busy || 0 },
                  { name: "Offline", value: workerStatus.offline || 0 },
                ]}
                cx="50%"
                cy="50%"
                outerRadius={80}
                dataKey="value"
                label
              >
                {[0, 1, 2].map((index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Recent Activities */}
      <div className="activities">
        <div className="activity-box">
          <h2>Recent Orders</h2>
          {recentOrders && recentOrders.length > 0 ? (
            <table className="orders-table">
              <thead>
                <tr>
                  <th>Customer</th>
                  <th>Service</th>
                  <th>Status</th>
                  <th>Worker</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                {recentOrders.map((order) => (
                  <tr key={order.id}>
                    <td>{order.customerName}</td>
                    <td>{order.service}</td>
                    <td>
                      <span className={`status-badge status-${order.status.toLowerCase()}`}>
                        {order.status}
                      </span>
                    </td>
                    <td>{order.workerName}</td>
                    <td>{new Date(order.date).toLocaleDateString('en-IN')}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p style={{ textAlign: "center", color: "#999", padding: "20px" }}>No orders yet</p>
          )}
        </div>

        <div className="activity-box stats-summary">
          <h2>Summary</h2>
          <div className="stat-item">
            <span className="stat-label">Total Revenue</span>
            <span className="stat-value">₹{(kpis.totalRevenue || 0).toLocaleString('en-IN')}</span>
          </div>
          <div className="stat-item">
            <span className="stat-label">Completed Orders</span>
            <span className="stat-value" style={{ color: "#22c55e" }}>{kpis.completedOrders || 0}</span>
          </div>
          <div className="stat-item">
            <span className="stat-label">Pending Payments</span>
            <span className="stat-value" style={{ color: "#f59e0b" }}>₹{(kpis.pendingPayments || 0).toLocaleString('en-IN')}</span>
          </div>
          <div className="stat-item">
            <span className="stat-label">Active Workers</span>
            <span className="stat-value" style={{ color: "#3b82f6" }}>{workerStatus.available || 0}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
