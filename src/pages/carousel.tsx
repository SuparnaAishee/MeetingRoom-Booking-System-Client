// import React, { useState, useEffect } from "react";
// import { ClockCircleFilled } from "@ant-design/icons";
// import { Link } from "react-router-dom";
// import {
//   FacebookOutlined,
//   TwitterOutlined,
//   InstagramOutlined,
//   LinkedinOutlined,
// } from "@ant-design/icons"; 

// const images = [
//   "https://res.cloudinary.com/dwelabpll/image/upload/v1725185204/AdobeStock_629685629-1030x577_b9xod4.jpg",
//   "https://res.cloudinary.com/dwelabpll/image/upload/v1725359737/HORIZONTAL-1-17_rzsd7y.jpg",
//   "https://res.cloudinary.com/dwelabpll/image/upload/v1725360089/Workstationwithphonebooths_409383_krbz3r.jpg",
// ];

// const Carousel: React.FC = () => {
//   const [currentIndex, setCurrentIndex] = useState(0);

//   const prevSlide = () => {
//     const isFirstSlide = currentIndex === 0;
//     const newIndex = isFirstSlide ? images.length - 1 : currentIndex - 1;
//     setCurrentIndex(newIndex);
//   };

//   const nextSlide = () => {
//     const isLastSlide = currentIndex === images.length - 1;
//     const newIndex = isLastSlide ? 0 : currentIndex + 1;
//     setCurrentIndex(newIndex);
//   };

//   useEffect(() => {
//     const interval = setInterval(() => {
//       nextSlide();
//     }, 3000);

//     return () => {
//       clearInterval(interval);
//     };
//   }, [currentIndex]);

//   return (
//     <div className="relative w-full h-full overflow-hidden">
//       {/* Carousel Images */}
//       <div
//         className="w-full h-full bg-center bg-cover duration-500"
//         style={{ backgroundImage: `url(${images[currentIndex]})` }}
//       >
//         <div className="absolute inset-0 bg-black bg-opacity-30"></div>

//         {/* Overlay Card */}
//         <div className="absolute inset-0 flex flex-col justify-center items-start pl-32 space-y-6">
//           <div className="bg-black bg-opacity-5 text-white p-8 rounded-lg text-left backdrop-blur-md">
//             <h2 className="text-xl mb-4">
//               <span className="text-green-400 font-bold text-3xl">
//                 MeetSpace
//               </span>{" "}
//               Co-working Space
//             </h2>
//             <p className="text-4xl">Build A Better Office Environment</p>
//             <p className="text-6xl">THE SPACE FOR Meetings</p>
//             {/* Opening Hours */}
//             <div className="flex items-center text-white space-x-4 pt-4">
//               <ClockCircleFilled className="text-3xl text-green-400" />
//               <span className="text-xl">Opening Hours: 10 AM - 6 PM</span>
//             </div>
//           </div>

//           {/* Book Now Button */}
//           <Link
//             to="/get-started"
//             className="bg-green-500 text-white px-6 py-3 rounded-lg text-lg font-semibold hover:bg-green-600"
//           >
//             Reserve Now
//           </Link>
//         </div>
//       </div>

//       {/* Social Media Icons */}
//       <div className="absolute top-1/4 right-4 flex flex-col space-y-6 pr-16">
//         <a
//           href="https://facebook.com"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           <FacebookOutlined className="text-3xl text-white hover:text-green-400" />
//         </a>
//         <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
//           <TwitterOutlined className="text-3xl text-white hover:text-green-400" />
//         </a>
//         <a
//           href="https://instagram.com"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           <InstagramOutlined className="text-3xl text-white hover:text-green-400" />
//         </a>
//         <a
//           href="https://linkedin.com"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           <LinkedinOutlined className="text-3xl text-white hover:text-green-400" />
//         </a>
//       </div>

//       {/* Left Arrow */}
//       <button
//         className="absolute top-1/2 left-4 transform -translate-y-1/2 p-3 bg-black bg-opacity-50 rounded-full text-white hover:bg-opacity-75"
//         onClick={prevSlide}
//       >
//         &#10094;
//       </button>

//       {/* Right Arrow */}
//       <button
//         className="absolute top-1/2 right-4 transform -translate-y-1/2 p-3 bg-black bg-opacity-50 rounded-full text-white hover:bg-opacity-75"
//         onClick={nextSlide}
//       >
//         &#10095;
//       </button>

//       {/* Indicators */}
//       <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
//         {images.map((_, index) => (
//           <div
//             key={index}
//             className={`w-3 h-3 bg-white rounded-full cursor-pointer ${
//               index === currentIndex ? "bg-green-500" : "bg-gray-300"
//             }`}
//             onClick={() => setCurrentIndex(index)}
//           />
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Carousel;
import React, { useState, useEffect } from "react";
import { ClockCircleFilled } from "@ant-design/icons";
import { Link } from "react-router-dom";
import {
  FacebookOutlined,
  TwitterOutlined,
  InstagramOutlined,
  LinkedinOutlined,
} from "@ant-design/icons"; 
import "aos/dist/aos.css"; 
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
    }, 3000);

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
        <div className="absolute inset-0 flex flex-col justify-center items-start lg:pl-32 pl-6 space-y-4 lg:space-y-6 ">
          <div className="bg-black bg-opacity-5 text-white p-6 lg:p-8 rounded-lg text-left backdrop-blur-md lg:max-w-4xl max-w-xs">
            <h2 className="lg:text-xl text-lg mb-2 lg:mb-4">
              <span className="text-green-400 font-bold text-2xl lg:text-3xl">
                MeetSpace
              </span>{" "}
              Co-working Space
            </h2>
            <p className="text-xl lg:text-4xl">
              Build A Better Office Environment
            </p>
            <p className="text-2xl lg:text-6xl">THE SPACE FOR Meetings</p>
            {/* Opening Hours */}
            <div className="flex items-center text-white space-x-2 lg:space-x-4 pt-2 lg:pt-4">
              <ClockCircleFilled className="text-xl lg:text-3xl text-green-400" />
              <span className="text-sm lg:text-xl">
                Opening Hours: 10 AM - 6 PM
              </span>
            </div>
          </div>

          {/* Book Now Button */}
          <Link
            to="/rooms"
            className="bg-green-500 text-white px-4 py-2 lg:px-6 lg:py-3 rounded-lg text-sm lg:text-lg font-semibold hover:bg-green-600"
          >
            Reserve Now
          </Link>
        </div>
      </div>

      {/* Social Media Icons */}
      <div className="absolute top-1/4 right-4 flex flex-col space-y-4 lg:space-y-6 pr-8 lg:pr-16">
        <a
          href="https://facebook.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FacebookOutlined className="text-2xl lg:text-3xl text-white hover:text-green-400" />
        </a>
        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
          <TwitterOutlined className="text-2xl lg:text-3xl text-white hover:text-green-400" />
        </a>
        <a
          href="https://instagram.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          <InstagramOutlined className="text-2xl lg:text-3xl text-white hover:text-green-400" />
        </a>
        <a
          href="https://linkedin.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          <LinkedinOutlined className="text-2xl lg:text-3xl text-white hover:text-green-400" />
        </a>
      </div>

      {/* Left Arrow */}
      <button
        className="absolute top-1/2 left-4 transform -translate-y-1/2 p-2 lg:p-3 bg-black bg-opacity-50 rounded-full text-white hover:bg-opacity-75"
        onClick={prevSlide}
      >
        &#10094;
      </button>

      {/* Right Arrow */}
      <button
        className="absolute top-1/2 right-4 transform -translate-y-1/2 p-2 lg:p-3 bg-black bg-opacity-50 rounded-full text-white hover:bg-opacity-75"
        onClick={nextSlide}
      >
        &#10095;
      </button>

      {/* Indicators */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {images.map((_, index) => (
          <div
            key={index}
            className={`w-2 lg:w-3 h-2 lg:h-3 bg-white rounded-full cursor-pointer ${
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
