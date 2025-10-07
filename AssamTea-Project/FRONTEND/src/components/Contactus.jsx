import React from 'react';
import './Contactus.css';
import contactbg from '../assets/images/contact-bg.jpg';

const Contactus = () => {
  return (
    <>
      <div className="hero" style={{ backgroundImage: `linear-gradient(rgba(15,10,9,0.3),rgba(15,10,9,0.3)),url(${contactbg})`}}>
        <div className="hero-content">
          <h1 id='content-h1'>Get In Touch</h1>
          <p id='content-p'>“We’re happy to answer your questions”</p>
        </div>
      </div>
      <div className='contact-form'>
        <div className='contact-heading'>
          <h1 id='contact-heading-h1'>
            Contact From
          </h1>
        </div>
        <div className='contact-fields'>
          <div className='f-name'>
            <label> First Name : </label><br/>
            <input type='text' placeholder='Enter Your First Name : '/>
          </div>
          <div className='l-name'>
            <label> Last Name : </label><br/>
            <input type='text' placeholder='Enter Your Last Name : '/>
          </div>
          <div className='email'>
            <label> Email : </label><br/>
            <input type='mail' placeholder='Enter Your Email : '/>
          </div>
          <div className='phone'>
            <label> Phone : </label><br/>
            <input type='telephone' placeholder='Enter Your Phone No. : '/>
          </div>
          <div className='message'>
            <label> Message : </label><br/>
            <textarea placeholder='Write Your Message : '/>
          </div>
          <div className='submit-btn'>
            <button id='submit-btn'> SUBMIT </button>
          </div>
        </div>
      </div>
      <div className='contact-detail'>
        <div className='contact-detail-heading'>
          <h1 id='contact-detail-h1'> Contact Details </h1>
        </div>
        <div className='contact-detail-form'>
          <div className='address-map'>
            <label> Address With Map : </label><br/>
            <textarea placeholder='Write Your Address With Map : '/>
          </div>
          <div className='contact-detail-email'>
            <label> Email : </label><br/>
            <input type="mail" placeholder='Write Your Email : '/>
          </div>
          <div className='contact-detail-phone'>
            <label> Phone : </label><br/>
            <input type="tele" placeholder='Write Your Phone : '/>
          </div>
          <div className='contact-detail-work'>
            <label> Working Hour : </label><br/>
            <input type="text" placeholder='Write Your Working Hour : '/>
          </div>
          <div className='contact-detail-btn'>
            <button id='submit-btn'> SUBMIT </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Contactus;