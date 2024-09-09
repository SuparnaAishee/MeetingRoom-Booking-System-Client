import React from "react";
import {  Card, Row, Col } from "antd";
 // or next/link if using Next.js
import Carousel from "./carousel";
// import { UserOutlined } from "@ant-design/icons";
import {
  ClockCircleOutlined,
  CheckCircleOutlined,
  CalendarOutlined,
  PhoneOutlined,
} from "@ant-design/icons";
import WhyChooseUs from "./whyChooseUs";
import CountUp from "react-countup";

import CustomFooter from "../components/layout/Footer";
import WorkSection from "./WorkSection";
import TestimonialsSection from "./Testimonial";
import BlogSection from "./Blog";


import FeaturedRooms from "./FeaturedRooms";


const HomePage: React.FC = () => {
 
  return (
    <div className="relative h-screen ">
      {/* Hero Section with Carousel */}
      <Carousel />

      {/* Content Section */}
      <div className="flex items-center justify-between p-8 bg-white layout-padding space-x-6">
        {/* Text Content */}
        <div className="flex-1 space-y-6 ">
          <p className="text-green-600 font-semibold">WHO WE ARE</p>
          <h2 className="text-5xl font-bold">
            Effortless Planning for Uninterrupted Progress.
          </h2>
          <p className="text-gray-600">
            We are dedicated to making your scheduling process as seamless as
            possible. Our meeting booking system is designed to simplify the way
            you connect, collaborate, and communicate.
          </p>
          <p className="text-gray-600">
            By eliminating the hassle of back-and-forth scheduling, we help you
            focus on what truly matters—productive meetings and meaningful
            connections.
          </p>
          <button className="text-white bg-green-500 hover:bg-green-600 px-6 py-3 rounded-lg">
            Read more →
          </button>
        </div>

        {/* Image and Stats */}
        <div className="flex-1 relative ">
          <img
            src="https://res.cloudinary.com/dwelabpll/image/upload/v1725375841/meetingRoom_mc6iii.webp"
            alt="Meeting"
            className="w-full h-auto object-cover rounded-lg shadow-lg"
          />
          <div className="absolute  bg-white bg-opacity-80 p-4 rounded-lg shadow-md m-4 section-stats">
            <h3 className="text-green-600 text-6xl font-bold">150+</h3>
            <p className="text-gray-700">Companies Joined</p>
          </div>
        </div>
      </div>

      {/* Service Section */}
      <div>
        <div className="pb-20 bg-gray-200 layout-padding ">
          <h2 className="text-4xl font-bold text-center text-green-600 mb-8">
            Our Services
          </h2>
          <Row gutter={[16, 16]}>
            <Col xs={24} md={12} lg={6}>
              <Card
                hoverable
                className="text-center"
                cover={
                  <ClockCircleOutlined className="text-green-600 text-5xl my-4" />
                }
              >
                <Card.Meta
                  title="Real-Time Availability"
                  description="Check the availability of our spaces in real-time and make bookings instantly."
                />
              </Card>
            </Col>
            <Col xs={24} md={12} lg={6}>
              <Card
                hoverable
                className="text-center"
                cover={
                  <CheckCircleOutlined className="text-green-600 text-5xl my-4" />
                }
              >
                <Card.Meta
                  title="Instant Booking Confirmation"
                  description="Get immediate confirmation for your bookings with no waiting time."
                />
              </Card>
            </Col>
            <Col xs={24} md={12} lg={6}>
              <Card
                hoverable
                className="text-center"
                cover={
                  <CalendarOutlined className="text-green-600 text-5xl my-4" />
                }
              >
                <Card.Meta
                  title="Flexible Scheduling"
                  description="Adjust your bookings easily to fit your changing schedule."
                />
              </Card>
            </Col>
            <Col xs={24} md={12} lg={6}>
              <Card
                hoverable
                className="text-center"
                cover={
                  <PhoneOutlined className="text-green-600 text-5xl my-4" />
                }
              >
                <Card.Meta
                  title="24/7 Support"
                  description="We offer round-the-clock support to assist you with any queries or issues."
                />
              </Card>
            </Col>
          </Row>
        </div>
        <section className="bg-gray-200 pb-12">
          <div className="container mx-auto px-6">
            <Row gutter={32} justify="center">
              {/* Member Active */}
              <Col xs={24} md={6} className="text-center">
                <h2 className="text-amber-400 font-bold text-4xl mt-2">
                  <CountUp start={0} end={2000} duration={2} suffix="+" />
                </h2>
                <p className="text-gray-600">Member Active</p>
              </Col>

              {/* Company Active */}
              <Col xs={24} md={6} className="text-center">
                <h2 className="text-amber-400 font-bold text-4xl mt-2">
                  <CountUp start={0} end={411} duration={2} suffix="+" />
                </h2>
                <p className="text-gray-600">Company Active</p>
              </Col>

              {/* Private Room */}
              <Col xs={24} md={6} className="text-center">
                <h2 className="text-amber-400 font-bold text-4xl mt-2">
                  <CountUp start={0} end={214} duration={2} suffix="+" />
                </h2>
                <p className="text-gray-600">Private Room</p>
              </Col>

              {/* Years Experience */}
              <Col xs={24} md={6} className="text-center">
                <h2 className="text-amber-400 font-bold text-4xl mt-2">
                  <CountUp start={0} end={10} duration={2} suffix="+" />
                </h2>
                <p className="text-gray-600">Years Experience</p>
              </Col>
            </Row>
          </div>
        </section>
      </div>
      <div>
   <FeaturedRooms/>
      </div>

      {/*why choose us*/}
      <div className="pt-12 pb-20">
      <WhyChooseUs />
      </div>
      <div>
        {" "}
        <WorkSection />
      </div>
      <div>
        <TestimonialsSection />
      </div>
      <div>
        <BlogSection />
      </div>
      <div>
        <CustomFooter />
      </div>
    </div>
  );
};

export default HomePage;
