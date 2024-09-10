import React, { useState, useEffect } from "react";
import { Image, Layout, Menu } from "antd";
import { Outlet, Link, useLocation } from "react-router-dom";
import "../../styles/custom.css"; // Import your custom CSS
import ScrollToTop from "../ui/ScrollTop";

const { Header, Content } = Layout;

const MainLayout: React.FC = () => {
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <Layout className="h-screen">
      <Header
        className={`sticky top-0 z-10 w-full h-16 flex items-center transition-all duration-300 ${
          isScrolled
            ? "bg-white bg-opacity-30 backdrop-blur-lg"
            : "bg-white bg-opacity-100"
        }`}
        style={{ height: "12%" }}
      >
        <div className="h-full flex items-center">
          <Image width={120} src="/src/assets/logo.png" alt="MeetSpace Logo" />
        </div>
        <Menu
          mode="horizontal"
          selectedKeys={[location.pathname]}
          className={`flex-grow min-w-0 bg-transparent custom-menu ${
            isScrolled ? "menu-blur" : "menu-normal"
          }`}
          style={{
            backgroundColor: "transparent",
          }}
        >
          <Menu.Item
            key="/"
            className={`custom-menu-item ${
              location.pathname === "/" ? "ant-menu-item-selected" : ""
            }`}
          >
            <Link to="/">Home</Link>
          </Menu.Item>
          <Menu.Item
            key="/about"
            className={`custom-menu-item ${
              location.pathname === "/about" ? "ant-menu-item-selected" : ""
            }`}
          >
            <Link to="/about">About Us</Link>
          </Menu.Item>
          <Menu.Item
            key="/service"
            className={`custom-menu-item ${
              location.pathname === "/service" ? "ant-menu-item-selected" : ""
            }`}
          >
            <Link to="/service">Service</Link>
          </Menu.Item>
          <Menu.Item
            key="/rooms"
            className={`custom-menu-item ${
              location.pathname === "/rooms" ? "ant-menu-item-selected" : ""
            }`}
          >
            <Link to="/rooms">Rooms</Link>
          </Menu.Item>
          <Menu.SubMenu
            key="pages"
            title="Pages"
            className="ant-menu-submenu-title"
          >
            <Menu.Item
              key="/pricing"
              className={`custom-menu-item ${
                location.pathname === "/pricing" ? "ant-menu-item-selected" : ""
              }`}
            >
              <Link to="/pricing">Pricing</Link>
            </Menu.Item>
            <Menu.Item
              key="/team"
              className={`custom-menu-item ${
                location.pathname === "/team" ? "ant-menu-item-selected" : ""
              }`}
            >
              <Link to="/team">Team</Link>
            </Menu.Item>
            <Menu.Item
              key="/faq"
              className={`custom-menu-item ${
                location.pathname === "/faq" ? "ant-menu-item-selected" : ""
              }`}
            >
              <Link to="/faq">F&Q</Link>
            </Menu.Item>
            <Menu.Item
              key="/gallery"
              className={`custom-menu-item ${
                location.pathname === "/gallery" ? "ant-menu-item-selected" : ""
              }`}
            >
              <Link to="/gallery">Gallery</Link>
            </Menu.Item>
          </Menu.SubMenu>
          <Menu.Item
            key="/contact"
            className={`custom-menu-item ${
              location.pathname === "/contact" ? "ant-menu-item-selected" : ""
            }`}
          >
            <Link to="/contact">Contact Us</Link>
          </Menu.Item>
        </Menu>

            <div className="ml-auto flex items-center">
          <Link
            to="/login"
            className="bg-green-500 text-white px-4 py-2 rounded-lg text-base sm:text-lg font-semibold hover:bg-green-600 transition duration-300"
          >
           Login
          </Link>
          </div>
      </Header>

      <Content className="bg-transparent  bg-white">
        <div className="min-h-[380px]  bg-white shadow-none ">
          <Outlet />
        </div>
      </Content>
      <ScrollToTop />
    </Layout>
  );
};

export default MainLayout;
