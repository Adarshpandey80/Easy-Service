import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "../../Style/ShopWorker/WorkerEditForm.css";
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

const WorkerEditForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    skill: "",
    status: "Active",
  });
  const [isSkillDropdownOpen, setIsSkillDropdownOpen] = useState(false);
  const skillDropdownRef = React.useRef(null);

  const selectedSkillValues = formData.skill
    ? formData.skill.split(",").map((item) => item.trim()).filter(Boolean)
    : [];


  useEffect(() => {
    const fetchWorker = async () => {
      try {
        const api = import.meta.env.VITE_API_URL;
        const res = await axios.get(`${api}/shopowner/workers/${id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("shopowner")}`,
          },
        });

        setFormData({
          name: res.data.name || "",
          phone: res.data.phone || "",
          skill: res.data.skill || "",
          status: res.data.status || "Active",
        });
      } catch (err) {
        console.error("Error fetching worker", err);
      }
    };
    fetchWorker();
  }, [id]);

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (skillDropdownRef.current && !skillDropdownRef.current.contains(event.target)) {
        setIsSkillDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const toggleSkillSelection = (skillOption) => {
    const isAlreadySelected = selectedSkillValues.includes(skillOption);

    const updatedSkills = isAlreadySelected
      ? selectedSkillValues.filter((skill) => skill !== skillOption)
      : [...selectedSkillValues, skillOption];

    setFormData((prev) => ({ ...prev, skill: updatedSkills.join(", ") }));
  };

  const removeSelectedSkill = (skillToRemove) => {
    const updatedSkills = selectedSkillValues.filter((skill) => skill !== skillToRemove);
    setFormData((prev) => ({ ...prev, skill: updatedSkills.join(", ") }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (selectedSkillValues.length === 0) {
      alert("Please select at least one skill");
      return;
    }

    try {
      const api = import.meta.env.VITE_API_URL;
      await axios.put(`${api}/shopowner/Editworkers/${id}`, formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("shopowner")}`,
        },
      });
      toast.success("Worker updated successfully!", { position: "top-center" });
      navigate("/owner/workerlist");
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

          <label>Skill</label>
          <div className="edit-skill-dropdown" ref={skillDropdownRef}>
            <button
              type="button"
              className={`edit-skill-toggle ${isSkillDropdownOpen ? "open" : ""}`}
              onClick={() => setIsSkillDropdownOpen((prev) => !prev)}
            >
              <span>
                {selectedSkillValues.length > 0 ? "Update selected skills" : "Select skills"}
              </span>
              <span className="edit-dropdown-arrow">▾</span>
            </button>

            {selectedSkillValues.length > 0 && (
              <div className="edit-selected-skills">
                {selectedSkillValues.map((skill) => (
                  <span key={skill} className="edit-skill-chip">
                    {skill}
                    <button
                      type="button"
                      className="chip-remove-btn"
                      onClick={() => removeSelectedSkill(skill)}
                      aria-label={`Remove ${skill}`}
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
            )}

            {isSkillDropdownOpen && (
              <div className="edit-skill-menu">
                {SKILL_OPTIONS.map((skillOption) => {
                  const isSelected = selectedSkillValues.includes(skillOption);
                  return (
                    <button
                      type="button"
                      key={skillOption}
                      className={`edit-skill-option ${isSelected ? "selected" : ""}`}
                      onClick={() => toggleSkillSelection(skillOption)}
                    >
                      <span>{skillOption}</span>
                      {isSelected && <span className="edit-check-mark">✓</span>}
                    </button>
                  );
                })}
              </div>
            )}
          </div>

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
