import React, { useState } from 'react';
import { Link, Route, Routes } from 'react-router-dom';
import './Achievement.scss';
import { images } from '../../../constants';
import AchievementForm from './AchievementForm/AchievementForm';

const postData = [
  {
    src: images.background,
    heading: "Leetcode",
    description: "Some everyday experiences that can increase someone's vulnerability to developing mental health difficulties are"
  },
  {
    src: images.background,
    heading: "Leetcode",
    description: "Some everyday experiences that can increase someone's vulnerability to developing mental health difficulties are"
  }
];

const Achievement = () => {

  const [expandedIndex, setExpandedIndex] = useState(null);
  const handleCardClick = (index) => {
    setExpandedIndex(index === expandedIndex ? null : index);
  };


  return (
    <div className={`achievement-container `}>
      <Link to="./addAchievment" className="add-achievement">
        <div to="./addAchievment" className="add-container">
          <i class="fa-solid fa-plus"></i>
        </div>
      </Link>
      <Routes>
        <Route path="addAchievment" element={<AchievementForm />} />
      </Routes>

      <div className="images-section">

        {/* displaying loaded data */}
        <div className="images">
          {postData.map((image, index) => (
            <div className={`image ${index === expandedIndex ? 'expanded' : ''}`}
              key={index}
              onClick={() => handleCardClick(index)}
            >
              {image.type === 'image' ? (
                <img src={image.src} alt={image.heading} />
              ) : (
                <embed src={image.src} width="100%" height="auto" />
              )}
              <div className="caption">
                <h3>{image.heading}</h3>
                <p className='description'>{image.description.slice(0, 50) + '...'}</p>
              </div>
            </div>
          ))}

          {expandedIndex !== null && (
            <div className='modal'>
              <div className='modal-content'>
                <span className='close' onClick={() => setExpandedIndex(null)}>
                  <i class="fa fa-times" aria-hidden="true"></i>
                </span>
                <div className='achievements-info'>
                  <img src={postData[expandedIndex].src} alt={''}>{postData[expandedIndex].user}</img>
                  <div className='info'>
                    <div>{postData[expandedIndex].heading}</div>
                  </div>
                </div>
                <div className='expanded-details'>
                  {postData[expandedIndex].description}
                </div>
              </div>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};

export default Achievement;
