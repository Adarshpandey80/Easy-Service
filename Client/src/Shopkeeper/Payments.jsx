import React, { useState } from "react";
import "../Style/ShopOwner/Payments.css";

const Payments = () => {
  const [transactions] = useState([
    { id: "TXN001", customer: "Amit Sharma", service: "AC Repair", amount: 500, date: "2025-09-10", status: "Completed" },
    { id: "TXN002", customer: "Priya Singh", service: "Washing Machine Repair", amount: 700, date: "2025-09-11", status: "Pending" },
    { id: "TXN003", customer: "Rahul Mehta", service: "Fridge Repair", amount: 450, date: "2025-09-12", status: "Completed" },
    { id: "TXN004", customer: "Neha Verma", service: "Electrician Service", amount: 300, date: "2025-09-12", status: "Failed" },
    { id: "TXN005", customer: "Rohit Kumar", service: "AC Repair", amount: 600, date: "2025-09-13", status: "Completed" },
  ]);

  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  // Filter transactions by date
  const filteredTransactions = transactions.filter((txn) => {
    const txnDate = new Date(txn.date);
    const start = startDate ? new Date(startDate) : null;
    const end = endDate ? new Date(endDate) : null;

    if (start && txnDate < start) return false;
    if (end && txnDate > end) return false;
    return true;
  });

  return (
    <div className="payments-page">
      {/* Wallet Summary */}
      <div className="wallet-summary">
        <h2>Wallet Balance: ₹12,500</h2>
        <button className="withdraw-btn">Withdraw</button>
      </div>

      {/* Date Filters */}
      <div className="filters-container">
      <div>
         <h3>Transaction History</h3>
      </div>
     
      <div className="filters">
        <label>
          From:{" "}
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
        </label>
        <label>
          To:{" "}
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
        </label>
      </div>
 </div>
      {/* Transactions */}
    
      <table className="payments-table">
        <thead>
          <tr>
            <th>Payment ID</th>
            <th>Customer</th>
            <th>Service</th>
            <th>Amount (₹)</th>
            <th>Date</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {filteredTransactions.length > 0 ? (
            filteredTransactions.map((txn) => (
              <tr key={txn.id}>
                <td>{txn.id}</td>
                <td>{txn.customer}</td>
                <td>{txn.service}</td>
                <td>{txn.amount}</td>
                <td>{txn.date}</td>
                <td>
                  <span className={`status ${txn.status.toLowerCase()}`}>
                    {txn.status}
                  </span>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" className="no-data">No transactions found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Payments;
