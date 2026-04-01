import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "../Style/ShowShopDetails.css";

const ShowShopDetails = () => {
  const { id } = useParams();
  const [shop, setShop] = useState(null);

  useEffect(() => {
    const fetchShop = async () => {
      try {
        const api = import.meta.env.VITE_API_URL;
        const res = await axios.get(`${api}/shops/shopowner/${id}`);
        setShop(res.data);
        console.log("Fetched shop details:", res.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchShop();
  }, [id]);

  if (!shop) return <p>Loading...</p>;

  return (
    <div className="shop-details">

      {/* Top Section */}
      <div className="shop-header">
        <img
          src={shop.shopImage?.[0] || "https://via.placeholder.com/400"}
          alt={shop.shopName}
        />
        <div>
          <h1>{shop.shopName}</h1>
          <p>{shop.address}</p>
          <p>⭐ {shop.rating || 4.5}</p>
        </div>
      </div>

      {/* Services */}
      <div className="section">
        <h2>Services</h2>
        <div className="services-list">
          {shop.services.map((s, i) => (
            <div key={i} className="service-item">
              <span>{s.subcategory}</span>
              <span>₹{s.price}</span>
            </div>
          ))}
        </div>
      </div>

      {/* About */}
      <div className="section">
        <h2>About Shop</h2>
        <p>Owner: {shop.ownerName}</p>
        <p>Email: {shop.email}</p>
        <p>Phone: {shop.phone}</p>
      </div>

      {/* Feedback (Dummy for now) */}
      <div className="section">
        <h2>Customer Reviews</h2>

        <div className="review">
          <p>⭐ 5 - Excellent service!</p>
        </div>

        <div className="review">
          <p>⭐ 4 - Good work, on time.</p>
        </div>
      </div>

      {/* Book Button */}
      <button className="book-btn">Book Service</button>

    </div>
  );
};

export default ShowShopDetails;