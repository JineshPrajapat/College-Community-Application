import React, { useEffect, useState } from 'react';
import baseURL from '../../api/api';
import { fetchData } from '../../FetchData/FetchData';
import '@fortawesome/fontawesome-free/css/all.css';
import './Users.scss';
import { images } from '../../constants'
import Header from '../Header/Header';
import { Link } from 'react-router-dom';
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
        console.log(j);
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

const Users = () => {

    // fetching data
    const [usersData, setUsersData] = useState([]);
    useState(() => {
        fetchData(`${baseURL}/userinfo`, setUsersData);
    }, []);

    console.log("usersData", usersData);


    // showing data in random order
    // const [users, setUsers] = useState([]);

    useEffect(() => {
        setUsersData(shuffleArray(usersData));
    }, []);

    const [filteredUsers, setFilteredUsers] = useState([]);
    const [filter, setFilter] = useState({
        year: '',
        branch: '',
        // location: '',
        position: '',
        username: '',
    });


    // Filter users based on the filter object
    // useEffect(() => {
    //     const filteredData = usersData.filter(user => {
    //         return (
    //             (filter.year === '' || user.passOutYear === (+filter.year)) &&
    //             (filter.branch === '' || user.branch === filter.branch) &&
    //             (filter.position === '' || user.position === filter.position) &&
    //             (filter.username === '' || user.name.toLowerCase().includes(filter.username.toLowerCase()))
    //         );
    //     });
    //     setFilteredUsers(filteredData);
    // }, [usersData, filter]);

    // const handleFilterChange = (key, value) => {
    //     setFilter({ ...filter, [key]: value });
    // };


    return (
        <>
            <Header />
            <div className="user-list">
                {/* Filter options */}
                {/* <div className="filter-section">
                <h2>Filters</h2>

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
                        {[...new Set(usersData.map(data => data.passOutYear))]                    //selecting unique year
                            .sort((a, b) => b - a)                                            // sorting year
                            .map(year => (
                                <option key={year} value={year}>
                                    {year}
                                </option>
                            ))}
                    </select>
                </div>
                <div className="filter-option">
                    <label htmlFor="branch">Branch:</label>
                    <select
                        id="branch"
                        value={filter.branch}
                        onChange={e => handleFilterChange('branch', e.target.value)}
                    >
                        <option value="">All Branch</option>
                        <option value="CSE">Computer Science Engineering</option>
                        <option value="DA">Artificial Intelligence & Data Science Engineering</option>
                        <option value="ECE">Electronics & Communication Engineering</option>
                        <option value="EE">Electrical Engineering</option>
                        <option value="AG">Agriculture Engineering</option>
                        <option value="MG">Mining Engineering</option>
                        <option value="CE">Civil Engineering</option>
                        <option value="ME">Mechanical Engineering</option>

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
                        {[...new Set(usersData.map(data => data.position))]                    //selecting unique year
                            .sort((a, b) => b - a)                                            // sorting year
                            .map(position => (
                                <option key={position} value={position}>
                                    {position}
                                </option>
                            ))}
                    </select>
                </div>
                <div className="filter-option">
                    <label htmlFor="location">Location:</label>
                    <input
                        type="text"
                        id="location"
                        value={filter.location}
                        onChange={e => handleFilterChange('location', e.target.value)}
                    />
                </div>
                
            </div> */}

                {/* User cards */}
                <div className="user-cards">
                    {usersData && Array.isArray(usersData.Data) ? (
                        usersData?.Data?.map(user => (
                        <Link to="/UserProfile/*">        
                            <div className="user-card" key={user?.id}
                            >

                                <div className="user-profileImage">
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
                                                {link.type === "LinkedIn" && (
                                                    <a href={link.url}><i className="fab fa-linkedin-in" /></a>
                                                )}

                                                {link.type === "GitHub" && (
                                                    <a href={link.url}><i className="fa-brands fa-github" /></a>
                                                )}

                                                {link.type === "Twitter" && (
                                                    <a href={link.url}><i className="fab fa-twitter" /></a>
                                                )}

                                                {link.type === "YouTube" && (
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
                                </div>
                            </div>
                        </Link>
                        ))
                    ) : usersData?.Data ? (
                        <Link to="/UserProfile/*" className='no-underline '>
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
                                                {link.type === "LinkedIn" && (
                                                    <a href={link.url}><i className="fab fa-linkedin-in" /></a>
                                                )}

                                                {link.type === "GitHub" && (
                                                    <a href={link.url}><i className="fa-brands fa-github" /></a>
                                                )}

                                                {link.type === "Twitter" && (
                                                    <a href={link.url}><i className="fab fa-twitter" /></a>
                                                )}

                                                {link.type === "YouTube" && (
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
                                </div>
                            </div>
                        </Link>
                    ):(
                        <p>No data available</p>
                    )}
                </div>
            </div></>

    );
};

export default Users;