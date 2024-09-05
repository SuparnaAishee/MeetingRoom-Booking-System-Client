import React from "react";
import { Card, Col, Row } from "antd";
import {
  CalendarOutlined,
  CheckCircleOutlined,
  ClockCircleOutlined,

  PhoneOutlined,
} from "@ant-design/icons";
import CountUp from "react-countup";



// const services = [
//   {
//     icon: <CalendarOutlined style={{ fontSize: "48px", color: "#28a745" }} />,
//     title: "Real-Time Availability",
//     description:
//       "Check and book available spaces instantly with up-to-date availability.",
//   },
//   {
//     icon: (
//       <CheckCircleOutlined style={{ fontSize: "48px", color: "#28a745" }} />
//     ),
//     title: "Instant Booking Confirmation",
//     description:
//       "Get instant booking confirmation for your reservations and peace of mind.",
//   },
//   {
//     icon: (
//       <ClockCircleOutlined style={{ fontSize: "48px", color: "#28a745" }} />
//     ),
//     title: "Flexible Scheduling",
//     description:
//       "Schedule your bookings with flexibility to meet your unique needs.",
//   },
//   {
//     icon: (
//       <CustomerServiceOutlined style={{ fontSize: "48px", color: "#28a745" }} />
//     ),
//     title: "24/7 Support",
//     description:
//       "Our support team is available 24/7 to assist you with any queries.",
//   },
// ];

const ServiceSection: React.FC = () => {
  return (
    <div>
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
    </div>
  );
};

export default ServiceSection;
