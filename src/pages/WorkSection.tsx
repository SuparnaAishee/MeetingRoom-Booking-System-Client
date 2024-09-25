import  { useEffect } from "react";
import { Layout, Row, Col, Typography, Card} from "antd";
import "../styles/custom.css";
import Aos from "aos";

const { Title} = Typography;

const WorkSection = () => {
  useEffect(() => {
    Aos.init({
      duration: 1200,
    });
  }, []);
  return (
    <Layout className="pb-32 bg-gray-200">
      <section className="min-h-screen">
        <div className="custom-section bg-cover bg-center relative layout-padding">
          {/* Transparent Black Overlay */}
          <div className="overlay absolute inset-0 bg-black opacity-50"></div>

          <div className="content relative z-10 text-white text-center flex flex-col justify-center h-full pb-10">
            {/* Middle Banner Headings */}
            <div className="text-white contents">
              <h3>How We Works---</h3>
              <Title level={1} style={{ color: "#fff", fontWeight: "bold" }}>
                Welcome to Our Workspace
              </Title>
              <p className="text-white text-2xl">
                Creating a community of professionals and innovators
              </p>
            </div>

          
            <div className="bottom-cards mt-4 ">
              {" "}
            
              <Row gutter={[16, 16]} justify="center" align="middle">
                {" "}
               
                <Col xs={24} sm={12} md={6}>
                  <div className="step-card">
                    <Card
                      className="custom-card"
                      data-aos="flip-up"
                      style={{ marginTop: "-20px", height: "280px" }}
                    >
                      {" "}
                      {/* Negative margin to lift */}
                      <div className="pl-14">
                        <img
                          src="https://res.cloudinary.com/dwelabpll/image/upload/v1725459170/png-transparent-select-product-ecommerce-item-shopping-and-ecommerce-icon-thumbnail-removebg-preview_bdzhcx.png"
                          className="custom-img"
                        />
                      </div>
                      <Title level={4}>01</Title>
                      <Title
                        level={4}
                        style={{
                          color: "#38A169",
                          fontWeight: "bold",
                          marginTop: "5px",
                        }}
                      >
                        Select A Room
                      </Title>
                      <p className=" contents">
                        Choose the perfect meeting room for your needs.
                      </p>
                    </Card>
                  </div>
                </Col>
                <Col xs={24} sm={12} md={6}>
                  <div className="step-card ">
                    <Card
                      className="custom-card "
                      data-aos="fade-up"
                      style={{ marginTop: "-20px", height: "280px" }}
                    >
                      <div className="pl-14">
                        <img
                          src="https://res.cloudinary.com/dwelabpll/image/upload/v1725458696/date_jaqrfi.png"
                          className="custom-img  "
                          // style={{ width: "100px" }}
                        />
                      </div>
                      <Title level={4}>02</Title>
                      <Title
                        level={4}
                        style={{
                          color: "#38A169",
                          fontWeight: "bold",
                          marginTop: "5px",
                        }}
                      >
                        Choose Date
                      </Title>
                      <p className="contents">
                        Select your preferred date and time for the booking.
                      </p>
                    </Card>
                  </div>
                </Col>
                <Col xs={24} sm={12} md={6}>
                  <div className="steps-card">
                    <Card
                      className="custom-card highlighted-card elevated-card"
                      data-aos="flip-up"
                      style={{
                        marginTop: "-60px",
                        height: "350px",
                      }}
                    >
                      <div className="pl-14">
                        <img
                          src="https://res.cloudinary.com/dwelabpll/image/upload/v1725458870/booking_cg8oje.png"
                          className="custom-img"
                        />
                      </div>
                      <Title level={4} style={{ color: "#fff" }}>
                        03
                      </Title>
                      <Title
                        level={4}
                        style={{
                          color: "#fff",
                          fontWeight: "bold",
                          marginTop: "5px",
                        }}
                      >
                        Confirm Booking
                      </Title>
                      <p className=" contents">
                        Review your details and confirm your reservation for a
                        seamless experience.
                      </p>
                    </Card>
                  </div>
                </Col>
                <Col xs={24} sm={12} md={6}>
                  <div className="step-card">
                    <Card
                      className="custom-card sm:mt-0 sm:h-72 h-64 mt-4"
                      data-aos="fade-up"
                      style={{ marginTop: "-20px", height: "280px" }}
                    >
                      <div className="pl-14">
                        <img
                          src="https://res.cloudinary.com/dwelabpll/image/upload/v1725458950/9156007_l06vit.png"
                          className="custom-img"
                        />
                      </div>
                      <Title level={4} className="text-green-600">
                        04
                      </Title>
                      <Title
                        level={4}
                        style={{
                          color: "#38A169",
                          fontWeight: "bold",
                          marginTop: "5px",
                        }}
                      >
                        Receive Confirmation
                      </Title>
                      <p className=" contents">
                        A confirmation will be sent to you shortly about
                        booking.
                      </p>
                    </Card>
                  </div>
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
