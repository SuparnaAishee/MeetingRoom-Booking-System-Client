import React from "react";
import "../styles/custom.css"
import {
  EnvironmentOutlined,
  PhoneOutlined,
  MailOutlined,
} from "@ant-design/icons";
import CustomFooter from "../components/layout/Footer";
const ContactUsBanner: React.FC = () => {
  return (
    <div className="relative h-96 ">
      
      <img
        src="https://res.cloudinary.com/dwelabpll/image/upload/v1725481171/call-center-operators-headsets-working-260nw-1860625378_gdzwgt.webp"
        alt="Contact Us Banner"
        className="w-full h-full object-cover"
      />

      {/* Black Transparent Shade */}
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>

    
      <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
        <nav className="text-sm mb-4">
          <a href="/" className="hover:underline">
            Home
          </a>
          <span className="mx-2">&gt;</span>
          <span>Contact Us</span>
        </nav>
        <h1 className="text-5xl font-bold">Contact Us</h1>
      </div>
      <section className="py-16 bg-white layout-padding">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap lg:flex-nowrap justify-between">
           
            <div className="w-full lg:w-1/2 lg:mr-8">
              {" "}
              
              <h3 className="text-yellow-500 text-xl font-bold mb-2">
                Contact Us
              </h3>
              <h1 className="text-green-600 text-5xl font-bold mb-6">
                GET IN TOUCH
              </h1>
              <p className="text-gray-600 mb-8">
                If you have any questions, feedback, or need assistance with
                booking our services, please don't hesitate to reach out. Our
                team is here to help you every step of the way.
              </p>
              
              <div className="space-y-4">
              
                <div className="flex items-center bg-white shadow-lg p-4 rounded-lg">
                  <div className="bg-yellow-500 p-4 rounded-md">
                    <EnvironmentOutlined className="text-white text-2xl" />
                  </div>
                  <div className="ml-4">
                    <h4 className="text-lg font-bold text-gray-700">
                      Office Location
                    </h4>
                    <p className="text-gray-600">
                     Chittagong,Bangladesh
                    </p>
                  </div>
                </div>

                
                <div className="flex items-center bg-white shadow-lg p-4 rounded-lg">
                  <div className="bg-green-600 p-4 rounded-md">
                    <PhoneOutlined className="text-white text-2xl" />
                  </div>
                  <div className="ml-4">
                    <h4 className="text-lg font-bold text-gray-700">
                      Office Contact
                    </h4>
                    <p className="text-gray-600">+09654378098</p>
                  </div>
                </div>

                
                <div className="flex items-center bg-white shadow-lg p-4 rounded-lg">
                  <div className="bg-green-600 p-4 rounded-md">
                    <MailOutlined className="text-white text-2xl" />
                  </div>
                  <div className="ml-4">
                    <h4 className="text-lg font-bold text-gray-700">
                      Office Email
                    </h4>
                    <p className="text-gray-600">meetspace@email.com</p>
                  </div>
                </div>
              </div>
            </div>

           
            <div className="w-full lg:w-1/2">
              <form className="bg-gray-100 shadow-lg rounded-lg p-8 space-y-6">
                <input
                  type="text"
                  placeholder="Your Name"
                  className="w-full p-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-600"
                />
                <input
                  type="email"
                  placeholder="Your Email"
                  className="w-full p-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-600"
                />
                <input
                  type="text"
                  placeholder="Your Subject"
                  className="w-full p-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-600"
                />
                <textarea
                  placeholder="Your Message"
                  className="w-full p-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-600"
                  rows={4}
                ></textarea>
                <button
                  type="submit"
                  className="w-1/4 bg-green-600 text-white py-4 rounded-md hover:bg-green-600 transition duration-300"
                >
                  Send
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
      <section className="py-16 bg-white layout-padding">
        <div className="container mx-auto px-4 ">
          {/* Google Maps Section */}
          <div className="w-full h-64 ">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3693.998569730702!2d91.80196751503656!3d22.356851985297377!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x30acd89d3a7c061f%3A0x10f68887659f0f77!2sChittagong!5e0!3m2!1sen!2sbd!4v1693923076437!5m2!1sen!2sbd"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              loading="lazy"
            ></iframe>
          </div>
        </div>
      </section>
      <div>
        <CustomFooter />
      </div>
    </div>
  );
};

export default ContactUsBanner;

