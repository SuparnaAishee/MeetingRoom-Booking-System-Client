import React from "react";
import { Card, Col, Row } from "antd";
import {
  CalendarOutlined,
  CheckCircleOutlined,
  ClockCircleOutlined,
  PhoneOutlined,
} from "@ant-design/icons";
import CountUp from "react-countup";
import CustomFooter from "../components/layout/Footer";
import ChoosePlanSection from "./Plan";

const ServiceSection: React.FC = () => {
  return (
    <div>
      <section>
        <div className="relative h-96 ">
          {/* Background Image */}
          <img
            src="https://res.cloudinary.com/dwelabpll/image/upload/v1725553163/960x0_pzdhid.webp"
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
              <span>Services</span>
            </nav>
            <h1 className="text-3xl md:text-5xl font-bold">
              Book Our Services
            </h1>
          </div>
        </div>
      </section>

      <section className="py-8 md:py-16 bg-white layout-padding">
        <div className="container mx-auto px-4 flex flex-wrap items-center">
          {/* Left Image Section */}
          <div className="w-full md:w-1/2 relative mb-8 md:mb-0">
            <img
              src="https://res.cloudinary.com/dwelabpll/image/upload/v1725547892/group-people-are-standing-room-with-man-woman_662214-598288_t7mp7z.jpg"
              alt="Team working"
              className="w-full h-auto rounded-lg"
            />
            <div className="absolute bottom-0 left-0 bg-white p-6 shadow-lg rounded-lg transform -translate-y-1/3">
              <h3 className="text-3xl md:text-4xl font-bold text-green-600">
                10+
              </h3>
              <p className="text-lg text-gray-700">Years Experience</p>
            </div>
            <div className="absolute bottom-0 right-0 transform translate-y-1/3 translate-x-1/4 pl-32 hidden md:block">
              <img
                src="https://res.cloudinary.com/dwelabpll/image/upload/v1725547946/Nolan-6-Ways-Office-Plants-Benefit-Your-Business_bkg8ca.jpg"
                alt="Team working"
                className="w-1/2 h-auto rounded-lg"
              />
            </div>
          </div>

          {/* Right Text Section */}
          <div className="w-full md:w-1/2 md:pl-12">
            <h4 className="text-green-600 font-semibold mb-2">ABOUT SERVICE</h4>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Better results come when you work together.
            </h2>
            <p className="text-gray-600 mb-6">
              Our service is designed to enhance your experience. We believe
              that when people come together, they can achieve remarkable
              results. From seamless meeting room bookings to exceptional
              customer support, we're dedicated to making your experience as
              smooth as possible.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              <div className="text-center">
                <div className="flex items-center justify-center mb-4">
                  <svg
                    className="w-8 h-8 text-green-600"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M9 12l2 2l4 -4"
                    />
                  </svg>
                </div>
                <h3 className="font-bold text-lg">Strategic Office</h3>
                <p className="text-gray-600">
                  Our strategic office is designed to provide you with the
                  perfect environment .
                </p>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center mb-4">
                  <svg
                    className="w-8 h-8 text-green-600"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 8v4l3 3"
                    />
                  </svg>
                </div>
                <h3 className="font-bold text-lg">Flexible Hour</h3>
                <p className="text-gray-600">
                  Enjoy the convenience of flexible hours tailored to fit your
                  schedule.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section>
        {/* Service Section */}
        <div>
          <div className="pb-20 bg-gray-200 layout-padding">
            <h2 className="text-3xl md:text-4xl font-bold text-center text-green-600 mb-8">
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
                  <h2 className="text-amber-400 font-bold text-3xl md:text-4xl mt-2">
                    <CountUp start={0} end={2000} duration={2} suffix="+" />
                  </h2>
                  <p className="text-gray-600">Member Active</p>
                </Col>

                {/* Company Active */}
                <Col xs={24} md={6} className="text-center">
                  <h2 className="text-amber-400 font-bold text-3xl md:text-4xl mt-2">
                    <CountUp start={0} end={411} duration={2} suffix="+" />
                  </h2>
                  <p className="text-gray-600">Company Active</p>
                </Col>

                {/* Private Room */}
                <Col xs={24} md={6} className="text-center">
                  <h2 className="text-amber-400 font-bold text-3xl md:text-4xl mt-2">
                    <CountUp start={0} end={200} duration={2} suffix="+" />
                  </h2>
                  <p className="text-gray-600">Private Room</p>
                </Col>

                {/* Get In Touch */}
                <Col xs={24} md={6} className="text-center">
                  <h2 className="text-amber-400 font-bold text-3xl md:text-4xl mt-2">
                    <CountUp start={0} end={200} duration={2} suffix="+" />
                  </h2>
                  <p className="text-gray-600">Get In Touch</p>
                </Col>
              </Row>
            </div>
          </section>
        </div>
      </section>
      <ChoosePlanSection />
      <CustomFooter />
    </div>
  );
};

export default ServiceSection;
