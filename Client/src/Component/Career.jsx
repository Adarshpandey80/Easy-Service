import React from 'react'
 import '../Style/Career.css'
import { Link } from 'react-router-dom';

const Career = () => {
  return (
    <div className="career-page">
      
      {/* Hero / Feature Section */}
      <section className="career-hero">
        <h1>Grow Your Business with Easy Service</h1>
        <p>
          Easy Service connects your shop with customers in your area. 
          Get more orders, manage services efficiently, and reach new 
          clients effortlessly.
        </p>
        <Link to="/register-shop" className="register-btn">
          Register Your Shop
        </Link>
      </section>

      {/* Benefits Section */}
      <section className="career-benefits">
        <h2>Why Join Easy Service?</h2>
        <div className="benefits-list">
          <div className="benefit-item">
            <h3>Reach More Customers</h3>
            <p>Showcase your services and attract clients nearby.</p>
          </div>
          <div className="benefit-item">
            <h3>Manage Services Easily</h3>
            <p>Update services, prices, and working hours effortlessly.</p>
          </div>
          <div className="benefit-item">
            <h3>Trusted Platform</h3>
            <p>Join a platform trusted by hundreds of users.</p>
          </div>
          <div className="benefit-item">
            <h3>Quick Payments</h3>
            <p>Receive timely payments securely after service completion.</p>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="career-steps">
        <h2>How It Works</h2>
        <div className="steps-list">
          <div className="step-item">
            <span>1️⃣</span>
            <p>Register your shop with Easy Service.</p>
          </div>
          <div className="step-item">
            <span>2️⃣</span>
            <p>Customers nearby discover your services.</p>
          </div>
          <div className="step-item">
            <span>3️⃣</span>
            <p>Provide quality service and receive payments quickly.</p>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="career-extra">
        <h2>What Our Shop Owners Say</h2>
        <div className="testimonial">
          <p>
            "Easy Service helped me get more customers and grow my business 
            in just 2 months!"
          </p>
          <span>- Ramesh, AC Repair Shop</span>
        </div>
        <div className="testimonial">
          <p>
            "Managing my service bookings became so easy. Highly recommend it!"
          </p>
          <span>- Anjali, Washing Machine Repair</span>
        </div>
      </section>

      {/* Final Call To Action */}
      <section className="career-cta">
        <h2>Ready to Expand Your Shop?</h2>
        <p>Join hundreds of shop owners already earning with Easy Service.</p>
        <Link to="/register-shop" className="register-btn">
          Get Started Now
        </Link>
      </section>

    </div>
  );
};

export default Career