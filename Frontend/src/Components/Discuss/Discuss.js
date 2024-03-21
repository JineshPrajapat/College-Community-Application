import React, { useState } from "react";
import baseURL from "../../api/api";
import '@fortawesome/fontawesome-free/css/all.css';
import { images } from "../../constants";
import { Routes, Route } from "react-router-dom";
import { Link } from "react-router-dom";
import './Discuss.scss';
import SingleComment from "./SingleComment/SingleComment";
import AddQuery from "./AddQuery/AddQuery";
import Contact from "../UserProfile/Contact/Contact";
import Header from "../Header/Header";
import { fetchData } from '../../FetchData/FetchData';


// const discussionTopic = [
//     {
//         Url: images.garima,
//         discussTitle: "You may not find ISO file.",
//         discussDescription: "Just got out of my first onsite at Meta and I feel so disappointed in myself. I got 3 medium and 1 easy, all fb tagged but the easy one was low in frequency. I did the 3 medium ones perfectly, including the follow ups, but I screwed up the easy one. Badly.2. find well balanced valid string input = (fdfsdf(dfgdf(hjk)) op = (dfgdf(hjk)) , because it has balanced paranthesis so max string is (dfgdf(hjk)) HLD : how do you update distributed database without central coordinator, example : 4 device in 4 rooms , all collect tempreture , need to update collected tempreture to all other devices( good interviewer Hai) LLD: design a Data Structure that , given top N element from current array , stream = [1,4,5,9,3] N= 2 out= [9,5] , there can be multiple queries , and stream is continously incresing in size , you cant use built in Data structure., i created linked list , with node * stored in map to direct access so use binary seach when adding element.",
//         upvotes: 24,
//         views: 305
//     },
//     {
//         Url: images.garima,
//         discussTitle: "Equal tree partion.",
//         discussDescription: "Just got out of my first onsite at Meta and I feel so disappointed in myself. I got 3 medium and 1 easy, all fb tagged but the easy one was low in frequency. I did the 3 medium ones perfectly, including the follow ups, but I screwed up the easy one. Badly.",
//         upvotes: 24,
//         views: 305
//     },
//     {
//         Url: images.garima,
//         discussTitle: "Finding issues in installing node module",
//         discussDescription: "Just got out of my first onsite at Meta and I feel so disappointed in myself. I got 3 medium and 1 easy, all fb tagged but the easy one was low in frequency. I did the 3 medium ones perfectly, including the follow ups, but I screwed up the easy one. Badly.",
//         upvotes: 24,
//         views: 305
//     },
//     {
//         Url: images.garima,
//         discussTitle: "You may not find ISO file.",
//         discussDescription: "Just got out of my first onsite at Meta and I feel so disappointed in myself. I got 3 medium and 1 easy, all fb tagged but the easy one was low in frequency. I did the 3 medium ones perfectly, including the follow ups, but I screwed up the easy one. Badly.",
//         upvotes: 24,
//         views: 305
//     },
//     {
//         Url: images.garima,
//         discussTitle: "You may not find ISO file.",
//         discussDescription: "Just got out of my first onsite at Meta and I feel so disappointed in myself. I got 3 medium and 1 easy, all fb tagged but the easy one was low in frequency. I did the 3 medium ones perfectly, including the follow ups, but I screwed up the easy one. Badly.",
//         upvotes: 24,
//         views: 305
//     },
//     {
//         Url: images.garima,
//         discussTitle: "You may not find ISO file.",
//         discussDescription: "Just got out of my first onsite at Meta and I feel so disappointed in myself. I got 3 medium and 1 easy, all fb tagged but the easy one was low in frequency. I did the 3 medium ones perfectly, including the follow ups, but I screwed up the easy one. Badly.",
//         upvotes: 24,
//         views: 305
//     },
//     {
//         Url: images.garima,
//         discussTitle: "You may not find ISO file.",
//         discussDescription: "Just got out of my first onsite at Meta and I feel so disappointed in myself. I got 3 medium and 1 easy, all fb tagged but the easy one was low in frequency. I did the 3 medium ones perfectly, including the follow ups, but I screwed up the easy one. Badly.",
//         upvotes: 24,
//         views: 305
//     },
//     {
//         Url: images.garima,
//         discussTitle: "You may not find ISO file.",
//         discussDescription: "Just got out of my first onsite at Meta and I feel so disappointed in myself. I got 3 medium and 1 easy, all fb tagged but the easy one was low in frequency. I did the 3 medium ones perfectly, including the follow ups, but I screwed up the easy one. Badly.",
//         upvotes: 24,
//         views: 305
//     },
//     {
//         Url: images.garima,
//         discussTitle: "You may not find ISO file.",
//         discussDescription: "Just got out of my first onsite at Meta and I feel so disappointed in myself. I got 3 medium and 1 easy, all fb tagged but the easy one was low in frequency. I did the 3 medium ones perfectly, including the follow ups, but I screwed up the easy one. Badly.",
//         upvotes: 24,
//         views: 305
//     }, {
//         Url: images.garima,
//         discussTitle: "You may not find ISO file.",
//         discussDescription: "Just got out of my first onsite at Meta and I feel so disappointed in myself. I got 3 medium and 1 easy, all fb tagged but the easy one was low in frequency. I did the 3 medium ones perfectly, including the follow ups, but I screwed up the easy one. Badly.",
//         upvotes: 24,
//         views: 305
//     },
//     {
//         Url: images.garima,
//         discussTitle: "You may not find ISO file.",
//         discussDescription: "Just got out of my first onsite at Meta and I feel so disappointed in myself. I got 3 medium and 1 easy, all fb tagged but the easy one was low in frequency. I did the 3 medium ones perfectly, including the follow ups, but I screwed up the easy one. Badly.",
//         upvotes: 0,
//         views: 305
//     },
//     {
//         Url: images.garima,
//         discussTitle: "You may not find ISO file.",
//         discussDescription: "Just got out of my first onsite at Meta and I feel so disappointed in myself. I got 3 medium and 1 easy, all fb tagged but the easy one was low in frequency. I did the 3 medium ones perfectly, including the follow ups, but I screwed up the easy one. Badly.",
//         upvotes: 24,
//         views: 305
//     },
// ]

function Discuss() {

    // fetching data
    const [discussionTopic, setDiscussionTopic] = useState([]);
    useState(() => {
        fetchData(`${baseURL}/discuss`, setDiscussionTopic);
    }, []);

    console.log("discuss", discussionTopic.discuss);

    const [expandedIndex, setExpandedIndex] = useState(null);

    const handleCommentClick = (index) => {
        setExpandedIndex(index === expandedIndex ? null : index);
    };

    // filtering search input
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredTopics, setFilteredTopics] = useState([]);

    const handleSearchInputChange = (event) => {
        setSearchQuery(event.target.value);
        filterTopics(event.target.value);
    }

    const filterTopics = (query) => {
        const filtered = discussionTopic.discuss.filter(topic =>
            topic.discussTitle.toLowerCase().includes(query.toLowerCase())
        );
        setFilteredTopics(filtered);
    }
    // filtering task completed
    // console.log("filtere", filteredTopics);



    return (
        <>
            <div className="main-conatiner">
                <div className="left-panel">
                    <div className="full-wrapper">
                        <div className="header">
                            <div className="subheader">
                                <div className="subheader-left whitespace-nowrap">
                                    <label>Hot</label>
                                    <label>Newest to Oldest</label>
                                    <label>Most Votes</label>
                                </div>
                                <span className="subheader-search-input">
                                    <input className="input"
                                        type="text"
                                        placeholder="Search topics or comments"
                                        value={searchQuery}
                                        onChange={handleSearchInputChange}
                                    />
                                </span>
                                <Link to="./addQuery" className="subheader-search-button">
                                    <div className="btn-content-container">
                                        <span className="btn-content">New</span>
                                        <i className="fa-light fa-plus"></i>
                                    </div>
                                </Link>
                            </div>
                        </div>
                        <Routes>
                            {/* <Route path="addQuery" element={<AddQuery />} /> */}
                        </Routes>
                        {/* <Outlet/> */}
                        <div className="topic-list-container">
                            <div className="topic-list-content">
                                <div>
                                    {discussionTopic.length === 0 ? (
                                        <p>No topics found</p>
                                    ) : (discussionTopic.discuss.map((discussion, index) => (
                                        <div className="topic-item-container">
                                            <div className="topic-item">
                                                <a href=""><img src={discussion.userId.profileImage} alt="" /></a>
                                                <div className="topic-title" onClick={() => handleCommentClick(index)}>
                                                    <div className="item-header" >
                                                        {discussion.discussTitle}
                                                    </div>
                                                    <div className="topic-info">
                                                        {/* {discussion.discussDescription} */}
                                                        <div className=" text-left" dangerouslySetInnerHTML={{ __html: discussion.discussDescription.slice(0, 40) + '...' }} />
                                                    </div>
                                                </div>
                                                <div className="upvote-view-container">
                                                    <div className="upvotes">
                                                        <i class="fa-solid fa-circle-up"></i>
                                                        <div className="no-of-upvotes">
                                                            {discussion?.upvotes}12k
                                                        </div>
                                                    </div>
                                                    <div className="views">
                                                        <i class="fa-solid fa-eye"></i>
                                                        <div className="no-of-views">{discussion.views}80k</div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                    ))}

                                    {expandedIndex !== null && (
                                        <SingleComment
                                            index={expandedIndex}
                                            discussion={discussionTopic.discuss[expandedIndex]}
                                            setExpandedIndex={setExpandedIndex} />
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* <div className="right-panel">

            </div> */}
            </div>
        </>

    );
};

export default Discuss;