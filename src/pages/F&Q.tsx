
import { Layout, Collapse, Typography, Row, Col, Button } from "antd";
import { CaretRightOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom"; 
import "../styles/custom.css";

const { Content } = Layout;
const { Panel } = Collapse;
const { Title, Paragraph } = Typography;

const FAQSection = () => {
  const navigate = useNavigate();

  const handleContactClick = () => {
    navigate("/contact"); 
  };

  return (
    <Layout>
      <Content className="py-16 layout-padding bg-white">
        <div className="container mx-auto px-4">
          <Row
            gutter={[32, 32]} 
            align="middle"
            justify="center"
          >
           
            <Col xs={24} md={12} className="order-2 md:order-1">
             
              <Title
                level={2}
                className="text-green-600 text-left text-3xl md:text-4xl"
              >
                Frequently Asked Questions
              </Title>
              <Paragraph className="text-gray-600 mb-10 text-base md:text-lg">
                Get answers to the most common questions about our services,
                policies, and more. If you can't find what you're looking for,
                feel free to contact us!
              </Paragraph>

             
              <Collapse
                accordion
                bordered={false}
                expandIcon={({ isActive }) => (
                  <CaretRightOutlined
                    rotate={isActive ? 90 : 0}
                    className="text-green-600"
                  />
                )}
                className="site-collapse-custom-collapse"
                style={{ backgroundColor: "transparent", marginTop: "24px" }}
              >
                <Panel
                  header="What is your return policy?"
                  key="1"
                  className="site-collapse-custom-panel"
                  style={{
                    backgroundColor: "#ffffff",
                    border: "1px solid #38A169",
                    borderRadius: "8px",
                    marginBottom: "16px",
                  }}
                >
                  <p className="text-gray-600">
                    Our return policy allows for returns within 30 days of
                    purchase. Please ensure the item is in its original
                    condition and packaging.
                  </p>
                </Panel>

                <Panel
                  header="How long does shipping take?"
                  key="2"
                  className="site-collapse-custom-panel"
                  style={{
                    backgroundColor: "#ffffff",
                    border: "1px solid #38A169",
                    borderRadius: "8px",
                    marginBottom: "16px",
                  }}
                >
                  <p className="text-gray-600">
                    Shipping typically takes 5-7 business days for domestic
                    orders and 10-14 business days for international orders.
                  </p>
                </Panel>

                <Panel
                  header="What payment methods do you accept?"
                  key="3"
                  className="site-collapse-custom-panel"
                  style={{
                    backgroundColor: "#ffffff",
                    border: "1px solid #38A169",
                    borderRadius: "8px",
                    marginBottom: "16px",
                  }}
                >
                  <p className="text-gray-600">
                    We accept major credit cards, PayPal, and other secure
                    payment methods.
                  </p>
                </Panel>

                <Panel
                  header="How do I track my order?"
                  key="4"
                  className="site-collapse-custom-panel"
                  style={{
                    backgroundColor: "#ffffff",
                    border: "1px solid #38A169",
                    borderRadius: "8px",
                    marginBottom: "16px",
                  }}
                >
                  <p className="text-gray-600">
                    Once your order is shipped, we will send you a tracking
                    number via email. You can use this number to track your
                    order online.
                  </p>
                </Panel>
              </Collapse>

             
              <Button
                type="primary"
                size="large"
                className="mt-10 bg-green-600 border-green-500"
                onClick={handleContactClick}
              >
                Contact Us
              </Button>
            </Col>

           
            <Col xs={24} md={12} className="order-1 md:order-2">
              <img
                src="https://res.cloudinary.com/dwelabpll/image/upload/v1725478984/istockphoto-1337995272-612x612_fizg4d.jpg"
                alt="FAQ Image"
                className="w-full h-auto rounded-lg shadow-lg"
              />
            </Col>
          </Row>
        </div>
      </Content>
    </Layout>
  );
};

export default FAQSection;
