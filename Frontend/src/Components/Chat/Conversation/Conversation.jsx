import React, { useEffect, useState } from 'react';
import { fetchData } from "../../../FetchData/FetchData"
import baseURL from '../../../api/api';

export const Conversation = (data, currentUser) => {

    console.log("data", data);

    return (
        <>
            <div className="follower conversation ">
                <div className='flex items-center gap-3 w-full'>
                    <img
                        src={data?.data?.profileImage ? data?.data?.profileImage : ""}
                        alt="Profile"
                        className="followerImage w-12 h-12 rounded-full "
                    />
                    <div className="name text-left w-full">
                        <div className='flex justify-between items-center'>
                            <span className='text-[16px] font-extrabold whitespace-nowrap'>{data?.data?.profileDetails?.fullName}</span>
                            <time className=' whitespace-nowrap text-[9px]'>Mon, 08:00</time>
                        </div>
                        <p className='text-xs '>You: Give me 5 minutes</p>
                    </div>
                </div>
            </div>
            <hr className=" border-b-2 border-b-black" style={{ width: "85%", border: "0.1px solid #ececec" }} />
        </>
    )
}
