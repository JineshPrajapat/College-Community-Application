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
                        <h3>College Connect</h3>
                        <p>Connect with your college community and alumni effortlessly. No more hassle of sending connection requests. Stay in touch with everyone from your college days.</p>
                    </div>
                    <div className="info-card slide-right">
                        <h3>Interview Q&A</h3>
                        <p>Prepare for your interviews by browsing questions asked by companies. Add your own questions to help others prepare effectively. Practice makes perfect!</p>
                    </div>
                    <div className="info-card zoom-in">
                        <h3>Job & Intern Opportunities</h3>
                        <p>Discover and share job and internship opportunities within the community. Help your fellow mates and juniors kickstart their careers.</p>
                    </div>
                    <div className="info-card slide-left">
                        <h3>Interview Insights</h3>
                        <p>Share your interview and placement experiences to guide and inspire your juniors. Help them navigate their career path with firsthand insights from your own journey.</p>
                    </div>
                    <div className="info-card slide-right">
                        <h3>Discuss & Solve</h3>
                        <p>Have a problem? Post it in the community and get solutions from your peers. Speed up your workflow and get things done efficiently.</p>
                    </div>
                    <div className="info-card slide-right">
                        <h3>Comprehensive Profiles</h3>
                        <p>Easily analyze profiles of users within the community. Whether you're a senior or a recruiter, find all the information you need at a glance.</p>
                    </div>
                    <div className="info-card zoom-in">
                        <h3>Placement Statistics</h3>
                        <p>Know history of placement of CTAE , by filter on basis of year, branch, company etc.</p>
                    </div>
                </div>
            </div>
            <ImageCarousel />
        </>
    )
};

export default Landing;