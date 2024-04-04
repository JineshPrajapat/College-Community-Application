import React, { useState, useEffect } from "react";
import './FlashMessage.scss';

const FlashMessage = ({ type, message }) => {
    const [showFlash, setShowFlash] = useState(true);

    useEffect(()=>{
        const timer = setTimeout(()=>{
            setShowFlash(false);
        }, 5000);   
        return () =>clearTimeout(timer);                        // flash message disappear after 5 seconds
    }, []);

    return showFlash ? (
        <div className="flash-overlay">
            <div className={`flash-message ${type}`}>
                <div className="flex ">
                    <div className=" border-3 rounded-full text-xl">
                        {type === 'success' && (
                            <span className="icon success-icon p-3">&#10004;</span>
                        )}
                        {type === 'error' && (
                            <span className="icon error-icon p-3">&#x2716;</span>
                        )}
                        {type === 'info' && (
                            <span className="icon info-icon p-2">i</span>
                        )}
                    </div>
                </div>
                <div className="pl-4">
                    {message}
                </div>

            </div>
        </div>
    ) : null;
};

export default FlashMessage;