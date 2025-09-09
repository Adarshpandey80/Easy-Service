import React from 'react'
 import "../Style/Services.css"



const Services = () => {

  const shopImages = [
    "/Images/shopImage/shop1.webp",
    "/Images/shopImage/shop2.webp",
    "/Images/shopImage/shop3.webp",
    "/Images/shopImage/shop4.webp",
    "/Images/shopImage/shop5.avif",
    
  ];

  const shops = [
    {
      name: "CoolTech Services",
      services: ["AC Repair", "Cooler Repair", "Fridge Service"],
      location: "Lucknow, UP",
      rating: 4.5,
      img: shopImages[Math.floor(Math.random() * shopImages.length)],
    },
    {
      name: "HomeCare Electricians",
      services: ["Washing Machine Repair", "Electrical Wiring", "Inverter Service"],
      location: "Kanpur, UP",
      rating: 4.7,
      img: shopImages[Math.floor(Math.random() * shopImages.length)],
    },
    {
      name: "QuickFix Appliances",
      services: ["Geyser Repair", "Microwave Fix", "Fan Repair"],
      location: "Varanasi, UP",
      rating: 4.3,
      img: shopImages[Math.floor(Math.random() * shopImages.length)],
    },
    {
      name: "Sharma Electricals",
      services: ["TV Repair", "Mixer/Grinder Fix", "Wiring Work"],
      location: "Prayagraj, UP",
      rating: 4.6,
      img: shopImages[Math.floor(Math.random() * shopImages.length)],
    },
    {
      name: "Metro Appliance Care",
      services: ["Fridge Service", "AC Gas Refill", "Cooler Motor Repair"],
      location: "Noida, UP",
      rating: 4.4,
      img: shopImages[Math.floor(Math.random() * shopImages.length)],
    },
    {
      name: "City Power Solutions",
      services: ["Inverter Repair", "UPS Battery Change", "Wiring"],
      location: "Gorakhpur, UP",
      rating: 4.8,
      img: shopImages[Math.floor(Math.random() * shopImages.length)],
    },
    {
      name: "Apna Service Center",
      services: ["Washing Machine", "Microwave", "Fan Repair"],
      location: "Delhi NCR",
      rating: 4.5,
      img: shopImages[Math.floor(Math.random() * shopImages.length)],
    },
    {
      name: "Trusty Electricians",
      services: ["Geyser Fix", "TV Repair", "Mixer/Grinder Repair"],
      location: "Agra, UP",
      rating: 4.2,
      img: shopImages[Math.floor(Math.random() * shopImages.length)],
    },
    {
      name: "SmartFix Electronics",
      services: ["Fridge Repair", "AC Installation", "RO Service"],
      location: "Bareilly, UP",
      rating: 4.9,
      img: shopImages[Math.floor(Math.random() * shopImages.length)],
    },
    {
      name: "EasyHome Repairs",
      services: ["Cooler Service", "Microwave", "Washing Machine"],
      location: "Lucknow, UP",
      rating: 4.6,
      img: shopImages[Math.floor(Math.random() * shopImages.length)],
    },
  ];

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
          {shops.map((shop, index) => (
            <div className="shop-card" key={index}>
              <img src={shop.img} alt={shop.name} className="shop-img" />
              <h3>{shop.name}</h3>
              <p><strong>Services:</strong> {shop.services.join(", ")}</p>
              <p><strong>Location:</strong> {shop.location}</p>
              <p><strong>Rating:</strong> ⭐ {shop.rating}</p>
              <button className="btn">Book Now</button>
            </div>
          ))}
        </div>
      </section>

    </>
  )
}

export default Services