import React, { useEffect, useState } from 'react';
import baseURL from '../../api/api';
import { fetchData } from '../../FetchData/FetchData';
import '@fortawesome/fontawesome-free/css/all.css';
import './Users.scss';
import { images } from '../../constants'
import Header from '../Header/Header';
import { Link, NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';

// Sample user data
// const usersData = [
//     {
//         id: 1,
//         fullName: 'Garima Ahari',
//         profileImage: images.garima,
//         passOutYear: 2020,
//         selectedBranch: 'DA',
//         position:'Data Engineer',
//         linkedin: 'https://www.linkedin.com/in/jinesh',
//         github: 'https://github.com/jinesh',
//         twitter: 'https://twitter.com/jinesh'
//     },
//     {
//         id: 1,
//         fullName: 'Kishan Bhatti',
//         profileImage: images.shashank,
//         passOutYear: 2021,
//         selectedBranch: 'DA',
//         position:'Student',
//         linkedin: 'https://www.linkedin.com/in/jinesh',
//         github: 'https://github.com/jinesh',
//         twitter: 'https://twitter.com/jinesh'
//     },
//     {
//         id: 1,
//         fullName: 'Bhoop Singh',
//         profileImage: images.luv,
//         passOutYear: 2020,
//         selectedBranch: 'CSE',
//         position:'Student',
//         linkedin: 'https://www.linkedin.com/in/jinesh',
//         github: 'https://github.com/jinesh',
//         twitter: 'https://twitter.com/jinesh'
//     },
//     {
//         id: 1,
//         fullName: 'Laksh Raj',
//         profileImage: images.laksh,
//         passOutYear: 2022,
//         selectedBranch: 'EE',
//         position:'Student',
//         linkedin: 'https://www.linkedin.com/in/jinesh',
//         github: 'https://github.com/jinesh',
//         twitter: 'https://twitter.com/jinesh'
//     },
//     {
//         id: 1,
//         fullName: 'Jinesh Prajapat',
//         profileImage: images.jinesh,
//         passOutYear: 2018,
//         selectedBranch: 'DA',
//         position:'Student',
//         linkedin: 'https://www.linkedin.com/in/jinesh',
//         github: 'https://github.com/jinesh',
//         twitter: 'https://twitter.com/jinesh'
//     },
//     {
//         id: 1,
//         fullName: 'Yuvraj Singh',
//         profileImage: images.yuvraj,
//         passOutYear: 2020,
//         selectedBranch: 'CSE',
//         position:'Student',
//         linkedin: 'https://www.linkedin.com/in/jinesh',
//         github: 'https://github.com/jinesh',
//         twitter: 'https://twitter.com/jinesh'
//     },
//     {
//         id: 1,
//         fullName: 'Kishan Bhatti',
//         profileImage: images.shashank,
//         passOutYear: 2020,
//         selectedBranch: 'DA',
//         position:'Student',
//         linkedin: 'https://www.linkedin.com/in/jinesh',
//         github: 'https://github.com/jinesh',
//         twitter: 'https://twitter.com/jinesh'
//     },
//     {
//         id: 1,
//         fullName: 'Bhoop Singh',
//         profileImage: images.luv,
//         passOutYear: 2020,
//         selectedBranch: 'CSE',
//         position:'Student',
//         linkedin: 'https://www.linkedin.com/in/jinesh',
//         github: 'https://github.com/jinesh',
//         twitter: 'https://twitter.com/jinesh'
//     },
//     {
//         id: 1,
//         fullName: 'Laksh Raj',
//         profileImage: images.laksh,
//         passOutYear: 2020,
//         selectedBranch: 'CSE',
//         position:'Student',
//         linkedin: 'https://www.linkedin.com/in/jinesh',
//         github: 'https://github.com/jinesh',
//         twitter: 'https://twitter.com/jinesh'
//     },
//     {
//         id: 1,
//         fullName: 'Jinesh Prajapat',
//         profileImage: images.jinesh,
//         passOutYear: 2020,
//         selectedBranch: 'CSE',
//         position:'Student',
//         linkedin: 'https://www.linkedin.com/in/jinesh',
//         github: 'https://github.com/jinesh',
//         twitter: 'https://twitter.com/jinesh'
//     },
//     {
//         id: 1,
//         fullName: 'Yuvraj Singh',
//         profileImage: images.yuvraj,
//         passOutYear: 2020,
//         selectedBranch: 'CSE',
//         position:'Student',
//         linkedin: 'https://www.linkedin.com/in/jinesh',
//         github: 'https://github.com/jinesh',
//         twitter: 'https://twitter.com/jinesh'
//     },
//     {
//         id: 1,
//         fullName: 'Kishan Bhatti',
//         profileImage: images.shashank,
//         passOutYear: 2020,
//         selectedBranch: 'DA',
//         position:'Student',
//         linkedin: 'https://www.linkedin.com/in/jinesh',
//         github: 'https://github.com/jinesh',
//         twitter: 'https://twitter.com/jinesh'
//     },
//     {
//         id: 1,
//         fullName: 'Bhoop Singh',
//         profileImage: images.luv,
//         passOutYear: 2020,
//         selectedBranch: 'CSE',
//         position:'Student',
//         linkedin: 'https://www.linkedin.com/in/jinesh',
//         github: 'https://github.com/jinesh',
//         twitter: 'https://twitter.com/jinesh'
//     },
//     {
//         id: 1,
//         fullName: 'Laksh Raj',
//         profileImage: images.laksh,
//         passOutYear: 2020,
//         selectedBranch: 'CSE',
//         position:'Student',
//         linkedin: 'https://www.linkedin.com/in/jinesh',
//         github: 'https://github.com/jinesh',
//         twitter: 'https://twitter.com/jinesh'
//     },
//     {
//         id: 1,
//         fullName: 'Jinesh Prajapat',
//         profileImage: images.jinesh,
//         passOutYear: 2020,
//         selectedBranch: 'CSE',
//         position:'Student',
//         linkedin: 'https://www.linkedin.com/in/jinesh',
//         github: 'https://github.com/jinesh',
//         twitter: 'https://twitter.com/jinesh'
//     },
//     {
//         id: 1,
//         fullName: 'Yuvraj Singh',
//         profileImage: images.yuvraj,
//         passOutYear: 2020,
//         selectedBranch: 'CSE',
//         position:'Student',
//         linkedin: 'https://www.linkedin.com/in/jinesh',
//         github: 'https://github.com/jinesh',
//         twitter: 'https://twitter.com/jinesh'
//     },
//     {
//         id: 1,
//         fullName: 'Kishan Bhatti',
//         profileImage: images.shashank,
//         passOutYear: 2020,
//         selectedBranch: 'DA',
//         position:'Student',
//         linkedin: 'https://www.linkedin.com/in/jinesh',
//         github: 'https://github.com/jinesh',
//         twitter: 'https://twitter.com/jinesh'
//     },
//     {
//         id: 1,
//         fullName: 'Bhoop Singh',
//         profileImage: images.luv,
//         passOutYear: 2020,
//         selectedBranch: 'CSE',
//         position:'Student',
//         linkedin: 'https://www.linkedin.com/in/jinesh',
//         github: 'https://github.com/jinesh',
//         twitter: 'https://twitter.com/jinesh'
//     },
//     {
//         id: 1,
//         fullName: 'Laksh Raj',
//         profileImage: images.laksh,
//         passOutYear: 2020,
//         selectedBranch: 'CSE',
//         position:'Student',
//         linkedin: 'https://www.linkedin.com/in/jinesh',
//         github: 'https://github.com/jinesh',
//         twitter: 'https://twitter.com/jinesh'
//     },
//     {
//         id: 1,
//         fullName: 'Jinesh Prajapat',
//         profileImage: images.jinesh,
//         passOutYear: 2020,
//         selectedBranch: 'CSE',
//         position:'Student',
//         linkedin: 'https://www.linkedin.com/in/jinesh',
//         github: 'https://github.com/jinesh',
//         twitter: 'https://twitter.com/jinesh'
//     },
//     {
//         id: 1,
//         fullName: 'Yuvraj Singh',
//         profileImage: "",
//         passOutYear: 2020,
//         selectedBranch: 'CSE',
//         position:'Student',
//         linkedin: 'https://www.linkedin.com/in/jinesh',
//         github: 'https://github.com/jinesh',
//         twitter: 'https://twitter.com/jinesh'
//     },

//     // Add more user objects here
// ];


const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        console.log("shufflearray", j);
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

const Users = () => {

    // fetching data
    const [allUsersData, setAllUsersData] = useState([]);

    useEffect(() => {
        fetchData(`${baseURL}/allusers`, setAllUsersData);
    }, []);


    console.log("usersData", allUsersData);


    // showing data in random order
    useEffect(() => {
        setAllUsersData(shuffleArray(allUsersData));
    }, []);

    const [filteredUsers, setFilteredUsers] = useState([]);
    const [filter, setFilter] = useState({
        year: '',
        branch: '',
        position: '',
        username: '',
    });


    // Filter users based on the filter object
    useEffect(() => {
        const filteredData = allUsersData?.allUsersWithProfiles?.
            filter(user => {
                return (
                    (filter.year === '' || user.passOutYear === (filter.year)) &&
                    (filter.branch === '' || user.selectedBranch === filter.branch) &&
                    (filter.position === '' || user.profileDetails.position === filter.position) &&
                    (filter.username === '' || user.username.toLowerCase().includes(filter.username.toLowerCase()))
                );
            });
        setFilteredUsers(filteredData);
    }, [allUsersData, filter]);

    const handleFilterChange = (key, value) => {
        setFilter({ ...filter, [key]: value });
    };

    const usersData = (filter.branch === "" && !filter.username === "" && filter.year === "" && filter.position === "") ? allUsersData.allUsersWithProfiles : filteredUsers;
    console.log("no filteration", usersData);

    


    return (
        <>
            <div className="user-list">
                {/* Filter options */}
                <div className="filter-section">
                    {/* <h2>Filters</h2> */}

                    <div className="filter-option">
                        <label htmlFor="year">Name:</label>
                        <input className="input"
                            type="text"
                            placeholder="Search by name"
                            value={filter.username}
                            onChange={e => handleFilterChange('username', e.target.value)}
                        />
                    </div>
                    <div className="filter-option">
                        <label htmlFor="year">Year:</label>
                        <select
                            id="year"
                            value={filter.year}
                            onChange={e => handleFilterChange('year', e.target.value)}
                        >
                            <option value="">All Year</option>
                            {allUsersData?.allUsersWithProfiles && (
                                <>
                                    {Array.from(new Set(allUsersData.allUsersWithProfiles.map(data => data.passOutYear)))
                                        .sort((a, b) => b - a)
                                        .map((year, index) => (
                                            <option key={year} value={year}>
                                                {year}
                                            </option>
                                        ))}
                                </>
                            )}
                        </select>
                    </div>
                    <div className="filter-option">
                        <label htmlFor="branch">Branch:</label>
                        <select
                            id="branch"
                            value={filter.branch}
                            onChange={e => handleFilterChange('branch', e.target.value)}
                        >
                            <option value="">All Year</option>
                            {allUsersData?.allUsersWithProfiles && (
                                <>
                                    {Array.from(new Set(allUsersData.allUsersWithProfiles.map(data => data.selectedBranch)))
                                        .map((branch, index) => (
                                            <option key={branch} value={branch}>
                                                {branch}
                                            </option>
                                        ))}
                                </>
                            )}

                            {/* <option value="">All Branch</option>
                            <option value="CSE">Computer Science Engineering</option>
                            <option value="DA">Artificial Intelligence & Data Science Engineering</option>
                            <option value="ECE">Electronics & Communication Engineering</option>
                            <option value="EE">Electrical Engineering</option>
                            <option value="AG">Agriculture Engineering</option>
                            <option value="MG">Mining Engineering</option>
                            <option value="CE">Civil Engineering</option>
                            <option value="ME">Mechanical Engineering</option> */}

                        </select>
                    </div>
                    <div className="filter-option">
                        <label htmlFor="position">Position:</label>
                        <select
                            id="position"
                            value={filter.position}
                            onChange={e => handleFilterChange('position', e.target.value)}
                        >
                            <option value="">All</option>
                            {allUsersData?.allUsersWithProfiles && (
                                <>
                                    {Array.from(new Set(allUsersData.allUsersWithProfiles.map(data => data.profileDetails.position)))
                                        .map((year, index) => (
                                            <option key={year} value={year}>
                                                {year}
                                            </option>
                                        ))}
                                </>
                            )}
                        </select>
                    </div>
                </div>

                {/* User cards */}
                <div className="user-cards">
                    {usersData && Array.isArray(usersData) ? (
                        usersData?.map((user, index) => (
                            <div >
                                <motion.div className="user-card" key={user?.id}
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ duration: 0.5, delay: 0.2 }}
                                >

                                    <div className="user-photo">
                                        <img src={`${user?.profileImage ? user?.profileImage : images.user}`} alt={user?.profileDetails.fullName} />
                                        <div className="passing-year">{user.passOutYear}</div>
                                    </div>

                                    <div className="user-details">
                                        <div className="user-name">{user?.profileDetails?.fullName}</div>
                                        <div className="user-branch">{user?.selectedBranch}</div>
                                        <div className="user-specialty">{user?.profileDetails?.position}</div>
                                        <div className="user-links">

                                            {user?.profileDetails?.links?.map((link, index) => (
                                                <li key={index}>
                                                    {link.type === "LinkedIn" && link.url && (
                                                        <a href={link.url}><i className="fab fa-linkedin-in" /></a>
                                                    )}

                                                    {link.type === "GitHub" && link.url && (
                                                        <a href={link.url}><i className="fa-brands fa-github" /></a>
                                                    )}

                                                    {link.type === "Twitter" && link.url && (
                                                        <a href={link.url}><i className="fab fa-twitter" /></a>
                                                    )}

                                                    {link.type === "YouTube" && link.url && (
                                                        <a href={link.url}><i className="fab fa-youtube" /></a>
                                                    )}

                                                </li>
                                            ))}

                                            {/* <a href={user.linkedin} target="_blank" rel="noopener noreferrer">
                                    <i className="fab fa-linkedin"></i>
                                </a>
                                <a href={user.github} target="_blank" rel="noopener noreferrer">
                                    <i className="fab fa-github"></i>
                                </a>
                                <a href={user.twitter} target="_blank" rel="noopener noreferrer">
                                    <i className="fab fa-twitter"></i>
                                </a> */}
                                        </div>

                                        <NavLink to={`/${user?.username}`} >
                                            <div className='border-1 border-black rounded-full  '>
                                                <p className='p-2 text-xs rounded-full duration-500 hover:bg-black hover:text-white hover:shadow-2xl' >View Profile</p>
                                            </div>
                                        </NavLink>

                                    </div>
                                </motion.div>
                            </div>
                        ))
                    ) : usersData?.Data ? (
                        // <Link to="/UserProfile/*" className='no-underline '>
                            <div className="user-card" key={usersData?.Data?.id}
                            >

                                <div className="user-profileImage">
                                    <img src={`${usersData?.Data?.profileImage ? usersData?.Data?.profileImage : images.user}`} alt={usersData?.Data?.profileDetails?.fullName} />
                                    <div className="passing-year">{usersData?.Data?.passOutYear}</div>
                                </div>

                                <div className="user-details">
                                    <div className="user-name">{usersData?.Data?.profileDetails?.fullName}</div>
                                    <div className="user-branch">{usersData?.Data?.selectedBranch}</div>
                                    <div className="user-specialty">{usersData?.Data?.profileDetails?.position}</div>
                                    <div className="user-links">

                                        {usersData?.Data?.profileDetails?.links?.map((link, index) => (
                                            <li key={index}>
                                                {link.type === "LinkedIn"   && (
                                                    <a href={link.url}><i className="fab fa-linkedin-in" /></a>
                                                )}

                                                {link.type === "GitHub" && link.url && (
                                                    <a href={link.url}><i className="fa-brands fa-github" /></a>
                                                )}

                                                {link.type === "Twitter" && link.url && (
                                                    <a href={link.url}><i className="fab fa-twitter" /></a>
                                                )}

                                                {link.type === "YouTube" && link.url && (
                                                    <a href={link.url}><i className="fab fa-youtube" /></a>
                                                )}

                                            </li>
                                        ))}

                                        {/* <a href={user.linkedin} target="_blank" rel="noopener noreferrer">
                                    <i className="fab fa-linkedin"></i>
                                </a>
                                <a href={user.github} target="_blank" rel="noopener noreferrer">
                                    <i className="fab fa-github"></i>
                                </a>
                                <a href={user.twitter} target="_blank" rel="noopener noreferrer">
                                    <i className="fab fa-twitter"></i>
                                </a> */}
                                        <NavLink to={`${usersData?.Data?.username}`} >
                                            <div className='border-1 border-black rounded-full  '>
                                                <p className='p-2 text-xs rounded-full duration-500 hover:bg-black hover:text-white hover:shadow-2xl' >View Profile</p>
                                            </div>
                                        </NavLink>
                                    </div>
                                </div>
                            </div>
                        // {/* </Link> */}
                    ) : (
                        <p>No data available</p>
                    )}
                </div>
            </div></>

    );
};

export default Users;