import React, { useEffect, useState } from 'react'
import "./Chat.scss";
import { fetchData } from '../../FetchData/FetchData';
import baseURL from '../../api/api';
import { Conversation } from "./Conversation/Conversation";
import { ChatBox } from './ChatBox/ChatBox';
import { useSelector } from 'react-redux'
import { setOnlineUser } from '../../Redux/chatSlice';
import { connectWithSocketServer } from '../../realtimeCommunication/socketConnection';
import { formatMessageDate } from './helper/formatMessageDate';
import { NavLink, Route, Routes, useLocation } from "react-router-dom";
import { setCurrentChat } from '../../Redux/chatSlice';
import { images } from '../../constants';
import { IonIcon } from '@ionic/react';
import { search, chevronBackOutline } from "ionicons/icons";

export const Chat = () => {

    const conversationData = useSelector((state) => state.chat.conversation);
    // console.log("conversation", conversation);

    const [chatsData, setChatsData] = useState([]);
    const [showChats, setShowChats] = useState(true);
    const [currentChatUserId, setCurrentChatUserId] = useState(null);
    const [isMobileView, setIsMobileView] = useState(window.innerWidth <= 768);
    const [searchName, setSearchName] = useState("");
    const [filteredConversation, setFilteredConversation] = useState([]);
    const [filteredchats, setFilteredchats] = useState([]);

    const location = useLocation();
    const isChatBox = location.pathname.startsWith('/Chat/') && location.pathname !== '/Chat';
    // console.log("isChatBox", isChatBox);

    let currentUserName = location.pathname.split("/Chat/")[1];
    // console.log("currentUserName", currentUserName);

    const UserID = localStorage.getItem("userId")
    // const [onlineUser, setOnlineUser] = useState([]);

    useEffect(() => {
        fetchData(`${baseURL}/allusers`, setChatsData);
    }, []);

    useEffect(() => {
        connectWithSocketServer();
    }, []);

    useEffect(() => {
        const handleResize = () => {
            setIsMobileView(window.innerWidth <= 769);
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    const handleShowChats = () => {
        setShowChats(true);
    };

    const handleShowDiscoverUsers = () => {
        setShowChats(false);
    };

    // filtering search input
    const handleSearchInputChange = (event) => {
        setSearchName(event.target.value);
        filterConversation(event.target.value);
    }

    const filterConversation = (query) => {
        if (query.trim() === "") {
            setFilteredConversation([]);
            setFilteredchats([]);
        }
        else {
            if (showChats) {
                const filtered = conversationData.filter(conv =>
                    conv?.receiver?.username.toLowerCase().includes(query.toLowerCase())
                );
                setFilteredConversation(filtered);
            }
            else {

                let chatfiltered = [
                    {
                        allUsersWithProfiles : []
                    }
                ]
                console.log("discover filter", chatsData?.allUsersWithProfiles);
                chatfiltered.allUsersWithProfiles = chatsData?.allUsersWithProfiles?.filter(user =>
                    user?.profileDetails?.fullName.toLowerCase().includes(query.toLowerCase()) || user.email.includes(query.toLowerCase())
                );
                setFilteredchats(chatfiltered);
                console.log("filteredchats", chatfiltered);
            }
        }

    }

    const conversation = searchName.trim() === "" ? conversationData : filteredConversation;
    const chats = searchName.trim() == "" ? chatsData : filteredchats;

    return (
        <div className="Chat">
            <div className={`Left-side-chat flex flex-col w-full bg-white h-full md:h-[calc(100vh-9vh)] md:min-w-[300px] md:w-[300px] lg:min-w-[375px]  my-1 sm:ml-1 ${isChatBox ? " hidden md:block" : "block"}`}>

                <div className=" pr-2 md:px-2  w-full flex justify-center gap-1 items-center  ">
                    <NavLink to={"/"} className=' text-lg hover:scale-110 flex items-center  '>
                    <IonIcon icon={chevronBackOutline}/>
                    </NavLink>
                    <input className="input w-full px-3 h-[6vh] my-2   outline-slate-400 bg-slate-200 rounded-md"
                        type="search"
                        placeholder={`${showChats ? "Search or start new chat" : "Search by name, username "}`}
                        value={searchName}
                        onChange={handleSearchInputChange}
                    />
                </div>

                {/* Labels for switching between Chats and Discover Users */}
                <div className="flex justify-start gap-2 mx-3 my-2">
                    <div
                        className={`cursor-pointer label rounded-full p-2 text-xs font-bold ${showChats ? 'bg-blue-200' : 'bg-slate-200'}`}
                        onClick={handleShowChats}
                    >
                        Chats
                    </div>
                    <div
                        className={`cursor-pointer label rounded-full bg-blue-200 p-2 text-xs font-bold ${!showChats ? 'bg-blue-200' : 'bg-slate-200'}`}
                        onClick={handleShowDiscoverUsers}
                    >
                        Discover Users
                    </div>
                </div>

                <div className="Chat-container  ">
                    <div className="chat-list h-[calc(100vh-24vh)] overflow-x-hidden overflow-y-scroll scrollbar " >

                        {/* conversations  */}
                        {showChats ? (
                            <>
                                {
                                    conversation?.length === 0 && (
                                        <div className='mt-12'>
                                            <div className='flex justify-center items-center my-4 text-slate-500'>
                                                <i class="fa-solid fa-magnifying-glass"></i>
                                            </div>
                                            <p className='text-lg text-center text-slate-400'>Explore users to start a conversation with.</p>
                                        </div>
                                    )
                                }

                                {
                                    conversation?.map((conv, index) => {
                                        return (
                                            <NavLink to={`/Chat/${conv?.receiver?._id !== UserID ? conv?.receiver?.username : conv?.sender?.username}`} key={conv?._id} >
                                                <div className={`p-2 duration-500 hover:bg-[#b1b0b02b] cursor-pointer ${currentUserName === (conv?.receiver?._id !== UserID ? conv?.receiver?.username : conv?.sender?.username) && "bg-[#9c9a9a2b]"}`}>
                                                    <div className='flex items-center gap-3 w-full relative '>
                                                        <div className='relative'>
                                                            <div className='w-12 h-12 rounded-full'>
                                                                <img
                                                                    src={conv?.receiver?._id !== UserID ? conv?.receiver?.profileImage : conv?.sender?.profileImage}
                                                                    alt="Profile"
                                                                    className="followerImage w-full h-full rounded-full"
                                                                />
                                                            </div>
                                                            {conv?.online && (
                                                                <div className='absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white'></div>
                                                            )}
                                                        </div>
                                                        <div className="name text-left w-full">
                                                            <div className='flex justify-between items-center'>
                                                                <span className='text-sm md:text-[16px] font-extrabold whitespace-nowrap text-ellipsis line-clamp-1'>{conv?.receiver?._id !== UserID ? conv?.receiver?.username : conv?.sender.username}</span>
                                                                <time className=' whitespace-nowrap text-[9px]'>{formatMessageDate((conv?.lastMsg?.createdAt))}</time>
                                                            </div>
                                                            <div className='flex items-center gap-1'>
                                                                {
                                                                    conv?.lastMsg?.imageUrl && (
                                                                        <div className='flex items-center gap-1'>
                                                                            <span><i class="fa-regular fa-image"></i></span>
                                                                            {!conv?.lastMsg?.text && <span>Image</span>}
                                                                        </div>
                                                                    )
                                                                }
                                                                {
                                                                    conv?.lastMsg?.videoUrl && (
                                                                        <div className='flex items-center gap-1'>
                                                                            <span><i class="fa-solid fa-video"></i></span>
                                                                            {!conv?.lastMsg?.text && <span>Video</span>}
                                                                        </div>
                                                                    )
                                                                }
                                                            </div>
                                                            <p className='text-xs text-ellipsis line-clamp-1'>{conv?.lastMsg?.text}</p>
                                                        </div>
                                                        {
                                                            Boolean(conv?.unseenMsg) && (
                                                                <p className='text-[8px] w-4 h-4 flex justify-center items-center ml-auto p-1 bg-primary text-white font-semibold rounded-full'>{conv?.unseenMsg}</p>
                                                            )
                                                        }
                                                    </div>
                                                </div>
                                            </NavLink>
                                        )
                                    })
                                }</>

                        ) :
                            (<>
                                {chats.allUsersWithProfiles && chats.allUsersWithProfiles.map((chat) => (
                                    <div
                                        key={chat._id}
                                    >
                                        <Conversation
                                            data={chat}
                                            currentUser={currentChatUserId}
                                        />
                                    </div>
                                ))}
                            </>)
                        }
                    </div>
                </div>
            </div>

            {/* Right side  chat Box  */}
            <div className={`Right-side-chat md:m-1 h-[calc(100vh-9vh)] bg-white w-full gap-4 ${!isChatBox ? "hidden md:flex md:justify-center" : ""}`}>
                {isChatBox ? (
                    <Routes>
                        <Route path=":currentUserName" element={<ChatBox />} />
                    </Routes>
                ) : (
                    <span className={`"chatbox-empty-message flex flex-col justify-center items-center "`}>
                        <img
                            src={images.mainLogo1}
                            className=' opacity-10'
                            width={150}
                            alt='logo'
                        />
                        <p className='text-lg mt-2 text-slate-500'>Select user to send message</p>
                    </span>
                )}
            </div>
        </div>

    )
}

