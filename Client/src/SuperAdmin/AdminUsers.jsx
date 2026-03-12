import React, { useState } from "react";
import "../Style/SuperAdmin/AdminUsers.css";

function AdminUsers() {

  const [search, setSearch] = useState("");

  const users = [
    { id: 1, name: "Amit Sharma", email: "amit@gmail.com", role: "Customer", status: "Active" },
    { id: 2, name: "Priya Singh", email: "priya@gmail.com", role: "Customer", status: "Blocked" },
    { id: 3, name: "Rahul Verma", email: "rahul@gmail.com", role: "Shop Owner", status: "Active" },
    { id: 4, name: "Neha Gupta", email: "neha@gmail.com", role: "Customer", status: "Active" },
    { id: 5, name: "Rakesh Yadav", email: "rakesh@gmail.com", role: "Shop Owner", status: "Active" }
  ];

  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="admin-users">

      <h2 className="page-title">User Management</h2>

      {/* Search */}
      <div className="users-header">
        <input
          type="text"
          placeholder="Search users..."
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Users Table */}

      <div className="users-table-container">
        <table className="users-table">

          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>

            {filteredUsers.map((user) => (
              <tr key={user.id}>

                <td>{user.id}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.role}</td>

                <td>
                  <span className={`status ${user.status.toLowerCase()}`}>
                    {user.status}
                  </span>
                </td>

                <td>
                  <button className="view-btn">View</button>

                  {user.status === "Active" ? (
                    <button className="block-btn">Block</button>
                  ) : (
                    <button className="activate-btn">Activate</button>
                  )}
                </td>

              </tr>
            ))}

          </tbody>

        </table>
      </div>

    </div>
  );
}

export default AdminUsers;