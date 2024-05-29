import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Link } from 'react-router-dom';
import '@fortawesome/fontawesome-free/css/all.css';
import './Opportunity.scss';
import { images } from '../../constants'
import SearchingForm from '../SearchingForm/SearchingForm';
import OpportunityDetails from './OpportunityDetails/OpportunityDetails';
import OpportunityForm from './OpportunityForm/OpportunityForm';
import Header from '../Header/Header';

const Opportunity = () => {
    return (
        <>
        <div className='opportunity'>
            {/* <h1>Oppotunity</h1> */}

            <div className="head-tabs">
                {/* <SearchingForm /> */}
                {/* <Link to="./AddOpportunity" className='addopportunity' >Add Opportunity</Link> */}
            </div>

            <Routes>
                <Route path="/" element={<OpportunityDetails />} />
                <Route path="AddOpportunity" element={<OpportunityForm />} />
            </Routes>

        </div></>

    );
};

export default Opportunity;