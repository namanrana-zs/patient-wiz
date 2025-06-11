import React, { useState, useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react";
import "./CollapsibleInfo.css"; // Import the CSS file

const CollapsibleInfo = () => {
  const [isOpen, setIsOpen] = useState(false);
  const contentRef = useRef(null);
  const [height, setHeight] = useState("0px");

  useEffect(() => {
    if (contentRef.current) {
      setHeight(isOpen ? `${contentRef.current.scrollHeight}px` : "0px");
    }
  }, [isOpen]);

  return (
    <div className="collapsible-container">
      <div className="collapsible-card">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="collapsible-header"
        >
          <span className="collapsible-title">Important Safety Information</span>
          <ChevronDown
            className={`chevron-icon ${!isOpen ? "rotate" : ""}`}
          />
        </button>

        <div
          ref={contentRef}
          className="collapsible-content"
          style={{ maxHeight: height }}
        >
          <div className="collapsible-inner">
        
          <p>
            <strong>Read This Important Safety Information Before Using Melondi</strong>
          </p>
          <p>
            Melondi is an FDA-approved product for the treatment of Pulmonary Fibrosis. Ensuring the safe and effective use of Melondi is of paramount importance. This document contains essential safety information for your reference. Please follow these guidelines rigorously to minimize potential health risks.
          </p>
          <div>
            <h3 className="font-semibold text-base text-gray-800 mb-1">Healthcare Professional Supervision:</h3>
            <p>Melondi must only be administered by individuals who have received proper training from a healthcare professional.</p>
            <p>Always consult with your healthcare provider before starting, discontinuing, or making any changes to your Melondi treatment plan.</p>
          </div>
          <div>
            <h3 className="font-semibold text-base text-gray-800 mb-1">Dosing and Administration:</h3>
            <p>Administer Melondi exactly as prescribed by your healthcare provider. Follow the dosage, frequency, and injection site recommendations meticulously.</p>
            <p>Do not attempt to self-adjust the dose or administration schedule without explicit medical guidance.</p>
          </div>
          <div>
            <h3 className="font-semibold text-base text-gray-800 mb-1">Injection Site Rotation:</h3>
            <p>Rotate injection sites for each dose to prevent tissue damage and minimize injection site reactions. Common injection sites include the abdomen, thighs, and upper arms.</p>
            <p>Avoid injecting into areas with signs of skin irritation, redness, or bruising.</p>
          </div>
          <div>
            <h3 className="font-semibold text-base text-gray-800 mb-1">Allergic Reactions:</h3>
            <p>Seek immediate medical attention if you experience symptoms of an allergic reaction following an injection. Symptoms may include rash, itching, swelling, severe dizziness, or difficulty breathing.</p>
          </div>
          <div>
            <h3 className="font-semibold text-base text-gray-800 mb-1">Infection Prevention:</h3>
            <p>Adhere to strict aseptic techniques when handling Melondi materials.</p>
            <p>Follow the provided instructions for handwashing, disinfection, and sterilization to prevent infections.</p>
          </div>
          <div>
            <h3 className="font-semibold text-base text-gray-800 mb-1">Storage and Handling:</h3>
            <p>Store Melondi as directed in the product packaging instructions.</p>
            <p>Keep Melondi out of reach of children and pets.</p>
            <p>Do not use Melondi if it is expired or shows any signs of damage.</p>
          </div>
          <div>
            <h3 className="font-semibold text-base text-gray-800 mb-1">Disposal:</h3>
            <p>Dispose of used Melondi materials in accordance with local regulations for sharps disposal.</p>
            <p>Never reuse needles or syringes.</p>
            <p>Safely discard all waste to prevent accidental injury or contamination.</p>
          </div>
          <div>
            <h3 className="font-semibold text-base text-gray-800 mb-1">Potential Side Effects:</h3>
            <p>Common side effects may include injection site reactions, such as redness, swelling, or discomfort. Report any unusual or severe side effects to your healthcare provider.</p>
          </div>
          <div>
            <h3 className="font-semibold text-base text-gray-800 mb-1">Medication Interactions:</h3>
            <p>Inform your healthcare provider about all medications, including prescription and over-the-counter drugs, and supplements you are taking to identify any potential interactions with Melondi.</p>
          </div>
          <div>
            <h3 className="font-semibold text-base text-gray-800 mb-1">Pregnancy and Breastfeeding:</h3>
            <p>If you are pregnant, planning to become pregnant, or breastfeeding, discuss the use of Melondi with your healthcare provider to evaluate potential risks and benefits.</p>
          </div>
          <div>
            <h3 className="font-semibold text-base text-gray-800 mb-1">Emergency Contact:</h3>
            <p>In case of an emergency, contact your healthcare provider or seek immediate medical attention.</p>
            <p>Ensure you have readily available contact information for your healthcare provider.</p>
          </div>
          <div>
            <h3 className="font-semibold text-base text-gray-800 mb-1">Psychological Well-being:</h3>
            <p>Managing IBD can be emotionally challenging. If you experience emotional or psychological difficulties during your Melondi treatment, communicate your concerns with your healthcare provider, who can offer support or refer you to a mental health professional.</p>
          </div>
          <p>
            This safety information is designed to meet FDA requirements for your safety when using Melondi. It is not exhaustive. Consult the official product package insert for comprehensive safety information, and always heed the advice and guidance provided by your healthcare provider. Your Personal health and well-being are of utmost importance to us.
          </p>
        </div>
        </div>
      </div>
    </div>
  );
};

export default CollapsibleInfo;
