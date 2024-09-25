import  { useState, useEffect, useRef } from "react";
import { Progress } from "antd";
import {
  DollarCircleOutlined,
  WifiOutlined,
  TeamOutlined,
} from "@ant-design/icons";
import Aos from "aos";


const WhyChooseUs = () => {
  useEffect(() => {
    Aos.init({
      duration: 1200, 
    });
  }, []);


  const [isInView, setIsInView] = useState(false);
  const sectionRef = useRef(null); 

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsInView(true); 
          observer.disconnect(); 
        }
      },
      { threshold: 0.3 } 
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
        <div className="container mx-auto px-6 flex flex-col lg:flex-row justify-between">
          {/* Left Side - Section Title */}
          <div className="w-full lg:w-1/2 mb-8 lg:mb-0" data-aos="fade-up">
            <h2 className="text-yellow-500 font-bold text-lg">Why Choose Us</h2>
            <h3 className="text-green-600 font-bold text-4xl mt-2">
              GIVING YOU THE BEST SERVICES
            </h3>
            <p className="text-gray-600 mt-4 w-2/3">
              We prioritize your needs and aim to deliver exceptional services
              tailored to your requirements. Our dedicated team works tirelessly
              to ensure that every experience with us is nothing short of
              excellent.
            </p>
          </div>

          {/* Right Side - Progress Bars */}
          <div className="w-full lg:w-1/2 pt-12">
            <div className="mb-8" data-aos="fade-down">
              <div className="flex items-center justify-between mb-4">
                <p className="text-gray-700 font-semibold">Hospitality</p>
                <Progress
                  percent={isInView ? 80 : 0}
                  strokeColor="#16a34a"
                  className="w-3/4"
                  showInfo={false}
                />
                <span className="ml-2 text-gray-700 font-semibold">
                  {isInView ? "80%" : "0%"}
                </span>
              </div>
              <div className="flex items-center justify-between mb-4">
                <p className="text-gray-700 font-semibold">Coworker</p>
                <Progress
                  percent={isInView ? 75 : 0}
                  strokeColor="#16a34a"
                  className="w-3/4"
                  showInfo={false}
                />
                <span className="ml-2 text-gray-700 font-semibold">
                  {isInView ? "75%" : "0%"}
                </span>
              </div>
              <div className="flex items-center justify-between mb-4">
                <p className="text-gray-700 font-semibold">Service</p>
                <Progress
                  percent={isInView ? 70 : 0}
                  strokeColor="#16a34a"
                  className="w-3/4"
                  showInfo={false}
                />
                <span className="ml-2 text-gray-700 font-semibold">
                  {isInView ? "70%" : "0%"}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Service Features */}
        <div
          className="flex flex-col lg:flex-row justify-between mt-12"
          data-aos="zoom-in"
        >
          <div className="text-center mb-8 lg:mb-0 lg:w-1/3">
            <div className="mb-4">
              <DollarCircleOutlined
                style={{ fontSize: "36px", color: "#f59e0b" }}
              />
            </div>
            <h4 className="text-green-700 font-bold text-lg">
              Secure Transactions
            </h4>
            <p className="text-gray-600 mt-2">
              Our platform ensures secure transactions. We adhere to industry
              standards for data protection and privacy.
            </p>
          </div>

          <div className="text-center mb-8 lg:mb-0 lg:w-1/3">
            <div className="mb-4">
              <TeamOutlined style={{ fontSize: "36px", color: "#f59e0b" }} />
            </div>
            <h4 className="text-green-700 font-bold text-lg">Active Members</h4>
            <p className="text-gray-600 mt-2">
              Join a vibrant community of professionals who leverage our meeting
              spaces for collaboration and networking.
            </p>
          </div>

          <div className="text-center mb-8 lg:mb-0 lg:w-1/3">
            <div className="mb-4">
              <WifiOutlined style={{ fontSize: "36px", color: "#f59e0b" }} />
            </div>
            <h4 className="text-green-700 font-bold text-lg">
              Best Connection
            </h4>
            <p className="text-gray-600 mt-2">
              Enjoy high-speed internet connectivity in all our meeting rooms
              which run smoothly without interruptions.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default WhyChooseUs;
