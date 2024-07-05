import React from 'react'
import { useState, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { formatTimeAgo } from '../../formatTimeAgo/formatTimeAgo';
import { directChatHistory, getCurrentUser, sendDirectMessage, updateSeen } from '../../../realtimeCommunication/socketConnection';
import moment from 'moment';
import images from "../../../constants/images"
import { NavLink, useParams } from 'react-router-dom';
import { store } from '../../../Redux/store';
import { addMessage } from '../../../Redux/messagesSlice';
import { setMessages } from '../../../Redux/messagesSlice';
import { IonIcon } from "@ionic/react";
import { chevronBackOutline, send, checkmarkDoneOutline, closeOutline, imageOutline, videocamOutline, addOutline, trashOutline } from "ionicons/icons";
import ChatMessage from './ChatMessage/ChatMessage';
import { groupedMessageDate } from '../helper/formatMessageDate';
import Tooltip from '../../../hooks/Tooltip';
import { deleteMessage } from '../../../realtimeCommunication/socketConnection';
import ConfirmationDialog from "../../ConfirmationDialog/ConfirmationDialog";
import uploadFile from '../helper/uploadFile';
import Loading from "../../Loading/Loading";


export const ChatBox = () => {
    const messages = useSelector((state) => state.messages.messages);
    const currentChat = useSelector((state) => state.chat.currentChat);

    const [newMessage, setNewMessage] = useState('');
    const [message, setMessage] = useState({
        text: "",
        imageUrl: "",
        videoUrl: ""
    })
    const [showTooltip, setShowTooltip] = useState(false);
    const [showConfirmation, setShowConfirmation] = useState(false);
    const [loading, setLoading] = useState(false)
    const [openImageVideoUpload, setOpenImageVideoUpload] = useState(false);
    const [selectedMessages, setSelectedMessages] = useState([]);

    const timeoutRef = useRef(null);
    const { currentUserName } = useParams();

    console.log("messaged frontend", messages);
    // console.log("current chat", currentChat);

    const handleMouseEnter = () => setShowTooltip(true);
    const handleMouseLeave = () => setShowTooltip(false);

    useEffect(() => {
        setLoading(true);
        getCurrentUser(currentUserName);
        setSelectedMessages("");
        setLoading(false);
    }, [currentUserName]);

    useEffect(() => {
        if (currentChat?.currentUserID) {
            directChatHistory(currentChat?.currentUserID);
        }

        const intervalId = setInterval(() => {
            if (currentChat?.currentUserID) {
                updateSeen(currentChat.currentUserID);
            }
        }, 1000);

        // Cleanup interval on component unmount
        return () => clearInterval(intervalId);

    }, [currentChat?.currentUserID]);


    const handleKeyPressed = (event) => {
        if (event.key === "Enter") {
            handleSendMessage(event);
        }
    };

    // const handleSendMessage = (event) => {
    //     event.preventDefault();
    //     console.log("handlesendmessage invoked");
    //     if (newMessage.length > 0) {
    //         const message = {
    //             receiver: currentChat?.currentUserID,
    //             text: newMessage,
    //             createdAt: new Date().toISOString(),
    //             msgByUserId: localStorage.getItem("userId")
    //         }

    //         sendDirectMessage({
    //             receiver: currentChat?.currentUserID,
    //             text: message.text,
    //             // imageUrl: message.imageUrl,
    //             // videoUrl: message.videoUrl,
    //         });
    //         store.dispatch(addMessage(message));
    //         setNewMessage("");
    //     }
    // };

    const handleSendMessage = (event) => {
        event.preventDefault();
        console.log("handlesendmessage invoked");
        if (message.text || message.imageUrl || message.videoUrl) {
            const messageData = {
                receiver: currentChat?.currentUserID,
                text: message?.text,
                imageUrl: message?.imageUrl,
                videoUrl: message?.videoUrl,
                createdAt: new Date().toISOString(),
                msgByUserId: localStorage.getItem("userId")
            }
            console.log(message);

            sendDirectMessage({
                receiver: currentChat?.currentUserID,
                text: message?.text,
                imageUrl: message?.imageUrl,
                videoUrl: message?.videoUrl,
            });
            store.dispatch(addMessage(messageData));
            setNewMessage("");
            handleClearUploadImage();
            handleClearUploadVideo();
        }
    };

    const handleMessageSelection = (messageId) => {
        setSelectedMessages(prevSelectedMessages => {
            const isSelected = prevSelectedMessages.includes(messageId);

            // Toggle selection
            if (isSelected) {
                // Remove messageId from selectedMessages if already exist
                return prevSelectedMessages.filter(id => id !== messageId);
            } else {
                // Add messageId to selectedMessages if not exist
                return [...prevSelectedMessages, messageId];
            }
        });
    };

    // console.log("selectedMessaged", selectedMessages);
    const handleDeleteMessage = () => {
        console.log("delete function invoked");
        setShowConfirmation(true);

    }

    const handleConfirmation = async (isConfirmed) => {
        if (isConfirmed) {
            const data = {
                selectedMessages: selectedMessages,
                currentChat: currentChat?.currentUserID
            }
            await deleteMessage(data);
            setSelectedMessages("");
        }
        setShowConfirmation(false);
    }

    const handleOnChange = (e) => {
        const { name, value } = e.target

        setMessage(preve => {
            return {
                ...preve,
                text: value
            }
        })
    }

    const handleUploadImageVideoOpen = () => {
        setOpenImageVideoUpload(preve => !preve)
    };

    const handleUploadImage = async (e) => {
        const file = e.target.files[0]

        setLoading(true)
        const uploadPhoto = await uploadFile(file);
        setLoading(false)
        setOpenImageVideoUpload(false);

        console.log("uploadFile", uploadPhoto);
        setMessage(preve => {
            return {
                ...preve,
                imageUrl: uploadPhoto.url
            }
        });

    };

    const handleClearUploadImage = () => {
        setMessage(preve => {
            return {
                ...preve,
                imageUrl: ""
            }
        })
    };

    const handleUploadVideo = async (e) => {
        const file = e.target.files[0]

        setLoading(true)
        const uploadPhoto = await uploadFile(file)
        setLoading(false)
        setOpenImageVideoUpload(false)

        setMessage(preve => {
            return {
                ...preve,
                videoUrl: uploadPhoto.url
            }
        })

    }

    const handleClearUploadVideo = () => {
        setMessage(preve => {
            return {
                ...preve,
                videoUrl: ""
            }
        })
    }



    return (
        <div className={`${showConfirmation ? 'show-confirmattion' : ''}`}>
            {!loading && currentChat ?
                (
                    <div className={`ChatBox-container bg-white  ${!currentChat?.currentUserID ? "flex items-center justify-center" : ""} `}>
                        {currentUserName ? (
                            <div className="flex flex-col">
                                {/* chat-header */}
                                <div className="chat-header bg-blue-300 h-[6vh] md:h-[8vh]  p-2 rounded-b-sm shadow-sm shadow-black  items-center">

                                    {selectedMessages.length > 0 ?
                                        (<div className='flex flex-row justify-between font-sans items-center font-semibold'>
                                            <div className='pl-2'>{selectedMessages.length > 0 ? `${selectedMessages.length} Selected` : ""}</div>
                                            <div className='flex flex-row gap-1 items-center'>
                                                <div className='px-2 md:py-2  text-slate-600 font-semibold rounded-sm duration-500 cursor-pointer hover:text-slate-900 hover:scale-110 relative'
                                                    onMouseEnter={handleMouseEnter}
                                                    onMouseLeave={handleMouseLeave}
                                                    onClick={handleDeleteMessage}
                                                >
                                                    <IonIcon className='font-semibold text-2xl' icon={trashOutline} />
                                                    {/* <Tooltip
                                            content="Delete selected messages"
                                            handleMouseEnter={handleMouseEnter}
                                            handleMouseLeave={handleMouseLeave}
                                            showTooltip={showTooltip}
                                        /> */}
                                                </div>
                                                <button className=" border-1 border-slate-700 bg-slate-600 text-sm px-2 py-1 md:px-3 md:py-2 rounded text-white hover:bg-slate-700 transition duration-300" onClick={() => setSelectedMessages("")}>Cancel</button>
                                            </div>
                                        </div>) :
                                        (
                                            <div className='flex items-center gap-1 md:gap-3 font-bold'>
                                                <NavLink to={"/Chat"}>
                                                    <span className='text-xl flex items-center cursor-pointer duration-500 hover:scale-125'>
                                                        <IonIcon icon={chevronBackOutline} />
                                                    </span>
                                                </NavLink>

                                                <div className='relative'>
                                                    <div className='w-8 h-8 md:w-12 md:h-12 rounded-full'>
                                                        <img
                                                            src={currentChat?.profileImage ? currentChat?.profileImage : ""}
                                                            alt="Profile"
                                                            className="followerImage w-full h-full rounded-full"
                                                        />
                                                    </div>
                                                    {currentChat?.online && (
                                                        <div className='absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white'></div>
                                                    )}
                                                </div>
                                                <div className="name flex flex-col justify-start" >
                                                    <span className='text-sm md:text-xl'>
                                                        {currentChat?.fullName}
                                                    </span>
                                                    {
                                                        currentChat.online ? <span className='text-primary -my-2 text-sm text-left'>online</span> : <span className='text-slate-400'></span>
                                                    }
                                                </div>
                                            </div>
                                        )

                                    }
                                </div>

                                <div className="chat-body bg-[#F5F7F8] lg:px-6 md:px-4 p-4 pb-6 h-[calc(100vh-19vh)] sm:h-[calc(100vh-21vh)] md:h-[calc(100vh-24vh)] overflow-x-hidden overflow-y-scroll scrollbar">
                                    {/* Display messages */}

                                    {Object.entries(messages)?.map(([date, messageArray]) => (
                                        <div key={date}>
                                            <span className='px-2 py-1 text-xs text-white font-sans bg-gray-600 rounded  '>{groupedMessageDate(date)}</span>
                                            {Array.isArray(messageArray) && messageArray.map((message) => (
                                                <div className={`my-1`}>
                                                    <ChatMessage key={message._id}
                                                        message={message}
                                                        currentChat={currentChat}
                                                        isSelected={selectedMessages.includes(message._id)}
                                                        onDeleteMessage={handleMessageSelection}
                                                    />
                                                </div>
                                            ))}
                                        </div>
                                    ))}

                                    {
                                        message.imageUrl && (
                                            <div className='w-60 h-60 sticky bottom-0 bg-white flex justify-center items-center rounded overflow-hidden'>
                                                <div className='w-fit p-2 absolute top-0 right-0 cursor-pointer hover:text-red-600' onClick={handleClearUploadImage}>
                                                    <IonIcon icon={closeOutline} />
                                                </div>
                                                <div className=''>
                                                    <img
                                                        src={message.imageUrl}
                                                        alt='uploadImage'
                                                        className='aspect-square w-60 h-full max-w-sm m-2 object-scale-down'
                                                    />
                                                </div>
                                            </div>
                                        )
                                    }

                                    {/**upload video display */}
                                    {
                                        message.videoUrl && (
                                            <div className='w-60 h-72 sticky bottom-0 bg-slate-200 flex justify-center items-center rounded overflow-hidden'>
                                                <div className=' p-2 text-2xl absolute top-0 right-0 cursor-pointer hover:text-red-600' onClick={handleClearUploadVideo}>
                                                    <IonIcon icon={closeOutline} />
                                                </div>
                                                <div className=''>
                                                    <video
                                                        src={message.videoUrl}
                                                        className='aspect-square w-60 h-full max-w-sm m-2 object-scale-down'
                                                        controls
                                                        muted
                                                        autoPlay
                                                    />
                                                </div>
                                            </div>
                                        )
                                    }

                                    {
                                        loading && (
                                            <div className='w-60 h-60 flex sticky bottom-0 justify-center items-center'>
                                                <Loading />
                                            </div>
                                        )
                                    }
                                </div>

                                <section className='flex flex-row items-center bg-slate-200'>
                                    <div className='relative '>
                                        <button onClick={handleUploadImageVideoOpen} className='flex justify-center items-center text-2xl font-bold rounded-full ml-1 p-2 duration-500 bg-slate-300 hover:bg-slate-700 hover:text-white'>
                                            <IonIcon icon={addOutline} />
                                        </button>

                                        {/**video and image */}
                                        {
                                            openImageVideoUpload && (
                                                <div className='bg-white shadow rounded absolute bottom-14 w-36 p-2'>
                                                    <form>
                                                        <label htmlFor='uploadImage' className='flex items-center p-2 px-3 gap-3 hover:bg-slate-200 cursor-pointer'>
                                                            <div className='text-primary'>
                                                                <IonIcon icon={imageOutline} />
                                                            </div>
                                                            <p>Image</p>
                                                        </label>
                                                        <label htmlFor='uploadVideo' className='flex items-center p-2 px-3 gap-3 hover:bg-slate-200 cursor-pointer'>
                                                            <div className='text-purple-500'>
                                                                <IonIcon icon={videocamOutline} />
                                                            </div>
                                                            <p>Video</p>
                                                        </label>

                                                        <input
                                                            type='file'
                                                            id='uploadImage'
                                                            accept='image/*'
                                                            onChange={handleUploadImage}
                                                            className='hidden'
                                                        />

                                                        <input
                                                            type='file'
                                                            id='uploadVideo'
                                                            accept='video/*'
                                                            onChange={handleUploadVideo}
                                                            className='hidden'
                                                        />
                                                    </form>
                                                </div>
                                            )
                                        }
                                    </div>
                                    <form onSubmit={handleSendMessage} className='flex items-center gap-2 min-h-[7vh] w-full bg-slate-200' >
                                        <input type="text"
                                            className="chatbox-empty-message font-serif p-3 outline-none w-full h-full bg-slate-200  rounded-md"
                                            placeholder='Type your message...'
                                            spellCheck="true"
                                            lang='en'
                                            // value={newMessage}
                                            // onChange={(e) => setNewMessage(e.target.value)}
                                            value={message.text}
                                            onChange={handleOnChange}
                                            onKeyDown={handleKeyPressed}
                                        />
                                        <button type='submit' className='flex items-center text-blue-600 hover:text-blue-800 text-2xl px-3'><IonIcon icon={send} /></button>
                                    </form>
                                </section>


                            </div>
                        ) : (
                            <span className="chatbox-empty-message flex flex-col justify-center items-center ">
                                <div>
                                    <img
                                        src={images.mainLogo1}
                                        className=' opacity-10'
                                        width={150}
                                        alt='logo'
                                    />
                                </div>
                                <p className='text-lg mt-2 text-slate-500'>Select user to send message</p>
                            </span>
                        )}

                    </div>
                ) :
                (
                    <div className="mt-[25vh]">
                        <Loading />
                    </div>
                )
            }
            {showConfirmation && (
                <ConfirmationDialog
                    buttonContent={`Delete for everyone`}
                    message={`Are you sure you want to permanently delete the selected messages for everyone?`}
                    onConfirm={handleConfirmation}
                />
            )}
        </div>
    )
}
