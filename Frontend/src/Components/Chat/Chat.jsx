import React, { useEffect, useState } from 'react'
import "./Chat.scss";
import { fetchData } from '../../FetchData/FetchData';
import baseURL from '../../api/api';
import { Conversation } from "./Conversation/Conversation";
import { ChatBox } from './ChatBox/ChatBox';

export const Chat = () => {
    const [chats, setChats] = useState([]);
    const [currentChat, setCurrentChat] = useState(null);
    const [currentChatUserId, setCurrentChatUserId]= useState(null);
    const [sendMessage, setSendMessage] = useState(null);
    const [receivedMessage, setReceivedMessage] = useState(null);

    const userId = localStorage.getItem("userId");

    useEffect(() => {
        fetchData(`${baseURL}/allusers`, setChats);
    }, []);

    console.log("chats", chats);

    return (
        <div>
            <div className="Chat">
                <div className="Left-side-chat ">

                    <div className="LogoSearch flex justify-center ">
                        <input className="input"
                            type="search"
                            placeholder="Search topics or comments"
                        />
                    </div>

                    <div className="Chat-container">
                        <div className="chat-list">
                            {chats.allUsersWithProfiles && chats.allUsersWithProfiles.map((chat) => (
                                <div
                                    onClick={() => {
                                        setCurrentChat(chat);
                                        setCurrentChatUserId(chat._id)
                                    }}

                                >
                                    <Conversation
                                        data={chat}
                                        currentUser={chat._id}
                                    // online={checkOnlineStatus(chat.chat)}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="Right-side-chat m-2">
                    <ChatBox
                        chat={currentChat}
                        currentUser={currentChatUserId}
                        setSendMessage={setSendMessage}
                        receivedMessage={receivedMessage}
                    />
                </div>
            </div>
        </div>
    )
}
