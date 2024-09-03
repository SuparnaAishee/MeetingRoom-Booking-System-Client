import React from "react";
import { Button, Card, Row, Col } from "antd";
import { Link } from "react-router-dom"; // or next/link if using Next.js
import Carousel from "./carousel";
import { UserOutlined } from "@ant-design/icons";
import {
  ClockCircleOutlined,
  CheckCircleOutlined,
  CalendarOutlined,
  PhoneOutlined,
} from "@ant-design/icons";
import WhyChooseUs from "./whyChooseUs";
import CountUp from "react-countup";
const featuredRooms = [
  {
    image:
      "https://res.cloudinary.com/dwelabpll/image/upload/v1725384969/Index_fkdzd5.jpg",
    name: "Conference Room A",
    capacity: "10 People",
    price: "$100 per Slot",
  },
  {
    image:
      "https://res.cloudinary.com/dwelabpll/image/upload/v1725384969/Index_fkdzd5.jpg",
    name: "Board Room",
    capacity: "15 People",
    price: "$150 per Slot",
  },
  {
    image:
      "https://res.cloudinary.com/dwelabpll/image/upload/v1725384969/Index_fkdzd5.jpg",
    name: "Meeting Room",
    capacity: "8 People",
    price: "$80 per Slot",
  },
  {
    image:
      "https://res.cloudinary.com/dwelabpll/image/upload/v1725384969/Index_fkdzd5.jpg",
    name: "Training Room",
    capacity: "20 People",
    price: "$200 per Slot",
  },
  {
    image:
      "https://res.cloudinary.com/dwelabpll/image/upload/v1725384969/Index_fkdzd5.jpg",
    name: "Seminar Room",
    capacity: "25 People",
    price: "$250 per Slot",
  },
  {
    image:
      "https://res.cloudinary.com/dwelabpll/image/upload/v1725384969/Index_fkdzd5.jpg",
    name: "Project Room",
    capacity: "12 People",
    price: "$120 per Slot",
  },
];

const HomePage: React.FC = () => {
  return (
    <div className="relative h-screen ">
      {/* Hero Section with Carousel */}
      <Carousel />

      {/* Content Section */}
      <div className="flex items-center justify-between p-8 bg-white layout-padding">
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
      {/* Featured Rooms Section */}
      <div className="relative  ">
        {/* Featured Rooms Section */}
        <div className="p-8 bg-gray-100 layout-padding">
          <h2 className="text-4xl font-bold text-center text-green-600 mb-8">
            Featured Rooms
          </h2>
          <Row gutter={[16, 16]}>
            {featuredRooms.map((room, index) => (
              <Col xs={24} md={12} lg={8} key={index}>
                <Card
                  hoverable
                  className="relative overflow-hidden rounded-lg shadow-lg h-64"
                  cover={
                    <div className="relative h-64">
                      <img
                        src={room.image}
                        alt={room.name}
                        className="w-full h-full object-cover"
                        // style={{ objectFit: "cover" }} // Ensures the image fits within the card
                      />
                      <div className="absolute inset-0 bg-black bg-opacity-50 p-4 flex flex-col justify-end">
                        <div className="text-white mb-4">
                          <h3 className="text-lg font-bold">{room.name}</h3>
                          <p>{room.price}</p>
                        </div>
                        <div className="flex justify-between items-center">
                          <Button
                            type="default"
                            icon={<UserOutlined />}
                            className="bg-green-500 border-none text-white hover:bg-white hover:text-green-500 hover:border-green-500"
                          >
                            {room.capacity}
                          </Button>
                          <Button
                            type="default"
                            className="bg-black border-none text-white hover:bg-white hover:text-black hover:border-black"
                          >
                            See Details
                          </Button>
                        </div>
                      </div>
                    </div>
                  }
                />
              </Col>
            ))}
          </Row>
          <div className="text-center mt-8">
            <Button
              type="default"
              size="large"
              className="bg-green-500 border-none text-white hover:bg-white hover:text-green-500 hover:border-green-500"
            >
              <Link
                to="/meeting-rooms"
                className="text-black hover:text-green-500"
              >
                See More
              </Link>
            </Button>
          </div>
        </div>
      </div>
      {/*why choose us*/}
      <WhyChooseUs />
    </div>
  );
};

export default HomePage;
