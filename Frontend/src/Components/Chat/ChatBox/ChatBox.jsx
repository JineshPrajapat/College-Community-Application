import React from 'react'
import { useState, useEffect } from 'react';
import { formatTimeAgo } from '../../formatTimeAgo/formatTimeAgo';


// chat= reciever chat profile info for header
// currentUser= reciever user id

export const ChatBox = (chat, currentUser, setSendMessage, receivedMessage) => {
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState("");

    console.log("chatbox", chat)

    return (
        <>
            <div className="ChatBox-container bg-white h-full relative full">
                {chat.chat ? (
                    <>
                        {/* chat-header */}
                        <div className="chat-header bg-blue-300 p-2 rounded-md shadow-lg shadow-black">
                            <div className='flex items-center gap-3 font-bold'>
                                <img
                                    src={chat?.chat?.profileImage ? chat?.chat?.profileImage : ""}
                                    alt="Profile"
                                    className="followerImage w-16 h-16 rounded-md"

                                />
                                <div className="name flex flex-col justify-start" >
                                    <span className='text-xl'>
                                        {chat?.chat?.profileDetails?.fullName}
                                    </span>
                                    <span className='text-left'>Online</span>
                                </div>
                            </div>
                        </div>

                        <form action="" className='flex gap-2 absolute bottom-0 right-0 w-full ' >
                            <input type="text" className="chatbox-empty-message p-3 w-full bg-slate-100" placeholder='Tap on a chat to start conversation...' />
                            <button type='submit' className='bg-blue-400 px-3 hover:bg-blue-500 rounded-md'>Send</button>
                        </form>

                        {/* chat-body */}
                        {/* <div className="chat-body" >
                            {messages.map((message) => (
                                <>
                                    <div
                                        // ref={scroll}
                                        className={
                                            message.senderId === currentUser
                                                ? "message own"
                                                : "message"
                                        }
                                    >
                                        <span>{message.text}</span>{" "}
                                        <span>{formatTimeAgo(message.createdAt)}</span>
                                    </div>
                                </>
                            ))}
                        </div> */}
                    </>
                ) : (
                    <span className="chatbox-empty-message flex justify-center items-center mt-16">
                        <p className='text-2xl font-bold font-mono '>Tap on a chat to start conversation...</p>
                    </span>
                )}
            </div>
        </>
    )
}
