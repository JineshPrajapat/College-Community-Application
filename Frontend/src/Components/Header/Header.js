// import React, { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';
// import LogOutButton from '../LogOutButton/LogOutButton';
// import '@fortawesome/fontawesome-free/css/all.css';
// import { images } from '../../constants';
// import './Header.scss';

// function Header() {

//       function navbarToggle() {
//             var x = document.getElementById("navbar");
//             if (x.className === "header-content__navbar") {
//                   x.className += " responsive";
//             } else {
//                   x.className = "header-content__navbar";
//             }
//       }

//       return (
//             <>
//                   {/* <!-- heading ----main box of heading-----heading --> */}
//                   <header className="header-content">
//                         <div className="header-content__heading">
//                               {/* <div className="col-lg-8"> */}
//                               <div className="header-content__heading__logo">
//                                     <img src={images.logo12} alt="logo" id="logoimg" />
//                                     <a href="/">CareerPrepHub</a>
//                                     <a href="javascript:void(0);" className='icon' onClick={navbarToggle} ><i className='fa fa-bars' /></a>
//                               </div>
//                               {/* </div> */}
//                         </div>
//                         <div className="header-content__navbar" id='navbar'>
//                               <li><Link to="/Users">Users</Link></li>
//                               <li><Link to="/Questions">Questions</Link></li>
//                               <li><Link to="/Opportunity">Opportunity</Link></li>
//                               <li><Link to="/Experience">Experience</Link></li>
//                               <li><Link to="/Discuss">Discuss</Link></li>
//                               <li><Link to="/PlacementStats">PlacementStats</Link></li>
//                               <li><Link to="/UserProfile/*">Profile</Link></li>
//                               <li><LogOutButton/></li>
//                         </div>

//                         {/* <div className=' bg-white'>
//                               <div className=' pt-2 flex '>
//                                     <div className=''>
//                                           <div className=''><i className='fa fa-bars' /></div>
//                                           <div className=' text-xs'>Home</div>
//                                     </div>
//                                     <div className=''>
//                                           <div className=''><i className='fa fa-bars' /></div>
//                                           <div className=' text-xs'>Questions</div>
//                                     </div>
//                                     <div className=''>
//                                           <div className=''><i className='fa fa-bars' /></div>
//                                           <div className=' text-xs'>Network</div>
//                                     </div>
//                                     <div className=''>
//                                           <div className=''><i className='fa fa-bars' /></div>
//                                           <div className=' text-xs'>Discuss</div>
//                                     </div>
//                                     <div className=''>
//                                           <div className=''><i className='fa fa-bars' /></div>
//                                           <div className='text-xs'>More</div>
//                                     </div>
//                               </div>
//                         </div> */}
//                   </header>

//                   {/* <header>

//                   </header> */}
//             </>
//       )
// }

// export default Header


import React, { useState, useRef, useEffect } from 'react'
import { NavLink, Routes, Route } from "react-router-dom";
import { images } from '../../constants/index'
import { IonIcon } from "@ionic/react";
import LogOutButton from '../LogOutButton/LogOutButton';
import { notificationsSharp, chatbubblesOutline, options, personOutline, settingsOutline, helpCircleOutline, moonOutline, logOutOutline } from "ionicons/icons";

import { SlideIn } from '../SlideIn/SlideIn';


export const Header = () => {

    const userName= localStorage.getItem("userName");
    const fullName = localStorage.getItem("fullName");
    const avatarUrl = localStorage.getItem("avatarUrl");
    const email = localStorage.getItem("email");

    // slidein controls
    const [isSlideInToggle, setIsSildeInToggle] = useState(false);

    const handleSlideInBtn = (isSlideInToggle) => {
        setIsSildeInToggle(!isSlideInToggle);
    }

    const slideInRef = useRef(null);
    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutsideSlide);
        return () => {
            document.removeEventListener("mousedown", handleClickOutsideSlide);
        };
    }, []);

    const handleClickOutsideSlide = (event) => {
        if (slideInRef.current && !slideInRef.current.contains(event.target)) {
            setIsSildeInToggle(false);
        }
    };

    
    const profilePath = `/${userName}`;
    // profile controls
    const ProfileMenufirst = [
        { name: "My Profile", icon: personOutline, path: profilePath },
        { name: "Setting", icon: settingsOutline, path: "/Setting" },
        // { name: "Dark Mode", icon: settingsOutline, path: "/darrkmode" },
    ]

    const ProfileMenuSecond = [
        { name: "Dark Mode", icon: moonOutline, path: "/darmode" },
        { name: "Help Center", icon: helpCircleOutline, path: "/help" },
    ]

    const [isProfileBar, setIsProfileBar] = useState(0);
    const handleProfileClick = (isProfileBar) => {
        setIsProfileBar(!isProfileBar);
    }

    const profileRef = useRef(null);
    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const handleClickOutside = (event) => {
        if (profileRef.current && !profileRef.current.contains(event.target)) {
            setIsProfileBar(false);
        }
    };

    

    return (
        <div>
            <header className='max-h-12 sm:max-h-20 w-full bg-white border-b-2 fixed top-0 left-0 z-50'>
                <div className=' p-2 calcsm:px-8 sm:py-4 flex flex-row justify-between items-center'>
                    <NavLink to="/" className='flex cursor-pointer'>
                        <div className='w-7 h-7 sm:w-9 sm:h-9 flex items-center'>
                            <img src={images.mainLogo1} alt="Logo" />
                        </div>
                        <div className='font-sans text:xs sm:text-2xl pl-2 sm:pl-3'>CareerPrepHub</div>
                    </NavLink>

                    <div className='right-side flex flex-row gap-1 sm:gap-4 items-center'>
                        <NavLink to="/Chat" className='chat-option w-5 h-5'>
                            <IonIcon icon={chatbubblesOutline} className=' w-full h-full text-gray-500' alt='' />
                        </NavLink>
                        <NavLink to="/Notification" className='groups w-5 h-5'>
                            <IonIcon icon={notificationsSharp} className=' w-full h- text-gray-500 ' alt='' />
                        </NavLink>

                        <div
                            className={`hamburger chat-option w-5 h-5 sm:hidden   ${isSlideInToggle === 1 && ""}`}
                            onClick={() => handleSlideInBtn(isSlideInToggle)}
                        >
                            <IonIcon icon={options} className=' w-full h- text-gray-500  ' alt='' />
                        </div>

                        <div className='cursor-pointer w-8 h-8 sm:w-11 sm:h-11   rounded-full  relative'
                            onClick={() => handleProfileClick(isProfileBar)}
                        >
                            <img src={avatarUrl ? avatarUrl : images.userlogo} className=' w-full h-full rounded-full' alt='' />
                        </div>

                        
                    </div>
                </div>
                <Routes>
                    <Route path="/Cha" element={<SlideIn />} />
                    <Route path="/Notificatio" element={<SlideIn />} />
                </Routes>
            </header>

            {isSlideInToggle && <div ref={slideInRef}>
                <SlideIn isSlideInToggle={isSlideInToggle}
                    setIsSildeInToggle={setIsSildeInToggle}
                />
            </div>}



            {/* profile bar */}
            {isProfileBar && (
                <div ref={profileRef} className='flex flex-col fixed shadow-md w-[254px] sm:w-[295px] top-12 right-4 sm:top-20 sm:right-6 z-50   '>
                    <div className=' pt-3 pb-4 w-[254px] sm:w-[295px] absolute bg-white rounded-lg shadow-2xl shadow-black '>
                        <div className=' px-4 pb-3 text-left font-sans'>
                            <div className='text-[16px] sm:text-2xl '>{fullName ? fullName : "" }</div>
                            <div className=' text-xs  sm:text-[16px] '>{email ? email : ""}</div>
                        </div>
                        <hr className=' m-0' />
                        <ul className='px-3 sm:py-4  '>
                            {ProfileMenufirst.map((menu, index) => (
                                <li className='links'>
                                    <NavLink
                                        className={`flex items-center gap-2 py-3 rounded-full hover:bg-blue-400 hover:text-white`}
                                        to={menu.path}
                                        onClick={() => handleProfileClick(isProfileBar)}
                                    >
                                        <span className={`text-xl sm:text-2xl pl-2 flex items-center `}>
                                            <IonIcon icon={menu.icon} />
                                        </span>
                                        <span className={``}>
                                            {menu.name}
                                        </span>
                                    </NavLink>
                                </li>
                            ))}
                        </ul>
                        <hr className='m-0' />
                        <ul className='px-3 sm:py-4'>
                            {ProfileMenuSecond.map((menu, index) => (
                                <li className='links'>
                                    <NavLink
                                        className={`flex items-center gap-2 py-3 rounded-full hover:bg-blue-400 hover:text-white`}
                                        to={menu.path}
                                        activeClassName="bg-blue-400 text-white"
                                        onClick={() => handleProfileClick(isProfileBar)}
                                    >
                                        <span className={`text-xl sm:text-2xl pl-2 flex items-center`}>
                                            <IonIcon icon={menu.icon} />
                                        </span>
                                        <span className={`flex`}>
                                            {menu.name}
                                        </span>
                                    </NavLink>
                                </li>
                            ))}
                        </ul>
                        <hr className=' m-0' />
                        <ul className='px-3 sm:pt-4'>
                            <li className='links'>
                                <li
                                    className={`flex items-center gap-2 py-3 rounded-full hover:bg-blue-400 hover:text-white`}
                                >
                                    <span className={` text-2xl pl-2 flex items-center `}>
                                        <IonIcon icon={logOutOutline} />
                                    </span>
                                    <LogOutButton />
                                </li>
                            </li>
                        </ul>
                    </div>
                </div>
            )}

        </div>
    )
}
