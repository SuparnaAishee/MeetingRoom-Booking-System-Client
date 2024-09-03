import React from "react";
import Carousel from "./carousel";
import About from "./About";


const HomePage: React.FC = () => {
  return (
    
      <div className="relative h-screen">
        {/* Hero Section with Carousel */}
        <Carousel />
        <About/>
      </div>
    
  );
};

export default HomePage;
