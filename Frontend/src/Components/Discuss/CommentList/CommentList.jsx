import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { fetchData } from '../../../FetchData/FetchData';
import baseURL from '../../../api/api';
import FlashMessage from '../../FlashMessage/FlashMessage';
import { images } from '../../../constants';
import { formatTimeAgo } from '../../formatTimeAgo/formatTimeAgo';
import { NavLink } from 'react-router-dom';
import { arrowUndoOutline, chatboxEllipsesOutline, warningOutline } from "ionicons/icons";
import { IonIcon } from "@ionic/react";

const reactions = [
    {
        Url: images.garima,
        name: "Garima Ahari",
        description: "Find well balanced valid string input = (fdfsdf(dfgdf(hjk)) op = (dfgdf(hjk)) , because it has balanced paranthesis so max string is (dfgdf(hjk)) how did u solve this",
        lastupdated: "5 hours ago"
    },
    {
        Url: images.garima,
        name: "Garima Ahari",
        description: "Design a Data Structure that , given top N element from current array , stream = [1,4,5,9,3] N= 2 out= [9,5] , there can be multiple queries , and stream is continously incresing in size , you cant use built in Data structure., i created linked list , with node * stored in map to direct access so use binary seach when adding element.",
        lastupdated: "5 hours ago"
    },
    {
        Url: images.garima,
        name: "Garima Ahari",
        description: "My feedback : except HLD, all other were good , in HLD i did not suggest to use checksum to check data validity. insteead i suggested to use some consensus algo , which is good but not efficiant as checksum.",
        lastupdated: "5 days ago"
    },

]

export const CommentList = ({ discussionId }) => {

    const [comment, setComment] = useState([]);
    const [flashMessage, setFlashMessage] = useState(false);
    const [showReplyInput, setShowReplyInput] = useState(null);
    const [showReplies, setShowReplies] = useState(new Set());
    const [formValue, setformValue] = useState({
        commentDescription: "",
        nestedComment: ""
    });

    const handleChange = (event) => {
        setformValue({
            ...formValue,
            [event.target.name]: event.target.value,
        });
    };

    const handleReplyButtonClick = (index) => {
        if (index === showReplyInput) {
            setShowReplyInput(null)
        }
        else {
            setShowReplyInput(index);
        }
    }

    const handleShowReplyButtonClick = (commentId) => {
        setShowReplies((prevShowReplies) => {
            if (prevShowReplies.has(commentId)) {
                const newShowReplies = new Set(prevShowReplies);
                newShowReplies.delete(commentId);
                return newShowReplies;
            } else {
                return new Set(prevShowReplies).add(commentId);
            }
        });
    };

    // const handleReportButtonClick = (commentId) =>{

    // }

    const handleSingleCommentSubmit = (event) => {
        if (event) {
            const token = localStorage.getItem("token");
            axios.post(`${baseURL}/discuss/addComment`, {
                body: formValue.commentDescription,
                discussionId: discussionId
            }, {
                headers: {
                    Authorization: `Bearer ${token}`            // Include token in Authorization header
                }
            })
                .then((response) => {
                    console.log("Response:", response);

                    if (response.status === 200) {
                        setFlashMessage({
                            type: "success",
                            message: "Response added successfully!"
                        });
                    }
                })
                .catch((error) => {
                    if (error.response) {
                        console.error("Error:", error);
                        setFlashMessage({
                            type: "error",
                            message: "Failed, try again!",
                        });
                    }
                    else {
                        console.error("Network or request error");
                    }
                })
                .finally(() => {
                    setformValue({
                        nestedComment: "",
                        commentDescription: ""
                    })
                })
        }
    }

    const handleNestedCommentForm = (commentID, discussionId) => {
        try {
            const token = localStorage.getItem("token");
            axios.post(`${baseURL}/discuss/${commentID}/nestedComment/${discussionId}`, {
                nestedComment: formValue.nestedComment,
            }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
                .then((response) => {
                    console.log("Response:", response);

                    if (response.status === 200) {
                        setFlashMessage({
                            type: "success",
                            message: "Nested comment added successfully!"
                        });
                    }
                })
                .catch((error) => {
                    if (error.response) {
                        console.error("Error:", error);
                        setFlashMessage({
                            type: "error",
                            message: "Failed, try again!",
                        });
                    }
                    else {
                        console.error("Network or request error");
                    }
                })
                .finally(() => {
                    setformValue({
                        nestedComment: ""
                    })
                })
        }
        catch (error) {
            console.log("error", error);
        }
    }


    useEffect(() => {
        fetchData(`${baseURL}/discuss/${discussionId}/comment`, setComment);
    }, [discussionId]);

    const a = 10;
    // console.log("fetched Comment", comment.comments);

    return (
        <div className="comment-box-container">
            <div className="comments-sections">
                <div className="comments-section-heading">
                    {`Comments: ${comment?.comments?.length ? comment?.comments?.length : "NA"}`}
                </div>
                <form className="comment-form" onSubmit={handleSingleCommentSubmit}>
                    <textarea
                        id="commentDescription"
                        name="commentDescription"
                        placeholder="Write comment here"
                        value={formValue.commentDescription}
                        onChange={handleChange}
                        required
                    />
                    <button type="submit" className="btn-comment">Post</button>
                </form>

                <div className="reactions-container">
                    {comment?.comments?.length > 0 ? comment?.comments.map((comment, index) => (
                        <CommentItem key={comment._id} comment={comment} index={index} handleReplyButtonClick={handleReplyButtonClick} handleShowReplyButtonClick={handleShowReplyButtonClick} showReplyInput={showReplyInput} showReplies={showReplies} handleNestedCommentForm={handleNestedCommentForm} formValue={formValue} handleChange={handleChange} />
                    )) : <p>No comments available. Start by sharing your response</p>}
                </div>
            </div>
        </div>
    )
};



const CommentItem = ({ comment, index, handleReplyButtonClick, handleShowReplyButtonClick, showReplyInput, showReplies, handleNestedCommentForm, formValue, handleChange }) => {
    return (
        <div className="reactions ">
            <div className="profile-info">
                <NavLink to={`/${comment?.userId?.username}`}>
                    <img src={comment?.userId?.profileImage} alt={comment?.userId?.username} />
                </NavLink>
                <NavLink to={`/${comment?.userId?.username}`}>
                    <div className="username">{comment?.userId?.username}</div>
                </NavLink>
                <div className="last-updated">{formatTimeAgo(comment?.commenttedAt)}</div>
            </div>
            <div className="reaction-description">{comment?.body}</div>

            <div className='flex justify-start gap-2 pl-16'>
                {comment?.replies.length > 0 &&
                    <div className='flex justify-end '>
                        <button className=" flex items-center gap-1  text-gray-500 font-medium py-1 px-2 rounded-lg mt-2 hover:bg-gray-200 hover:text-black hover:font-semibold transition duration-300" onClick={() => handleShowReplyButtonClick(comment?._id)}>
                            <IonIcon icon={chatboxEllipsesOutline} className=' text-xl font-bold' />
                            <span className='text-xs'>{`Show ${comment?.replies.length} replies`}</span>
                        </button>
                    </div>
                }
                <div className='flex justify-end'>
                    <button className="flex items-center gap-1  text-gray-500 font-medium  py-1 px-2 rounded-lg mt-2 hover:bg-gray-200 hover:text-black hover:font-semibold transition duration-300" onClick={() => handleReplyButtonClick(comment?._id)}>
                        <IonIcon icon={arrowUndoOutline} className=' text-xl font-bold' />
                        <span className='text-xs'>Reply</span>
                    </button>
                </div>
                {/* <div className='flex justify-end opacity-0 hover:opacity-100'>
                    <button className="flex items-center gap-1  text-gray-500 font-medium  py-1 px-2 rounded-lg mt-2 hover:bg-gray-200 hover:text-black hover:font-semibold transition duration-300" onClick={() => handleReportButtonClick(comment?._id)}>
                        <IonIcon icon={warningOutline} className=' text-xl font-bold' />
                        <span className='text-xs'>Report</span>
                    </button>
                </div> */}


            </div>

            {showReplyInput === comment?._id && (
                <form className="px-4 mt-2 flex gap-2 items-center" onSubmit={(e) => { e.preventDefault(); handleNestedCommentForm(comment._id); }}>
                    <textarea
                        id="nestedComment"
                        name="nestedComment"
                        value={formValue.nestedComment}
                        onChange={handleChange}
                        placeholder="Write reply here"
                        className="w-full rounded-lg p-2 ml-6 border border-gray-500 focus:outline-slate-300 focus:border-blue-500"
                        required
                    />
                    <button className="bg-blue-500 text-white font-semibold rounded-lg mt-2 hover:bg-blue-600 transition duration-300">
                        <i className="fa-solid fa-paper-plane text-xl py-2 px-4"></i>
                    </button>
                </form>
            )}

            {showReplies.has(comment?._id) &&
                <div className='pl-4'>
                    {comment?.replies && comment.replies.map((reply, replyIndex) => (
                        <CommentItem key={reply._id} comment={reply} index={replyIndex} handleReplyButtonClick={handleReplyButtonClick} handleShowReplyButtonClick={handleShowReplyButtonClick} showReplyInput={showReplyInput} showReplies={showReplies} handleNestedCommentForm={handleNestedCommentForm} formValue={formValue} handleChange={handleChange} />
                    ))}
                </div>
            }
        </div>
    );
};

