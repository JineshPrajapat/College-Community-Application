import React, { useState, useEffect, useRef } from "react";
import '@fortawesome/fontawesome-free/css/all.css';
import { images } from '../../constants'
import './ImageCarousel.scss';

const imagesData = [
    {
        src: images.landingImg1,
        info: 'Be part of the action',
        description:'Whether it is online or in-person, alumni events and programs keep the Ctae community involved and engaged.'
    },
    {
        src: images.landingImg2,
        info: 'Grow your network',
        description:'Ctae Connects is your portal to the extensive alumni and student network, where you can discover mentorship, professional connections, and more.'
    },
    {
        src: images.landingImg3,
        info: 'Help change a life',
        description:"Generous alumni and freinds make th Ctae experience possible for today's. Support a college, program, department, or club of your choice."
    },
    {
        src: images.landingImg4,
        info: 'Make connections',
        description:"Affinity and alliance programs unite alumni based on common cultures, backgrounds, or professionals to strengthen the Ctae netowrk."
    },
    {
        src: images.landingImg5,
        info: 'Share your time and talents',
        description:"Ctae embodies a strong culture of giving back, offfering diverse opportunites to connect with the Ctae community, regadless of your location or schedule."
    },
];

const ImageCarousel = () => {
    const [selectedImageIndex, setSelectedImageIndex] = useState(0);
    const carouselRef = useRef(null);

    const handlePrevClick = () => {
        setSelectedImageIndex(prevIndex => (prevIndex === 0 ? imagesData.length - 1 : prevIndex - 1));
        const itemWidth = carouselRef.current.querySelector('.item').offsetWidth;
        carouselRef.current.scrollTo({
            left: carouselRef.current.scrollLeft - itemWidth,
            behavior: 'smooth'
        });;
    };

    const handleNextClick = () => {
        setSelectedImageIndex(prevIndex => (prevIndex === imagesData.length - 1 ? 0 : prevIndex + 1));
        const itemWidth = carouselRef.current.querySelector('.item').offsetWidth;
        carouselRef.current.scrollTo({
            left: carouselRef.current.scrollLeft + itemWidth,
            behavior: 'smooth'
        }); 
    };

    return (
        <div className="containers">
            <div className="info">
                <h1>5 WAYS TO ENGAGE RIGHT NOW</h1>
                <p>Here are a few easy ways graduates can make the most of their connection to CTAE.</p>
            </div>

            <div className="carousel" ref={carouselRef}>
                <div className="cover">
                    <div className="carousel-item">
                        {imagesData.map((item, index) => (
                            <div className={`item z-10 ${selectedImageIndex === index ? 'active' : ''}`} key={index}>
                                <img src={item.src} alt={item.info} />
                                {/* <p className="info">{item.info}</p> */}
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div className="controls">
                <button onClick={handlePrevClick}><i className="fas fa-angle-double-left"/></button>
                <button onClick={handleNextClick}><i className="fas fa-angle-double-right"/></button>
            </div>

            <div className="imageInfo">
                <h2>{imagesData[selectedImageIndex].info}</h2>
                <p>{imagesData[selectedImageIndex].description}</p>
            </div>
        </div>
    );
};

export default ImageCarousel;
