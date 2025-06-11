import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Home, Compass, User } from "lucide-react";
import "./BottomNav.css";
import CollapsibleInfo from "./CollapsibleInfo"; // Assuming this is a component that shows additional info

const BottomNav = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const getActiveTab = () => {
    if (location.pathname === "/") return "home";
    if (location.pathname.startsWith("/explore")) return "explore";
    if (location.pathname.startsWith("/account")) return "account";
    return "";
  };

  const activeTab = getActiveTab();

  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <nav className="bottom-nav">
      <CollapsibleInfo />
      <ul className="nav-list">
        <li
          className={`nav-item ${activeTab === "home" ? "active" : ""}`}
          onClick={() => handleNavigation("/")}
        >
          <Home className="icon" />
          <span>Home</span>
        </li>
        <li
          className={`nav-item ${activeTab === "explore" ? "active" : ""}`}
          onClick={() => handleNavigation("/explore")}
        >
          <Compass className="icon" />
          <span>Explore</span>
        </li>
        <li
          className={`nav-item ${activeTab === "account" ? "active" : ""}`}
          onClick={() => handleNavigation("/account")}
        >
          <User className="icon" />
          <span>Account</span>
        </li>
      </ul>
    </nav>
  );
};

export default BottomNav;
