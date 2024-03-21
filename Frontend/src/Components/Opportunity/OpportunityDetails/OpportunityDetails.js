import React, { useState } from 'react';
import baseURL from '../../../api/api';
import { fetchData } from '../../../FetchData/FetchData';
import '@fortawesome/fontawesome-free/css/all.css';
import { images } from '../../../constants'
import './OpportunityDetails.scss';
import { motion } from 'framer-motion';

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
    const [opportunityList, setOpportunityList] = useState([]);
    useState(() => {
        fetchData(`${baseURL}/opportunity`, setOpportunityList);
    }, []);


    console.log("opportunity", opportunityList.opportunity);

    return (
        <div className='Cards px-3 pb-3'>
            {opportunityList.opportunity && opportunityList.opportunity.map((opportunity, index) => (
                <motion.div className='opportunity-card font-mono' key={index}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.5 * index }}
                >
                    <div className='job-role'>{opportunity.profile}</div>
                    <motion.div className='details'
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1}}
                        transition={{ duration: 0.8, delay: 0.5 * index }}
                    >
                        <div className='flex justify-between'>
                            <div>{opportunity.company} </div>
                            <div>{opportunity.branch} / {opportunity.positionType}</div>
                        </div>
                        <div>Eligibility : {opportunity.yearOfExperience}</div>
                        <a className='' href={opportunity.opportunityLink}>Apply Here</a>
                        <div>Deadline : {opportunity.applicationDeadline}</div>
                    </motion.div>
                </motion.div>
            ))}

        </div>
    )
}

export default OpportunityDetails;

