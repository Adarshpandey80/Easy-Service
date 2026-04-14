import React, { useState, useEffect } from "react";
import "../Style/ShopOwner/ShopOwnerServices.css";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

const CATEGORY_OPTIONS = [
  "Electronics Services",
  "Carpentry",
  "Cleaning Services",
  "Painting",
];

const initialForm = {
  category: CATEGORY_OPTIONS[0],
  subcategory: "",
  price: "",
};

const ShopOwnerServices = () => {
  const [services, setServices] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState("add");
  const [selectedService, setSelectedService] = useState(null);
  const [formData, setFormData] = useState(initialForm);
  const [formError, setFormError] = useState("");
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

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedService(null);
    setModalMode("add");
    setFormData(initialForm);
    setFormError("");
  };

  const openAddModal = () => {
    if (!shopOwnerID) {
      alert("Shop owner is not logged in.");
      return;
    }

    setModalMode("add");
    setSelectedService(null);
    setFormData(initialForm);
    setFormError("");
    setIsModalOpen(true);
  };

  const openEditModal = (service) => {
    setModalMode("edit");
    setSelectedService(service);
    setFormData({
      category: service.category || CATEGORY_OPTIONS[0],
      subcategory: service.subcategory || "",
      price: service.price ?? "",
    });
    setFormError("");
    setIsModalOpen(true);
  };

  const handleFormChange = (event) => {
    const { name, value } = event.target;
    setFormData((current) => ({
      ...current,
      [name]: value,
    }));
  };

  const handleSubmitService = async (event) => {
    event.preventDefault();

    if (!shopOwnerID) {
      setFormError("Shop owner is not logged in.");
      return;
    }

    const subcategory = String(formData.subcategory || "").trim();
    const category = String(formData.category || "").trim();
    const price = Number(formData.price);

    if (!category || !subcategory) {
      setFormError("Category and service name are required.");
      return;
    }

    if (Number.isNaN(price) || price < 0) {
      setFormError("Please enter a valid price.");
      return;
    }

    setIsSubmitting(true);
    setFormError("");

    try {
      if (modalMode === "add") {
        await axios.post(`${api}/shopowner/services/${shopOwnerID}`, {
          category,
          subcategory,
          price,
          status: "Active",
        });
      } else if (selectedService) {
        await axios.put(`${api}/shopowner/services/${shopOwnerID}/${selectedService.id}`, {
          category,
          subcategory,
          price,
          status: selectedService.status || "Active",
        });
      }

      await fetchServices();
      closeModal();
    } catch (error) {
      console.error("Error saving service:", error);
      setFormError(error?.response?.data?.message || "Unable to save service.");
    } finally {
      setIsSubmitting(false);
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
        <button className="add-btn" onClick={openAddModal}>+ Add New Service</button>
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
              <button onClick={() => openEditModal(service)}>Edit</button>
              <button className="delete-btn" onClick={() => handleDeleteService(service)}>Delete</button>
            </div>
          </div>
          );
        })}
      </div>

      {isModalOpen && (
        <div className="service-modal-backdrop" onClick={closeModal}>
          <div className="service-modal" onClick={(event) => event.stopPropagation()}>
            <div className="service-modal-header">
              <h2>{modalMode === "add" ? "Add New Service" : "Edit Service"}</h2>
              <button className="service-modal-close" type="button" onClick={closeModal}>x</button>
            </div>

            <form className="service-form" onSubmit={handleSubmitService}>
              <label htmlFor="category">Category</label>
              <select
                id="category"
                name="category"
                value={formData.category}
                onChange={handleFormChange}
                required
              >
                {CATEGORY_OPTIONS.map((option) => (
                  <option key={option} value={option}>{option}</option>
                ))}
              </select>

              <label htmlFor="subcategory">Service Name</label>
              <input
                id="subcategory"
                type="text"
                name="subcategory"
                placeholder="e.g. AC Repair"
                value={formData.subcategory}
                onChange={handleFormChange}
                required
              />

              <label htmlFor="price">Price</label>
              <input
                id="price"
                type="number"
                min="0"
                step="1"
                name="price"
                placeholder="Enter amount"
                value={formData.price}
                onChange={handleFormChange}
                required
              />

              {formError && <p className="form-error">{formError}</p>}

              <div className="service-form-actions">
                <button type="button" className="cancel-btn" onClick={closeModal}>Cancel</button>
                <button type="submit" className="save-btn" disabled={isSubmitting}>
                  {isSubmitting ? "Saving..." : modalMode === "add" ? "Create Service" : "Save Changes"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ShopOwnerServices;
