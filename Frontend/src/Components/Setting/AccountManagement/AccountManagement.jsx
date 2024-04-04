import React from 'react'
import { NavLink, Routes, Route, useParams } from 'react-router-dom';
import DeleteAccount from './DeleteAccount/DeleteAccount';

export const AccountManagement = () => {
    const AccountManagementMenu = [
        { name: "Delete Account", path: "./deleteAccount" },
    ]

    const { '*': path } = useParams();
    console.log("account path:", path);

    return (
        <div>
            {path === "" && (
                <ul className='sm:py-4  '>
                    {AccountManagementMenu.map((menu, index) => (
                        <li className='links px-3 hover:bg-gray-200'>
                            <NavLink
                                className={`flex items-center justify-between py-3`}
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
                <Route path="/deleteAccount" element={<DeleteAccount />} />
            </Routes>

        </div>
    )
}
