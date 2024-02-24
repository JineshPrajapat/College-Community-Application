import React, { useState } from 'react';
import baseURL from '../../api/api';
import fetchData from '../../FetchData/FetchData';
import '@fortawesome/fontawesome-free/css/all.css';
import './Opportunity.scss';
import { images } from '../../constants'
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

    // // fetching data
    // const [opportunity, setOpportunity] =useState([]);
    // useState(()=>{
    //     fetchData(`${baseURL}/opportunity`, setOpportunity);
    // },[]);

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