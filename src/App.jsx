// App.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Explore from "./components/Explore";
import Account from "./components/Account";
import Chatbot from "./components/Chatbot"; // Import chatbot
import RxLayout from "./components/RxStatus";

function App() {
  return (
    <Router>
      <div style={{ paddingBottom: "60px" /* space for bottom nav */ }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/explore" element={<Explore />} />
          <Route path="/account" element={<Account />} />
          <Route path="/rxstatus" element={<RxLayout />} />
        </Routes>

        <Chatbot /> {/* Floating chatbot rendered across all pages */}
      </div>
    </Router>
  );
}

export default App;
