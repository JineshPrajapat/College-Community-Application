import React from 'react';
import { Link } from 'react-router-dom';
import './NavBar.scss';

const NavBar = () => {
  return (
      <nav>
        <ul className="nav-list">
          <li>
            <Link to="/" >Home</Link>
          </li>
          <li>
            <Link to="users">Users</Link>
          </li>
          <li>
            <Link to="questions">Questions</Link>
          </li>
          <li>
            <Link to="opportunity">Opportunity</Link>
          </li>
          <li>
            <Link to="experience">Experience</Link>
          </li>
          <li>
            <Link to="discuss">Discuss</Link>
          </li>
          <li>
            <Link to="placementStats">Placement Statistics</Link>
          </li>
          <li>
            <Link to="userProfile">User Profile</Link>
          </li>
        </ul>
      </nav>
  );
};

export default NavBar;


