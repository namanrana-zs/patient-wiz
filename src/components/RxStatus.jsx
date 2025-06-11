import React from 'react';
import { ChevronLeft } from 'lucide-react';
import './RxLayout.css'; // 👈 make sure this CSS file exists
import congrats from '../assets/congrats.svg'; // Adjust the path as necessary
import timeline from '../assets/timeline.svg'; // Adjust the path as necessary
import Header from './Header';

const RxLayout = () => {
  return (
    <div className="rx-container">
        <Header />
      <header className="rx-header">
        <button className="rx-back-button" onClick={() => window.history.back()}>
          <ChevronLeft className="rx-back-icon" />
        </button>
        <h1 className="rx-title">Rx Status</h1>
      </header>

      <div className="rx-banner">
    
        <img src={congrats} alt="Congratulations" className="rx-congrats-img" />
      </div>

      <div className="rx-timeline">
        <img src={timeline} alt="Timeline" className="rx-timeline-img" />
      </div>
    </div>
  );
};

export default RxLayout;
