import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../Style/UserFormStyle/Signup.css";


const UserSignupForm = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    phone: "",
    password: "",
  });
   const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
 const validateForm = () => {
    let newErrors = {};

    if (!formData.username.trim()) {
      newErrors.username = "Username is required";
    }

    if (!formData.email.match(/^[a-zA-Z0-9._%+-]+@gmail\.com$/)) {
      newErrors.email = "Email must be a valid @gmail.com address";
    }

    if (!formData.phone.match(/^\d{10}$/)) {
      newErrors.phone = "Phone must be exactly 10 digits";
    }

    // ✅ Password: at least 6 chars, 1 uppercase, 1 lowercase, 1 digit
    if (
      !formData.password.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,}$/)
    ) {
      newErrors.password =
        " must include A-Z, a-z, 0-9 & symbol (@$!%*?&)";
    }

    return newErrors;
  };

   const signupSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validateForm();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      setErrors({});
      console.log("Form Data Submitted:", formData);
      // 👉 Call API here
    }



   

  };

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
         {errors.username && <p className="error">{errors.username}</p>}

        <label>Email (Gmail only)</label>
        <input
          type="email"
          name="email"
          placeholder="Enter Gmail address"
          value={formData.email}
          onChange={handleChange}
          pattern="[a-zA-Z0-9._%+-]+@gmail\.com"
          required
        />
          {errors.email && <p className="error">{errors.email}</p>}

        <label>Phone</label>
        <input
          type="tel"
          name="phone"
          placeholder="Enter phone number"
          value={formData.phone}
          onChange={handleChange}
          pattern="[0-9]{10}"
          required
        />
          {errors.phone && <p className="error">{errors.phone}</p>}

        <label>Password</label>
        <input
          type="password"
          name="password"
          placeholder="Enter password"
          value={formData.password}
          onChange={handleChange}
          minLength="6"
          required
        />
          {errors.password && <p className="error">{errors.password}</p>}

        <input type="submit" value="Sign Up" className="submit-btn" />
        <p className="login-link">
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </form>
    </div>
  );
};

export default UserSignupForm;
