import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import "../Style/Services.css"



const Services = () => {
  const [shopsData, setShopsData] = useState([]);
  const navigate = useNavigate();

  

  

  const fetchShopsData = async () => {
    try {
      const api = import.meta.env.VITE_API_URL;
      const response = await axios.get(`${api}/shops/fetchShops`);
      setShopsData(response.data);
      console.log("Fetched shops data:", response.data);
    } catch (error) {
      console.error("Error fetching shops data:", error);
    }
  };


  useEffect(() => {
    fetchShopsData();
  }, []);


  return (

    <>

      <section className="shops">
        <h2>Nearby Shops</h2>
        <div className="services-search">
          <input
            type="text"
            placeholder="Search for a service (e.g., Fridge, AC, Mixer...)"
            className="search-input"
          />
          <button className="btn search-btn">Search</button>
        </div>
        <div className="shops-grid">
          {shopsData.map((shop) => (
            <div className="shop-card" key={shop._id}>

              {/* Image */}
              <img
                src={shop.shopImage?.[0] }
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