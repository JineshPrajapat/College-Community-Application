import React, { useState } from 'react';
import moment from 'moment';
import { IonIcon } from '@ionic/react';
import { checkmarkDoneOutline } from 'ionicons/icons';
import Tooltip from '../../../../hooks/Tooltip';

const ChatMessage = ({ message, currentChat, isSelected, onDeleteMessage }) => {
    const [showTooltip, setShowTooltip] = useState(false);

    const handleMouseEnter = () => setShowTooltip(true);
    const handleMouseLeave = () => setShowTooltip(false);

    const handleDelete = () => {
        if (message.msgByUserId !== currentChat?.currentUserID) {
            onDeleteMessage(message._id);
        }
    };

    return (
        <div className={`message rounded transition-all duration-500 ${message.msgByUserId === currentChat?.currentUserID ? 'own flex justify-start' : 'flex justify-end'} ${isSelected ? "bg-sky-100 p-[2px]" : ""}`}
            onClick={handleDelete}
            onContextMenu={(e) => e.preventDefault()}
            >

            <span className={`flex flex-col rounded-md px-2 py-1 my-0 cursor-pointer  ${message.msgByUserId === currentChat?.currentUserID ? "bg-slate-200" : "bg-sky-200"} `}>
                <div className='w-full  relative'>
                    {
                        message?.imageUrl && (
                            <img
                                src={message?.imageUrl}
                                className='w-60 h-full object-scale-down '
                                onClick={(e) => e.stopPropagation()} // Prevents parent click
                                download
                            />
                        )
                    }
                    {
                        message?.videoUrl && (
                            <video
                                src={message.videoUrl}
                                className='w-60 h-full object-scale-down'
                                controls

                            />
                        )
                    }
                </div>
                <div className='flex justify-between gap-2'>
                    <p className='text-left text-sm md:text-[16px] font-serif'>{message.text}</p>
                    <div className='text-[10px] text-slate-500 font-sans font-semibold text-right flex items-end'>
                        <div className='flex flex-row items-end cursor-pointer relative'
                            onMouseEnter={handleMouseEnter}
                            onMouseLeave={handleMouseLeave}
                        >
                            <p className='whitespace-nowrap '>
                                {moment(message.createdAt).format('hh:mm A')}
                            </p>
                            {message.msgByUserId !== currentChat?.currentUserID &&
                                <div className={`text-[16px] flex flex-end ${message.seen ? "text-blue-700" : ""}`}>
                                    <IonIcon icon={checkmarkDoneOutline} />
                                </div>
                            }
                            <Tooltip
                                content={moment(message.createdAt).format('DD-MM-YYYY, hh:mm A')}
                                handleMouseEnter={handleMouseEnter}
                                handleMouseLeave={handleMouseLeave}
                                showTooltip={showTooltip}
                            />
                        </div>
                    </div>
                </div>
            </span>
        </div>
    );
};

export default ChatMessage;
