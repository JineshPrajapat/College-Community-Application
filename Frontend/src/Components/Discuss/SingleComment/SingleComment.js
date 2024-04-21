import React, { useState, useMemo, useEffect } from "react";
import axios from "axios";
import { NavLink, useParams, useNavigate } from "react-router-dom";
import baseURL from "../../../api/api";
import { images } from "../../../constants";
import './SingleComment.scss';
import FlashMessage from "../../FlashMessage/FlashMessage";
import Comment from "../../Comment Sections/Comment";
import { fetchData } from "../../../FetchData/FetchData";
import { formatTimeAgo } from "../../formatTimeAgo/formatTimeAgo";

// const reactions = [
//     {
//         Url: images.garima,
//         name: "Garima Ahari",
//         description: "Find well balanced valid string input = (fdfsdf(dfgdf(hjk)) op = (dfgdf(hjk)) , because it has balanced paranthesis so max string is (dfgdf(hjk)) how did u solve this",
//         lastupdated: "5 hours ago"
//     },
//     {
//         Url: images.garima,
//         name: "Garima Ahari",
//         description: "Design a Data Structure that , given top N element from current array , stream = [1,4,5,9,3] N= 2 out= [9,5] , there can be multiple queries , and stream is continously incresing in size , you cant use built in Data structure., i created linked list , with node * stored in map to direct access so use binary seach when adding element.",
//         lastupdated: "5 hours ago"
//     },
//     {
//         Url: images.garima,
//         name: "Garima Ahari",
//         description: "My feedback : except HLD, all other were good , in HLD i did not suggest to use checksum to check data validity. insteead i suggested to use some consensus algo , which is good but not efficiant as checksum.",
//         lastupdated: "5 hours ago"
//     },

// ]
function SingleComment() {

    const [flashMessage, setFlashMessage] = useState(false);
    const [discussionTopic, setDiscussTopic] = useState({});
    const { discussTitle } = useParams();

    console.log("discussTitle", discussTitle);

    useEffect(() => {
        fetchData(`${baseURL}/discuss/${discussTitle}`, setDiscussTopic);
    }, [discussTitle]);

    // console.log("discusstitle", discussionTopic);
    useEffect(() => {
        if (discussionTopic.discuss && discussionTopic.discuss.length > 0) {
            setDiscussTopic(discussionTopic.discuss[0]);
        }
    }, [discussionTopic]);

    const discussion = useMemo(() => discussionTopic, [discussionTopic]);
    console.log("memo discussion", discussion);

    // const upvotesCount = useMemo(() => {
    //     return discussion?.upvotes.length || 0;
    // }, [discussion]);

    const navigate= useNavigate()
    const handleClose = () =>{
        navigate(-1);
    }
    const handleUpvoteClick = async (id) => {
        console.log("idid", id);

        try {
            const token = localStorage.getItem('token');
            if (token) {
                axios.post(`${baseURL}/post/upvotes`, {
                    post: id,
                    postType: "Discuss"
                }, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })
                    .then((response) => {
                        console.log("Response", response);

                        if (response.status === 200) {
                            console.log("Discuss liked successfully");
                        }
                    })
                    .catch((error) => {
                        if (error.response.status === 400) {
                            console.log("You have already upvoted this post");
                            setFlashMessage({
                                type: "info",
                                message: "You have already upvoted!"
                            });
                        }
                        else if (error.message) {
                            console.error("Error:", error);
                        }
                        else {
                            console.error("Network or request error");
                        }
                    })
            }
        }
        catch (error) {
            console.log("unsuccessful");
        }

    }

    const handleBookMark = async(id)=>{
        try {
            const token = localStorage.getItem('token');
            if (token) {
                axios.post(`${baseURL}/bookmark/saved`, {
                    postId: id,
                    postType: "Discuss"
                }, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })
                    .then((response) => {
                        console.log("Response", response);

                        if (response.status === 200) {
                            console.log("Discuss bookmarked successfully");
                            setFlashMessage({
                                type: "sucess",
                                message: "Saved to BookMark!"
                            });

                        }
                    })
                    .catch((error) => {
                        if (error.response.status === 400) {
                            console.log("You have already bookmarked this post")
                            setFlashMessage({type: "error", message: "Not saved, try again" });
                        } if (error.response.status === 402) {
                            console.log("You have already bookmarked this post");
                            setFlashMessage({type: "info", message: "You have already bookmarked this post" });
                        }
                        else {
                            console.error("Error:", error);

                            console.error("Network or request error");
                            setFlashMessage({type: "error", message: "Network Error" });
                        }
                    })
            }
        }
        catch (error) {
            console.log("unsuccessful");
            setFlashMessage({type: "error", message: "Not saved, try again" });
        }
    }

    // const [formValue, setformValue] = useState({
    //     commentResponse: ""
    // });

    // const handleChange = (event) => {
    //     setformValue({
    //         ...formValue,
    //         [event.target.name]: event.target.value,
    //     });
    // };

    // const handleFormSubmit = (event) => {
    //     if (event) {
    //         axios.post(`${baseURL}/Discuss/comments/response`, {
    //             commentsResponse: formValue.commentResponse
    //         })
    //             .then((response) => {
    //                 console.log("Response:", response);

    //                 if (response.status === 200) {
    //                     setFlashMessage({
    //                         type: "success",
    //                         message: "Response added successfully!"
    //                     });
    //                 }
    //             })
    //             .catch((error) => {
    //                 if (error.response) {
    //                     console.error("Error:", error);
    //                     setFlashMessage({
    //                         type: "error",
    //                         message: "Failed, try again!",
    //                     });
    //                 }
    //                 else {
    //                     console.error("Network or request error");
    //                 }
    //             });
    //     }
    // }
    return (
        <div className="discuss-form-container">
            <div className="comment-block">
                <div className='comments'>
                    <div className='flex  '>
                        <div className="left-sidebar pt-2 pr-3">
                            <div className="upvote-view-container ">
                                <div className="upvotes">
                                    <i
                                        className="fa-solid fa-circle-up p-2 bg-slate-200 text-slate-600 rounded-sm duration-500 cursor-pointer hover:bg-slate-300 hover:text-slate-800"
                                        onClick={() => handleUpvoteClick(discussion?._id)}
                                    />
                                    <div className="no-of-upvotes">
                                        {discussion?.upvotes?.length}
                                    </div>
                                </div>
                                {/* <div className="views">
                                    <i class="fa-solid fa-eye"></i>
                                    <div className="no-of-views">{discussion.views}80k</div>
                                </div> */}
                                <div className="bookmark pt-5">
                                    <i class="fa-solid fa-bookmark  p-2 bg-slate-200 text-slate-600 rounded-sm duration-500 cursor-pointer hover:bg-slate-300 hover:text-slate-800"
                                    onClick={() => handleBookMark(discussion?._id)}
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="comment-content">
                            <span className='close bg-slate-200 font-bold p-2 rounded-md hover:bg-slate-500 hover:text-white' onClick={() => handleClose()}>
                                Close
                                {/* <i class="fa fa-times" aria-hidden="true"></i> */}
                            </span>

                            <div className='info'>
                                <div>{discussion?.discussTitle}</div>
                            </div>

                            <div className='Profile'>
                                <NavLink to={`/${discussion?.userId?.username}`}><img src={discussion?.userId?.profileImage} alt={discussion?.userId?.username}></img></NavLink>
                                <div className="">{discussion?.userId?.username}</div>
                                <div className="text-left text-[8px] sm:text-xs text-gray-400">{formatTimeAgo(discussion.createdAt)}</div>
                            </div>

                            <div className='comment-details'>
                                <div dangerouslySetInnerHTML={{ __html: discussion?.discussDescription }} />
                            </div>
                        </div>
                    </div>


                    <Comment discussionId={discussion?._id} />

                    {/* <div className="comment-box-container">
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
                    </div> */}
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