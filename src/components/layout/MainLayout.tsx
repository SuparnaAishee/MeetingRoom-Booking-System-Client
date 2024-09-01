import React from "react";
import { Image, Layout, Menu, theme } from "antd";
import { Outlet, Link } from "react-router-dom";

const { Header, Content, Footer } = Layout;

const MainLayout: React.FC = () => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <Layout style={{ height: "100vh" }}>
      <Header
        style={{
          position: "sticky",
          top: 0,
          zIndex: 1,
          width: "100%",
          height: "12%",
          display: "flex",
          alignItems: "center",
        }}
      >
        <div style={{ alignItems: "center", height: "100%" }}>
          <Image
            width={120}
            src="/src/assets/logo.png" // Ensure the path is correct
            alt="MeetSpace Logo"
          />
        </div>
        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={["1"]}
          style={{ flex: 1, minWidth: 0 }}
        >
          <Menu.Item key="1">
            <Link to="/">Home</Link>
          </Menu.Item>
          <Menu.Item key="2">
            <Link to="/about">About Us</Link>
          </Menu.Item>
          <Menu.Item key="3">
            <Link to="/service">Service</Link>
          </Menu.Item>
          <Menu.SubMenu key="4" title="Pages">
            <Menu.Item key="41">
              <Link to="/pricing">Pricing</Link>
            </Menu.Item>
            <Menu.Item key="42">
              <Link to="/team">Team</Link>
            </Menu.Item>
            <Menu.Item key="43">
              <Link to="/faq">F&Q</Link>
            </Menu.Item>
            <Menu.Item key="44">
              <Link to="/gallery">Gallery</Link>
            </Menu.Item>
          </Menu.SubMenu>
          <Menu.Item key="5">
            <Link to="/contact">Contact Us</Link>
          </Menu.Item>
          <Menu.Item key="6">
            <Link to="/get-started">Get Started</Link>
          </Menu.Item>
        </Menu>
      </Header>
      <Content style={{ padding: "0 48px" }}>
        <div
          style={{
            padding: 24,
            minHeight: 380,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          <Outlet />
        </div>
      </Content>
      <Footer style={{ textAlign: "center" }}>
        Ant Design ©{new Date().getFullYear()} Created by Ant UED
      </Footer>
    </Layout>
  );
};

export default MainLayout;
