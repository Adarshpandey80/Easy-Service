import React from 'react'
import '../Style/UserFormStyle/Signup.css'

const UserSignupForm = () => {

    const [formData, setFormData] = React.useState({
        username: '',
        email: '',
        phone: '',
        password: ''
    })
    const handleChange =(e)=>{
        e.preventDefault();
       const {name, value} = e.target;
       setFormData({...formData, [name]: value})
    }
    const signupSubmit = (e)=>{
      e.preventDefault();
      console.log(formData);
    }
  return (
    <>
    <div className="signup-container">
      <form className="signup-form" onSubmit={ signupSubmit } method='POST' action='/api/signup' >
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

        <label>Email</label>
        <input
          type="email"
          name="email"
          placeholder="Enter email"
          value={formData.email}
          onChange={handleChange}
          required
        />

        <label>Phone</label>
        <input
          type="tel"
          name="phone"
          placeholder="Enter phone number"
          value={formData.phone}
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

        <input type="submit" value="Sign Up" className="submit-btn" />
      </form>
    </div>
    </>
  )
}

export default UserSignupForm