import React, { useState } from "react";
import "./Header.css";
import { Layers, UserRoundPen, Pen, LogOut } from "lucide-react";
import logo from "../assets/logo.svg"; // your "Patient Wizard" logo
import notifIcon from "../assets/notif.svg"; // the bell icon (or use an icon library)
import menuIcon from "../assets/menu.svg"; // the menu icon (three horizontal lines)

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
            <img src={notifIcon} alt="Notifications" className="icon" onClick={() => {window.location.href = '/explore'}} />
            <img
              src={menuIcon}
              alt="Menu"
              className="icon"
              onClick={() => setSidebarOpen(true)}
            />
          </div>
        </div>
      </div>

      {/* Sidebar */}
      <div className={`sidebar ${isSidebarOpen ? "open" : ""}`}>
        <div className="sidebar-header">
          <img src={logo} alt="Patient Wizard" className="sidebar-logo" />
          <button className="close-btn" onClick={() => setSidebarOpen(false)}>
            &times;
          </button>
        </div>
        <ul className="sidebar-menu">
          <li onClick={() => window.location.href = '/explore'}>
            {" "}
            <Layers /> Explore
          </li>
          <li onClick={() => window.location.href = '/profile'}>
            <UserRoundPen /> Profile
          </li>
          <li onClick={() => window.location.href = '/consent'}>
            <Pen /> Consent
          </li>
        </ul>
        <br />
        <button className="logout-btn">
          <LogOut /> Logout
        </button>
      </div>

      {/* Optional overlay */}
      {isSidebarOpen && (
        <div
          className="sidebar-overlay"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </>
  );
};

export default Header;
