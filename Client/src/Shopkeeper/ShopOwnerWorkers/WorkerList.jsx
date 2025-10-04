import React, { useState , } from "react";
import "../../Style/ShopWorker/ShowWorkerList.css";
import { useNavigate } from "react-router-dom";

const WorkersList = () => {
    const navigation = useNavigate();
    if (navigation.state === "loading") {
      return <div className="loader">Loading...</div>; // Display a loading indicator
    }
  const [workers, setWorkers] = useState([
    { id: 1, name: "Ravi Sharma", phone: "9876543210", role: "Electrician ,Microwave Repair", status: "Active", photo: "https://randomuser.me/api/portraits/men/11.jpg" },
    { id: 2, name: "Amit Verma", phone: "9123456780", role: "AC Repair", status: "Inactive", photo: "https://randomuser.me/api/portraits/men/12.jpg" },
    { id: 3, name: "Sunil Kumar", phone: "9988776655", role: "Plumber", status: "Active", photo: "https://randomuser.me/api/portraits/men/13.jpg" },
    { id: 4, name: "Rahul Singh", phone: "8877665544", role: "Carpenter", status: "Active", photo: "https://randomuser.me/api/portraits/men/14.jpg" },
    { id: 5, name: "Suresh Yadav", phone: "9090909090", role: "Fridge Repair", status: "Inactive", photo: "https://randomuser.me/api/portraits/men/15.jpg" },
    { id: 6, name: "Manoj Gupta", phone: "9812345678", role: "Washing Machine Repair", status: "Active", photo: "https://randomuser.me/api/portraits/men/16.jpg" },
    { id: 7, name: "Deepak Mishra", phone: "9998887776", role: "CCTV Installation", status: "Active", photo: "https://randomuser.me/api/portraits/men/17.jpg" },
    { id: 8, name: "Pawan Tiwari", phone: "9871112233", role: "Microwave Repair", status: "Inactive", photo: "https://randomuser.me/api/portraits/men/18.jpg" },
    { id: 9, name: "Arun Das", phone: "9856741230", role: "Inverter Repair", status: "Active", photo: "https://randomuser.me/api/portraits/men/19.jpg" },
    { id: 10, name: "Mohit Jain", phone: "9823456712", role: "Refrigerator Technician", status: "Active", photo: "https://randomuser.me/api/portraits/men/20.jpg" },
  ]);

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
