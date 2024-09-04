import React from "react";
import { Layout, Row, Col, Typography, Card, Image } from "antd";
import "../styles/custom.css";

const { Title, Text } = Typography;

const WorkSection = () => {
  return (
    <Layout className="pb-32 bg-gray-200">
      <section>
        <div className="custom-section bg-cover bg-center relative layout-padding">
          {/* Transparent Black Overlay */}
          <div className="overlay absolute inset-0 bg-black opacity-50"></div>

          <div className="content relative z-10 text-white text-center flex flex-col justify-center h-full pb-10">
            {/* Middle Banner Headings */}
            <div className="text-white">
              <h3>How We Works---</h3>
              <Title level={1} style={{ color: "#fff", fontWeight: "bold" }}>
                Welcome to Our Workspace
              </Title>
              <Text className="text-white text-2xl">
                Creating a community of professionals and innovators
              </Text>
            </div>

            {/* Bottom Cards */}
            <div className="bottom-cards mt-4">
              {" "}
              {/* Reduced margin-top */}
              <Row gutter={[16, 16]} justify="center" align="middle">
                {" "}
                {/* Reduced gutter */}
                <Col xs={24} sm={12} md={6}>
                  <Card
                    className="custom-card"
                    style={{ marginTop: "-20px", height: "280px" }}
                  >
                    {" "}
                    {/* Negative margin to lift */}
                    <Image
                      src="https://res.cloudinary.com/dwelabpll/image/upload/v1725459170/png-transparent-select-product-ecommerce-item-shopping-and-ecommerce-icon-thumbnail-removebg-preview_bdzhcx.png"
                      style={{ width: "100px" }}
                    />
                    <Title level={4}>01</Title>
                    <Title
                      level={4}
                      style={{ color: "#38A169", fontWeight: "bold" }}
                    >
                      Select A Room
                    </Title>
                    <Text>Lorem ipsum dolor sit amet, consectetur</Text>
                  </Card>
                </Col>
                <Col xs={24} sm={12} md={6}>
                  <Card
                    className="custom-card"
                    style={{ marginTop: "-20px", height: "280px" }}
                  >
                    <Image
                      src="https://res.cloudinary.com/dwelabpll/image/upload/v1725458696/date_jaqrfi.png"
                      style={{ width: "100px" }}
                    />
                    <Title level={4}>02</Title>
                    <Title
                      level={4}
                      style={{ color: "#38A169", fontWeight: "bold" }}
                    >
                      Choose Date&Time
                    </Title>
                    <Text>Lorem ipsum dolor sit amet, consectetur</Text>
                  </Card>
                </Col>
                <Col xs={24} sm={12} md={6}>
                  <Card
                    className="custom-card highlighted-card elevated-card"
                    style={{ marginTop: "-60px", height: "350px" }}
                  >
                    <Image
                      src="https://res.cloudinary.com/dwelabpll/image/upload/v1725458870/booking_cg8oje.png"
                      style={{ width: "100px" }}
                    />
                    <Title level={4} style={{ color: "#fff" }}>
                      03
                    </Title>
                    <Title
                      level={4}
                      style={{ color: "#fff", fontWeight: "bold" }}
                    >
                      Confirm Booking
                    </Title>
                    <Text className="text-white">
                      Lorem ipsum dolor sit amet, consectetur
                    </Text>
                  </Card>
                </Col>
                <Col xs={24} sm={12} md={6}>
                  <Card
                    className="custom-card"
                    style={{ marginTop: "-20px", height: "280px" }}
                  >
                    <Image
                      src="https://res.cloudinary.com/dwelabpll/image/upload/v1725458950/9156007_l06vit.png"
                      style={{ width: "100px" }}
                    />
                    <Title level={4} className="text-green-600">
                      04
                    </Title>
                    <Title
                      level={4}
                      style={{ color: "#38A169", fontWeight: "bold" }}
                    >
                      Receive Confirmation
                    </Title>
                    <Text>Lorem ipsum dolor sit amet, consectetur</Text>
                  </Card>
                </Col>
              </Row>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default WorkSection;
