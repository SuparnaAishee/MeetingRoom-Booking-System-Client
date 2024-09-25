
import {
  Layout,
  Input,
  Button,
  Row,
  Col,
  Typography,
  Space,
  Image,
} from "antd";
import {
  MailOutlined,
  PhoneOutlined,
  FacebookFilled,
  TwitterCircleFilled,
  YoutubeFilled,
  LinkedinFilled,
} from "@ant-design/icons";

const { Footer } = Layout;
const { Title, Text } = Typography;

const CustomFooter = () => {
  return (
    <Footer className="bg-gray-100 layout-padding custom-footer">
      <Row gutter={[32, 32]} justify="space-between">
        <Col xs={24} sm={12} md={6}>
          <Image
            width={200}
            src="https://res.cloudinary.com/dwelabpll/image/upload/v1725429787/logo_agfhqe.png"
            alt="MeetSpace Logo"
          />
          <div style={{ marginTop: "20px" }}>
            <Space direction="vertical" size="middle">
              <Space>
                <MailOutlined style={{ color: "#000", fontSize: "16px" }} />
                <Text style={{ color: "#000" }}>MeetSpace@Email.com</Text>
              </Space>
              <Space>
                <PhoneOutlined style={{ color: "#000", fontSize: "16px" }} />
                <Text style={{ color: "#000" }}>+44 123 456 789</Text>
              </Space>
            </Space>
          </div>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Title level={4} style={{ color: "#298a2d" }}>
            Quick Links
          </Title>
          <Space direction="vertical">
            <a href="/" style={{ color: "#000" }}>
              Homepage
            </a>
            <a href="/about" style={{ color: "#000" }}>
              About Us
            </a>
            <a href="/service" style={{ color: "#000" }}>
              Our Services
            </a>
            <a href="/rooms" style={{ color: "#000" }}>
              Our Rooms
            </a>
          </Space>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Title level={4} style={{ color: "#298a2d" }}>
            Our Location
          </Title>
          <Space direction="vertical">
            <Text style={{ color: "#000" }}>Bangladesh</Text>
            <Text style={{ color: "#000" }}>Amsterdam</Text>
            <Text style={{ color: "#000" }}>New York</Text>
            <Text style={{ color: "#000" }}>Germany</Text>
          </Space>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Title level={4} style={{ color: "#298a2d" }}>
            Subscribe to Our Newsletter
          </Title>
          <Text style={{ color: "#000" }}>
            Get Our Latest Updates & New Offers Sales Discounts
          </Text>
          <Input.Group compact style={{ marginTop: "10px" }}>
            <Input
              style={{ width: "70%", height: "55px" }}
              placeholder="Email"
            />
            <Button
              type="primary"
              style={{
                width: "30%",
                height: "55px",
                backgroundColor: "#4caf50",
                borderColor: "#4caf50",
              }}
              onMouseEnter={(e) => {
                const target = e.target as HTMLButtonElement;
                target.style.backgroundColor = "#388e3c";
                target.style.borderColor = "#388e3c";
              }}
              onMouseLeave={(e) => {
                const target = e.target as HTMLButtonElement;
                target.style.backgroundColor = "#4caf50";
                target.style.borderColor = "#4caf50";
              }}
            >
              Subscribe
            </Button>
          </Input.Group>
          <div style={{ marginTop: "20px" }}>
            <Space size="large">
              <a href="https://facebook.com">
                <FacebookFilled style={{ color: "#000", fontSize: "24px" }} />
              </a>
              <a href="https://twitter.com">
                <TwitterCircleFilled
                  style={{ color: "#000", fontSize: "24px" }}
                />
              </a>
              <a href="https://youtube.com">
                <YoutubeFilled style={{ color: "#000", fontSize: "24px" }} />
              </a>
              <a href="https://linkedin.com">
                <LinkedinFilled style={{ color: "#000", fontSize: "24px" }} />
              </a>
            </Space>
          </div>
        </Col>
      </Row>
      <div
        style={{
          marginTop: "40px",
          borderTop: "1px solid #555",
          paddingTop: "20px",
          textAlign: "center",
        }}
      >
        <Text style={{ color: "#aaa" }}>
          ALL RIGHTS RESERVED - MEETSPACE AUTHORITY
        </Text>
      </div>
    </Footer>
  );
};

export default CustomFooter;
