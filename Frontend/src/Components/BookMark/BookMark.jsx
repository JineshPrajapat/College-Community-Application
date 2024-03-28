import React, { useEffect } from 'react';
import { useState } from 'react';
import baseURL from '../../api/api';
import { fetchData } from '../../FetchData/FetchData';
import { NavLink, useParams } from 'react-router-dom';

// const posts = [
//     {
//         id: 1,
//         title: 'Lorem ipsum dolor sit amet',
//         author: 'John Doe',
//         content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
//     },
//     {
//         id: 2,
//         title: 'Consectetur adipiscing elit',
//         author: 'Jane Smith',
//         content: 'Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
//     },
//     {
//         id: 3,
//         title: 'Consectetur adipiscing elit',
//         author: 'Jane Smith',
//         content: 'Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
//     },
//     {
//         id: 1,
//         title: 'Lorem ipsum dolor sit amet',
//         author: 'John Doe',
//         content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
//     },
//     {
//         id: 2,
//         title: 'Consectetur adipiscing elit',
//         author: 'Jane Smith',
//         content: 'Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
//     },
//     {
//         id: 3,
//         title: 'Consectetur adipiscing elit',
//         author: 'Jane Smith',
//         content: 'Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
//     },
//     // Add more bookmarked posts here
// ];

const Bookmark = () => {

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
    console.log("bookmarked ", path, discussPost);


    return (
        <>
            <div className="bg-white rounded-lg shadow-md p-4 mx-2">
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
                {path === "Discuss" &&  (
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                        {discussPost?.bookmark?.length > 0 ? (
                            discussPost?.bookmark?.map(post => (
                                <NavLink to={`/Discuss/${post.discussTitle}`} className="topic-title" >
                                    <div key={post._id} className="bg-gray-100 p-4 rounded-lg">
                                        <h3 className="text-lg font-medium">{post?.discussTitle}</h3>
                                        <p className="text-sm text-gray-500">{post?.author}</p>
                                        <div className=" text-sm" dangerouslySetInnerHTML={{ __html: post?.discussDescription.slice(0, 300) + '...' }} />
                                    </div>  
                                </NavLink>
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

            </div>
        </>
    );
};

export default Bookmark;
