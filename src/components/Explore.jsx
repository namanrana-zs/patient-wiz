import React from 'react';
import './Explore.css'; // Link to the stylesheet
import explore from '../assets/explore.svg';
import Header from './Header';
import BottomNav from './BottomNav';

const Explore = () => {
  return (
    <div className="explore-container">
        <div className='header'> <Header /></div>

      <div className="explore-content">
        <img
          src={explore}
          alt="Explore illustration"
          className="explore-image"
        />

        <h2 className="explore-title">Personalize your feed</h2>

        <p className="explore-description">
          Please answer these 3 quick questions to help us personalize your content library experience
        </p>

        <button className="explore-button">Start</button>
      </div>
        <BottomNav />
    </div>
  );
};

export default Explore;
