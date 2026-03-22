import React from 'react'
import { useState } from 'react'
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom'
import '../Style/UserFormStyle/Login.css'
import { toast } from 'react-toastify'

import { FaEye, FaEyeSlash } from 'react-icons/fa';

const UserLoginForm = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    role: 'user'
  })
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value })
  }
  const formsubmit = async (e) => {
    try {
      e.preventDefault();
      console.log(formData);
      const api = import.meta.env.VITE_API_URL;
      console.log("API URL:", api);
      const response = await axios.post(`${api}/user/login`, formData);
      console.log(response.data.message);
      toast.success(response.data.message, { position: 'top-center' });
      localStorage.setItem("token", response.data.token);
      navigate('/');
    } catch (error) {
      console.error("Login error:", error);
      if (error.response && error.response.data && error.response.data.message) {
        toast.error(error.response.data.message, { position: 'top-center' });
      } else {
        toast.error("An error occurred during login.");
      }
    }
  };


  return (
    <>
      <div className="login-container">
        <form className="login-form " onSubmit={formsubmit} >
          <h2>Login</h2>

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
            <label>Password</label>

            <div className="password-input">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Enter password"
                value={formData.password}
                onChange={handleChange}
                required
              />

              <span
                className="toggle-icon"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>
          </div>

          <input type="submit" value="Login" className="submit-btn" />

          {/* ✅ Signup Link */}
          <p className="signup-link">
            Don’t have an account? <Link to="/signup" >Sign up</Link>
          </p>
        </form>
      </div>
    </>
  )
}

export default UserLoginForm