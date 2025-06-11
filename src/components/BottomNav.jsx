import React, { useState } from "react";
import { Home, Library, LayoutGrid } from "lucide-react";
import CollapsibleInfo from './CollapsibleInfo';

// Import your new CSS file
import "./BottomNav.css";

const navItems = [
  { name: "Home", icon: Home },
  { name: "Explore", icon: Library },
  { name: "Account", icon: LayoutGrid },
];

const BottomNavBar = () => {
  const [activeTab, setActiveTab] = useState("Home");

  return (
    // Use the .bottom-nav class for the main container
    
    <nav className="bottom-nav">
       <CollapsibleInfo />
      {/* Use the .bottom-nav-list class for the list */}
      <ul className="bottom-nav-list">
        {navItems.map((item) => {
          const isActive = activeTab === item.name;
          return (
            // Use .nav-item and conditionally add the .active class
            <li
              key={item.name}
              className={`nav-item ${isActive ? "active" : ""}`}
              onClick={() => setActiveTab(item.name)}
            >
              {/* The 'fill' prop is no longer needed here, CSS handles it! */}
              <item.icon />
              <span>{item.name}</span>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default BottomNavBar;