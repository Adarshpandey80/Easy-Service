import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../Style/UserFormStyle/Signup.css";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";


const UserSignupForm = () => {
  const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    phone: "",
    password: "",
    role: "user"
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };


  const signupSubmit = async (e) => {
    try {
      e.preventDefault();
      const api = import.meta.env.VITE_API_URL;
      const response = await axios.post(`${api}/user/signup`, formData);
      console.log(response.data.message);
      toast.success(response.data.message, { position: 'top-center' });
      navigate('/');

    } catch (error) {
      console.error("Signup error:", error);
      toast.error("An error occurred during signup.", { position: 'top-center' });
    }
  }


  return (
    <div className="signup-container">
      <form className="signup-form" onSubmit={signupSubmit} noValidate>
        <h2>Create Account</h2>

        <label>Username</label>
        <input
          type="text"
          name="username"
          placeholder="Enter username"
          value={formData.username}
          onChange={handleChange}
          required
        />


        <label>Email (Gmail only)</label>
        <input
          type="email"
          name="email"
          placeholder="Enter Gmail address"
          value={formData.email}
          onChange={handleChange}
          pattern="^[a-zA-Z0-9._%+-]+@gmail\.com$"
          title="Please enter a valid Gmail address"
          required
        />


        <label>Phone</label>
        <input
          type="tel"
          name="phone"
          placeholder="Enter phone number"
          value={formData.phone}
          onChange={handleChange}
          pattern="[0-9]{10}"
          title="Phone number must be 10 digits"

          required
        />


        <div className="password-field">
          <label>Password</label>

          <div className="password-input">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Enter password"
              value={formData.password}
              onChange={handleChange}
              pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,}$"
              title=" Must be 6+ characters, include uppercase, lowercase, and a number."
              required
            />

            <span
              className="toggle-icon"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? "🙈" : "👁️"}
            </span>
          </div>
        </div>


        <input type="submit" value="Sign Up" className="submit-btn" />
        <p className="login-link">
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </form>
    </div>
  );
};

export default UserSignupForm;
