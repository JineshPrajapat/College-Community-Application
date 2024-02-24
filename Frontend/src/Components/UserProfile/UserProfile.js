import React, { useState } from 'react';
import './UserProfile.scss';
import { images } from '../../constants';
import { Routes, Route } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Home from './Home/Home';
import Contact from './Contact/Contact';
import Profile from './Profile/Profile';
import Resume from './Resume/Resume';
import Achievement from './Achievments/Achievement';

function UserProfile() {
  
  return (
    <div className="top-cover">
      <div className="profile-box">
        {/* profile landing */}
        <div className="cover-in" style={{ backgroundImage: `url(${images.background})` }}>
          <div className="cover-row">
            <div className="user-img">
              <img src={images.jinesh} alt={'Jinesh Prajapat'} />
            </div>
            <div className="user-bio">
              <h2>Jinesh Prajapat / C++ Developer</h2>
              <p>As a passionate learner and student of Artificial Intelligence and Data Science from India, I possess a strong command of C++, SQL, and  knew web development, along with a burgeoning expertise in AI/ML.</p>
            </div>
          </div>
        </div>
        {/* nav-bar */}
        <div className="nav-tabs">
          <ul className="tab-list">
            <li className="nav-item" >
              <Link exact to="/" className="nav-link" id="home-tab" activeClassName="active">Home</Link>
            </li>
            <li className="nav-item">
              <Link to="/Profile" className="nav-link" id="profile-tab" activeClassName="active">Profile</Link>
            </li>
            <li className="nav-item">
              <Link to="/Resume" className="nav-link" id="resume-tab" activeClassName="active">Resume</Link>
            </li>
            <li className="nav-item">
              <Link to="/Achievement" className="nav-link" id="achievement-tab" activeClassName="active">Achievement</Link>
            </li>
            <li className="nav-item">
              <Link to="/Contact" className="nav-link" id="contact-tab" activeClassName="active">Contact</Link>
            </li>
          </ul>
        </div>

        {/* calling route path */}
        <div className="tab-content">
          <Routes>
            <Route path="/" element={<Home/>} />
            <Route path="Contact" element={<Contact/>} />
            <Route path="Profile" element={<Profile/>} />
            <Route path="Resume" element={<Resume/>} />
            <Route path="Achievement" element={<Achievement/>} />
          </Routes>
          {/* <Contact/> */}
        </div>

      </div> 
    </div>
  );
}

export default UserProfile;
