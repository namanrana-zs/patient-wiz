import React from "react";
import { useNavigate } from "react-router-dom";
import insuranceCard from "../assets/wizard-financial-support.svg";
import educatorCard from "../assets/wizard-case-manager.svg";
import recommendationBg from "../assets/recommdationBg";
import "./WizardOptions.css";

const WizardOptions = () => {
  const navigate = useNavigate();

  const handleInsuranceClick = () => {
    navigate("/update-insurance");
  };

  const handleEducatorClick = () => {
    navigate("/connect-educator");
  };

  const handleRecommendationClick = () => {
    navigate("/video-details");
  }

  return (
    <div className="dashboard-container">
      <div className="wizard-options-container">
        <h3 className="section-title">Use your wizard to</h3>
        <div className="wizard-options">
          <div className="wizard-card" onClick={handleInsuranceClick}>
            <img src={insuranceCard} alt="Update Insurance Card" />
          </div>
          <div className="wizard-card" onClick={handleEducatorClick}>
            <img src={educatorCard} alt="Connect with Educator" />
          </div>
        </div>
      </div>


            {/* Recommended Section */}
      <div className="recommended-section">
        <h3 className="section-title">Recommended for you</h3>
        <div className="recommended-card" onClick={handleRecommendationClick}>
          
          <div className="recommended-overlay">
            <h4>Maximizing Your Doctor’s Visit: Questions to Ask About Pulmonary Fibrosis</h4>
            <div className="meta">
              <span>🎥 17s</span> • <span>Patient Experiences</span>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
};

export default WizardOptions;
