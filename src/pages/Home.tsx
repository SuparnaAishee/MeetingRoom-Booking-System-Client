import React from "react";
import Carousel from "./carousel";
import {
  ClockCircleOutlined,
  CheckCircleOutlined,
  CalendarOutlined,
  PhoneOutlined,
} from "@ant-design/icons";
import { Card, Row, Col } from "antd";



const HomePage: React.FC = () => {
  return (
    <div className="relative h-screen">
      {/* Hero Section with Carousel */}
      <Carousel />
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
      {/* Service Section */}
      <div className="p-8 bg-gray-200 layout-padding">
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
              cover={<PhoneOutlined className="text-green-600 text-5xl my-4" />}
            >
              <Card.Meta
                title="24/7 Support"
                description="We offer round-the-clock support to assist you with any queries or issues."
              />
            </Card>
          </Col>
        </Row>
      </div>
      {/*featured rooms */}
      
    </div>
  );
};

export default HomePage;
