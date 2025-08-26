import React from 'react'


const Services = () => {

  const services = [
    { img: "/Images/friz.png", title: "Fridge Repair", desc: "Cooling issues, gas refill, compressor repair" },
    { img: "/Images/cooler.jpg", title: "Cooler Service", desc: "Motor replacement, cooling pad service" },
    { img: "/Images/washingmachine.avif", title: "Washing Machine Repair", desc: "Top/Front load, fully automatic service" },
    { img: "/Images/AC.webp", title: "AC Service & Installation", desc: "Gas refill, cooling & full service" },
    { img: "/Images/wiring.jpg", title: "Electrical Wiring", desc: "Wiring, short circuit, switchboard repair" },
    { img: "/Images/Inverter.jpg", title: "Inverter / UPS Repair", desc: "Battery replacement, power backup issues" },
    { img: "/Images/Geyser.webp", title: "Geyser Repair", desc: "Heating element, leakage, thermostat issues" },
    { img: "/Images/TV.jpg", title: "TV Repair", desc: "LED/LCD/Smart TV sound & display issues" },
    { img: "/Images/Fan.webp", title: "Fan Repair", desc: "Ceiling fans, exhaust, pedestal motor issues" },
    { img: "/Images/microwave.jpg", title: "Microwave Repair", desc: "Heating issues, door switch, magnetron fix" },
    { img: "/Images/waterPurifier.webp", title: "RO Service", desc: "Filter replacement, purifier & motor issues" },
    { img: "Images/mixer.jpg", title: "Mixer Repair", desc: "Jar blade, motor, wiring & speed control issues" },
  ];
  return (

    <>

      <section className="services">
        <h2>Popular Services</h2>
        <div className="services-search">
          <input
            type="text"
            placeholder="Search for a service (e.g., Fridge, AC, Mixer...)"
            className="search-input"
          />
          <button className="btn search-btn">Search</button>
        </div>
        <div className="services-grid">
          {services.map((service, index) => (
            <div className="service-card" key={index}>
              <img src={service.img} alt={service.title} className="service-img" />
              <h3>{service.title}</h3>
              <p>{service.desc}</p>
              <button className="btn">Book Now</button>
            </div>
          ))}
        </div>
      </section>
    </>
  )
}

export default Services