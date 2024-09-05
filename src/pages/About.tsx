import React from "react";
import "./../styles/custom.css"
import WhyChooseUs from "./whyChooseUs";
import TestimonialSection from "./Testimonial";
import FAQSection from "./F&Q";
import CustomFooter from "../components/layout/Footer";
import BrandSection from "./Brand";

const About: React.FC = () => {
  return (
    <div>
      <section>
        <div className="relative h-96 ">
          {/* Background Image */}
          <img
            src="https://res.cloudinary.com/dwelabpll/image/upload/v1725545462/360_F_813232291_KKxGmewKZLCLK6oXNJcBeeLNF79fdINd_vaicvj.jpg"
            className="w-full h-full object-cover"
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
              <span>Services</span>
            </nav>
            <h1 className="text-5xl font-bold">Book Our Services</h1>
          </div>
        </div>
      </section>
      <div className="flex items-center justify-between p-8 bg-white layout-padding ">
        {/* Text Content */}
        <div className="flex-1 space-y-4">
          <p className="text-green-600 font-semibold">WHO WE ARE</p>
          <h2 className="text-5xl font-bold">
            Influence each other for the better.
          </h2>
          <p className="text-gray-600">
            Nam elit posuere etiam blandit habitasse felis. Letius conubia
            praesent dolor faucibus ad sociosqu facilisis. Volutpat porttitor
            viverra nostra phasellus conubia.
          </p>
          <p className="text-gray-600">
            Ultricies lacinia porttitor etiam consectetur parturient dictumst.
            Quis mus eros bibendum velit eleifend tortor euismod nec
            consectetur. Pulvinar et nec facilisi neque dignissim eu.
          </p>
          <button className="text-white bg-green-500 hover:bg-green-600 px-6 py-3 rounded-lg">
            Read more →
          </button>
        </div>

        {/* Image and Stats */}

        <div className="flex-1 relative">
          <img
            src="https://res.cloudinary.com/dwelabpll/image/upload/v1725375841/meetingRoom_mc6iii.webp"
            alt="Meeting"
            className="w-full h-auto object-cover rounded-lg shadow-lg"
          />
          <div className="absolute  section-stats">
            <h3 className="text-green-600 text-6xl font-bold">150+</h3>
            <p className="text-gray-700">Company Joined</p>
          </div>
        </div>
      </div>
      <div>
        <WhyChooseUs/>
      </div>
      <div>
        <TestimonialSection/>
      </div>
      <div>
        <FAQSection/>
      </div>
      <div>
        <BrandSection/>
      </div>
      <div>
        <CustomFooter/>
      </div>
    </div>
  );
};

export default About;
