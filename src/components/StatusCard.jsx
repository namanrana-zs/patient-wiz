import React from 'react';
import './StatusCard.css';
import statusImage from '../assets/congratswithtimeline.svg'; // Icon shown in top-left



const StatusCard = () => {
  const handleClick = () => {
    window.location.href = '/rxstatus'; // <-- Change to your desired route
  };

  return (
    <div className="image-status-card" onClick={handleClick}>
      <img src={statusImage} alt="Status Card" className="status-image" />
    </div>
  );
};


// const StatusCard = () => {
//   const steps = [
//     'Prescription',
//     'Insurance Review',
//     'Rx Ready',
//     'Pick Up'
//   ];

//   return (
//     <div className="status-card">
//       <div className="status-header">
//         <img src={rxIcon} alt="Rx Icon" className="status-icon" />
//         <span className="status-text">
//           Congratulations on getting your <strong>Rx!</strong>
//         </span>
//       </div>
//       <div className="status-steps">
//         {steps.map((label, index) => (
//           <div key={index} className="step">
//             <div className="circle">&#10003;</div>
//             {index !== steps.length - 1 && <div className="line"></div>}
//             <div className="step-label">{label}</div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

export default StatusCard;
