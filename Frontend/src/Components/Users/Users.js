import React, { useState } from 'react';
import '@fortawesome/fontawesome-free/css/all.css';
import './Users.scss';
import { images } from '../../constants'
// Sample user data
const users = [
    {
        id: 1,
        name: 'Garima Ahari ',
        photo: images.garima,
        passingYear: 2020,
        branch: 'DA',
        linkedin: 'https://www.linkedin.com/in/johndoe',
        github: 'https://github.com/johndoe',
        twitter: 'https://twitter.com/johndoe'
    },
    {
        id: 1,
        name: 'Kishan Bhatti',
        photo: images.shashank,
        passingYear: 2020,
        branch: 'DA',
        linkedin: 'https://www.linkedin.com/in/johndoe',
        github: 'https://github.com/johndoe',
        twitter: 'https://twitter.com/johndoe'
    },
    {
        id: 1,
        name: 'Bhoop Singh',
        photo: images.luv,
        passingYear: 2020,
        branch: 'CSE',
        linkedin: 'https://www.linkedin.com/in/johndoe',
        github: 'https://github.com/johndoe',
        twitter: 'https://twitter.com/johndoe'
    },
    {
        id: 1,
        name: 'Laksh Raj',
        photo: images.laksh,
        passingYear: 2020,
        branch: 'CSE',
        linkedin: 'https://www.linkedin.com/in/johndoe',
        github: 'https://github.com/johndoe',
        twitter: 'https://twitter.com/johndoe'
    },
    {
        id: 1,
        name: 'Jinesh Prajapat',
        photo: images.jinesh,
        passingYear: 2020,
        branch: 'CSE',
        linkedin: 'https://www.linkedin.com/in/johndoe',
        github: 'https://github.com/johndoe',
        twitter: 'https://twitter.com/johndoe'
    },
    {
        id: 1,
        name: 'Yuvraj Singh',
        photo: images.yuvraj,
        passingYear: 2020,
        branch: 'CSE',
        linkedin: 'https://www.linkedin.com/in/johndoe',
        github: 'https://github.com/johndoe',
        twitter: 'https://twitter.com/johndoe'
    },
    {
        id: 1,
        name: 'Kishan Bhatti',
        photo: images.shashank,
        passingYear: 2020,
        branch: 'DA',
        linkedin: 'https://www.linkedin.com/in/johndoe',
        github: 'https://github.com/johndoe',
        twitter: 'https://twitter.com/johndoe'
    },
    {
        id: 1,
        name: 'Bhoop Singh',
        photo: images.luv,
        passingYear: 2020,
        branch: 'CSE',
        linkedin: 'https://www.linkedin.com/in/johndoe',
        github: 'https://github.com/johndoe',
        twitter: 'https://twitter.com/johndoe'
    },
    {
        id: 1,
        name: 'Laksh Raj',
        photo: images.laksh,
        passingYear: 2020,
        branch: 'CSE',
        linkedin: 'https://www.linkedin.com/in/johndoe',
        github: 'https://github.com/johndoe',
        twitter: 'https://twitter.com/johndoe'
    },
    {
        id: 1,
        name: 'Jinesh Prajapat',
        photo: images.jinesh,
        passingYear: 2020,
        branch: 'CSE',
        linkedin: 'https://www.linkedin.com/in/johndoe',
        github: 'https://github.com/johndoe',
        twitter: 'https://twitter.com/johndoe'
    },
    {
        id: 1,
        name: 'Yuvraj Singh',
        photo: images.yuvraj,
        passingYear: 2020,
        branch: 'CSE',
        linkedin: 'https://www.linkedin.com/in/johndoe',
        github: 'https://github.com/johndoe',
        twitter: 'https://twitter.com/johndoe'
    },
    {
        id: 1,
        name: 'Kishan Bhatti',
        photo: images.shashank,
        passingYear: 2020,
        branch: 'DA',
        linkedin: 'https://www.linkedin.com/in/johndoe',
        github: 'https://github.com/johndoe',
        twitter: 'https://twitter.com/johndoe'
    },
    {
        id: 1,
        name: 'Bhoop Singh',
        photo: images.luv,
        passingYear: 2020,
        branch: 'CSE',
        linkedin: 'https://www.linkedin.com/in/johndoe',
        github: 'https://github.com/johndoe',
        twitter: 'https://twitter.com/johndoe'
    },
    {
        id: 1,
        name: 'Laksh Raj',
        photo: images.laksh,
        passingYear: 2020,
        branch: 'CSE',
        linkedin: 'https://www.linkedin.com/in/johndoe',
        github: 'https://github.com/johndoe',
        twitter: 'https://twitter.com/johndoe'
    },
    {
        id: 1,
        name: 'Jinesh Prajapat',
        photo: images.jinesh,
        passingYear: 2020,
        branch: 'CSE',
        linkedin: 'https://www.linkedin.com/in/johndoe',
        github: 'https://github.com/johndoe',
        twitter: 'https://twitter.com/johndoe'
    },
    {
        id: 1,
        name: 'Yuvraj Singh',
        photo: images.yuvraj,
        passingYear: 2020,
        branch: 'CSE',
        linkedin: 'https://www.linkedin.com/in/johndoe',
        github: 'https://github.com/johndoe',
        twitter: 'https://twitter.com/johndoe'
    },
    {
        id: 1,
        name: 'Kishan Bhatti',
        photo: images.shashank,
        passingYear: 2020,
        branch: 'DA',
        linkedin: 'https://www.linkedin.com/in/johndoe',
        github: 'https://github.com/johndoe',
        twitter: 'https://twitter.com/johndoe'
    },
    {
        id: 1,
        name: 'Bhoop Singh',
        photo: images.luv,
        passingYear: 2020,
        branch: 'CSE',
        linkedin: 'https://www.linkedin.com/in/johndoe',
        github: 'https://github.com/johndoe',
        twitter: 'https://twitter.com/johndoe'
    },
    {
        id: 1,
        name: 'Laksh Raj',
        photo: images.laksh,
        passingYear: 2020,
        branch: 'CSE',
        linkedin: 'https://www.linkedin.com/in/johndoe',
        github: 'https://github.com/johndoe',
        twitter: 'https://twitter.com/johndoe'
    },
    {
        id: 1,
        name: 'Jinesh Prajapat',
        photo: images.jinesh,
        passingYear: 2020,
        branch: 'CSE',
        linkedin: 'https://www.linkedin.com/in/johndoe',
        github: 'https://github.com/johndoe',
        twitter: 'https://twitter.com/johndoe'
    },
    {
        id: 1,
        name: 'Yuvraj Singh',
        photo: images.yuvraj,
        passingYear: 2020,
        branch: 'CSE',
        linkedin: 'https://www.linkedin.com/in/johndoe',
        github: 'https://github.com/johndoe',
        twitter: 'https://twitter.com/johndoe'
    },

    // Add more user objects here
];

const Users = () => {
    const [filter, setFilter] = useState({
        year: '',
        branch: '',
        location: '',
        speciality: '',
    });

    const filteredUsers = users.filter(user => {
        // Implement your filtering logic here based on filter state
        return true; // Placeholder, implement your actual filtering logic
    });

    const handleFilterChange = (key, value) => {
        setFilter({ ...filter, [key]: value });
    };

    return (
        <div className="user-list">
            {/* Filter options */}
            <div className="filter-section">
                <h2>Filters</h2>
                <div className="filter-option">
                    <label htmlFor="year">Year:</label>
                    <select
                        id="year"
                        value={filter.year}
                        onChange={e => handleFilterChange('year', e.target.value)}
                    >
                        <option value="">Select Year</option>
                        <option value="2021">2021</option>
                        <option value="2020">2020</option>
                        {/* Add more options as needed */}
                    </select>
                </div>
                <div className="filter-option">
                    <label htmlFor="branch">Branch:</label>
                    <select
                        id="branch"
                        value={filter.branch}
                        onChange={e => handleFilterChange('branch', e.target.value)}
                    >
                        <option value="">Select Branch</option>
                        <option value="CSE">Computer Science</option>
                        <option value="ECE">Electronics</option>
                        {/* Add more options as needed */}
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
                <div className="filter-option">
                    <label htmlFor="specialty">Specialty:</label>
                    <input
                        type="text"
                        id="specialty"
                        value={filter.specialty}
                        onChange={e => handleFilterChange('specialty', e.target.value)}
                    />
                </div>
            </div>

            {/* User cards */}
            <div className="user-cards">
                {filteredUsers.map(user => (
                    <div className="user-card" key={user.id}>
                        <div className="user-photo">
                            <img src={user.photo} alt={user.name} />
                            <div className="passing-year">{user.passingYear}</div>
                        </div>

                        <div className="user-details">
                            <div className="user-name">{user.name}</div>
                            <div className="user-branch">{user.branch}</div>
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
                ))}
            </div>
        </div>
    );
};

export default Users;
