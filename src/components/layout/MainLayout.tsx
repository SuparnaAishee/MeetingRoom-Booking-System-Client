

// import React, { useState, useEffect } from "react";
// import { Image, Layout, Menu } from "antd";
// import { Outlet, Link, useLocation } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import { logout } from "../../redux/auth/authSlice"; // Import logout action
// import { toast } from "sonner"; // Import toast from sonner
// import "../../styles/custom.css";
// import ScrollToTop from "../ui/ScrollTop";

// const { Header, Content } = Layout;

// const MainLayout: React.FC = () => {
//   const location = useLocation();
//   const [isScrolled, setIsScrolled] = useState(false);
//   const dispatch = useDispatch();
//   const { isAuthenticated } = useSelector((state) => state.auth); // Get authentication state

//   useEffect(() => {
//     const handleScroll = () => {
//       if (window.scrollY > 50) {
//         setIsScrolled(true);
//       } else {
//         setIsScrolled(false);
//       }
//     };

//     window.addEventListener("scroll", handleScroll);

//     return () => {
//       window.removeEventListener("scroll", handleScroll);
//     };
//   }, []);

//   const handleLogout = () => {
//     dispatch(logout()); // Dispatch the logout action
//     toast.success("Logout successful!"); // Show success toast on logout
//   };

//   return (
//     <Layout className="h-screen">
//       <Header
//         className={`sticky top-0 z-10 w-full h-16 flex items-center transition-all duration-300 ${
//           isScrolled
//             ? "bg-white bg-opacity-30 backdrop-blur-lg"
//             : "bg-white bg-opacity-100"
//         }`}
//         style={{ height: "12%" }}
//       >
//         <div className="h-full flex items-center">
//           <Image
//             width={120}
//             src="https://res.cloudinary.com/dwelabpll/image/upload/v1725429787/logo_agfhqe.png"
//             alt="MeetSpace Logo"
//           />
//         </div>
//         <Menu
//           mode="horizontal"
//           selectedKeys={[location.pathname]}
//           className={`flex-grow min-w-0 bg-transparent custom-menu ${
//             isScrolled ? "menu-blur" : "menu-normal"
//           }`}
//           style={{
//             backgroundColor: "transparent",
//           }}
//         >
//           <Menu.Item
//             key="/"
//             className={`custom-menu-item ${
//               location.pathname === "/" ? "ant-menu-item-selected" : ""
//             }`}
//           >
//             <Link to="/">Home</Link>
//           </Menu.Item>
//           <Menu.Item
//             key="/about"
//             className={`custom-menu-item ${
//               location.pathname === "/about" ? "ant-menu-item-selected" : ""
//             }`}
//           >
//             <Link to="/about">About Us</Link>
//           </Menu.Item>
//           <Menu.Item
//             key="/service"
//             className={`custom-menu-item ${
//               location.pathname === "/service" ? "ant-menu-item-selected" : ""
//             }`}
//           >
//             <Link to="/service">Service</Link>
//           </Menu.Item>
//           <Menu.Item
//             key="/rooms"
//             className={`custom-menu-item ${
//               location.pathname === "/rooms" ? "ant-menu-item-selected" : ""
//             }`}
//           >
//             <Link to="/rooms">Rooms</Link>
//           </Menu.Item>
//           <Menu.SubMenu
//             key="pages"
//             title="Pages"
//             className="ant-menu-submenu-title"
//           >
//             <Menu.Item
//               key="/pricing"
//               className={`custom-menu-item ${
//                 location.pathname === "/pricing" ? "ant-menu-item-selected" : ""
//               }`}
//             >
//               <Link to="/pricing">Pricing</Link>
//             </Menu.Item>
//             <Menu.Item
//               key="/team"
//               className={`custom-menu-item ${
//                 location.pathname === "/team" ? "ant-menu-item-selected" : ""
//               }`}
//             >
//               <Link to="/team">Team</Link>
//             </Menu.Item>
//             <Menu.Item
//               key="/faq"
//               className={`custom-menu-item ${
//                 location.pathname === "/faq" ? "ant-menu-item-selected" : ""
//               }`}
//             >
//               <Link to="/faq">F&Q</Link>
//             </Menu.Item>
//             <Menu.Item
//               key="/gallery"
//               className={`custom-menu-item ${
//                 location.pathname === "/gallery" ? "ant-menu-item-selected" : ""
//               }`}
//             >
//               <Link to="/gallery">Gallery</Link>
//             </Menu.Item>
//           </Menu.SubMenu>
//           <Menu.Item
//             key="/contact"
//             className={`custom-menu-item ${
//               location.pathname === "/contact" ? "ant-menu-item-selected" : ""
//             }`}
//           >
//             <Link to="/contact">Contact Us</Link>
//           </Menu.Item>
//         </Menu>

//         <div className="ml-auto flex items-center">
//           {isAuthenticated ? (
//             <Link
//               to="/"
//               className="bg-green-500 text-white px-4 py-2 rounded-lg text-base sm:text-lg font-semibold hover:bg-green-600 transition duration-300"
//               onClick={handleLogout} // Logout when clicked
//             >
//               Logout
//             </Link>
//           ) : (
//             <Link
//               to="/login"
//               className="bg-green-500 text-white px-4 py-2 rounded-lg text-base sm:text-lg font-semibold hover:bg-green-600 transition duration-300"
//             >
//               Login
//             </Link>
//           )}
//         </div>
//       </Header>

//       <Content className="bg-transparent bg-white">
//         <div className="min-h-[380px] bg-white shadow-none ">
//           <Outlet />
//         </div>
//       </Content>
//       <ScrollToTop />
//     </Layout>
//   );
// };

// export default MainLayout;
import React, { useState, useEffect } from "react";
import { Image, Layout, Menu, Drawer } from "antd";
import { Outlet, Link, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../redux/auth/authSlice";
import { toast } from "sonner";
import "../../styles/custom.css";
import ScrollToTop from "../ui/ScrollTop";

const { Header, Content } = Layout;

const MainLayout: React.FC = () => {
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isDrawerVisible, setIsDrawerVisible] = useState(false);
  const dispatch = useDispatch();
  const { isAuthenticated, user } = useSelector((state) => state.auth);

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

  const handleLogout = () => {
    dispatch(logout());
    toast.success("Logout successful!");
  };

  const showDrawer = () => {
    setIsDrawerVisible(true);
  };

  const closeDrawer = () => {
    setIsDrawerVisible(false);
  };

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
          <Image
            width={120}
            src="https://res.cloudinary.com/dwelabpll/image/upload/v1725429787/logo_agfhqe.png"
            alt="MeetSpace Logo"
          />
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
          <Menu.Item key="/" className={`custom-menu-item`}>
            <Link to="/">Home</Link>
          </Menu.Item>
          <Menu.Item key="/about" className={`custom-menu-item`}>
            <Link to="/about">About Us</Link>
          </Menu.Item>
          <Menu.Item key="/service" className={`custom-menu-item`}>
            <Link to="/service">Service</Link>
          </Menu.Item>
          <Menu.Item key="/rooms" className={`custom-menu-item`}>
            <Link to="/rooms">Rooms</Link>
          </Menu.Item>
          <Menu.SubMenu
            key="pages"
            title="Pages"
            className="ant-menu-submenu-title"
          >
            <Menu.Item key="/pricing" className={`custom-menu-item`}>
              <Link to="/pricing">Pricing</Link>
            </Menu.Item>
            <Menu.Item key="/team" className={`custom-menu-item`}>
              <Link to="/team">Team</Link>
            </Menu.Item>
            <Menu.Item key="/faq" className={`custom-menu-item`}>
              <Link to="/faq">F&Q</Link>
            </Menu.Item>
            <Menu.Item key="/gallery" className={`custom-menu-item`}>
              <Link to="/gallery">Gallery</Link>
            </Menu.Item>
          </Menu.SubMenu>
          <Menu.Item key="/contact" className={`custom-menu-item`}>
            <Link to="/contact">Contact Us</Link>
          </Menu.Item>

          {/* Show My Bookings for all authenticated users */}
          {isAuthenticated && user?.role === "user" && (
            <Menu.Item key="/my-bookings" className={`custom-menu-item`}>
              <Link to="/my-bookings">My Bookings</Link>
            </Menu.Item>
          )}

          {/* Show Dashboard only for admins */}
          {isAuthenticated && user?.role === "admin" && (
            <Menu.Item
              key="/dashboard"
              onClick={showDrawer}
              className={`custom-menu-item`}
            >
              Dashboard
            </Menu.Item>
          )}
        </Menu>

        <div className="ml-auto flex items-center">
          {isAuthenticated ? (
            <Link
              to="/"
              className="bg-green-500 text-white px-4 py-2 rounded-lg text-base sm:text-lg font-semibold hover:bg-green-600 transition duration-300"
              onClick={handleLogout}
             
            >
              Logout
            </Link>
          ) : (
            <Link
              to="/login"
              className="bg-green-500 text-white px-4 py-2 rounded-lg text-base sm:text-lg font-semibold hover:bg-green-600 transition duration-300"
            >
              Login
            </Link>
          )}
        </div>
      </Header>

      <Content className="bg-transparent bg-white">
        <div className="min-h-[380px] bg-white shadow-none">
          <Outlet />
        </div>
      </Content>

      {/* Drawer for Dashboard navigation */}
      <Drawer
        title="Dashboard Navigation"
        placement="left"
        onClose={closeDrawer}
        visible={isDrawerVisible}
        bodyStyle={{ backgroundColor: "#f3f4f6" }}
        width={300} // Responsive width
        className="custom-drawer"
      >
        <Menu mode="vertical" className="q-custom-menu">
          <Menu.Item key="/dashboard/all-room">
            <Link to="/dashboard/all-room">All Room</Link>
          </Menu.Item>
          <Menu.Item key="/dashboard/all-slot">
            <Link to="/dashboard/all-slot">All Slot</Link>
          </Menu.Item>
          <Menu.Item key="/dashboard/all-bookings">
            <Link to="/dashboard/all-bookings">All Bookings</Link>
          </Menu.Item>
        </Menu>
      </Drawer>

      <ScrollToTop />
    </Layout>
  );
};

export default MainLayout;
