import React, { useEffect, useState } from 'react';
import baseURL from '../../api/api';
import fetchData from '../../FetchData/FetchData';
import '@fortawesome/fontawesome-free/css/all.css';
import './Users.scss';
import { images } from '../../constants'
// Sample user data
const usersData = [
    {
        id: 1,
        name: 'Garima Ahari',
        photo: images.garima,
        passingYear: 2020,
        branch: 'DA',
        speciality:'Data Engineer',
        linkedin: 'https://www.linkedin.com/in/jinesh',
        github: 'https://github.com/jinesh',
        twitter: 'https://twitter.com/jinesh'
    },
    {
        id: 1,
        name: 'Kishan Bhatti',
        photo: images.shashank,
        passingYear: 2021,
        branch: 'DA',
        speciality:'Student',
        linkedin: 'https://www.linkedin.com/in/jinesh',
        github: 'https://github.com/jinesh',
        twitter: 'https://twitter.com/jinesh'
    },
    {
        id: 1,
        name: 'Bhoop Singh',
        photo: images.luv,
        passingYear: 2020,
        branch: 'CSE',
        speciality:'Student',
        linkedin: 'https://www.linkedin.com/in/jinesh',
        github: 'https://github.com/jinesh',
        twitter: 'https://twitter.com/jinesh'
    },
    {
        id: 1,
        name: 'Laksh Raj',
        photo: images.laksh,
        passingYear: 2022,
        branch: 'EE',
        speciality:'Student',
        linkedin: 'https://www.linkedin.com/in/jinesh',
        github: 'https://github.com/jinesh',
        twitter: 'https://twitter.com/jinesh'
    },
    {
        id: 1,
        name: 'Jinesh Prajapat',
        photo: images.jinesh,
        passingYear: 2018,
        branch: 'DA',
        speciality:'Student',
        linkedin: 'https://www.linkedin.com/in/jinesh',
        github: 'https://github.com/jinesh',
        twitter: 'https://twitter.com/jinesh'
    },
    {
        id: 1,
        name: 'Yuvraj Singh',
        photo: images.yuvraj,
        passingYear: 2020,
        branch: 'CSE',
        speciality:'Student',
        linkedin: 'https://www.linkedin.com/in/jinesh',
        github: 'https://github.com/jinesh',
        twitter: 'https://twitter.com/jinesh'
    },
    {
        id: 1,
        name: 'Kishan Bhatti',
        photo: images.shashank,
        passingYear: 2020,
        branch: 'DA',
        speciality:'Student',
        linkedin: 'https://www.linkedin.com/in/jinesh',
        github: 'https://github.com/jinesh',
        twitter: 'https://twitter.com/jinesh'
    },
    {
        id: 1,
        name: 'Bhoop Singh',
        photo: images.luv,
        passingYear: 2020,
        branch: 'CSE',
        speciality:'Student',
        linkedin: 'https://www.linkedin.com/in/jinesh',
        github: 'https://github.com/jinesh',
        twitter: 'https://twitter.com/jinesh'
    },
    {
        id: 1,
        name: 'Laksh Raj',
        photo: images.laksh,
        passingYear: 2020,
        branch: 'CSE',
        speciality:'Student',
        linkedin: 'https://www.linkedin.com/in/jinesh',
        github: 'https://github.com/jinesh',
        twitter: 'https://twitter.com/jinesh'
    },
    {
        id: 1,
        name: 'Jinesh Prajapat',
        photo: images.jinesh,
        passingYear: 2020,
        branch: 'CSE',
        speciality:'Student',
        linkedin: 'https://www.linkedin.com/in/jinesh',
        github: 'https://github.com/jinesh',
        twitter: 'https://twitter.com/jinesh'
    },
    {
        id: 1,
        name: 'Yuvraj Singh',
        photo: images.yuvraj,
        passingYear: 2020,
        branch: 'CSE',
        speciality:'Student',
        linkedin: 'https://www.linkedin.com/in/jinesh',
        github: 'https://github.com/jinesh',
        twitter: 'https://twitter.com/jinesh'
    },
    {
        id: 1,
        name: 'Kishan Bhatti',
        photo: images.shashank,
        passingYear: 2020,
        branch: 'DA',
        speciality:'Student',
        linkedin: 'https://www.linkedin.com/in/jinesh',
        github: 'https://github.com/jinesh',
        twitter: 'https://twitter.com/jinesh'
    },
    {
        id: 1,
        name: 'Bhoop Singh',
        photo: images.luv,
        passingYear: 2020,
        branch: 'CSE',
        speciality:'Student',
        linkedin: 'https://www.linkedin.com/in/jinesh',
        github: 'https://github.com/jinesh',
        twitter: 'https://twitter.com/jinesh'
    },
    {
        id: 1,
        name: 'Laksh Raj',
        photo: images.laksh,
        passingYear: 2020,
        branch: 'CSE',
        speciality:'Student',
        linkedin: 'https://www.linkedin.com/in/jinesh',
        github: 'https://github.com/jinesh',
        twitter: 'https://twitter.com/jinesh'
    },
    {
        id: 1,
        name: 'Jinesh Prajapat',
        photo: images.jinesh,
        passingYear: 2020,
        branch: 'CSE',
        speciality:'Student',
        linkedin: 'https://www.linkedin.com/in/jinesh',
        github: 'https://github.com/jinesh',
        twitter: 'https://twitter.com/jinesh'
    },
    {
        id: 1,
        name: 'Yuvraj Singh',
        photo: images.yuvraj,
        passingYear: 2020,
        branch: 'CSE',
        speciality:'Student',
        linkedin: 'https://www.linkedin.com/in/jinesh',
        github: 'https://github.com/jinesh',
        twitter: 'https://twitter.com/jinesh'
    },
    {
        id: 1,
        name: 'Kishan Bhatti',
        photo: images.shashank,
        passingYear: 2020,
        branch: 'DA',
        speciality:'Student',
        linkedin: 'https://www.linkedin.com/in/jinesh',
        github: 'https://github.com/jinesh',
        twitter: 'https://twitter.com/jinesh'
    },
    {
        id: 1,
        name: 'Bhoop Singh',
        photo: images.luv,
        passingYear: 2020,
        branch: 'CSE',
        speciality:'Student',
        linkedin: 'https://www.linkedin.com/in/jinesh',
        github: 'https://github.com/jinesh',
        twitter: 'https://twitter.com/jinesh'
    },
    {
        id: 1,
        name: 'Laksh Raj',
        photo: images.laksh,
        passingYear: 2020,
        branch: 'CSE',
        speciality:'Student',
        linkedin: 'https://www.linkedin.com/in/jinesh',
        github: 'https://github.com/jinesh',
        twitter: 'https://twitter.com/jinesh'
    },
    {
        id: 1,
        name: 'Jinesh Prajapat',
        photo: images.jinesh,
        passingYear: 2020,
        branch: 'CSE',
        speciality:'Student',
        linkedin: 'https://www.linkedin.com/in/jinesh',
        github: 'https://github.com/jinesh',
        twitter: 'https://twitter.com/jinesh'
    },
    {
        id: 1,
        name: 'Yuvraj Singh',
        photo: "",
        passingYear: 2020,
        branch: 'CSE',
        speciality:'Student',
        linkedin: 'https://www.linkedin.com/in/jinesh',
        github: 'https://github.com/jinesh',
        twitter: 'https://twitter.com/jinesh'
    },

    // Add more user objects here
];


const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        console.log(j);
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

const Users = () => {

    // // fetching data
    // const [users, setUsers] = useState([]);
    // useState(()=>{
    //     fetchData(`${baseURL}/users`, setUsers);
    // },[]);


    // showing data in random order
    const [users, setUsers] = useState([]);

    useEffect(() => {
        setUsers(shuffleArray(usersData));
    }, []);

    const [filteredUsers, setFilteredUsers] = useState([]);
    const [filter, setFilter] = useState({
        year: '',
        branch: '',
        // location: '',
        speciality: '',
        username: '',
    });


    // Filter users based on the filter object
    useEffect(() => {
        const filteredData = users.filter(user => {
            return (
                (filter.year === '' || user.passingYear === (+filter.year)) &&
                (filter.branch === '' || user.branch === filter.branch) &&
                (filter.speciality === '' || user.speciality === filter.speciality) &&
                (filter.username === '' || user.name.toLowerCase().includes(filter.username.toLowerCase()))
            );
        });
        setFilteredUsers(filteredData);
    }, [users, filter]);

    const handleFilterChange = (key, value) => {
        setFilter({ ...filter, [key]: value });
    };

    return (
        <div className="user-list">
            {/* Filter options */}
            <div className="filter-section">
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
                        {[...new Set(users.map(data => data.passingYear))]                    //selecting unique year
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

                        {/* Add more options as needed */}
                    </select>
                </div>
                <div className="filter-option">
                    <label htmlFor="speciality">Position:</label>
                    <select
                        id="speciality"
                        value={filter.speciality}
                        onChange={e => handleFilterChange('speciality', e.target.value)}
                    >
                        <option value="">All</option>
                        {[...new Set(users.map(data => data.speciality))]                    //selecting unique year
                            .sort((a, b) => b - a)                                            // sorting year
                            .map(speciality => (
                                <option key={speciality} value={speciality}>
                                    {speciality}
                                </option>
                            ))}
                    </select>
                </div>
                {/* <div className="filter-option">
                    <label htmlFor="location">Location:</label>
                    <input
                        type="text"
                        id="location"
                        value={filter.location}
                        onChange={e => handleFilterChange('location', e.target.value)}
                    />
                </div> */}
                
            </div>

            {/* User cards */}
            <div className="user-cards">
                {filteredUsers.length === 0 ? (
                    <p>Data is loading...</p>
                ) : (filteredUsers.map(user => (
                    <div className="user-card" key={user.id}>
                        <div className="user-photo">
                            <img src={`${user.photo ? user.photo :images.user}`} alt={user.name} />
                            <div className="passing-year">{user.passingYear}</div>
                        </div>

                        <div className="user-details">
                            <div className="user-name">{user.name}</div>
                            <div className="user-branch">{user.branch}</div>
                            <div className="user-specialty">{user.speciality}</div>
                            <div className="user-links">
                                <a href={user.linkedin} target="_blank" rel="noopener noreferrer">
                                    <i className="fab fa-linkedin"></i>
                                </a>
                                <a href={user.github} target="_blank" rel="noopener noreferrer">
                                    <i className="fab fa-github"></i>
                                </a>
                                <a href={user.twitter} target="_blank" rel="noopener noreferrer">
                                    <i className="fab fa-twitter"></i>
                                </a>
                            </div>
                        </div>
                    </div>
                )
                ))}
            </div>
        </div>
    );
};

export default Users;
