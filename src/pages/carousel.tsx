import React, { useState, useEffect } from "react";
import { ClockCircleFilled } from "@ant-design/icons"; // Importing clock icon from Ant Design

import { Link } from "react-router-dom";

const images = [
  "https://res.cloudinary.com/dwelabpll/image/upload/v1725185204/AdobeStock_629685629-1030x577_b9xod4.jpg",
  "https://res.cloudinary.com/dwelabpll/image/upload/v1725359737/HORIZONTAL-1-17_rzsd7y.jpg",
  "https://res.cloudinary.com/dwelabpll/image/upload/v1725360089/Workstationwithphonebooths_409383_krbz3r.jpg",
];

const Carousel: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const prevSlide = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? images.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const nextSlide = () => {
    const isLastSlide = currentIndex === images.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 3000); // Change slide every 3 seconds

    return () => {
      clearInterval(interval);
    };
  }, [currentIndex]);

  return (
    <div className="relative w-full h-full overflow-hidden">
      {/* Carousel Images */}
      <div
        className="w-full h-full bg-center bg-cover duration-500"
        style={{ backgroundImage: `url(${images[currentIndex]})` }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-30"></div>

        {/* Overlay Card */}
        <div className="absolute inset-0 flex flex-col justify-center items-start pl-32 space-y-6">
          <div className="bg-black bg-opacity-5 text-white p-8 rounded-lg text-left backdrop-blur-md">
            <h2 className="text-xl mb-4">
              <span className="text-green-400 font-bold text-3xl">
                MeetSpace
              </span>{" "}
              Co-working Space
            </h2>
            <p className="text-4xl">Build A Better Office Environment</p>
            <p className="text-6xl">THE SPACE FOR Meetings</p>
            {/* Opening Hours */}
            <div className="flex items-center text-white space-x-4 pt-4">
              <ClockCircleFilled className="text-3xl text-green-400" />
              <span className="text-xl">Opening Hours: 10 AM - 6 PM</span>
            </div>
          </div>

          {/* Book Now Button */}
          {/* <Button
          // type="primary"
          // size="large"
          // className="bg-green-500 hover:bg-green-600 text-white font-bold text-2xl p-6"
          > */}
            <Link
              to="/get-started"
              className="bg-green-500 text-white px-6 py-3 rounded-lg text-lg font-semibold hover:bg-green-600"
            >
             Reserve Now
            </Link>
          {/* </Button> */}
        </div>
      </div>

      {/* Left Arrow */}
      <button
        className="absolute top-1/2 left-4 transform -translate-y-1/2 p-3 bg-black bg-opacity-50 rounded-full text-white hover:bg-opacity-75"
        onClick={prevSlide}
      >
        &#10094; {/* HTML Entity for Left Arrow */}
      </button>

      {/* Right Arrow */}
      <button
        className="absolute top-1/2 right-4 transform -translate-y-1/2 p-3 bg-black bg-opacity-50 rounded-full text-white hover:bg-opacity-75"
        onClick={nextSlide}
      >
        &#10095; {/* HTML Entity for Right Arrow */}
      </button>

      {/* Indicators */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {images.map((_, index) => (
          <div
            key={index}
            className={`w-3 h-3 bg-white rounded-full cursor-pointer ${
              index === currentIndex ? "bg-green-500" : "bg-gray-300"
            }`}
            onClick={() => setCurrentIndex(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default Carousel;
