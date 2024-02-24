import React, { useState } from 'react';
import baseURL from '../../api/api';
import fetchData from '../../FetchData/FetchData';
import '@fortawesome/fontawesome-free/css/all.css';
import './Experience.scss';
import { images } from '../../constants'
import SearchForm from '../SearchingForm/SearchingForm';

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

const Experience = () => {

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

        <div className='experience'>
            <h1>Interview Experience</h1>
            <SearchForm/>
            <div className='Experience-cards'>
                {review.map((review, index) => (
                    <div
                        className={`experience-card ${index === expandedIndex ? 'expanded' : ''}`}
                        key={index}
                        onClick={() => handleCardClick(index)}
                    >
                        <div className='Profile'>
                            <img src={review.imgUrl} alt={review.name}>{review.user}</img>
                            <div className='info'>
                                <div>{review.name}</div>
                                <div>{review.jobRole}</div>
                                <div>{review.company}</div>
                            </div>
                        </div>
                        <div className='details'>
                            <div>
                                {review.experienceDescription.slice(0, 100) + '...'}
                            </div>
                        </div>

                    </div>
                ))}

                {expandedIndex !== null && (
                    <div className='modal'>
                        <div className='modal-content'>
                            <span className='close' onClick={() => setExpandedIndex(null)}>
                                <i class="fa fa-times" aria-hidden="true"></i>
                            </span>
                            <div className='Profile'>
                                <img src={review[expandedIndex].imgUrl} alt={review[expandedIndex].name}>{review[expandedIndex].user}</img>
                                <div className='info'>
                                    <div>{review[expandedIndex].name}</div>
                                    <div>{review[expandedIndex].jobRole}</div>
                                    <div>{review[expandedIndex].company}</div>
                                </div>
                            </div>
                            <div className='expanded-details'>
                                {review[expandedIndex].experienceDescription}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>

    );
};

export default Experience;