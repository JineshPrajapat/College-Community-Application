import React from 'react'
import { useState, useEffect } from 'react';
import { formatTimeAgo } from '../../formatTimeAgo/formatTimeAgo';

// chat= reciever chat profile info for header
// currentUser= reciever user id

export const ChatBox = (chat, currentUser, setSendMessage, receivedMessage) => {
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const [socket, setSocket] = useState(null);

    console.log("hello vaht ,", chat.currentUser)
    useEffect(() => {

        const newSocket = new WebSocket('ws://localhost:5000');

        newSocket.onopen = () => {
            console.log('WebSocket connected');
        };

        newSocket.onmessage = (event) => {
            try {
                const message = JSON.parse(event.data);
                console.log('Message received from server:', message);
                setMessages(prevMessages => [...prevMessages, message]);
            } catch (error) {
                console.error('Error parsing message:', error);
            }
        };

        newSocket.onclose = () => {
            console.log('WebSocket disconnected');
        };

        newSocket.onerror = (error) => {
            console.error('WebSocket error:', error);
        };

        setSocket(newSocket);

        // Clean up function
        return () => {
            if (newSocket && newSocket.readyState !== WebSocket.CLOSED) {
                newSocket.close();
            }
        };
    }, [chat.currentUser]);

    const handleSubmit = (e) => {
        e.preventDefault();
        const userId = localStorage.getItem("userId");
        console.log("currentUserId",chat.currentUser,"userId", userId )

        if (socket && socket.readyState === WebSocket.OPEN) {
            const messageToSend = {
                senderId: userId,
                recipientId: chat.currentUser,
                content: newMessage,
            };
            socket.send(JSON.stringify(messageToSend));
            setNewMessage(''); // Clear input after sending
        } else {
            console.error('WebSocket connection not open or socket is not defined.');
            setNewMessage('');
        }
    };

    return (
        <>
            <div className="ChatBox-container bg-white h-[91vh] relative full">
                {chat.chat ? (
                    <>
                        {/* chat-header */}
                        <div className="chat-header bg-blue-300 p-2 rounded-md shadow-sm shadow-black">
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

                        <form onSubmit={handleSubmit} className='flex gap-2 absolute bottom-0 right-0 w-full ' >
                            <input type="text"
                                className="chatbox-empty-message font-serif p-3 w-full bg-slate-200 rounded-md"
                                placeholder='Type your message...'
                                value={newMessage}
                                onChange={(e) => setNewMessage(e.target.value)}
                            />
                            <button type='submit' className='bg-blue-400 px-3 hover:bg-blue-500 rounded-md'><i className="fa-solid fa-paper-plane text-white text-2xl py-2 px-3"></i></button>
                        </form>

                        <div className="chat-body p-4 font-serif">
                            {/* Display messages */}
                            {messages.map((message, index) => (
                                <div key={index} className={`message  ${message.senderId === chat.currentUser ? 'own flex justify-end' : 'flex justify-end'}`}>
                                    <span className='rounded-md bg-slate-200 px-2 py-1 mb-2'>{message.content}</span>
                                </div>
                            ))}
                        </div>


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
