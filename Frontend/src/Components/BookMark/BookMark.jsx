import React, { useEffect } from 'react';
import axios from 'axios';
import { useState } from 'react';
import baseURL from '../../api/api';
import appURL from '../../api/webapp';
import { fetchData } from '../../FetchData/FetchData';
import { NavLink, useParams } from 'react-router-dom';
import { formatTimeAgo } from '../formatTimeAgo/formatTimeAgo';
import ShareButton from '../ShareButton/ShareButton';
import FlashMessage from '../FlashMessage/FlashMessage';


const Bookmark = () => {

    const [flashMessage, setFlashMessage] = useState(false);
    const [active, setActive] = useState(0);
    const [discussPost, setDiscussPost] = useState([]);

    const BookMarkMenus = [
        { name: "Discuss", path: "./Discuss" },
        { name: "Experience", path: "./Experience" },
    ];

    const handleClick = (index) => {
        setActive(index);
    };


    const { '*': path } = useParams();
    useEffect(() => {
        fetchData(`${baseURL}/bookmark/${path}`, setDiscussPost);
    }, [path]);
    // console.log("bookmarked ", path, discussPost);

    // deleteBookMark
    const handleBookMark = async (id, postType) => {
        try {
            const token = localStorage.getItem('token');
            if (token) {
                axios.post(`${baseURL}/bookmark/saved`, {
                    postId: id,
                    postType: postType
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
                        else if (response.status === 202) {
                            console.log("Removed from bookmark");
                            setFlashMessage({
                                type: "sucess",
                                message: "Removed from BookMark!"
                            });

                        }
                    })
                    .catch((error) => {
                        console.log("error.response", error.response);
                        if (error.response.status === 500) {
                            console.log("Server side error")
                            setFlashMessage({ type: "error", message: "Not saved, try again" });
                        }
                        else {
                            console.error("Error:", error);
                            console.error("Network or request error");
                            setFlashMessage({ type: "error", message: "Network Error" });
                        }
                    })
            }
        }
        catch (error) {
            console.log("unsuccessful");
            setFlashMessage({ type: "error", message: "Not saved, try again" });
        }
    }

    return (
        <>
            <div className="rounded-lg sm:shadow-md sm:px-0 md:px-4 mx-1 py-4 sm:mx-2">
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-lg font-semibold">Bookmarks</h2>
                    <div className=" ">
                        <ul className="flex gap-2 pb-1">
                            {BookMarkMenus.map((menu, i) => (
                                <li key={i} className={` rounded-sm duration-500 hover:bg-slate-400 ${active === i ? "duration-700 bg-black " : ""} `}>
                                    <NavLink
                                        className="flex text-center p-2"
                                        to={menu.path}
                                        activeClassName="text-white"
                                        onClick={() => handleClick(i)}
                                    >
                                        <span className={` ${active === i ? "duration-200 opacity-100 text-white" : " duration-200 opacity-100"}`}>
                                            {menu.name}
                                        </span>
                                    </NavLink>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {!path && (
                    <p>Please select a category from the menu.</p>
                )}

                {/* if only discuss */}
                {path === "Discuss" && (
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 sm:px-2">
                        {discussPost?.bookmark?.length > 0 ? (
                            discussPost?.bookmark?.map(post => (
                                <section className=' bg-white px-4 py-2 rounded-lg'>
                                    <NavLink to={`/Discuss/${post.discussTitle}`} className="topic-title " >
                                        <div key={post._id} className=" text-left">
                                            <h3 className="text-xs md:text-[16px] pt-2 font-bold whitespace-nowrap overflow-hidden ">{post?.discussTitle}</h3>
                                            <div className='flex items-center justify-between '>
                                                <div className="text-left text-[8px] sm:text-xs text-gray-400 ">{formatTimeAgo(post.createdAt)}</div>

                                                <div className='flex gap-2 text-[8px] sm:text-xs text-gray-400 '>
                                                    <div className="upvotes flex items-center ">
                                                        {/* <i class="fa-solid fa-circle-up" ></i> */}
                                                        <div className="no-of-upvotes">
                                                            {post?.upvotes.length} votes
                                                        </div>
                                                    </div>
                                                    <div className="views flex items-center">
                                                        {/* <i class="fa-solid fa-eye"></i> */}
                                                        <div className="no-of-views">{post.views}80k views</div>
                                                    </div>
                                                </div>
                                            </div>

                                            <hr className=' my-2' />
                                            <p className="text-sm text-gray-500">{post?.author}</p>
                                            <div className=" text-sm " dangerouslySetInnerHTML={{ __html: post?.discussDescription.slice(0, 300) + '...' }} />
                                        </div>
                                    </NavLink>
                                    <hr className=' mt-2' />
                                    <div className='flex justify-between items-center'>
                                        <div className='flex flex-col'
                                            onClick={() => handleBookMark(post?._id, "Discuss" )}
                                        >
                                            <i class="fa-solid fa-trash-can  p-2  text-slate-600 rounded-sm duration-500 cursor-pointer hover:text-slate-900 hover:scale-110" />
                                            <small className='text-xs'>Delete</small>
                                        </div>
                                        <NavLink to={`/Discuss/${post.discussTitle}`} className='flex flex-col' >
                                            <i class="fa-regular fa-comment-dots p-2  text-slate-600 rounded-sm duration-500 cursor-pointer hover:text-slate-900 hover:scale-110" />
                                            <small className='text-xs'>Comments</small>
                                        </NavLink>
                                        <NavLink to={`/chat`} className='flex flex-col'>
                                            <i class="fa-regular fa-paper-plane p-2  text-slate-600 rounded-sm duration-500 cursor-pointer hover:text-slate-900 hover:scale-110"></i>
                                            <small className='text-xs'>Send</small>
                                        </NavLink>
                                        <ShareButton url={`${appURL}/Discuss/${post.discussTitle}`} title={post?.discussTitle} />
                                    </div>

                                </section>
                            )))
                            : (
                                <p>No collection is available</p>
                            )
                        }
                    </div>
                )}

                {/* if only experience */}
                {path === "Experience" && (
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                        {discussPost?.bookmark?.length > 0 ? (
                            discussPost?.bookmark?.map(post => (
                                <NavLink to={`/Discuss/${post.discussTitle}`} className="topic-title" >
                                    <div key={post._id} className="bg-gray-100 p-4 rounded-lg">
                                        <h3 className="text-lg font-medium">{post?.discussTitle}</h3>
                                        <p className="text-sm text-gray-500">{post?.author}</p>
                                        {/* <div className=" text-sm" dangerouslySetInnerHTML={{ __html: post?.discussDescription.slice(0, 300) + '...' }} /> */}
                                    </div>
                                </NavLink>
                            )))
                            : (
                                <p className=''>No collection is available</p>
                            )
                        }
                    </div>
                )}

                {flashMessage && (
                    <FlashMessage
                        type={flashMessage.type}
                        message={flashMessage.message}
                    />
                )}

            </div>
        </>
    );
};

export default Bookmark;
