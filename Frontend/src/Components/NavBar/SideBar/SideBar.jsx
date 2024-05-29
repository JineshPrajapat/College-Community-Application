import { IonIcon } from '@ionic/react';
import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { analyticsSharp, homeOutline,chatboxEllipsesOutline, chatbubbleOutline, bookOutline, briefcaseOutline, arrowForward, shieldOutline, shieldSharp, personOutline, thumbsUpOutline, bookmarkOutline } from "ionicons/icons";

export const SideBar = () => {

    const Menus = [
        { name: "Home", icon: homeOutline, path: "/" },
        { name: "My Network", icon: personOutline, path: "/Users" },
        { name: "Questions", icon: bookOutline, path: "/Questions" },
        { name: "Discuss", icon: chatbubbleOutline, path: "/Discuss" },
        { name: "Jobs", icon: briefcaseOutline, path: "/Opportunity" },
        { name: "Expericences", icon: chatboxEllipsesOutline, path: "/Experience" },
        { name: "Saved", icon: bookmarkOutline, path: "/Bookmark" },
        // { name: "Community", icon: thumbsUpOutline, path: "/Community" },
        { name: "Placement Statistics", icon: analyticsSharp, path: "/PlacementStats" },
    ]
    const [isToggle, setIsToggle] = useState(false);
    const [active, setActive] = useState(0);

    const handleToggleBtn = (isToggle) => {
        setIsToggle(!isToggle);
    }

    const handleClick = (index) => {
        setActive(index);
    }


    return (
        <div className=''>
            <div className='sidebar px-6 py-6 h-full bg-white rounded-xl fixed top-12 sm:top-16 left-0 z-50 '>
                <div className='sidebar-header  relative '>
                    {/* <a className='logo-wrapper flex gap-3 '>
                        <div className=" text-[32px] " >
                            <IonIcon icon={shieldSharp} className='' />
                        </div>
                        <h2 className={`${isToggle === 0 ?"hidden" : ""}`}>LOGO</h2>
                    </a> */}
                    <button
                        className='toggle-btn cursor-pointer absolute top-2 right-[-35px]  w-7 h-7 rounded-full bg-black text-white flex items-center justify-center'
                        onClick={() => handleToggleBtn(isToggle)}
                    >
                        <IonIcon icon={arrowForward} className={`${isToggle === false ? "" : " rotate-180"}`} />
                    </button>

                </div>

                <ul className='sidebar-links flex flex-col gap-3 relative'>
                    {Menus.map((menu, i) => (
                        <li className='links ' >
                            <NavLink
                                className={`flex gap-3 py-2 px-2 rounded-3xl duration-500 ${i === active && "bg-blue-400 "}`}
                                to={menu.path}
                                activeClassName="text-blue"
                                onClick={() => handleClick(i)}
                            >
                                <span className={`icon text-xl duration-500 flex items-center ${i === active && "text-white"}`}>
                                    <IonIcon icon={menu.icon} />
                                </span>
                                <span className={`links-name text-xs font-sans duration-500
                                                    ${isToggle === false ? "hidden" : ""}  ${i === active && "text-white duration-700"}`}
                                >
                                    {menu.name}
                                </span>
                            </NavLink>
                        </li>
                    ))}
                </ul>
            </div>
        </div>

    )
}
