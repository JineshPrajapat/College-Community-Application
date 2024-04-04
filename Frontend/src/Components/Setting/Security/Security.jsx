import React from 'react'
import { NavLink, Route, Routes, useParams } from 'react-router-dom';
import ChangeEmail from './ChangeEmail/ChangeEmail';
import ResetPassword from './ResetPassword/ResetPassword';
import ChangeUserName from "./ChangeUserName/ChangeUserName";

export const Security = () => {
    const SecurityMenu = [
        { name: "Email", path: "./changeEmail" },
        { name: "Reset Password", path: "./resetPassword" },
        { name: "Change Username", path: "./resetUsername" }
    ]

    const { '*': path } = useParams();
    console.log("security path:", path);
    return (
        <div>
            {path === "" && (
                <ul className=' sm:py-4 '>
                    {SecurityMenu.map((menu, index) => (
                        <li className='links px-3 hover:bg-gray-200'>
                            <NavLink
                                className={`flex items-center justify-between py-3 `}
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
                <Route path="/changeEmail" element={<ChangeEmail/>}/>
                <Route path="/resetPassword" element={<ResetPassword/>}/>
                <Route path="/resetUsername" element={<ChangeUserName/>}/>
            </Routes>
        </div>
    )
}
