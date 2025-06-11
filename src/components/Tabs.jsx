import React, { useState } from 'react';
import './Tabs.css';

export default function Tabs() {
  const [active, setActive] = useState('rx');

  return (
    <div className="tabs">
      <div
        className={`tab ${active === 'rx' ? 'active' : ''}`}
        onClick={() => setActive('rx')}
      >
        Rx status
      </div>
      <div
        className={`tab ${active === 'med' ? 'active' : ''}`}
        onClick={() => setActive('med')}
      >
        Medication tracker
      </div>
    </div>
  );
}