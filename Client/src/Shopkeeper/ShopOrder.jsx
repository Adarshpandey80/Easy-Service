import React, { useState } from "react";
import '../Style/ShopOwner/ShopOrder.css';

const ShopOrder = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [search, setSearch] = useState("");

  // Dummy orders
  const orders = [
    { id: 1, customer: "Amit Sharma", service: "AC Repair", status: "Pending", date: "2025-09-12" },
    { id: 2, customer: "Priya Singh", service: "Washing Machine Repair", status: "Pending", date: "2025-09-11" },
    { id: 3, customer: "Rahul Mehta", service: "Electrician Service", status: "Assigned", date: "2025-09-10" },
  ];

  // Dummy workers
  const workers = [
    { id: 1, name: "Ramesh Kumar", role: "AC Technician", status: "Available", photo: "https://i.pravatar.cc/150?img=1" },
    { id: 2, name: "Suresh Verma", role: "Electrician", status: "Busy", photo: "https://i.pravatar.cc/150?img=2" },
    { id: 3, name: "Anjali Gupta", role: "Washing Machine Specialist", status: "Offline", photo: "https://i.pravatar.cc/150?img=3" },
    { id: 4, name: "Deepak Yadav", role: "Fridge Mechanic", status: "Available", photo: "https://i.pravatar.cc/150?img=4" },
  ];

  const openModal = (order) => {
    setSelectedOrder(order);
    setIsModalOpen(true);
    setSearch(order.service); // auto-filter by service type
  };

  const assignWorker = (workerId) => {
    console.log(`Assigning worker ${workerId} to order ${selectedOrder.id}`);
    setIsModalOpen(false);
  };

  // Filtered workers list
  const filteredWorkers = workers.filter(
    (worker) =>
      worker.name.toLowerCase().includes(search.toLowerCase()) ||
      worker.role.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="orders-page">
      <h1 className="orders-title">Customer Orders</h1>

      <div className="orders-grid">
        {orders.map((order) => (
          <div key={order.id} className="order-card">
            <h2>{order.service}</h2>
            <p><strong>Customer:</strong> {order.customer}</p>
            <p><strong>Date:</strong> {order.date}</p>
            <p>
              <strong>Status:</strong>{" "}
              <span className={`status ${order.status.toLowerCase()}`}>
                {order.status}
              </span>
            </p>
            <button
              className="assign-btn"
              onClick={() => openModal(order)}
              disabled={order.status === "Assigned"}
            >
              {order.status === "Assigned" ? "Already Assigned" : "Assign Worker"}
            </button>
          </div>
        ))}
      </div>

      {/* Assign Worker Modal */}
      {isModalOpen && (
        <div className="modal-overlay" onClick={() => setIsModalOpen(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h2>Assign Worker</h2>
            <p>
              <strong>Order:</strong> {selectedOrder?.service} for{" "}
              {selectedOrder?.customer}
            </p>

            {/* Search Bar */}
            <input
              type="text"
              className="search-input"
              placeholder="Search worker by name or role..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />

            {/* Worker List */}
            <div className="worker-list">
              {filteredWorkers.length > 0 ? (
                filteredWorkers.map((worker) => (
                  <div
                    key={worker.id}
                    className={`worker-item ${worker.status.toLowerCase()}`}
                  >
                    <div className="worker-info">
                      <img
                        src={worker.photo}
                        alt={worker.name}
                        className="worker-photo"
                      />
                      <div>
                        <strong>{worker.name}</strong>
                        <p className="worker-role">{worker.role}</p>
                      </div>
                    </div>

                    <div className="worker-actions">
                      <span
                        className={`status-badge ${worker.status.toLowerCase()}`}
                      >
                        {worker.status}
                      </span>
                      <button
                        className="assign-btn-small"
                        onClick={() => assignWorker(worker.id)}
                        disabled={worker.status !== "Available"}
                      >
                        {worker.status === "Available" ? "Assign" : "Not Available"}
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <p className="no-results">No workers found.</p>
              )}
            </div>

            <div className="modal-actions">
              <button className="cancel-btn" onClick={() => setIsModalOpen(false)}>
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ShopOrder;
