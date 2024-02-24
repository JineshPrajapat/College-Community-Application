import React from 'react';
import { images } from '../../../constants';
import './Contact.scss';

const Contact = () => {
  return (

      <div className="tab-pane">
        <div className="row-division">
          <div className="left-side">
            <img src={images.background} allowFullScreen/>
          </div>

          <form className="right-side">
            <div className=" row row-name-email">
              <div className="name">
                <input
                  type='text'
                  placeholder='Enter Full Name'
                  name='name'
                  id='name'
                  value={""}
                />
              </div>
              <div className="email">
                <input 
                  type="email"
                  placeholder='Enter Email Address' 
                  name="email" 
                  id="email" 
                  value={""}
                />
              </div>
            </div>
            <div className="row">
              <div className="phnum">
                <input
                  type="tel"
                  placeholder='Enter Mobile Number'
                  name="Phnumber"
                  id="Phnumber"
                  value={""}
                />
              </div>
            </div>
            <div className="row">
              <div className="message">
                <textarea
                  placeholder='Enter your Message'
                  id='message'
                  name='message'
                  value={""}
                />
              </div>
            </div>
            <div className="row">
              <div className="btn-sub">
                <button>Send Message</button>
              </div>
            </div>
          </form>
        </div>
      </div>
  );
}

export default Contact;
