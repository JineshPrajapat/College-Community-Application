import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import LogOutButton from '../LogOutButton/LogOutButton';
import '@fortawesome/fontawesome-free/css/all.css';
import { images } from '../../constants';
import './Header.scss';

function Header() {

      function navbarToggle() {
            var x = document.getElementById("navbar");
            if (x.className === "header-content__navbar") {
                  x.className += " responsive";
            } else {
                  x.className = "header-content__navbar";
            }
      }

      return (
            <>
                  {/* <!-- heading ----main box of heading-----heading --> */}
                  <header className="header-content">
                        <div className="header-content__heading">
                              {/* <div className="col-lg-8"> */}
                              <div className="header-content__heading__logo">
                                    <img src={images.logo12} alt="logo" id="logoimg" />
                                    <a href="/">CareerPrepHub</a>
                                    <a href="javascript:void(0);" className='icon' onClick={navbarToggle} ><i className='fa fa-bars' /></a>
                              </div>
                              {/* </div> */}
                        </div>
                        <div className="header-content__navbar" id='navbar'>
                              <li><Link to="/Users">Users</Link></li>
                              <li><Link to="/Questions">Questions</Link></li>
                              <li><Link to="/Opportunity">Opportunity</Link></li>
                              <li><Link to="/Experience">Experience</Link></li>
                              <li><Link to="/Discuss">Discuss</Link></li>
                              <li><Link to="/PlacementStats">PlacementStats</Link></li>
                              <li><Link to="/UserProfile/*">Profile</Link></li>
                              <li><LogOutButton/></li>
                        </div>

                        {/* <div className=' bg-white'>
                              <div className=' pt-2 flex '>
                                    <div className=''>
                                          <div className=''><i className='fa fa-bars' /></div>
                                          <div className=' text-xs'>Home</div>
                                    </div>
                                    <div className=''>
                                          <div className=''><i className='fa fa-bars' /></div>
                                          <div className=' text-xs'>Questions</div>
                                    </div>
                                    <div className=''>
                                          <div className=''><i className='fa fa-bars' /></div>
                                          <div className=' text-xs'>Network</div>
                                    </div>
                                    <div className=''>
                                          <div className=''><i className='fa fa-bars' /></div>
                                          <div className=' text-xs'>Discuss</div>
                                    </div>
                                    <div className=''>
                                          <div className=''><i className='fa fa-bars' /></div>
                                          <div className='text-xs'>More</div>
                                    </div>
                              </div>
                        </div> */}
                  </header>

                  {/* <header>

                  </header> */}
            </>
      )
}

export default Header