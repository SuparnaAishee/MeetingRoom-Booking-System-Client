import React from "react";
import { Card, Col, Row } from "antd";
import {
  CalendarOutlined,
  CheckCircleOutlined,
  ClockCircleOutlined,
  CustomerServiceOutlined,
} from "@ant-design/icons";

const services = [
  {
    icon: <CalendarOutlined style={{ fontSize: "48px", color: "#28a745" }} />,
    title: "Real-Time Availability",
    description:
      "Check and book available spaces instantly with up-to-date availability.",
  },
  {
    icon: (
      <CheckCircleOutlined style={{ fontSize: "48px", color: "#28a745" }} />
    ),
    title: "Instant Booking Confirmation",
    description:
      "Get instant booking confirmation for your reservations and peace of mind.",
  },
  {
    icon: (
      <ClockCircleOutlined style={{ fontSize: "48px", color: "#28a745" }} />
    ),
    title: "Flexible Scheduling",
    description:
      "Schedule your bookings with flexibility to meet your unique needs.",
  },
  {
    icon: (
      <CustomerServiceOutlined style={{ fontSize: "48px", color: "#28a745" }} />
    ),
    title: "24/7 Support",
    description:
      "Our support team is available 24/7 to assist you with any queries.",
  },
];

const ServiceSection: React.FC = () => {
  return (
    <section className="py-16 bg-gray-100">
      <div className="container mx-auto text-center">
        <h2 className="text-3xl font-semibold mb-12">Our Services</h2>
        <Row gutter={[16, 16]} justify="center">
          {services.map((service, index) => (
            <Col xs={24} sm={12} md={12} lg={6} key={index}>
              <Card
                hoverable
                className="shadow-md"
                cover={
                  <div className="flex justify-center items-center py-6">
                    {service.icon}
                  </div>
                }
                style={{
                  borderRadius: "8px",
                  borderColor: "#28a745",
                  transition: "box-shadow 0.3s ease",
                }}
              >
                <Card.Meta
                  title={<h3 className="text-xl font-bold">{service.title}</h3>}
                  description={
                    <p className="text-gray-600">{service.description}</p>
                  }
                />
              </Card>
            </Col>
          ))}
        </Row>
      </div>
    </section>
  );
};

export default ServiceSection;
