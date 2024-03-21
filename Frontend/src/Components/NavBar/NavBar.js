import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { IonIcon } from "@ionic/react";
import { home, chatbubble, people, book, briefcase } from "ionicons/icons";
import { SideBar } from "./SideBar/SideBar";

const NavBar = () => {
  const MobileMenus = [
    { name: "Home", icon: home, dis: "translate-x-0", path: "/" },
    { name: "My Network", icon: people, dis: "translate-x-16", path: "/Users" },
    { name: "Questions", icon: book, dis: "translate-x-32", path: "/Questions" },
    { name: "Discuss", icon: chatbubble, dis: "translate-x-48", path: "/Discuss" },
    { name: "Jobs", icon: briefcase, dis: "translate-x-64", path: "/Opportunity" },
  ];
  const [active, setActive] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 390);
    };

    // Initial check
    handleResize();

    // Event listener for window resize
    window.addEventListener("resize", handleResize);

    // Cleanup
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleClick = (index) => {
    setActive(index);
  };

  return (
    <>
      {isMobile ? (
        <div className="bg-white max-h-[4.4rem] px-6 rounded-t-xl fixed bottom-0 z-50">
          <ul className="flex relative pb-1">
            <span
              className={`bg-blue-500 duration-500 ${MobileMenus[active].dis} border-5 border-blue-50 h-16 w-16 absolute
         -top-7 rounded-full`}
            >
            </span>
            {MobileMenus.map((menu, i) => (
              <li key={i} className=" w-16">
                <NavLink
                  className="flex flex-col text-center pt-2"
                  to={menu.path}
                  activeClassName="text-white"
                  onClick={() => handleClick(i)}
                >
                  <span className={`cursor-pointer text-xl duration-500 ${i === active && "-mt-4 text-white"}`} >
                    <IonIcon icon={menu.icon} />
                  </span>
                  <span className={` ${active === i ? "translate-y-4 text-[10px] duration-700 opacity-100" : "text-[10px] duration-700 opacity-100"}`}>
                    {menu.name}
                  </span>
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
      ) : (

        <SideBar />
      )}
    </>
  );
};

export default NavBar;
