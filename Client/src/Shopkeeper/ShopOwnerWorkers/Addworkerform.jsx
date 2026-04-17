import React, { useEffect, useRef, useState } from "react";
import "../../Style/ShopWorker/AddWorkerForm.css";
import axios from "axios";
import { toast } from "react-toastify";

const SKILL_OPTIONS = [
  "Electrician",
  "Plumber",
  "AC Repair",
  "Refrigerator Repair",
  "Washing Machine Repair",
  "Microwave Repair",
  "Carpenter",
  "Painter",
  "General Maintenance",
];

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
  const [isSkillDropdownOpen, setIsSkillDropdownOpen] = useState(false);
  const skillDropdownRef = useRef(null);

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

  const selectedSkillValues = formData.skill
    ? formData.skill.split(",").map((item) => item.trim()).filter(Boolean)
    : [];

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (skillDropdownRef.current && !skillDropdownRef.current.contains(event.target)) {
        setIsSkillDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, []);

  const handleSkillSelection = (skillOption) => {
    const isAlreadySelected = selectedSkillValues.includes(skillOption);

    const updatedSkills = isAlreadySelected
      ? selectedSkillValues.filter((skill) => skill !== skillOption)
      : [...selectedSkillValues, skillOption];

    setFormData((prev) => ({ ...prev, skill: updatedSkills.join(", ") }));
    setIsSkillDropdownOpen(false);
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
  const handleSubmit = async(e) => {
    e.preventDefault();

    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
        const api = import.meta.env.VITE_API_URL;
        const payload = new FormData();
        payload.append("name", formData.name);
        payload.append("phone", formData.phone);
        payload.append("skill", formData.skill);
        payload.append("experience", formData.experience);
        payload.append("availability", formData.availability);
        payload.append("idProof", formData.idProof);
        payload.append("photo", formData.photo);

        await axios.post(`${api}/shopowner/addworkers`, payload, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("shopowner")}`,
          },
        });
        toast.success("Worker added successfully!").position("top-center");
        setFormData({
          name: "",
          phone: "",
          skill: "",
          experience: "",
          availability: "full-time",
          idProof: null,
          photo: null,
        });
        setPreview({ idProof: "", photo: "" });
        setErrors({});
        setIsSkillDropdownOpen(false);
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to add worker");
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
          <label>Skill (Select Multiple)</label>
          <div className="skill-dropdown" ref={skillDropdownRef}>
            <button
              type="button"
              className={`skill-dropdown-toggle ${isSkillDropdownOpen ? "open" : ""}`}
              onClick={() => setIsSkillDropdownOpen((prev) => !prev)}
            >
              {selectedSkillValues.length > 0
                ? selectedSkillValues.join(", ")
                : "Select skills"}
              <span className="dropdown-arrow">▾</span>
            </button>

            {isSkillDropdownOpen && (
              <div className="skill-dropdown-menu">
                {SKILL_OPTIONS.map((skillOption) => {
                  const isSelected = selectedSkillValues.includes(skillOption);
                  return (
                    <button
                      type="button"
                      key={skillOption}
                      className={`skill-option ${isSelected ? "selected" : ""}`}
                      onClick={() => handleSkillSelection(skillOption)}
                    >
                      <span>{skillOption}</span>
                      {isSelected && <span className="check-mark">✓</span>}
                    </button>
                  );
                })}
              </div>
            )}
          </div>
          {/* <small className="helper-text">Click to open, choose a skill, dropdown closes automatically</small> */}
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
