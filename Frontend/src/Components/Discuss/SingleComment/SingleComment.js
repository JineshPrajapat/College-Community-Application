import React, { useState } from "react";
import axios from "axios";
import baseURL from "../../../api/api";
import { images } from "../../../constants";
import './SingleComment.scss';
import FlashMessage from "../../FlashMessage/FlashMessage";

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
        lastupdated: "5 hours ago"
    },

]
function SingleComment({ index, discussion, setExpandedIndex }) {

    const [flashMessage, setFlashMessage] = useState(false);

    const [formValue, setformValue] = useState({
        commentResponse: ""
    });

    const handleChange = (event) => {
        setformValue({
            ...formValue,
            [event.target.name]: event.target.value,
        });
    };

    const handleFormSubmit = (event) => {
        if (event) {
            axios.post(`${baseURL}/Discuss/comments/response`, {
                commentsResponse: formValue.commentResponse
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
                });
        }
    }
    return (
        <div className="discuss-form-container">
            <div className="comment-block">
                <div className='comments'>
                    <div className='comment-content'>
                        <span className='close' onClick={() => setExpandedIndex(null)}>
                            <i class="fa fa-times" aria-hidden="true"></i>
                        </span>
                        <div className='Profile'>
                            <img src={discussion.Url} alt={discussion.name}>{discussion.user}</img>
                            <div className='info'>
                                <div>{discussion.discussTitle}</div>
                            </div>
                        </div>
                        <div className='comment-details'>
                            {discussion.discussDescription}
                        </div>
                    </div>
                    <div className="comment-box-container">
                        <div className="comments-sections">
                            <div className="comments-section-heading">
                                Comments:
                            </div>
                            <form className="comment-form" onSubmit={handleFormSubmit}>
                                <textarea
                                    id="comment"
                                    name="comment"
                                    placeholder="Write comment here"
                                    value={formValue.commentResponse}
                                    onChange={handleChange}
                                    required
                                />
                                <button type="submit" className="btn-comment">Post</button>
                            </form>
                            <div className="reactions-container">
                                {reactions.map((reactions, index) => (
                                    <div className="reactions">
                                        <div className="profile-info">
                                            <img src={reactions.Url} alt={reactions.name}></img>
                                            <div className="username">{reactions.name}</div>
                                            <div className="last-updated">{reactions.lastupdated}</div>
                                        </div>
                                        <div className="reaction-description">{reactions.description}</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
                
                
                {/* flash component */}
                {flashMessage && (
                    <FlashMessage
                        type={flashMessage.type}
                        message={flashMessage.message}
                    />
                )}
            </div>
        </div>
    );
};

export default SingleComment;