import React, { useState } from 'react';
import '@fortawesome/fontawesome-free/css/all.css';
import './Opportunity.scss';
import { images } from '../../constants'
import { Card } from '@material-ui/core';
import SearchingForm from '../SearchingForm/SearchingForm';

const opportunity = [
    {
        jobRole: 'ML Engineer',
        company: 'Microsoft',
        branch: 'CSE/AI',
        Url: 'https://www.ctae.ac.in',
        eligibility: 'Exp. 3',
        lastDate: '23-12-2024'
    },
    {
        jobRole: 'ML Engineer',
        company: 'Microsoft',
        branch: 'CSE/AI',
        Url: 'https://www.ctae.ac.in',
        eligibility: 'Exp. 3',
        lastDate: '23-12-2024'
    },
    {
        jobRole: 'ML Engineer',
        company: 'Microsoft',
        branch: 'CSE/AI',
        Url: 'https://www.ctae.ac.in',
        eligibility: 'Exp. 3',
        lastDate: '23-12-2024'
    },
    {
        jobRole: 'ML Engineer',
        company: 'Microsoft',
        branch: 'CSE/AI',
        Url: 'https://www.ctae.ac.in',
        eligibility: 'Exp. 3',
        lastDate: '23-12-2024'
    },
    {
        jobRole: 'ML Engineer',
        company: 'Microsoft',
        branch: 'CSE/AI',
        Url: 'https://www.ctae.ac.in',
        eligibility: 'Exp. 3',
        lastDate: '23-12-2024'
    },
    {
        jobRole: 'ML Engineer',
        company: 'Microsoft',
        branch: 'CSE/AI',
        Url: 'https://www.ctae.ac.in',
        eligibility: 'Exp. 3',
        lastDate: '23-12-2024'
    },
    {
        jobRole: 'ML Engineer',
        company: 'Microsoft',
        branch: 'CSE/AI',
        Url: 'https://www.ctae.ac.in',
        eligibility: 'Exp. 3',
        lastDate: '23-12-2024'
    },
    {
        jobRole: 'ML Engineer',
        company: 'Microsoft',
        branch: 'CSE/AI',
        Url: 'https://www.ctae.ac.in',
        eligibility: 'Exp. 3',
        lastDate: '23-12-2024'
    },
    {
        jobRole: 'ML Engineer',
        company: 'Microsoft',
        branch: 'CSE/AI',
        Url: 'https://www.ctae.ac.in',
        eligibility: 'Exp. 3',
        lastDate: '23-12-2024'
    },
    {
        jobRole: 'ML Engineer',
        company: 'Microsoft',
        branch: 'CSE/AI',
        Url: 'https://www.ctae.ac.in',
        eligibility: 'Exp. 3',
        lastDate: '23-12-2024'
    }
];

const Opportunity = () => {

    return (
        <div className='opportunity'>
            <h1>Oppotunity</h1>
            <SearchingForm/>
            <div className='Cards'>
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

        </div>
        </div>
        
    );
};

export default Opportunity;