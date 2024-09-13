import MainLayout from "../components/layout/MainLayout";
import BookingProcess from "../pages/user/BookingProcess";

import MyBookings from "../pages/user/MyBookings";


export const userPaths = [
  {
    path: "dashboard",
    element: <MainLayout />,
  },
 
  {
    path: "my-bookings",
    element: <MyBookings />,
  },
  
  {
    path: "booking-form/:roomId",
    element: <BookingProcess />,
  },
  
];
