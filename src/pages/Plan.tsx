import { Layout, Row, Col, Typography, Card, Button } from "antd";
import { CheckOutlined } from "@ant-design/icons";
import "../styles/custom.css"
import { Link } from "react-router-dom";
const { Content } = Layout;
const { Title, Text } = Typography;

const ChoosePlanSection = () => {
  return (
    <Layout>
      <Content className="py-16 bg-white layout-padding">
        <div className="container mx-auto px-4">
          <Row gutter={[32, 32]} align="middle">
           
            <Col xs={24} md={12}>
              <Title
                level={3}
                style={{ color: "#38A169", marginBottom: "24px" }}
              >
                CHOOSE YOUR PLAN
              </Title>
              <Title level={1} className="mb-4">
                Discover the ideal plan for your business needs.
              </Title>
              <Text className="mb-4 d-block ">
                Whether you're hosting a small team meeting or a large
                conference, we have flexible plans to accommodate every event.
                Choose a plan that best suits your requirements.
              </Text>
              <br />
              <Text className="mb-4 d-block pt-2">
                <CheckOutlined style={{ color: "#52c41a" }} /> Affordable prices
                <br />
                <CheckOutlined style={{ color: "#52c41a" }} /> Flexibility and
                scalability
                <br />
                <CheckOutlined style={{ color: "#52c41a" }} /> 24/7 Customer
                support
                <br />
              </Text>
             
              <Link to="/rooms">
              <Button
                style={{
                  backgroundColor: "#38A169",
                  color: "#fff",
                  marginTop: "24px",
                }}
              >
                Book Now
              </Button>
              </Link>
            </Col>

            
            <Col xs={24} md={12}>
              <Row gutter={[16, 16]} justify="center">
          
                <Col xs={24} sm={8}>
                  <Card
                    title="Basic Plan"
                    bordered
                    style={{
                      textAlign: "center",
                      transform: "scale(1.1)",
                      transition: "transform 0.3s",
                      backgroundColor: "#f5f5f5",
                    }}
                    hoverable
                  >
                    <Title level={4}>$9.99/month</Title>
                    <Text>Good for individuals.</Text>
                    <br />
                    <Button
                      style={{
                        marginTop: 16,
                        backgroundColor: "#38A169",
                        color: "#fff",
                      }}
                    >
                      Choose Plan
                    </Button>
                  </Card>
                </Col>

             
                <Col xs={24} sm={8}>
                  <Card
                    title="Pro Plan"
                    bordered
                    style={{
                      textAlign: "center",
                      transform: "scale(1.3)",
                      transition: "transform 0.3s",
                      backgroundColor: "#38A169",
                      color: "#fff",
                      boxShadow: "0px 0px 15px rgba(0, 0, 0, 0.1)",
                      zIndex: 10,
                    }}
                    hoverable
                  >
                    <Title level={3} style={{ color: "#fff" }}>
                      $29.99/month
                    </Title>
                    <Text style={{ color: "#fff" }}>Best for small teams.</Text>
                    <br />
                    <Button
                      style={{
                        marginTop: 16,
                        backgroundColor: "#fff",
                        color: "#38A169",
                      }}
                    >
                      Choose Plan
                    </Button>
                  </Card>
                </Col>

              
                <Col xs={24} sm={8}>
                  <Card
                    title="Enterprise Plan"
                    bordered
                    style={{
                      textAlign: "center",
                      transform: "scale(1.1)",
                      transition: "transform 0.3s",
                      backgroundColor: "#f5f5f5",
                    }}
                    hoverable
                  >
                    <Title level={4}>$49.99/month</Title>
                    <Text>Great for large companies.</Text>
                    <br />
                    <Button
                      style={{
                        marginTop: 16,
                        backgroundColor: "#38A169",
                        color: "#fff",
                      }}
                    >
                      Choose Plan
                    </Button>
                  </Card>
                </Col>
              </Row>
            </Col>
          </Row>
        </div>
      </Content>
    </Layout>
  );
};

export default ChoosePlanSection;
