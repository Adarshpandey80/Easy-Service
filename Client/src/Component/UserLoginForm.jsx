import React from 'react'
import { useState } from 'react'
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom'
import '../Style/UserFormStyle/Login.css'

const UserLoginForm = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    })
    const handleChange =(e)=>{
       const {name, value} = e.target;
       setFormData({...formData, [name]: value})
   }
   const formsubmit = async (e) => {
  e.preventDefault();
  console.log(formData);
  const api = import.meta.env.VITE_API_URL;
  console.log("API URL:", api);
  const response = await axios.post("http://localhost:8000/user/login", formData);
  console.log(response.data.message);
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

        <label>Password</label>
        <input
          type="password"
          name="password"
          placeholder="Enter password"
          value={formData.password}
          onChange={handleChange}
          required
        />

        <input type="submit" value="Login" className="submit-btn"  />

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