import React, { useState, useEffect } from "react";
import { IonIcon } from "@ionic/react";
import './FlashMessage.scss';
import { checkmarkCircleOutline, closeCircleOutline, alertCircleOutline } from "ionicons/icons";


const FlashMessage = ({ type, message }) => {
    const [showFlash, setShowFlash] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setShowFlash(false);
        }, 5000);
        return () => clearTimeout(timer);                        // flash message disappear after 5 seconds
    }, []);

    return showFlash ? (
        <div className="flash-overlay">
            <div className={`flash-message ${type}`}>
                <div className="flex flex-row items-center">
                    <div className="">
                        <div className=" sm:py-0 text-3xl ">
                            {type === 'success' && (
                                <span className="icon success-icon flex items-center"><IonIcon icon={checkmarkCircleOutline} /></span>
                            )}
                            {type === 'error' && (
                                <span className="icon error-icon flex items-center "><IonIcon icon={closeCircleOutline} /></span>
                            )}
                            {type === 'info' && (
                                <span className="icon info-icon flex items-center"><IonIcon icon={alertCircleOutline} /></span>
                            )}
                        </div>
                    </div>
                    <div className="pl-2">
                        {message}
                    </div>
                </div>

            </div>
        </div>
    ) : null;
};

export default FlashMessage;