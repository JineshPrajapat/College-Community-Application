import React, { useState } from 'react';
import baseURL from '../../api/api';
import fetchData from '../../FetchData/FetchData';
import '@fortawesome/fontawesome-free/css/all.css';
import './Experience.scss';
import { images } from '../../constants'
import SearchingForm from '../SearchingForm/SearchingForm';
import ExperienceDetails from './ExperienceDetails/ExperienceDetails';
import { Routes, Route } from 'react-router-dom';
import { Link } from 'react-router-dom';
import ExperienceForm from './ExperienceForm/ExperienceForm';
import Header from '../Header/Header';

const Experience = () => {

    return (

        <>
            <div className='experience pt-3'>
                <h1>Interview Experience</h1>
                <div className="head-tabs">
                    {/* <SearchingForm /> */}
                    {/* <Link to="./AddExperience" className='addexperience' >Add Experience</Link> */}
                </div>

                <Routes>
                    <Route path="/" element={<ExperienceDetails />} />
                    <Route path="AddExperience" element={<ExperienceForm />} />
                </Routes>
            </div>
        </>

    );
};

export default Experience;