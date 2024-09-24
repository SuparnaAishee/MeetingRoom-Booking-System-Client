// import { createBrowserRouter } from "react-router-dom";

// // import Login from "../pages/Login";
// // import Register from "../pages/Register";
// import About from "../pages/About";
// import Service from "../pages/Service";

// // import AdminLayout from "../components/layout/AdminLayout";
// // import { adminPaths } from "./admin.routes";
// import Home from "../pages/Home";
// import Contact from "../pages/Contact";

// import MainLayout from "../components/layout/MainLayout";
// import Rooms from "../pages/Rooms";
// import RoomDetails from "../pages/RoomDetails";


// import BookNowPage from "../pages/user/BookingProcess";
// import RegisterForm from "../pages/Register";
// import MyBookings from "../pages/user/MyBookings";
// import Checkout from "../pages/user/Checkout";
// import CreateRoom from "../pages/admin/RoomManagement/CreateRoom";
// import RoomList from "../pages/admin/RoomManagement/RoomList";
// import CreateSlot from "../pages/admin/SlotManagement/CreateSlot";
// import SlotList from "../pages/admin/SlotManagement/SlotList";
// import Login from "../pages/Login";


// const router = createBrowserRouter([
 

//   {
//     path: "/",
//     element: <MainLayout />,
//     children: [
//       { path: "", element: <Home /> },
//       { path: "about", element: <About /> },
//       { path: "service", element: <Service /> },
//       { path: "contact", element: <Contact /> },
//       { path: "rooms", element: <Rooms /> },
//       { path: "rooms/:roomId", element: <RoomDetails /> },
//       { path: "book-now/:roomId", element: <BookNowPage /> },
//       { path: "my-bookings", element: <MyBookings /> },
//       { path: "checkout", element: <Checkout /> },
    
//     ],
//   },
//   {
//     path: "dashboard",
//     element: <MainLayout />,
//     children: [
//       {
//         path: "create-room",
//         element: <CreateRoom />,
//       },
//       {
//         path: "all-room",
//         element: <RoomList />,
//       },
//       {
//         path: "create-slot",
//         element: <CreateSlot />,
//       },
//       {
//         path: "all-slot",
//         element: <SlotList />,
//       },
//     ],
//   },
//   { path: "login", element: <Login /> },
//   { path: "signup", element: <RegisterForm /> },
// ]);

// export default router;



import { createBrowserRouter } from "react-router-dom";
import About from "../pages/About";
import Service from "../pages/Service";
import Home from "../pages/Home";
import Contact from "../pages/Contact";
import MainLayout from "../components/layout/MainLayout";
import Rooms from "../pages/Rooms";
import RoomDetails from "../pages/RoomDetails";
import BookNowPage from "../pages/user/BookingProcess";
import RegisterForm from "../pages/Register";
import MyBookings from "../pages/user/MyBookings";

import RoomList from "../pages/admin/RoomManagement/RoomList";
import CreateSlot from "../pages/admin/SlotManagement/CreateSlot";
import SlotList from "../pages/admin/SlotManagement/SlotList";
import Login from "../pages/Login";

// Import ProtectedRoute component
import ProtectedRoute from "../components/ProtectedRoute";
import CheckoutPage from "../pages/user/Checkout";
import BookingList from "../pages/admin/BookingManagement/BookingList";
import NotFoundPage from "../pages/notFound";

// Define your router configuration
const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { path: "", element: <Home /> },
      { path: "about", element: <About /> },
      { path: "service", element: <Service /> },
      { path: "contact", element: <Contact /> },
      { path: "rooms", element: <Rooms /> },
      { path: "rooms/:roomId", element: <RoomDetails /> },
      { path: "*", element: <NotFoundPage/> },
      {
        path: "book-now/:roomId",
        element: (
          <ProtectedRoute role="user">
            <BookNowPage />
          </ProtectedRoute>
        ),
      },
      {
        path: "my-bookings",
        element: (
          <ProtectedRoute role="user">
            <MyBookings />
          </ProtectedRoute>
        ),
      },
      {
        path: "checkout",
        element: (
          <ProtectedRoute role="user">
            <CheckoutPage />
          </ProtectedRoute>
        ),
      },
    ],
  },
  {
    path: "dashboard",
    element: (
      <ProtectedRoute role="admin">
        <MainLayout />
      </ProtectedRoute>
    ),
    children: [
     
      {
        path: "all-room",
        element: <RoomList />,
      },
      {
        path: "create-slot",
        element: <CreateSlot />,
      },
      {
        path: "all-slot",
        element: <SlotList />,
      },
      {
        path: "all-Bookings",
        element: <BookingList />,
      },
    ],
  },
  { path: "login", element: <Login /> },
  { path: "signup", element: <RegisterForm /> },
]);

export default router;
