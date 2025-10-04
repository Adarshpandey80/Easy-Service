import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "../../Style/ShopWorker/WorkerEditForm.css";

const WorkerEditForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    role: "",
    status: "Active",
  });

  // ✅ Fetch worker details from backend
  useEffect(() => {
    const fetchWorker = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/workers/${id}`);
        setFormData(res.data); // prefill with worker data
      } catch (err) {
        console.error("Error fetching worker", err);
      }
    };
    fetchWorker();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:5000/api/workers/${id}`, formData);
      alert("Worker updated successfully!");
      navigate(`/workers/${id}`);
    } catch (err) {
      console.error("Update failed", err);
      alert("Error updating worker");
    }
  };

  return (
    <div className="worker-form-card-container">
      <div className="worker-form-card">
        <h2>Edit Worker</h2>
        <form className="worker-form" onSubmit={handleSubmit}>
          <label>Worker Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />

          <label>Contact Number</label>
          <input
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
          />

          <label>Role</label>
          <input
            type="text"
            name="role"
            value={formData.role}
            onChange={handleChange}
            required
          />

          <label>Status</label>
          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
          >
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>

          <div className="form-buttons">
            <button type="submit" className="submit-btn">Save Changes</button>
            <button type="button" className="cancel-btn" onClick={() => navigate(-1)}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default WorkerEditForm;
