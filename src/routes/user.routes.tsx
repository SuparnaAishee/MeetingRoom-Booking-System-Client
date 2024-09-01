import BookingProcess from "../pages/user/BookingProcess";
import Checkout from "../pages/user/Checkout";
import MyBookings from "../pages/user/MyBookings";
import RoomDetails from "../pages/user/RoomDetails";
import UserDashboard from "../pages/user/UserDashboard";

export const userPaths = [
  {
    path: "dashboard",
    element: <UserDashboard />,
  },
  {
    path: "my-bookings",
    element: (
     
        <MyBookings />
      
    ),
  },
  {
    path: "room-details/:roomId",
    element: <RoomDetails />,
  },
  {
    path: "booking-form/:roomId",
    element: (
      
        <BookingProcess />
     
    ),
  },
  {
    path: "checkout",
    element: (
     
        <Checkout />
      
    ),
  },
];
