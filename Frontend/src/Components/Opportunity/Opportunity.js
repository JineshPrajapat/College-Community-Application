import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Link } from 'react-router-dom';
import '@fortawesome/fontawesome-free/css/all.css';
import './Opportunity.scss';
import { images } from '../../constants'
import SearchingForm from '../SearchingForm/SearchingForm';
import OpportunityDetails from './OpportunityDetails/OpportunityDetails';
import OpportunityForm from './OpportunityForm/OpportunityForm';

const Opportunity = () => {
    return (
        <div className='opportunity'>
            <h1>Oppotunity</h1>

            <div className="head-tabs">
                <SearchingForm />
                <Link to="./AddOpportunity" className='addopportunity' >Add Opportunity</Link>
            </div>

            <Routes>
                <Route path="/" element={<OpportunityDetails />} />
                <Route path="AddOpportunity" element={<OpportunityForm />} />
            </Routes>


            {/* <div className='Cards'>
                {opportunity.map((opportunity, index) => (
                    <div className='opportunity-card' key={index}>
                        <div className='job-role'>{opportunity.jobRole}</div>
                        <div className='details'>
                            <div>{opportunity.company}</div>
                            <div>{opportunity.branch}</div>
                            <div>Eligibility:{opportunity.eligibility}</div>
                            <a href={opportunity.Url}>Apply Here</a>
                            <div>Deadline:{opportunity.lastDate}</div>
                        </div>
                    </div>
                ))}

            </div> */}
        </div>

    );
};

export default Opportunity;