import React, { useState } from "react";
import baseURL from "../../api/api";
import '@fortawesome/fontawesome-free/css/all.css';
import { images } from "../../constants";
import { Routes, Route } from "react-router-dom";
import { Link, NavLink } from "react-router-dom";
import './Discuss.scss';
import SingleComment from "./SingleComment/SingleComment";
import AddQuery from "./AddQuery/AddQuery";
import Contact from "../UserProfile/Contact/Contact";
import Header from "../Header/Header";
import { fetchData } from '../../FetchData/FetchData';
import { formatTimeAgo } from "../formatTimeAgo/formatTimeAgo";
import Loading from "../Loading/Loading";


// const discussionTopicData = [
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
    const [discussionTopicData, setdiscussionTopicData] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredTopics, setFilteredTopics] = useState([]);
    const [expandedIndex, setExpandedIndex] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    useState(() => {
        setIsLoading(true);
        fetchData(`${baseURL}/discuss`, setdiscussionTopicData);
        setIsLoading(false);
    }, []);
    console.log("discuss", discussionTopicData.discuss);

    const handleShowDiscussClick = (index) => {
        setExpandedIndex(index === expandedIndex ? null : index);
    };

    // filtering search input
    const handleSearchInputChange = (event) => {
        setSearchQuery(event.target.value);
        filterTopics(event.target.value);
    }

    const filterTopics = (query) => {
        console.log("filteration");
        if (query.trim() === '') {
            setFilteredTopics([]);
        } else {
            // Filter discussions based on the query
            const filtered = discussionTopicData.discuss.filter(topic =>
                topic.discussTitle.toLowerCase().includes(query.toLowerCase())
            );
            setFilteredTopics(filtered);
        }
        // console.log("filtered topics",filteredTopics);
    }

    const discussionTopic = searchQuery.trim() === '' ? discussionTopicData.discuss : filteredTopics;
    console.log("topicsto Display", discussionTopic);


    return (
        <>
            <div className="main-conatiner ">
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
                                {!isLoading ? (
                                    <div>
                                        {!discussionTopic ? (
                                            <p>No topics found</p>
                                        ) : (discussionTopic.map((discussion, index) => (
                                            <div className="topic-item-container">
                                                <div className="topic-item">
                                                    <div className="left-side">
                                                        <NavLink to={`/${discussion?.userId?.username}`}><img src={discussion?.userId?.profileImage} alt="" /></NavLink>
                                                        <div className="topic-title">
                                                            <NavLink to={`/Discuss/${discussion?.discussTitle}`} className="topic-title" >
                                                                <div className="item-header"  >
                                                                    {discussion.discussTitle}
                                                                </div>
                                                                <div className="topic-info">
                                                                    {/* {discussion.discussDescription} */}
                                                                    <div className=" text-left" dangerouslySetInnerHTML={{ __html: discussion.discussDescription.slice(0, 30) + '...' }} />
                                                                </div>
                                                                <div className="text-left text-[8px] sm:text-xs text-gray-400 sm:pt-2">{formatTimeAgo(discussion.createdAt)}</div>
                                                            </NavLink>
                                                        </div>
                                                    </div>
                                                    <div className="upvote-view-container">
                                                        <div className="upvotes">
                                                            <i class="fa-solid fa-circle-up" ></i>
                                                            <div className="no-of-upvotes">
                                                                {discussion?.upvotes.length}votes
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

                                        {/* {expandedIndex !== null && (
                                        <SingleComment
                                            index={expandedIndex}
                                            discussion={discussionTopicData.discuss[expandedIndex]}
                                            setExpandedIndex={setExpandedIndex} />
                                    )} */}
                                    </div>
                                ) : (
                                    <div className="mt-[25vh]">
                                        <Loading />
                                    </div>
                                )}
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