
import React, { useState } from 'react';
import './Header.css';
import logo from '../assets/logo.svg'; // your "Patient Wizard" logo
import notifIcon from '../assets/notif.svg'; // the bell icon (or use an icon library)
import menuIcon from '../assets/menu.svg'; // the menu icon (three horizontal lines)

const Header = () => {

   const [isSidebarOpen, setSidebarOpen] = useState(false);

  return (
    <>
    <div className="header-container">
      <div className="top-bar">
        <div className="top-left">
          <img src={logo} alt="Patient Wizard" className="logo" />
        </div>
        <div className="top-right">
          <img src={notifIcon} alt="Notifications" className="icon" />
          <img src={menuIcon} alt="Menu" className="icon" onClick={() => setSidebarOpen(true)} />
        </div>
      </div>
      
    </div>

    {/* Sidebar */}
      <div className={`sidebar ${isSidebarOpen ? 'open' : ''}`}>
        <button className="close-btn" onClick={() => setSidebarOpen(false)}>
          &times;
        </button>
        <ul className="sidebar-menu">
          <li>Dashboard</li>
          <li>Profile</li>
          <li>Settings</li>
          <li>Logout</li>
        </ul>
      </div>

      {/* Optional overlay */}
      {isSidebarOpen && <div className="sidebar-overlay" onClick={() => setSidebarOpen(false)} />}
    </>
  );
};

export default Header;
