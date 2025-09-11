import React from 'react'
import '../Style/ShopOwner/ShopOwnerForm.css'
import { Link } from 'react-router-dom'


const ShopkeeperForm = () => {
  const [formData, setFormData] = React.useState({
    ownerName: '',
    email: '',
    phone: '',
    shopName: '',
    services: [],
    address: '',
    username: '',
    password: '',
    confirmPassword: ''
  });

  const [errors, setErrors] = React.useState({});

  const serviceOptions = [
    "AC Repair",
    "Cooler Repair",
    "Fridge Service",
    "Washing Machine Repair",
    "Electrical Wiring",
    "Inverter Service",
    "Geyser Repair",
    "Microwave Fix",
    "Fan Repair",
    "TV Repair",
    "Mixer/Grinder Fix",
    "Wiring Work",
    "AC Gas Refill",
    "Cooler Motor Repair",
    "Inverter Repair",
    "UPS Battery Change"
  ];
  
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === 'checkbox') {
      let updatedServices = [...formData.services];
      if (checked) {
        updatedServices.push(value);
      } else {
        updatedServices = updatedServices.filter(service => service !== value);
      }
      setFormData({ ...formData, services: updatedServices });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const validate = () => {
    let tempErrors = {};
    if (!formData.ownerName) tempErrors.ownerName = "Owner name is required";
    if (!formData.email) tempErrors.email = "Email is required";
    if (!formData.phone) tempErrors.phone = "Phone number is required";
    if (!formData.shopName) tempErrors.shopName = "Shop name is required";
    if (formData.services.length === 0) tempErrors.services = "At least one service must be selected";
    if (!formData.address) tempErrors.address = "Address is required";
    if (!formData.username) tempErrors.username = "Username is required";
    if (!formData.password) tempErrors.password = "Password is required";
    if (formData.password !== formData.confirmPassword) tempErrors.confirmPassword = "Passwords do not match";
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      // Submit form data to server or perform desired actions
      console.log("Form submitted successfully", formData);
      // Reset form after submission
      setFormData({
        ownerName: '',
        email: '',
        phone: '',
        shopName: '',
        services: [],
        address: '',
        username: '',
        password: '',
        confirmPassword: ''
      });
      setErrors({});
    }
  };

  return (
    <div className="career-page">
      <div className="career-container">
        <h2>Register Your Shop</h2>
        <p>Join our platform and reach customers near you.</p>
        <form onSubmit={handleSubmit} className="registration-form">

          <h3>Owner Information</h3>
          <input type="text" name="ownerName" placeholder="Full Name" value={formData.ownerName} onChange={handleChange} />
          {errors.ownerName && <p className="error">{errors.ownerName}</p>}

          <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} />
          {errors.email && <p className="error">{errors.email}</p>}

          <input type="tel" name="phone" placeholder="Phone Number" value={formData.phone} onChange={handleChange} />
          {errors.phone && <p className="error">{errors.phone}</p>}

          <h3>Shop Information</h3>
          <input type="text" name="shopName" placeholder="Shop Name" value={formData.shopName} onChange={handleChange} />
          {errors.shopName && <p className="error">{errors.shopName}</p>}

          <label>Services Offered:</label>
          <div className="services-checkbox">
            {serviceOptions.map((service, idx) => (
              <div key={idx} className="checkbox-item">
                <input type="checkbox" name="services" value={service} onChange={handleChange} />
                <label>{service}</label>
              </div>
            ))}
          </div>
          {errors.services && <p className="error">{errors.services}</p>}

          <input type="text" name="address" placeholder="Shop Address" value={formData.address} onChange={handleChange} />
          {errors.address && <p className="error">{errors.address}</p>}

          <h3>Login Credentials</h3>
          <input type="text" name="username" placeholder="Username" value={formData.username} onChange={handleChange} />
          {errors.username && <p className="error">{errors.username}</p>}

          <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} />
          {errors.password && <p className="error">{errors.password}</p>}

          <input type="password" name="confirmPassword" placeholder="Confirm Password" value={formData.confirmPassword} onChange={handleChange} />
          {errors.confirmPassword && <p className="error">{errors.confirmPassword}</p>}

          <button type="submit" className="submit-btn">Register Shop</button>
          <p className="login-link">
          Already have an account? <Link to="/shopOwnerLogin">Login</Link>
        </p>
        </form>
      </div>
    </div>
  );
  
}

export default ShopkeeperForm