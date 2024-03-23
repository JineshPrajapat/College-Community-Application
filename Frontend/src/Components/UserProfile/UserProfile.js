import React, { useState, useEffect, useMemo } from 'react';
import './UserProfile.scss';
import { images } from '../../constants';
import { Routes, Route } from 'react-router-dom';
import { fetchData } from '../../FetchData/FetchData';
import baseURL from '../../api/api';
import { Link, useParams } from 'react-router-dom';
import Home from './Home/Home';
import Contact from './Contact/Contact';
import Profile from './Profile/Profile';
import Resume from './Resume/Resume';
import Achievement from './Achievments/Achievement';
import UserProfileSettings from './UserProfileSettings/UserProfileSettings';
import UpdateProfileSettings from './UpdateProfileSettings/UpdateProfileSettings';
import Header from '../Header/Header';

// import Home from './Home/Home'
// const userData = {
//     coverImage: "",
//     profileImage:images.jinesh,
//     fullName:'Jinesh Prajapat',
//     profession:"C++ Developer",
//     about:"As a passionate learner and student of Artificial Intelligence and Data Science from India, I possess a strong command of C++, SQL, and knew web development, along with a burgeoning expertise in AI/ML.",
//     state:"Rajasthan",
//     position:"Student",
//     experience:"2 Year",
//     skills:["c++","python", "c"],
//     hobbies:["cricket", "Reading"],
//     languages:["Hindi, English"],
//     Linkedin:"",
//     Github:"",
//     YouTube:"",
//     Twitter:""
//   }


function UserProfile() {

  const [userInfo, setUserInfo] = useState([]);

  // extracting username from link
  const { userName } = useParams();
  useEffect(() => {
    // fetchData(`${baseURL}/userinfo`, setUserData);
    fetchData(`${baseURL}/allusers/${userName}`, setUserInfo);
  }, [userName]);

  const userData = useMemo(() => userInfo, [userInfo]);


  const currentUserName = localStorage.getItem("userName");
  console.log(currentUserName);
  const isOwnProfile = () => {
    return userData.Data && userData?.Data?.username === currentUserName;
  }

  console.log("Data;", userData);


  return (

    <>
      <div className="top-cover">
        <div className="profile-box">
          {/* profile landing */}

          <div className="cover-in" style={{ backgroundImage: `url(${(userData?.Data?.profileDetails?.coverImage || images?.cover)})` }}>
            <div className="cover-row">
              <div className="user-img">
                <img src={`${(userData?.Data?.profileImage || userData?.userlogo)}`} alt={(userData?.Data?.profileDetails?.fullName)} />
              </div>
              <div className="user-bio">
                <h2>{(userData?.Data?.profileDetails?.fullName)} / {(userData?.Data?.profileDetails?.profession)}</h2>
                <p>{(userData?.Data?.profileDetails?.about)}</p>
              </div>
            </div>
          </div>


          {/* <div className="cover-in" style={{ backgroundImage: `url(${userData.Data.profileDetails.coverImage ? userData.Data.profileDetails.coverImage :images.cover})` }}>
          <div className="cover-row">
            <div className="user-img">
              <img src={`${userData.Data.profileImage ? userData.Data.profileImage :userData.userlogo}`} alt={'Jinesh Prajapat'} />
            </div>
            <div className="user-bio">
              <h2>{userData.Data.profileDetails.fullName} / {userData.Data.profileDetails.profession}</h2>
              <p>{userData.Data.profileDetails.about}</p>
            </div>
          </div>
        </div> */}

          {/* nav-bar */}
          <div className="nav-tabs">
            <ul className="tab-list">
              <li className="nav-item" >
                <Link to="./" className="nav-link" id="home-tab" activeClassName="active">Home</Link>
              </li>
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
              {isOwnProfile() &&
                <li className="nav-item">
                  <Link to="./Update" className="nav-link" id="contact-tab" activeClassName="active">Update</Link>
                </li>
              }


            </ul>
          </div>

          {/* calling route path */}
          <div className="tab-content">
            {/* <Home/> */}
            <Routes>
              <Route path="/*" element={<Home userData={userData} />} />
              <Route path="Contact" element={<Contact />} />
              <Route path="Achievement/*" element={<Achievement />} />
              {/* <Route path="Setting" element={<UserProfileSettings />} /> */}

              {isOwnProfile() &&
                <Route path="Update" element={<UpdateProfileSettings />} />
              }
            </Routes>

            {/* <Route path="Profile" element={<Profile/>} /> */}
            {/* <Route path="Resume" element={<Resume/>} /> */}
            {/* <Contact/> */}
          </div>

        </div>
      </div></>
  );
}

export default UserProfile;
