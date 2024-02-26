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
            <Link to="Users">Users</Link>
          </li>
          <li>
            <Link to="Questions">Questions</Link>
          </li>
          <li>
            <Link to="Opportunity">Opportunity</Link>
          </li>
          <li>
            <Link to="Experience">Experience</Link>
          </li>
          <li>
            <Link to="Discuss">Discuss</Link>
          </li>
          <li>
            <Link to="PlacementStats">Placement Statistics</Link>
          </li>
          <li>
            <Link to="UserProfile">User Profile</Link>
          </li>
          <li>
            <Link to="SignUp">SignUP</Link>
          </li>
        </ul>
      </nav>
  );
};

export default NavBar;


