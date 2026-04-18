import React, { useState , } from "react";
import "../../Style/ShopWorker/ShowWorkerList.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import { useEffect } from "react";


const WorkersList = () => {
    const navigation = useNavigate();
  const [workers, setWorkers] = useState([]);

const fetchWorkers = async () => {
  try {
   const api = import.meta.env.VITE_API_URL;
    const response = await axios.get(`${api}/shopowner/fetchworkers`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("shopowner")}`,
      },
    });
    setWorkers(response.data);
  } catch (error) {
    console.error("Error fetching workers:", error);
  }
}

useEffect(() => {
  fetchWorkers();
}, []);



  const handleDelete = async(id) => {
    try {
      const api = import.meta.env.VITE_API_URL;
      await axios.delete(`${api}/shopowner/Deleteworkers/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("shopowner")}`,
        },
      });
      setWorkers(workers.filter((worker) => worker._id !== id));
    } catch (error) {
      console.error("Error deleting worker:", error);
    }
  };

  const handleEdit = (id) => {
    navigation(`/owner/workereditform/${id}`);
    
  };

  return (
    <div className="workers-container">
      <h2>Workers List</h2>
      <div className="workers-grid">
        {workers.map((worker) => (
          <div key={worker._id} className="worker-card">
            <img src={worker.photo} alt={worker.name} className="worker-photo" />
            <div className="workers-info">
              <h3>{worker.name}</h3>
              <p><strong>📞</strong> {worker.phone}</p>
              <p><strong>👷</strong> {worker.skill}</p>
              <span className={`status ${worker.status === "Active" ? "active" : "inactive"}`}>
                {worker.status}
              </span>
            </div>
            <div className="workers-actions">
              <button className="edit-btn" onClick={() => handleEdit(worker._id)}>Edit</button>
              <button className="delete-btn" onClick={() => handleDelete(worker._id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WorkersList;
