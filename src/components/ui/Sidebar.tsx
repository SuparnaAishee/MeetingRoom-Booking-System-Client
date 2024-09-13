import React from "react";
import { Menu } from "antd";
import { Link } from "react-router-dom";
import "../../styles/sidebar.css"; // Import custom styles here

const Sidebar: React.FC = () => {
  return (
    <aside className="sidebar">
      <div className="py-4 px-6 pt-12 text-center">
        <h2 className="sidebar-title pb-4">Admin Panel</h2>
        <Menu mode="vertical" className="custom-sidebar-menu">
          <Menu.Item key="/dashboard/all-room">
            <Link to="/dashboard/all-room">All Rooms</Link>
          </Menu.Item>
          <Menu.Item key="/dashboard/all-slot">
            <Link to="/dashboard/all-slot">All Slots</Link>
          </Menu.Item>
          <Menu.Item key="/dashboard/all-bookings">
            <Link to="/dashboard/all-bookings">All Bookings</Link>
          </Menu.Item>
        </Menu>
      </div>
    </aside>
  );
};

export default Sidebar;
