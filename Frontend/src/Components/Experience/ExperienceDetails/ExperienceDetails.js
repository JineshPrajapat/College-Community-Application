import React, { useState } from 'react';
import baseURL from '../../../api/api';
import fetchData from '../../../FetchData/FetchData';
import '@fortawesome/fontawesome-free/css/all.css';
import ExperienceForm from "../ExperienceForm/ExperienceForm";
import { images } from '../../../constants';
import './ExperienceDetails.scss';
import { motion } from 'framer-motion';


const review = [
    {
        name: 'Garima Ahari',
        imgUrl: images.garima,
        company: 'Amazon',
        experienceDescription: 'I had a total of 3 rounds all scheduled for 45 mins, all being virtual as well as eliminatory rounds.I had a total of 3 rounds all scheduled for 45 mins, all being virtual as well as eliminatory rounds.I had a total of 3 rounds all scheduled for 45 mins, all being virtual as well as eliminatory rounds.I had a total of 3 rounds all scheduled for 45 mins, all being virtual as well as eliminatory rounds.I had a total of 3 rounds all scheduled for 45 mins, all being virtual as well as eliminatory rounds.I had a total of 3 rounds all scheduled for 45 mins, all being virtual as well as eliminatory rounds.I had a total of 3 rounds all scheduled for 45 mins, all being virtual as well as eliminatory rounds.I had a total of 3 rounds all scheduled for 45 mins, all being virtual as well as eliminatory rounds.I had a total of 3 rounds all scheduled for 45 mins, all being virtual as well as eliminatory rounds.I had a total of 3 rounds all scheduled for 45 mins, all being virtual as well as eliminatory rounds.I had a total of 3 rounds all scheduled for 45 mins, all being virtual as well as eliminatory rounds.I had a total of 3 rounds all scheduled for 45 mins, all being virtual as well as eliminatory rounds.I had a total of 3 rounds all scheduled for 45 mins, all being virtual as well as eliminatory rounds.I had a total of 3 rounds all scheduled for 45 mins, all being virtual as well as eliminatory rounds.I had a total of 3 rounds all scheduled for 45 mins, all being virtual as well as eliminatory rounds.I had a total of 3 rounds all scheduled for 45 mins, all being virtual as well as eliminatory rounds.I had a total of 3 rounds all scheduled for 45 mins, all being virtual as well as eliminatory rounds.I had a total of 3 rounds all scheduled for 45 mins, all being virtual as well as eliminatory rounds.I had a total of 3 rounds all scheduled for 45 mins, all being virtual as well as eliminatory rounds.I had a total of 3 rounds all scheduled for 45 mins, all being virtual as well as eliminatory rounds.I had a total of 3 rounds all scheduled for 45 mins, all being virtual as well as eliminatory rounds.I had a total of 3 rounds all scheduled for 45 mins, all being virtual as well as eliminatory rounds.I had a total of 3 rounds all scheduled for 45 mins, all being virtual as well as eliminatory rounds.I had a total of 3 rounds all scheduled for 45 mins, all being virtual as well as eliminatory rounds.jknjjkksdfmskdklfjsknvscklsfksdkdcdnciso',
        jobRole: 'Software Engineer'
    },
    {
        name: 'Garima Ahari',
        imgUrl: images.garima,
        company: 'Amazon',
        experienceDescription: 'I had a total of 3 rounds all scheduled for 45 mins, all being virtual as well as eliminatory rounds.',
        jobRole: 'Software Engineer'
    },
    {
        name: 'Garima Ahari',
        imgUrl: images.garima,
        company: 'Amazon',
        experienceDescription: 'I had a total of 3 rounds all scheduled for 45 mins, all being virtual as well as eliminatory rounds.',
        jobRole: 'Software Engineer'
    },
    {
        name: 'Garima Ahari',
        imgUrl: images.garima,
        company: 'Amazon',
        experienceDescription: 'I had a total of 3 rounds all scheduled for 45 mins, all being virtual as well as eliminatory rounds.',
        jobRole: 'Software Engineer'
    },
    {
        name: 'Garima Ahari',
        imgUrl: images.garima,
        company: 'Amazon',
        experienceDescription: 'I had a total of 3 rounds all scheduled for 45 mins, all being virtual as well as eliminatory rounds.',
        jobRole: 'Software Engineer'
    },
    {
        name: 'Garima Ahari',
        imgUrl: images.garima,
        company: 'Amazon',
        experienceDescription: 'I had a total of 3 rounds all scheduled for 45 mins, all being virtual as well as eliminatory rounds.',
        jobRole: 'Software Engineer'
    },
    {
        name: 'Garima Ahari',
        imgUrl: images.garima,
        company: 'Amazon',
        experienceDescription: 'I had a total of 3 rounds all scheduled for 45 mins, all being virtual as well as eliminatory rounds.',
        jobRole: 'Software Engineer'
    },
    {
        name: 'Garima Ahari',
        imgUrl: images.garima,
        company: 'Amazon',
        experienceDescription: 'I had a total of 3 rounds all scheduled for 45 mins, all being virtual as well as eliminatory rounds.',
        jobRole: 'Software Engineer'
    },
    {
        name: 'Garima Ahari',
        imgUrl: images.garima,
        company: 'Amazon',
        experienceDescription: 'I had a total of 3 rounds all scheduled for 45 mins, all being virtual as well as eliminatory rounds.',
        jobRole: 'Software Engineer'
    },

];


function ExperienceDetails() {
    // // fetching data
    // const [review, setReview] = useState([]);
    // useState(()=>{
    //     fetchData(`${baseURL}/review`, setReview);
    // })

    const [expandedIndex, setExpandedIndex] = useState(null);

    const handleCardClick = (index) => {
        setExpandedIndex(index === expandedIndex ? null : index);
    };

    return (
        <div className='Experience-cards pb-4'>
            {review.map((review, index) => (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.5 * index }}

                    className={`experience-card ${index === expandedIndex ? 'expanded' : ''}`}
                    key={index}
                    onClick={() => handleCardClick(index)}
                >
                    <div className='Profile'>
                        <div className='image-container'>
                            <img src={review.imgUrl} alt={review.name} >{review.user}</img>
                        </div>
                        <div className='info'>
                            <div>{review.name}</div>
                            <div>{review.jobRole}</div>
                            <div>{review.company}</div>
                        </div>
                    </div>
                    <div className='details'>
                        <div>
                            {review.experienceDescription.slice(0, 250) + '...'}
                        </div>
                    </div>

                </motion.div>
            ))}

            {expandedIndex !== null && (
                <div className='modal py-1'>
                    <div className='modal-content'>
                        <span className='close' onClick={() => setExpandedIndex(null)}>
                            <i class="fa fa-times" aria-hidden="true"></i>
                        </span>
                        <motion.div className='Profile'
                            initial={{ opacity: 0}}
                            animate={{ opacity:1}}
                            transition={{ duration: 0.5, delay: 0.1 }}
                            >
                            <div className='image-container'>
                                <img src={review[expandedIndex].imgUrl} alt={review[expandedIndex].name}>{review[expandedIndex].user}</img>
                            </div>
                            <div className='info'>
                                <div>{review[expandedIndex].name}</div>
                                <div>{review[expandedIndex].jobRole}</div>
                                <div>{review[expandedIndex].company}</div>
                            </div>
                        </motion.div>
                        <motion.div className='expanded-details'
                            initial={{ opacity: 0}}
                            animate={{ opacity:1}}
                            transition={{ duration: 0.5, delay: 0.5 }}
                            >
                            {review[expandedIndex].experienceDescription}
                        </motion.div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default ExperienceDetails;