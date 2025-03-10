import type React from "react";
import { Menu } from "antd";
import { Link } from "react-router-dom";
import {
  DashboardOutlined,
  AppstoreOutlined,
  FieldTimeOutlined,
  CalendarOutlined,
} from "@ant-design/icons";
import "../../styles/sidebar.css"; // Import custom styles here

const Sidebar: React.FC = () => {
  return (
    <aside className="sidebar">
      <div className="py-4 px-6 text-center">
        <h2 className="sidebar-title pb-4">Admin Panel</h2>
        <Menu mode="vertical" className="custom-sidebar-menu">
          <Menu.Item key="/dashboard/dash-board" icon={<DashboardOutlined />}>
            <Link to="/dashboard/dash-board" className="pr-4">
              Dashboard
            </Link>
          </Menu.Item>
          <Menu.Item key="/dashboard/all-room" icon={<AppstoreOutlined />}>
            <Link to="/dashboard/all-room" className="pr-4">
              All Rooms
            </Link>
          </Menu.Item>
          <Menu.Item key="/dashboard/all-slot" icon={<FieldTimeOutlined />}>
            <Link to="/dashboard/all-slot" className="pr-6">
              All Slots
            </Link>
          </Menu.Item>
          <Menu.Item key="/dashboard/all-bookings" icon={<CalendarOutlined />}>
            <Link to="/dashboard/all-bookings">All Bookings</Link>
          </Menu.Item>

          {/* You can uncomment and use these additional menu items if needed */}
          {/* <Menu.Item key="/dashboard/users" icon={<UserOutlined />}>
            <Link to="/dashboard/users">Users</Link>
          </Menu.Item>
          <Menu.Item key="/dashboard/settings" icon={<SettingOutlined />}>
            <Link to="/dashboard/settings">Settings</Link>
          </Menu.Item> */}
        </Menu>
      </div>
    </aside>
  );
};

export default Sidebar;
