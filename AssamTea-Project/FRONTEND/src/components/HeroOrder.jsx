import React from 'react';
import './HeroSection.css';
import teaImage from '../assets/images/BG.jpg';

const HeroOrder = () => (
  <div className="hero-section d-flex align-items-center justify-content-center text-white" style={{ backgroundImage: `linear-gradient(rgba(15,10,9,0.3),rgba(15,10,9,0.3)),url(${teaImage})`, backgroundPosition: 'center'}}>
    <div className="hero-content">
      <h1>Bulk Orders & Wholesale Enquiry<br/></h1>
      <h4>Partner with us for your tea supply needs.</h4>
      {/* <button className="btn btn-warning text-dark mt-3">ORDER NOW</button> */}
    </div>
  </div>
);

export default HeroOrder;
