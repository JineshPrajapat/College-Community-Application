import React, { useEffect, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';


export const Conversation = (data, currentUser) => {
    const location = useLocation();
    console.log("data", data);
    let currentUserName = location.pathname.split("/Chat/")[1];


    return (
        <NavLink to={`/Chat/${data?.data?.username}`}>
            <div className={`p-2 duration-500 hover:bg-[#b1b0b02b] cursor-pointer ${currentUserName === data?.data?.username && "bg-[#b1b0b02b]"}`}>

                <div className='flex items-center gap-3 w-full'>
                    <img
                        src={data?.data?.profileImage ? data?.data?.profileImage : ""}
                        alt="Profile"
                        className="followerImage w-12 h-12 rounded-full "
                    />
                    <div className="name text-left w-full">
                        <div className='flex justify-between items-center'>
                            <span className='text-[16px] font-extrabold whitespace-nowrap'>{data?.data?.profileDetails?.fullName}</span>
                        </div>
                        <p className='text-xs text-ellipsis line-clamp-1 '>{data?.data?.email}</p>
                    </div>
                </div>
            </div>
            <hr className=" border-b-2 border-b-black" style={{ width: "85%", border: "0.1px solid #ececec" }} />
        </NavLink>
    )
}
