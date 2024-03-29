import React, { useEffect, useState } from 'react';
import { fetchData} from "../../../FetchData/FetchData"
import baseURL from '../../../api/api';

export const Conversation = (data, currentUser) => {

    console.log("data",data);

    return (
        <>
            <div className="follower conversation">
                <div className='flex items-center gap-3'>
                    <img
                        src={data?.data?.profileImage ? data?.data?.profileImage : ""}
                        alt="Profile"
                        className="followerImage w-10 h-10 rounded-full "
                    />
                    <div className="name text-[16px]">
                        <span>{data?.data?.profileDetails?.fullName}</span>
                    </div>
                </div>
            </div>
            <hr  className=" border-b-2 border-b-black" style={{ width: "85%", border: "0.1px solid #ececec" }} />
        </>
    )
}
