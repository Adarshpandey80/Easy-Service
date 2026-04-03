import React from 'react'

import { Link } from 'react-router-dom'
import axios from 'axios';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import '../Style/UserFormStyle/Login.css'

const UserLoginForm = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = React.useState({
    email: '',
    password: ''
  })
  const handleChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value })
  }
  const formsubmit = async (e) => {
    try {
      e.preventDefault();
      const api = import.meta.env.VITE_API_URL;
      const response = await axios.post(`${api}/shopowner/login`, formData);
      localStorage.setItem("shopowner", response.data.token);
      toast.success("Login successful!");
      // Navigate to shop owner dashboard after successful login
      navigate('/shopOwnerDashboard');
    } catch (error) {
      console.error("Login error:", error);
      toast.error("Login failed. Please check your credentials and try again.");
    }
  }

  return (
    <>
      <div className="login-container">
        <form className="login-form " onSubmit={formsubmit} method='POST' action='/api/login'   >
          <h2>Open your Shop</h2>

          <label>Email</label>
          <input
            type="email"
            name="email"
            placeholder="Enter email"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <div className="password-field">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
            />

            <span
              className="toggle-icon"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>




          <input type="submit" value="Login" className="submit-btn" />

          {/* ✅ Signup Link */}
          <p className="signup-link">
            Don’t have an account? <Link to="/owner/shopkeeperSignup" >Sign up</Link>
          </p>
        </form>
      </div>
    </>
  )
}

export default UserLoginForm