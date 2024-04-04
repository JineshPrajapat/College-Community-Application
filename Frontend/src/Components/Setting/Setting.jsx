import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { NavLink, useParams, useNavigate } from 'react-router-dom';
import { IonIcon } from "@ionic/react";
import { eye, shieldOutline, optionsOutline, lockClosed, shieldHalf, chatbubblesOutline, personOutline, settingsOutline, helpCircleOutline, moonOutline, logOutOutline } from "ionicons/icons";
import Privacy from "./Privacy/Privacy";
import { CommunicationPolicy } from './CommunicationPolicy/CommunicationPolicy';
import { HelpCenter } from './HelpCenter/HelpCenter';
import UserAgreement from './UserAgreement/UserAgreement';
import { Security } from './Security/Security';
import { Visibilty } from './Visibilty/Visibilty';
import { AccountManagement } from './AccountManagement/AccountManagement';


export const Setting = () => {

    const SettingMenu = [
        { name: "SigIn & Security", icon: lockClosed, path: "./Security" },
        { name: "Visibility", icon: eye, path: "./Visibilty" },
        { name: "Account Management", icon: shieldHalf, path: "./AccountManagement" },
    ]

    const InfoMenu = [
        { name: "Help Center", path: "./helpCenter" },
        { name: "Professional Communication Policy", path: "./communicationPolicy" },
        { name: "Privacy Policy", path: "./privacyPolicy" },
        { name: "User Agreement", path: "./userAgreement" }
    ]

    const SecurityMenu = [
        { name: "Email", path: "./changeEmail" },
        { name: "Reset Password", path: "./resetPassword" },
        { name: "Change Username", path: "./resetUsername" }
    ]

    const VisisbilitMenu = [
        { name: "Profile Viewing", path: "./profileViewing" },
        { name: "Resume Visibility", path: "./resumeVisisbility" },
        { name: "Connection", path: "./connection" }
    ]

    const AccountManagementMenu = [
        { name: "Delete Account", path: "./deleteAccount" },
    ]

    const { '*': path } = useParams();
    console.log("path:", path);

    const navigate = useNavigate();
    const handleCancel = () => {
        navigate(-1);                   // Navigate back to previous page
    };

    return (
        <div className='bg-white h-full '>
            <div className=" header flex items-center p-3 sticky top-12 border-b-2 bg-white border-gray-300">
                <div className=' cursor-pointer sm:pl-2'
                    onClick={() => handleCancel()}
                >
                    <i class="fa-solid fa-arrow-left"></i>
                </div>
                <p className='text-xl pl-3 '>
                    {path === "" ? <p>Setting</p> : ""}
                    {/* security route path */}
                    {path === "Security" ? <p>Security</p> : ""}
                        {path === "Security/changeEmail" ? <p>Change Email</p> : ""}
                        {path === "Security/resetPassword" ? <p>Reset Password</p> : ""}
                        {path === "Security/resetUsername" ? <p>Change Username</p> : ""}

                    {/* Visibilty route path */}
                    {path === "Visibilty" ? <p>Visibilty</p> : ""}
                        {path === "Visibilty/profileViewing" ? <p>Profile Viewing</p> : ""}
                        {path === "Visibilty/resumeVisisbility" ? <p>Resume Visibility</p> : ""}
                        {path === "Visibilty/connection" ? <p>Connection</p> : ""}

                    {/* AccountManagement route path */}
                    {path === "AccountManagement" ? <p>AccountManagement</p> : ""}
                        {path === "AccountManagement/deleteAccount" ? <p>Delete Account</p> : ""}

                    {/* Direct routes after setting route path */}   
                    {path === "helpCenter" ? <p>Help Center</p> : ""}
                    {path === "communicationPolicy" ? <p>Professional Communication Policy</p> : ""}
                    {path === "privacyPolicy" ? <p>Privacy Policy</p> : ""}
                    {path === "userAgreement" ? <p>User Agreement</p> : ""}
                </p>
            </div>

            <div className='content text-justify'>

                {/* render the Setting option path on basis of path from url */}
                {path === "" && (
                    <>
                        <ul className=' sm:py-4  '>
                            {SettingMenu.map((menu, index) => (
                                <li className='links px-3 hover:bg-gray-100 '>
                                    <NavLink
                                        className={`flex items-center gap-2 py-3 `}
                                        to={menu.path}
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

                        <ul className=' sm:py-4  '>
                            {InfoMenu.map((menu, index) => (
                                <li className='links px-3 hover:bg-gray-100'>
                                    <NavLink
                                        className={`flex items-center gap-2 py-3 font-semibold text-gray-700 hover:text-black`}
                                        to={menu.path}
                                    >
                                        <span className={` text-xs`}>
                                            {menu.name}
                                        </span>
                                    </NavLink>
                                </li>
                            ))}
                        </ul>
                    </>
                )}

                {/* path for just after setting link */}
                {path === "privacyPolicy" &&(
                    <Privacy/>
                )}
                {path === "helpCenter" &&(
                    <HelpCenter/>
                )}
                {path === "communicationPolicy" &&(
                    <CommunicationPolicy/>
                )}
                {path === "userAgreement" &&(
                    <UserAgreement/>
                )}


                <Routes>
                    <Route path="Security/*" element={<Security/>}/>
                    <Route path="Visibilty/*" element={<Visibilty/>}/>
                    <Route path="AccountManagement/*" element={<AccountManagement/>}/>
                </Routes>
            </div>
        </div>
    )
}
