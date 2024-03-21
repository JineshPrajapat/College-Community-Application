import React, { useState, useRef, useEffect } from 'react'
import { NavLink } from "react-router-dom";
import { images } from '../../constants/index';
import { IonIcon } from "@ionic/react";
import { analyticsSharp, shieldSharp, settingsSharp, logOut, person, thumbsUpSharp, bookmark } from "ionicons/icons";
import { motion } from 'framer-motion';
import LogOutButton from "../LogOutButton/LogOutButton"


export const SlideIn = ({isSlideInToggle, setIsSildeInToggle}) => {

    const Menus = [
        {},
        { name: "View Profile", icon: person, path: "/UserProfile/*" },
        { name: "Saved", icon: bookmark, path: "/Bookmarked" },
        { name: "Community", icon: thumbsUpSharp, path: "/Community" },
        { name: "Expericences", icon: shieldSharp, path: "/Experience" },
        { name: "Placement Statistics", icon: analyticsSharp, path: "/PlacementStats" },
        { name: "Setting", icon: settingsSharp, path: "/Setting" },
        // { name: "Logout", icon: logOut, path: "/Logout" },

    ];

    const [active, setActive] = useState(0);
    const handleClick = (index) => {
        setActive(index);
    };

    // const [isSlideInToggle, setIsSildeInToggle] = useState(false);

    const handleSlideInBtn = (isSlideInToggle) => {
        setIsSildeInToggle(!isSlideInToggle);
    }


    return (

        <>
        { isSlideInToggle && (
            <div className='slide-in relative'  >
                <aside className=' w-64 h-full bg-white flex flex-col p-4  fixed left-0 top-0 z-50'>
                    <div className='user-info border-b-2 border-grey-600'>
                        <div className='w-16 h-16  rounded-full '>
                            <NavLink to="/" className='profile  '>
                                <img src={images.jinesh} className=' w-full h-full rounded-full' alt='' />
                            </NavLink>
                        </div>
                        <div className=' text-left font-serif pt-2 px-2'>Jinesh Prajapat</div>
                    </div>

                    <ul className='flex flex-col relative items-start pt-0 h-full'>
                        {Menus.map((menu, i) => (
                            <motion.li key={i}
                                initial={{ y: -60, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.7, delay: 0.2 }}
                                className={`${i >= Menus.length - 1 ? 'mt-auto border-t-[1px] bg-grey-600 w-full' : ''}`}
                            >
                                <NavLink
                                    className={`flex items-center w-full gap-3 pt-3 `}
                                    to={menu.path}
                                    activeClasName="text-white"
                                    onClick={() => { handleClick(i); handleSlideInBtn(isSlideInToggle); }}
                                >
                                    <span className={`cursor-pointer text-xs duration-500 ${i === active && " text-blue-600"}`} >
                                        <IonIcon icon={menu.icon} />
                                    </span>
                                    <span className={` cursor-pointer text-[12px]  ${active === i && " text-blue-600 duration-700 opacity-100"}`}>
                                        {menu.name}
                                    </span>
                                </NavLink>
                            </motion.li>
                        ))}

                        <li className='cursor-pointer text-[12px] flex gap-3 items-center pt-2'><IonIcon icon={logOut} /><LogOutButton /></li>
                    </ul>

                </aside>
            </div>
        )}
        </>
    )
}
