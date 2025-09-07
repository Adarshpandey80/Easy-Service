import React from 'react'

const ShopkeeperForm = () => {
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
        </form>
      </div>
    </div>
  );
  
}

export default ShopkeeperForm