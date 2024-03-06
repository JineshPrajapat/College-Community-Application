import React from "react";
import './Landing.scss';
import ImageCarousel from "../ImageCarousel/ImageCarousel";
import CoverPage from "../CoverPage/CoverPage";
import Header from "../Header/Header";



function Landing() {

    return (
        <>
            {/* <Header /> */}
            <div className="landing">
                <div className="analytics fade-in">
                    <div className="info-card slide-left">
                        <h3>Users</h3>
                        <p>Know your freinds</p>
                    </div>
                    <div className="info-card slide-right">
                        <h3>Question</h3>
                        <p>Asked in Placement</p>
                    </div>
                    <div className="info-card zoom-in">
                        <h3>Opportunity</h3>
                        <p>Know the Oppertunity</p>
                    </div>
                    <div className="info-card slide-left">
                        <h3>Experince</h3>
                        <p>Shared experience from senoir</p>
                    </div>
                    <div className="info-card slide-right">
                        <h3>Discuss</h3>
                        <p>Ask your query</p>
                    </div>
                    <div className="info-card zoom-in">
                        <h3>Placement Statistics</h3>
                        <p>Know history of placement of Ctae</p>
                    </div>
                    {/* <div className="info-card slide-left">
                <h3>Total Revenue</h3>
                <p>₹{totalRevenue}</p>
            </div>
            <div className="info-card slide-right">
                <h3>Average Order Value</h3>
                <p>₹{avgOrderValue.toFixed(2)}</p>
            </div>
            <div className="info-card zoom-in">
                <h3>Busiest Day</h3>
                <p>{busiestDay}</p>
            </div> */}
                </div>
            </div>
            <ImageCarousel />
        </>
    )
};

export default Landing;