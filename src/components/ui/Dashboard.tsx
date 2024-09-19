// src/pages/Dashboard.tsx
import React from "react";
import { Layout, Menu } from "antd";
import { Outlet, Link } from "react-router-dom";

const { Sider, Content } = Layout;

const Dashboard: React.FC = () => {
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider width={200} className="site-layout-background">
        <Menu
          mode="inline"
          defaultSelectedKeys={["1"]}
          style={{ height: "100%", borderRight: 0 }}
        >
          <Menu.Item key="1">
            <Link to="/dashboard/all-slots">All Slots</Link>
          </Menu.Item>
          <Menu.Item key="2">
            <Link to="/dashboard/all-rooms">All Rooms</Link>
          </Menu.Item>
          <Menu.Item key="3">
            <Link to="/dashboard/all-Bookings">All Bookings</Link>
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout>
        <Content style={{ padding: "24px", minHeight: 280 }}>
          <h1>Dashboard</h1>
          <Outlet /> {/* This will render the nested routes */}
        </Content>
      </Layout>
    </Layout>
  );
};

export default Dashboard;
