import React, { useState } from "react";
import "../../Style/ShopWorker/AddWorkerForm.css";

const AddWorkerForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    skill: "",
    experience: "",
    availability: "full-time",
    idProof: null,
    photo: null,
  });

  const [preview, setPreview] = useState({ idProof: "", photo: "" });
  const [errors, setErrors] = useState({});

  // Handle input change
  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (files) {
      const file = files[0];
      setFormData((prev) => ({ ...prev, [name]: file }));
      setPreview((prev) => ({
        ...prev,
        [name]: URL.createObjectURL(file),
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  // Validate form
  const validate = () => {
    let newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.phone.match(/^[0-9]{10}$/))
      newErrors.phone = "Valid 10-digit phone number required";
    if (!formData.skill.trim()) newErrors.skill = "Skill is required";
    if (!formData.experience.trim())
      newErrors.experience = "Experience is required";
    if (!formData.idProof) newErrors.idProof = "ID Proof is required";
    if (!formData.photo) newErrors.photo = "Photo is required";
    return newErrors;
  };

  // Handle submit
  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      setErrors({});
      console.log("Worker Added ✅", formData);
      alert("Worker added successfully!");
      // Send formData (including files) to backend using FormData
    }
  };

  return (
    <div className="worker-form-container">
      <h2>Add New Worker</h2>
      <form className="worker-form" onSubmit={handleSubmit}>
        {/* Name */}
        <div className="form-group">
          <label>Worker Name</label>
          <input
            type="text"
            name="name"
            placeholder="Enter worker's name"
            value={formData.name}
            onChange={handleChange}
          />
          {errors.name && <span className="error">{errors.name}</span>}
        </div>

        {/* Phone */}
        <div className="form-group">
          <label>Phone Number</label>
          <input
            type="text"
            name="phone"
            placeholder="Enter 10-digit phone"
            value={formData.phone}
            onChange={handleChange}
          />
          {errors.phone && <span className="error">{errors.phone}</span>}
        </div>

        {/* Skill */}
        <div className="form-group">
          <label>Skill</label>
          <input
            type="text"
            name="skill"
            placeholder="e.g., Electrician, AC Repair, Washing Machine"
            value={formData.skill}
            onChange={handleChange}
          />
          {errors.skill && <span className="error">{errors.skill}</span>}
        </div>

        {/* Experience */}
        <div className="form-group">
          <label>Experience (in years)</label>
          <input
            type="number"
            name="experience"
            placeholder="Enter years of experience"
            value={formData.experience}
            onChange={handleChange}
          />
          {errors.experience && <span className="error">{errors.experience}</span>}
        </div>

        {/* Availability */}
        <div className="form-group">
          <label>Availability</label>
          <select name="availability" value={formData.availability} onChange={handleChange}>
            <option value="full-time">Full-time</option>
            <option value="part-time">Part-time</option>
            <option value="on-call">On Call</option>
          </select>
        </div>

        {/* ID Proof */}
        <div className="form-group">
          <label>ID Proof</label>
          <input type="file" name="idProof" accept="image/*,.pdf" onChange={handleChange} />
          {preview.idProof && (
            <p className="preview-text">File Selected: {formData.idProof.name}</p>
          )}
          {errors.idProof && <span className="error">{errors.idProof}</span>}
        </div>

        {/* Photo */}
        <div className="form-group">
          <label>Worker Photo</label>
          <input type="file" name="photo" accept="image/*" onChange={handleChange} />
          {preview.photo && (
            <img src={preview.photo} alt="preview" className="preview-img" />
          )}
          {errors.photo && <span className="error">{errors.photo}</span>}
        </div>

        {/* Submit */}
        <button type="submit" className="submit-btn">Add Worker</button>
      </form>
    </div>
  );
};

export default AddWorkerForm;
