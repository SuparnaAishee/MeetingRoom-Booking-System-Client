import React, { useState, useEffect, useRef } from "react";
import {  Progress } from "antd";
import {
  DollarCircleOutlined,
  WifiOutlined,
  TeamOutlined,
} from "@ant-design/icons";




const WhyChooseUs = () => {
  const [isInView, setIsInView] = useState(false); 
  const sectionRef = useRef(null); // Reference to the section element

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsInView(true); // Trigger progress bars when section is in view
          observer.disconnect(); // Stop observing once in view
        }
      },
      { threshold: 0.3 } // Adjust the threshold as needed (0.3 means 30% of the section is in view)
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (observer && sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <div>
      <section className="py-16 bg-white layout-padding" ref={sectionRef}>
        <div className="container mx-auto px-6 flex justify-between">
          {/* Left Side - Section Title */}
          <div className="w-1/2">
            <h2 className="text-yellow-500 font-bold text-lg">Why Choose Us</h2>
            <h3 className="text-green-600 font-bold text-4xl mt-2">
              GIVING YOU THE BEST SERVICES
            </h3>
            <p className="text-gray-600 mt-4">
              Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean
              commodo ligula eget dolor. Aenean massa.
            </p>
          </div>

          {/* Right Side - Progress Bars */}
          <div className="w-1/2">
            <div className="mb-8">
              <div className="flex items-center justify-between mb-4">
                <p className="text-gray-700 font-semibold">Hospitality</p>
                <Progress
                  percent={isInView ? 80 : 0}
                  strokeColor="#16a34a"
                  className="w-3/4"
                  showInfo={false}
                />
              </div>
              <div className="flex items-center justify-between mb-4">
                <p className="text-gray-700 font-semibold">Coworker</p>
                <Progress
                  percent={isInView ? 75 : 0}
                  strokeColor="#16a34a"
                  className="w-3/4"
                  showInfo={false}
                />
              </div>
              <div className="flex items-center justify-between mb-4">
                <p className="text-gray-700 font-semibold">Service</p>
                <Progress
                  percent={isInView ? 70 : 0}
                  strokeColor="#16a34a"
                  className="w-3/4"
                  showInfo={false}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Service Features */}
        <div className="flex justify-between mt-12">
          <div className="text-center w-1/3">
            <div className="mb-4">
              <DollarCircleOutlined
                style={{ fontSize: "36px", color: "#f59e0b" }}
              />
            </div>
            <h4 className="text-green-700 font-bold text-lg">
              Secure Transactions
            </h4>
            <p className="text-gray-600 mt-2">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore.
            </p>
          </div>

          <div className="text-center w-1/3">
            <div className="mb-4">
              <TeamOutlined style={{ fontSize: "36px", color: "#f59e0b" }} />
            </div>
            <h4 className="text-green-700 font-bold text-lg">Active Members</h4>
            <p className="text-gray-600 mt-2">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore.
            </p>
          </div>
          <div className="text-center w-1/3">
            <div className="mb-4">
              <WifiOutlined style={{ fontSize: "36px", color: "#f59e0b" }} />
            </div>
            <h4 className="text-green-700 font-bold text-lg">
              Best Connection
            </h4>
            <p className="text-gray-600 mt-2">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore.
            </p>
          </div>
        </div>
      </section>
      
    </div>
  );
};

export default WhyChooseUs;
