
import AdminDashboard from "../pages/admin/AdminDashboard";
import BookingList from "../pages/admin/BookingManagement/BookingList";

import CreateRoom from "../pages/admin/RoomManagement/CreateRoom";
import RoomList from "../pages/admin/RoomManagement/RoomList";
import CreateSlot from "../pages/admin/SlotManagement/CreateSlot";
import SlotList from "../pages/admin/SlotManagement/SlotList";


export const adminPaths = [
  {
    path: "dashboard",
    element: <AdminDashboard />,
  },
  {
    name:'Booking Management',
    path:'booking-list',
    element:<BookingList/>
  },
  {
    name:'Room Management',
    children:[
        {
            name:'Create Room',
            path:'create-room',
            element:<CreateRoom/>
        },
        {
            name:'Room List',
            path:'room-list',
            element:<RoomList/>
        },
    ]
  },
  {
    name:'Slot Management',
    children:[
        {
            name:'Create Slot',
            path:'create-slot',
            element:<CreateSlot/>
        },
        {
            name:'Slot List',
            path:'slot-list',
            element:<SlotList/>
        },
    ]
  }
];

