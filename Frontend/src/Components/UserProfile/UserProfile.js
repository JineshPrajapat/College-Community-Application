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
import UserProfileSettings from './UserProfileSettings/UserProfileSettings';
import UpdateProfileSettings from './UpdateProfileSettings/UpdateProfileSettings';
import Header from '../Header/Header';
// import Home from './Home/Home'
const user = {
    coverImage: "",
    userImg:images.jinesh,
    userName:'Jinesh Prajapat',
    position:"C++ Developer",
    bio:"As a passionate learner and student of Artificial Intelligence and Data Science from India, I possess a strong command of C++, SQL, and knew web development, along with a burgeoning expertise in AI/ML."
  }


function UserProfile() {
  
  return (

    <>
    <Header/>
    <div className="top-cover">
      <div className="profile-box">
        {/* profile landing */}
        <div className="cover-in" style={{ backgroundImage: `url(${user.coverImage ? user.coverImage :images.cover})` }}>
          <div className="cover-row">
            <div className="user-img">
              <img src={`${user.userImg ? user.userImg :images.userlogo}`} alt={'Jinesh Prajapat'} />
            </div>
            <div className="user-bio">
              <h2>{user.userName} / {user.position}</h2>
              <p>{user.bio}</p>
            </div>
          </div>
        </div>

        {/* nav-bar */}
        <div className="nav-tabs">
          <ul className="tab-list">
            {/* <li className="nav-item" >
              <Link exact to="/" className="nav-link" id="home-tab" activeClassName="active">Home</Link>
            </li> */}
            {/* <li className="nav-item">
              <Link to="./Profile" className="nav-link" id="profile-tab" activeClassName="active">Profile</Link>
            </li> */}
            {/* <li className="nav-item">
              <Link to="./Resume" className="nav-link" id="resume-tab" activeClassName="active">Resume</Link>
            </li> */}
            <li className="nav-item">
              <Link to="./Achievement" className="nav-link" id="achievement-tab" activeClassName="active">Achievement</Link>
            </li>
            <li className="nav-item">
              <Link to="./Contact" className="nav-link" id="contact-tab" activeClassName="active">Contact</Link>
            </li>
            {/* <li className="nav-item">
              <Link to="./Setting" className="nav-link" id="contact-tab" activeClassName="active">Setting</Link>
            </li> */}
            <li className="nav-item">
              <Link to="./Update" className="nav-link" id="contact-tab" activeClassName="active">Update</Link>
            </li>
          </ul>
        </div>

        {/* calling route path */}
        <div className="tab-content">
          {/* <Home/> */}
          <Routes>
            {/* <Route path="./" element={<Home/>} /> */}
            <Route path="Contact" element={<Contact/>} />
            
            <Route path="Achievement/*" element={<Achievement/>} />
            <Route path="Setting" element = {<UserProfileSettings/>}/>
            <Route path="Update" element = {<UpdateProfileSettings/>}/>
          </Routes>
          <Home/>;

          {/* <Route path="Profile" element={<Profile/>} /> */}
            {/* <Route path="Resume" element={<Resume/>} /> */}
          {/* <Contact/> */}
        </div>

      </div> 
    </div></>
  );
}

export default UserProfile;
