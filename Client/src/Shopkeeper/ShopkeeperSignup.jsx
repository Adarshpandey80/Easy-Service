import React from 'react'
import '../Style/ShopOwner/ShopOwnerForm.css'
import { Link } from 'react-router-dom'
import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { FaEye, FaEyeSlash } from "react-icons/fa";


const ShopkeeperSignup = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    ownerName: '',
    email: '',
    phone: '',
    shopName: '',
    shopImage: [],
    services: [],
    address: '',
    username: '',
    password: '',
    confirmPassword: ''
  });
  const [formImage, setFormImage] = useState([]);

  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedSubcategories, setSelectedSubcategories] = useState([]);
  const [subcategoryPrices, setSubcategoryPrices] = useState({});
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);

  // Hierarchical service structure with subcategories and prices
  const serviceCategories = {
    "Electronics Services": {
      subcategories: [
        { name: "AC Repair", defaultPrice: 500 },
        { name: "Wiring Services", defaultPrice: 300 },
        { name: "Cooler Repair", defaultPrice: 400 },
        { name: "Fridge Repair", defaultPrice: 600 },
        { name: "Washing Machine Repair", defaultPrice: 700 },
        { name: "Geyser Repair", defaultPrice: 450 },
        { name: "Microwave Repair", defaultPrice: 350 },
        { name: "Fan Repair", defaultPrice: 250 },
        { name: "TV Repair", defaultPrice: 800 },
        { name: "Mixer/Grinder Repair", defaultPrice: 200 }
      ]
    },
    "Carpentry": {
      subcategories: [
        { name: "Door Installation", defaultPrice: 1500 },
        { name: "Cabinet Making", defaultPrice: 2000 },
        { name: "Wooden Furniture Repair", defaultPrice: 800 },
        { name: "Shelving Installation", defaultPrice: 1000 },
        { name: "Custom Wood Work", defaultPrice: 2500 }
      ]
    },
    "Cleaning Services": {
      subcategories: [
        { name: "Home Cleaning", defaultPrice: 400 },
        { name: "Window Cleaning", defaultPrice: 200 },
        { name: "Carpet Cleaning", defaultPrice: 600 },
        { name: "Deep Cleaning", defaultPrice: 1000 },
        { name: "Office Cleaning", defaultPrice: 1500 }
      ]
    },
    "Painting": {
      subcategories: [
        { name: "Wall Painting", defaultPrice: 20 },
        { name: "Interior Painting", defaultPrice: 30 },
        { name: "Exterior Painting", defaultPrice: 35 },
        { name: "Decorative Painting", defaultPrice: 50 },
        { name: "Wood Painting", defaultPrice: 25 }
      ]
    }
  };


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const handleImage = (e) => {
    setFormImage(e.target.files);

  };

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
    setSelectedSubcategories([]);
    setSubcategoryPrices({});
  };

  const handleSubcategoryChange = (e) => {
    const subcategoryName = e.target.value;
    const isChecked = e.target.checked;

    if (isChecked) {
      setSelectedSubcategories([...selectedSubcategories, subcategoryName]);

      // Set default price for this subcategory
      const subcategory = serviceCategories[selectedCategory].subcategories.find(
        sub => sub.name === subcategoryName
      );
      if (subcategory) {
        setSubcategoryPrices({
          ...subcategoryPrices,
          [subcategoryName]: subcategory.defaultPrice.toString()
        });
      }
    } else {
      setSelectedSubcategories(selectedSubcategories.filter(sub => sub !== subcategoryName));
      const newPrices = { ...subcategoryPrices };
      delete newPrices[subcategoryName];
      setSubcategoryPrices(newPrices);
    }
  };

  const handlePriceChange = (subcategoryName, price) => {
    setSubcategoryPrices({
      ...subcategoryPrices,
      [subcategoryName]: price
    });
  };

  const addService = () => {
    if (!selectedCategory || selectedSubcategories.length === 0) {
      alert("Please select category and at least one service type");
      return;
    }

    // Check if all selected subcategories have prices
    const hasAllPrices = selectedSubcategories.every(sub => subcategoryPrices[sub]);
    if (!hasAllPrices) {
      alert("Please enter price for all selected services");
      return;
    }

    // Add all selected subcategories as separate services
    const newServices = selectedSubcategories.map(subcategory => ({
      category: selectedCategory,
      subcategory: subcategory,
      price: subcategoryPrices[subcategory],
      id: Date.now() + Math.random()
    }));

    setFormData({
      ...formData,
      services: [...formData.services, ...newServices]
    });

    // Reset selections
    setSelectedCategory('');
    setSelectedSubcategories([]);
    setSubcategoryPrices({});
  };

  const removeService = (serviceId) => {
    setFormData({
      ...formData,
      services: formData.services.filter(service => service.id !== serviceId)
    });
  };

  const validate = () => {
    let tempErrors = {};
    if (!formData.ownerName) tempErrors.ownerName = "Owner name is required";
    if (!formData.email) tempErrors.email = "Email is required";
    if (!formData.phone) tempErrors.phone = "Phone number is required";
    if (!formData.shopName) tempErrors.shopName = "Shop name is required";
    if (formData.services.length === 0) tempErrors.services = "At least one service must be added";
    if (!formData.address) tempErrors.address = "Address is required";
    if (!formData.username) tempErrors.username = "Username is required";
    if (!formData.password) tempErrors.password = "Password is required";
    if (formData.password !== formData.confirmPassword) tempErrors.confirmPassword = "Passwords do not match";
    if(formImage.length > 0) {
      const allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];
      for (let i = 0; i < formData.shopImage.length; i++) {
        if (!allowedTypes.includes(formData.shopImage[i].type)) {
          tempErrors.shopImage = "Only JPG, PNG, and GIF formats are allowed";
          break;
        }
      }
    }
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validate()) {
      const api = import.meta.env.VITE_API_URL;

      // Create FormData for file upload
      const formDataToSend = new FormData();
      
      // Append form fields
      formDataToSend.append('ownerName', formData.ownerName);
      formDataToSend.append('email', formData.email);
      formDataToSend.append('phone', formData.phone);
      formDataToSend.append('shopName', formData.shopName);
      formDataToSend.append('address', formData.address);
      formDataToSend.append('username', formData.username);
      formDataToSend.append('password', formData.password);
      
      // Append services as JSON string
      formDataToSend.append('services', JSON.stringify(
        formData.services.map(({ category, subcategory, price }) => ({
          category,
          subcategory,
          price: Number(price)
        }))
      ));
      
      // Append image files
      if (formImage && formImage.length > 0) {
        for (let i = 0; i < formImage.length; i++) {
          formDataToSend.append('shopImage', formImage[i]);
        }
      }

      try {
        const response = await axios.post(`${api}/shopowner/register`, formDataToSend, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });
        console.log(response.data);
        toast.success("Shop registered successfully! Please login to continue.");
        navigate('/shopOwnerLogin');
      } catch (error) {
        console.error("Error registering shop:", error);
        toast.error(error.response?.data?.message || "Failed to register shop. Please try again.");
      }

      // Reset form after submission
      setFormData({
        ownerName: '',
        email: '',
        phone: '',
        shopName: '',
        shopImage: [],
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
        
          <input type='file' name="shopImage" placeholder="Shop Image" onChange={handleImage} multiple />
          {errors.shopImage && <p className="error">{errors.shopImage}</p>}

          <h3>Services & Pricing</h3>

          <div className="service-selection">
            <div className="form-group">
              <label>Service Category:</label>
              <select value={selectedCategory} onChange={handleCategoryChange}>
                <option value="">Select a category</option>
                {Object.keys(serviceCategories).map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>

            {selectedCategory && (
              <div className="form-group">
                <label>Select Service Types (Choose multiple):</label>
                <div className="subcategory-checkboxes">
                  {serviceCategories[selectedCategory].subcategories.map(sub => (
                    <div key={sub.name} className="subcategory-checkbox-item">
                      <input
                        type="checkbox"
                        id={sub.name}
                        value={sub.name}
                        checked={selectedSubcategories.includes(sub.name)}
                        onChange={handleSubcategoryChange}
                      />
                      <label htmlFor={sub.name}>{sub.name}</label>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {selectedSubcategories.length > 0 && (
              <div className="form-group pricing-group">
                <label>Set Prices (₹):</label>
                {selectedSubcategories.map(subcategory => (
                  <div key={subcategory} className="price-input-row">
                    <label>{subcategory}:</label>
                    <input
                      type="number"
                      value={subcategoryPrices[subcategory] || ''}
                      onChange={(e) => handlePriceChange(subcategory, e.target.value)}
                      placeholder="Enter price"
                      min="0"
                    />
                  </div>
                ))}
              </div>
            )}

            {selectedSubcategories.length > 0 && Object.keys(subcategoryPrices).length === selectedSubcategories.length && (
              <button type="button" onClick={addService} className="add-service-btn">
                + Add {selectedSubcategories.length} Service{selectedSubcategories.length > 1 ? 's' : ''}
              </button>
            )}
          </div>

          {/* Display added services */}
          {formData.services.length > 0 && (
            <div className="added-services">
              <h4>Added Services:</h4>
              <div className="services-list">
                {formData.services.map(service => (
                  <div key={service.id} className="service-item">
                    <div className="service-details">
                      <span className="service-category">{service.category}</span>
                      <span className="service-name">{service.subcategory}</span>
                      <span className="service-price">₹{service.price}</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => removeService(service.id)}
                      className="remove-service-btn"
                    >
                      Remove
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {errors.services && <p className="error">{errors.services}</p>}

          <input type="text" name="address" placeholder="Shop Address" value={formData.address} onChange={handleChange} />
          {errors.address && <p className="error">{errors.address}</p>}

          <h3>Login Credentials</h3>
          <input type="text" name="username" placeholder="Username" value={formData.username} onChange={handleChange} />
          {errors.username && <p className="error">{errors.username}</p>}

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

export default ShopkeeperSignup;