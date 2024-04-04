import React from 'react'
import { NavLink, Route, Routes, useParams } from 'react-router-dom';
import ProfileViewing from './ProfileViewing/ProfileViewing';
import ResumeVisibility from './ResumeVisibility/ResumeVisibility';
import Connection from './Connection/Connection';

export const Visibilty = () => {
    const VisisbilitMenu = [
        { name: "Profile Viewing", path: "./profileViewing" },
        { name: "Resume Visibility", path: "./resumeVisisbility" },
        { name: "Connection", path: "./connection" }
    ]

    const { '*': path } = useParams();
    console.log("visibility path:", path);

    return (
        <div>
            {path === "" && (
                <ul className='sm:py-4  '>
                    {VisisbilitMenu.map((menu, index) => (
                        <li className='links px-3 hover:bg-gray-200'>
                            <NavLink
                                className={`flex items-center justify-between py-3  `}
                                to={menu.path}
                            >
                                <span className={``}>
                                    {menu.name}
                                </span>
                                <div>
                                    <i class="fa-solid fa-arrow-right"></i>
                                </div>
                            </NavLink>
                        </li>
                    ))}
                </ul>
            )}

            <Routes>
                <Route path="/profileViewing" element={<ProfileViewing />} />
                <Route path="/resumeVisisbility" element={<ResumeVisibility />} />
                <Route path="/connection" element={<Connection />} />
            </Routes>

        </div>
    )
}
