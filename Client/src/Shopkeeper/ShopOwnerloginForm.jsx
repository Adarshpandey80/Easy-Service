import React from 'react'

import { Link } from 'react-router-dom'
import '../Style/UserFormStyle/Login.css'

const UserLoginForm = () => {
    const [formData, setFormData] = React.useState({
        email: '',
        password: ''
    })
    const handleChange =(e)=>{
        e.preventDefault();
       const {name, value} = e.target;
       setFormData({...formData, [name]: value})
    }
    const formsubmit = (e)=>{
      e.preventDefault();
      console.log(formData);
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
          Don’t have an account? <Link to="/shopkeeperForm" >Sign up</Link>
        </p>
      </form>
    </div>
   </>
  )
}

export default UserLoginForm