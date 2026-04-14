import React, { useState, useEffect } from "react";
import "../Style/ShopOwner/ShopOwnerServices.css";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

const ShopOwnerServices = () => {
  const [services, setServices] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const token = localStorage.getItem("shopowner");
  const decodedToken = token ? jwtDecode(token) : null;
  const shopOwnerID = decodedToken ? decodedToken.id : null;
  const api = import.meta.env.VITE_API_URL;

  const fetchServices = async () => {
    if (!shopOwnerID) {
      return;
    }

    setIsLoading(true);
    try {
      const response = await axios.get(`${api}/shopowner/services/${shopOwnerID}`);
      setServices(Array.isArray(response.data) ? response.data : []);
    } catch (error) {
      console.error("Error fetching services:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (!shopOwnerID) {
      return;
    }

    fetchServices();
  }, [shopOwnerID]);

  
  const handleAddService = async () => {
    if (!shopOwnerID) {
      alert("Shop owner is not logged in.");
      return;
    }

    const category = window.prompt("Enter category (Electronics Services / Carpentry / Cleaning Services / Painting):");
    if (!category) return;

    const subcategory = window.prompt("Enter service name / subcategory:");
    if (!subcategory) return;

    const priceInput = window.prompt("Enter price:");
    if (!priceInput) return;

    const price = Number(priceInput);
    if (Number.isNaN(price) || price < 0) {
      alert("Please enter a valid price.");
      return;
    }

    try {
      await axios.post(`${api}/shopowner/services/${shopOwnerID}`, {
        category,
        subcategory,
        price,
        status: "Active",
      });
      await fetchServices();
    } catch (error) {
      console.error("Error creating service:", error);
      alert(error?.response?.data?.message || "Unable to create service.");
    }
  };

  const handleEditService = async (service) => {
    if (!shopOwnerID) {
      return;
    }

    const category = window.prompt("Edit category:", service.category || "");
    if (!category) return;

    const subcategory = window.prompt("Edit subcategory:", service.subcategory || "");
    if (!subcategory) return;

    const priceInput = window.prompt("Edit price:", String(service.price ?? ""));
    if (!priceInput) return;

    const price = Number(priceInput);
    if (Number.isNaN(price) || price < 0) {
      alert("Please enter a valid price.");
      return;
    }

    try {
      await axios.put(`${api}/shopowner/services/${shopOwnerID}/${service.id}`, {
        category,
        subcategory,
        price,
        status: service.status || "Active",
      });
      await fetchServices();
    } catch (error) {
      console.error("Error updating service:", error);
      alert(error?.response?.data?.message || "Unable to update service.");
    }
  };

  const handleDeleteService = async (service) => {
    if (!shopOwnerID) {
      return;
    }

    const confirmed = window.confirm(`Delete ${service.subcategory || "this service"}?`);
    if (!confirmed) {
      return;
    }

    try {
      await axios.delete(`${api}/shopowner/services/${shopOwnerID}/${service.id}`);
      await fetchServices();
    } catch (error) {
      console.error("Error deleting service:", error);
      alert(error?.response?.data?.message || "Unable to delete service.");
    }
  };

  const toggleStatus = async (service) => {
    if (!shopOwnerID) {
      return;
    }

    const updatedStatus = (service.status || "Active") === "Active" ? "Inactive" : "Active";
    try {
      await axios.put(`${api}/shopowner/services/${shopOwnerID}/${service.id}`, {
        category: service.category,
        subcategory: service.subcategory,
        price: service.price,
        status: updatedStatus,
      });
      await fetchServices();
    } catch (error) {
      console.error("Error updating service status:", error);
      alert(error?.response?.data?.message || "Unable to update service status.");
    }
  };

  return (
    <div className="services-page">
      <div className="services-header">
        <h1>My Services</h1>
        <button className="add-btn" onClick={handleAddService}>+ Add New Service</button>
      </div>

      <div className="services-grid">
        {isLoading && <p>Loading services...</p>}
        {services.map((service, index) => {
          const serviceName = service.subcategory || service.name || service.category || "Service";
          const serviceStatus = service.status ?? "Active";

          return (
          <div key={`${service.category || "service"}-${serviceName}-${index}`} className="service-card">
            <div className="service-icon">{service.icon || serviceName.charAt(0).toUpperCase()}</div>
            <h3>{serviceName}</h3>
            <p>{service.category || "Service"}</p>
            <p>₹{service.price}</p>
            <span className={`status ${serviceStatus.toLowerCase()}`}>
              {serviceStatus}
            </span>
            <div className="actions">
              <button onClick={() => toggleStatus(service)}>
                {serviceStatus === "Active" ? "Deactivate" : "Activate"}
              </button>
              <button onClick={() => handleEditService(service)}>Edit</button>
              <button className="delete-btn" onClick={() => handleDeleteService(service)}>Delete</button>
            </div>
          </div>
          );
        })}
      </div>
    </div>
  );
};

export default ShopOwnerServices;
