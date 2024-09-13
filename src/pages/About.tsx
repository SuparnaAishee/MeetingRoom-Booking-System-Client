import React from "react";
import "./../styles/custom.css";
import WhyChooseUs from "./whyChooseUs";
import TestimonialSection from "./Testimonial";
import FAQSection from "./F&Q";
import CustomFooter from "../components/layout/Footer";
import BrandSection from "./Brand";
import { Link } from "react-router-dom";

const About: React.FC = () => {
  return (
    <div>
      <section>
        <div className="relative h-96">
          {/* Background Image */}
          <img
            src="https://res.cloudinary.com/dwelabpll/image/upload/v1725545462/360_F_813232291_KKxGmewKZLCLK6oXNJcBeeLNF79fdINd_vaicvj.jpg"
            className="w-full h-full object-cover"
            alt="Background"
          />

          {/* Black Transparent Shade */}
          <div className="absolute inset-0 bg-black bg-opacity-50"></div>

          {/* Text Content */}
          <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
            <nav className="text-sm mb-4">
              <a href="/" className="hover:underline">
                Home
              </a>
              <span className="mx-2">&gt;</span>
              <span>About Us</span>
            </nav>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold">
              Know About Us
            </h1>
          </div>
        </div>
      </section>
      <div className="flex flex-col lg:flex-row items-center justify-between p-8 bg-white layout-padding">
        {/* Text Content */}
        <div className="flex-1 space-y-4">
          <p className="text-green-600 font-semibold">WHO WE ARE</p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold">
            Elevate Your Meetings with Effortless Reservations
          </h2>
          <p className="text-gray-600 w-4/5">
            We are dedicated to making your scheduling process as seamless as
            possible. Our meeting booking system is designed to simplify the way
            you connect, collaborate, and communicate.
          </p>
          <p className="text-gray-600  w-4/5">
            By eliminating the hassle of back-and-forth scheduling, we help you
            focus on what truly matters—productive meetings and meaningful
            connections.
          </p>
        
            <Link to="/service">
              <button className="text-white bg-green-500 hover:bg-green-600 px-6 py-3 rounded-lg ">
                Explore Our Services
              </button>
            </Link>
          
        </div>

        {/* Image and Stats */}
        <div className="flex-1 relative mt-8 lg:mt-0">
          <img
            src="https://res.cloudinary.com/dwelabpll/image/upload/v1725375841/meetingRoom_mc6iii.webp"
            alt="Meeting"
            className="w-full h-auto object-cover rounded-lg shadow-lg"
          />
          <div className="absolute section-stats">
            <h3 className="text-green-600 text-5xl sm:text-6xl font-bold">
              150+
            </h3>
            <p className="text-gray-700">Companies Partnered </p>
          </div>
        </div>
      </div>
      <div>
        <WhyChooseUs />
      </div>
      <div>
        <TestimonialSection />
      </div>
      <div>
        <FAQSection />
      </div>
      <div>
        <BrandSection />
      </div>
      <div>
        <CustomFooter />
      </div>
    </div>
  );
};

export default About;
