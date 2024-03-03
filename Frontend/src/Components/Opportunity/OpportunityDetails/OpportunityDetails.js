import React, { useState } from 'react';
import baseURL from '../../../api/api';
import { fetchData } from '../../../FetchData/FetchData';
import '@fortawesome/fontawesome-free/css/all.css';
import { images } from '../../../constants'
import './OpportunityDetails.scss';

// const opportunity = [
//     {
//         jobRole: 'ML Engineer',
//         company: 'Microsoft',
//         branch: 'CSE/AI',
//         Url: 'https://www.ctae.ac.in',
//         eligibility: 'Exp. 3',
//         lastDate: '23-12-2024'
//     },
//     {
//         jobRole: 'Full Stack Devloper',
//         company: 'Microsoft',
//         branch: 'CSE/AI',
//         Url: 'https://www.ctae.ac.in',
//         eligibility: 'Exp. 3',
//         lastDate: '23-12-2024'
//     },
//     {
//         jobRole: 'Auto Mobile',
//         company: 'Microsoft',
//         branch: 'CSE/AI',
//         Url: 'https://www.ctae.ac.in',
//         eligibility: 'Exp. 3',
//         lastDate: '23-12-2024'
//     },
//     {
//         jobRole: 'C++ Developer',
//         company: 'Microsoft',
//         branch: 'CSE/AI',
//         Url: 'https://www.ctae.ac.in',
//         eligibility: 'Exp. 3',
//         lastDate: '23-12-2024'
//     },
//     {
//         jobRole: 'Research Intern',
//         company: 'Microsoft',
//         branch: 'CSE/AI',
//         Url: 'https://www.ctae.ac.in',
//         eligibility: 'Exp. 3',
//         lastDate: '23-12-2024'
//     },
//     {
//         jobRole: 'Aeronauitcal Engineering',
//         company: 'Microsoft',
//         branch: 'CSE/AI',
//         Url: 'https://www.ctae.ac.in',
//         eligibility: 'Exp. 3',
//         lastDate: '23-12-2024'
//     },
//     {
//         jobRole: 'ML Engineer',
//         company: 'Microsoft',
//         branch: 'CSE/AI',
//         Url: 'https://www.ctae.ac.in',
//         eligibility: 'Exp. 3',
//         lastDate: '23-12-2024'
//     },
//     {
//         jobRole: 'ML Engineer',
//         company: 'Microsoft',
//         branch: 'CSE/AI',
//         Url: 'https://www.ctae.ac.in',
//         eligibility: 'Exp. 3',
//         lastDate: '23-12-2024'
//     },
//     {
//         jobRole: 'ML Engineer',
//         company: 'Microsoft',
//         branch: 'CSE/AI',
//         Url: 'https://www.ctae.ac.in',
//         eligibility: 'Exp. 3',
//         lastDate: '23-12-2024'
//     },
//     {
//         jobRole: 'C++ Developer',
//         company: 'Microsoft',
//         branch: 'CSE/AI',
//         Url: 'https://www.ctae.ac.in',
//         eligibility: 'Exp. 3',
//         lastDate: '23-12-2024'
//     }
// ];

function OpportunityDetails() {

    // fetching data
    const [opportunityList, setOpportunityList] =useState([]);
    useState(()=>{
        fetchData(`${baseURL}/opportunity`, setOpportunityList);
    },[]);
    

    // console.log("opportunity", opportunityList.opportunity);

    return (
        <div className='Cards'>
            {opportunityList.opportunity && opportunityList.opportunity.map((opportunity, index) => (
                <div className='opportunity-card' key={index}>
                    <div className='job-role'>{opportunity.positionType}</div>
                    <div className='details'>
                        <div>{opportunity.company}</div>
                        <div>{opportunity.branch}</div>
                        <div>Eligibility:{opportunity.yearOfExperience}</div>
                        <a href={opportunity.opportunityLink}>Apply Here</a>
                        <div>Deadline:{opportunity.applicationDeadline}</div>
                    </div>
                </div>
            ))}

        </div>
    )
}

export default OpportunityDetails;

