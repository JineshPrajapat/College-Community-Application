import React, { useState } from 'react';
import baseURL from '../../../api/api';
import fetchData from '../../../FetchData/FetchData';
import '@fortawesome/fontawesome-free/css/all.css';
import ExperienceForm from "../ExperienceForm/ExperienceForm";
import { images } from '../../../constants';
import './ExperienceDetails.scss';
import { motion } from 'framer-motion';

import { useRef, useCallback, useEffect } from 'react';

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

const PAGE_SIZE = 5; // Number of items to load per page

function ExperienceDetails() {
    // // fetching data
    // const [review, setReview] = useState([]);
    // useState(()=>{
    //     fetchData(`${baseURL}/review`, setReview);
    // })

    const [expandedIndex, setExpandedIndex] = useState(null);
    const [loadedReviews, setLoadedReviews] = useState([]);
    const [pageIndex, setPageIndex] = useState(0);
    const containerRef = useRef(null);

    const loadNextPage = () => {
        const startIndex = pageIndex * PAGE_SIZE;
        const endIndex = startIndex + PAGE_SIZE;
        const newReviews = review.slice(startIndex, endIndex);
        setLoadedReviews(prevReviews => [...prevReviews, ...newReviews]);
        setPageIndex(prevPageIndex => prevPageIndex + 1);
    };

    useEffect(() => {
        loadNextPage();
    }, []);

    const handleScroll = useCallback(() => {
        if (
            containerRef.current.scrollHeight - containerRef.current.scrollTop === containerRef.current.clientHeight
        ) {
            loadNextPage();
        }
    }, []);

    const handleCardClick = (index) => {
        setExpandedIndex(index === expandedIndex ? null : index);
    };

    return (
        <div className=' pb-14 ' onScroll={handleScroll} ref={containerRef}>
            <div className='Experience-cards '>
                {loadedReviews.map((review, index) => (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5, delay: 0.2 * (index%10) }}

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
            </div>

            {review.length > loadedReviews.length && (
                <div className='load-more-button-container flex justify-center items-center '>
                    <button className='text-xs sm:text-[16px] text-slate-500 duration-500 hover:text-black' onClick={loadNextPage}>Load More...</button>
                </div>
            )}

            {expandedIndex !== null && (
                <div className='modal py-1'>
                    <div className='modal-content'>
                        <span className='close' onClick={() => setExpandedIndex(null)}>
                            <i class="fa fa-times" aria-hidden="true"></i>
                        </span>
                        <motion.div className='Profile'
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
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
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
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