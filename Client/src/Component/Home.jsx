import React from 'react'
import '../Style/Home.css'


const Home = () => {
  return (
  <>
  
   <section className="hero">
      <div className="hero-overlay">
        <div className="hero-content">
          <h1>Fast & Reliable Electrician & Home Appliance Repair</h1>
          <p>
            Fridge, Cooler, Washing Machine, AC & more – Expert Service at Your
            Doorstep
          </p>
          <div className="hero-buttons">
            <button className="btn primary">Book a Service</button>
            <button className="btn secondary">Search Service Near You</button>
          </div>
        </div>
      </div>
    </section>
  
  </>
  )
}

export default Home
