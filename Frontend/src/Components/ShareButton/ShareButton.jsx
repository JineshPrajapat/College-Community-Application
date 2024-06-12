import React from 'react';
import { FaWhatsapp, FaLinkedin, FaInstagram } from 'react-icons/fa';

function ShareButton({ url, title }) {
    const encodedUrl = encodeURIComponent(url);
    const encodedTitle = encodeURIComponent(title);

    const shareOnWhatsApp = () => {
        const whatsappUrl = `https://api.whatsapp.com/send?text=${encodedTitle}%20${encodedUrl}`;
        window.open(whatsappUrl, '_blank');
    };

    const shareOnLinkedIn = () => {
        const linkedinUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`;
        window.open(linkedinUrl, '_blank');
    };

    const shareOnInstagram = () => {
        // Instagram does not support direct URL sharing like WhatsApp and LinkedIn.
        // Typically, you would share content via the Instagram app directly.
        alert('Instagram sharing is not supported directly. Please share via the Instagram app.');
    };

    const handleNativeShare = () => {
        if (navigator.share) {
            navigator.share({
                title: title,
                text: title,
                url: url,
            })
                .catch((error) => console.error('Error sharing', error));
        } else {
            alert('Web Share API is not supported in your browser. Please use the buttons below.');
        }
    };

    return (
        <div className="share-buttons flex space-x-2">
            <button onClick={handleNativeShare} className="p-2 rounded flex flex-col ">
            <i class="fa-solid fa-share-nodes p-2  text-slate-600 rounded-sm duration-500 cursor-pointer hover:text-slate-900 hover:scale-110"/>
            <small className='text-xs'>Share</small>
            </button>

        </div>
    );
}

export default ShareButton;
