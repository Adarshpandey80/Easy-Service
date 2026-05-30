import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import "../Style/Services.css"



const Services = () => {
  const [shopsData, setShopsData] = useState([]);
  const [filteredShops, setFilteredShops] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedService, setSelectedService] = useState("");
  const navigate = useNavigate();

  const fetchShopsData = async () => {
    try {
      const api = import.meta.env.VITE_API_URL;
      const response = await axios.get(`${api}/shops/fetchShops`);
      setShopsData(response.data);
      setFilteredShops(response.data);
      console.log(response.data);
      console.log("Fetched shops data:", response.data);
    } catch (error) {
      console.error("Error fetching shops data:", error);
    }
  };

  // Extract all unique services from shops
  const getAllServices = () => {
    const servicesSet = new Set();
    shopsData.forEach((shop) => {
      shop.services.forEach((service) => {
        servicesSet.add(service.subcategory);
      });
    });
    return Array.from(servicesSet).sort();
  };

  // Handle search input change with autocomplete
  const handleSearchChange = (e) => {
    const value = e.target.value.toLowerCase().trim();
    setSearchInput(value);
    setSelectedService(value);

    if (value.length > 0) {
      const allServices = getAllServices();
      const filtered = allServices.filter((service) =>
        service.toLowerCase().includes(value)
      );
      setSuggestions(filtered);
      setShowSuggestions(true);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
      setFilteredShops(shopsData);
    }
  };

  // Handle suggestion click
  const handleSuggestionClick = (suggestion) => {
    setSearchInput(suggestion);
    setSelectedService(suggestion);
    setShowSuggestions(false);
    filterShopsByService(suggestion);
  };

  // Filter shops based on selected service
  const filterShopsByService = (service) => {
    if (!service) {
      setFilteredShops(shopsData);
      return;
    }

    const filtered = shopsData.filter((shop) =>
      shop.services.some(
        (s) => s.subcategory.toLowerCase().includes(service.toLowerCase())
      )
    );
    setFilteredShops(filtered);
  };

  // Handle search button click
  const handleSearch = () => {
    if (selectedService) {
      filterShopsByService(selectedService);
      setShowSuggestions(false);
    }
  };

  // Handle Enter key press
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  // Close suggestions when clicking outside
  const handleBlur = () => {
    setTimeout(() => setShowSuggestions(false), 200);
  };

  useEffect(() => {
    fetchShopsData();
  }, []);


  return (

    <>

      <section className="shops">
        <h2>Nearby Shops</h2>
        <div className="services-search-container">
          <div className="search-wrapper">
            <input
              type="text"
              placeholder="Search for a service (e.g., Fridge, AC, Mixer...)"
              className="search-input"
              value={searchInput}
              onChange={handleSearchChange}
              onFocus={() => searchInput.length > 0 && setShowSuggestions(true)}
              onBlur={handleBlur}
              onKeyPress={handleKeyPress}
            />
            
            {/* Autocomplete Suggestions Dropdown */}
            {showSuggestions && suggestions.length > 0 && (
              <div className="suggestions-dropdown">
                {suggestions.map((suggestion, index) => (
                  <div
                    key={index}
                    className="suggestion-item"
                    onClick={() => handleSuggestionClick(suggestion)}
                  >
                    <span className="suggestion-icon">🔧</span>
                    <span className="suggestion-text">{suggestion}</span>
                  </div>
                ))}
              </div>
            )}

            {showSuggestions && suggestions.length === 0 && searchInput.length > 0 && (
              <div className="suggestions-dropdown">
                <div className="suggestion-item no-results">
                  No services found matching "{searchInput}"
                </div>
              </div>
            )}
          </div>

          <button className="btn search-btn" onClick={handleSearch}>
            Search
          </button>
        </div>

        {filteredShops.length === 0 && selectedService && (
          <div className="no-results-message">
            <p>No shops found for "{selectedService}". Try another service or browse all shops.</p>
            <button
              className="btn reset-btn"
              onClick={() => {
                setSearchInput("");
                setSelectedService("");
                setFilteredShops(shopsData);
              }}
            >
              Clear Search
            </button>
          </div>
        )}

        <div className="shops-grid">
          {filteredShops.map((shop) => (
            <div className="shop-card" key={shop._id}>

              {/* Image */}
              <img
                src={shop.shopImage?.[0] || 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="300" height="200"%3E%3Crect fill="%23e0e0e0" width="300" height="200"/%3E%3Ctext x="50%25" y="50%25" dominant-baseline="middle" text-anchor="middle" font-family="Arial" font-size="16" fill="%23666"%3EService Shop%3C/text%3E%3C/svg%3E'}
                alt={shop.shopName}
                className="shop-img"
                onClick={() => navigate(`/shop/${shop._id}`)}
                style={{ cursor: "pointer" }}
              />

              {/* Name */}
              <h3>{shop.shopName}</h3>

              {/* Services */}
              <p>
                <strong>Services:</strong>{" "}
                {shop.services.map((s) => s.subcategory).join(", ")}
              </p>

              {/* Location */}
              <p>
                <strong>Location:</strong> {shop.address}
              </p>

              {/* Rating */}
              <p>
                <strong>Rating:</strong> ⭐ {shop.rating || 0}
              </p>

              <button className="btn" onClick={()=>navigate(`/shop/${shop._id}`)}>Book Now</button>
            </div>
          ))}
        </div>
      </section>

    </>
  )
}

export default Services