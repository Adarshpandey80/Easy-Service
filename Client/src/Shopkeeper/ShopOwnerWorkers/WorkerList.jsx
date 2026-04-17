import React, { useState , } from "react";
import "../../Style/ShopWorker/ShowWorkerList.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import { useEffect } from "react";


const WorkersList = () => {
    const navigation = useNavigate();
    if (navigation.state === "loading") {
      return <div className="loader">Loading...</div>; // Display a loading indicator
    }
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



  const handleDelete = (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this worker?");
    if (confirmDelete) {
      setWorkers(workers.filter((worker) => worker.id !== id));
    }
  };

  const handleEdit = (id) => {
    // navigation(`/workers/edit/${id}`);
    navigation(`/workereditform`, { state: { workerId: id } });
  };

  return (
    <div className="workers-container">
      <h2>Workers List</h2>
      <div className="workers-grid">
        {workers.map((worker) => (
          <div key={worker.id} className="worker-card">
            <img src={worker.photo} alt={worker.name} className="worker-photo" />
            <div className="workers-info">
              <h3>{worker.name}</h3>
              <p><strong>📞</strong> {worker.phone}</p>
              <p><strong>👷</strong> {worker.role}</p>
              <span className={`status ${worker.status === "Active" ? "active" : "inactive"}`}>
                {worker.status}
              </span>
            </div>
            <div className="workers-actions">
              <button className="edit-btn" onClick={() => handleEdit(worker.id)}>Edit</button>
              <button className="delete-btn" onClick={() => handleDelete(worker.id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WorkersList;
