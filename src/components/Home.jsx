import React from "react";
import Header from "./Header";
import Tabs from "./Tabs";
import StatusCard from "./StatusCard";
import WizardOptions from "./WizardOptions";
import BottomNav from "./BottomNav";

const Home = () => {
  return (
    <>
      <Header />
      <div className="greeting" style={{ textAlign: "left", margin: "20px 0" }}>
        <h2>Good afternoon, Jamie</h2>
      </div>
      <Tabs />
      <StatusCard />
      <WizardOptions />
      <BottomNav />
    </>
  );
};

export default Home;
