"use client";

import { Bar, Doughnut, Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";
import Sidebar from "../../../components/ui/Sidebar";
import { useGetAllBookingsQuery } from "../../../redux/booking/bookingApi";
import { useGetRoomsQuery } from "../../../redux/features/roomsApi";
import { Spin } from "antd";
import { useEffect, useState } from "react";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

// Define interfaces for our data
interface Booking {
  _id: string;
  user: { name: string };
  room: { name: string };
  date: string;
  slots: Array<{ startTime: string; endTime: string }>;
  totalAmount: number;
  isConfirmed: boolean;
}

interface Room {
  _id: string;
  name: string;
  capacity: number;
  pricePerSlot: number;
  isDeleted: boolean;
}

const Dashboard = () => {
  // State for storing processed data
  const [totalBookings, setTotalBookings] = useState<number>(0);
  const [recentBookings, setRecentBookings] = useState<Booking[]>([]);
  const [topRooms, setTopRooms] = useState<Room[]>([]);
  const [roomUtilization, setRoomUtilization] = useState<
    { name: string; utilization: number }[]
  >([]);
  const [totalRevenue, setTotalRevenue] = useState<number>(0);
  const [maintenanceData, setMaintenanceData] = useState<
    Array<{ room: string; date: string; type: string }>
  >([]);

  // Fetch bookings data
  const { data: bookingsData, isLoading: isLoadingBookings } =
    useGetAllBookingsQuery({});

  // Fetch rooms data
  const { data: roomsData, isLoading: isLoadingRooms } = useGetRoomsQuery({});

  // Process data when it's loaded
  useEffect(() => {
    if (bookingsData?.data) {
      // Set total bookings count
      setTotalBookings(bookingsData.data.length || 0);

      // Calculate total revenue from all bookings
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      //@ts-ignore
      const totalRevenue = bookingsData.data.reduce((sum, booking) => {
        return sum + (booking.totalAmount || 0);
      }, 0);
      setTotalRevenue(totalRevenue);

      // Get the 5 most recent bookings
      const sortedBookings = [...bookingsData.data]
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
        .slice(0, 5);

      setRecentBookings(sortedBookings);
    }
  }, [bookingsData]);

  useEffect(() => {
    if (roomsData?.data?.rooms && bookingsData?.data) {
      const rooms = roomsData.data.rooms;

      // Calculate room utilization based on bookings
      const roomBookingCounts: Record<string, number> = {};

      // Count bookings per room
      bookingsData.data.forEach((booking: Booking) => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        //@ts-ignore
        const roomId = booking.room._id;
        roomBookingCounts[roomId] = (roomBookingCounts[roomId] || 0) + 1;
      });

      // Calculate utilization percentage (simplified calculation)
      const utilization = rooms.map((room: Room) => {
        const bookingCount = roomBookingCounts[room._id] || 0;
        // Assuming 100 is the maximum possible bookings for a room
        // You might want to adjust this calculation based on your business logic
        const utilizationPercentage = Math.min(
          Math.round((bookingCount / 100) * 100),
          100
        );

        return {
          name: room.name,
          utilization: utilizationPercentage,
        };
      });

      // Sort by utilization and take top 4
      const topUtilization = [...utilization]
        .sort((a, b) => b.utilization - a.utilization)
        .slice(0, 4);

      setRoomUtilization(topUtilization);

      // Set top rooms by booking count
      const topRoomsByBookings = [...rooms]
        .sort(
          (a, b) =>
            (roomBookingCounts[b._id] || 0) - (roomBookingCounts[a._id] || 0)
        )
        .slice(0, 3);

      setTopRooms(topRoomsByBookings);
    }
  }, [roomsData, bookingsData]);

  useEffect(() => {
    if (roomsData?.data?.rooms) {
      // Get up to 3 rooms for maintenance
      const roomsForMaintenance = roomsData.data.rooms.slice(0, 3);

      // Generate maintenance data with real room names but mock dates and types
      const maintenanceTypes = [
        "Deep Cleaning",
        "Equipment Update",
        "Painting",
        "AC Maintenance",
        "Furniture Replacement",
      ];
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      //@ts-ignore
      const maintenance = roomsForMaintenance.map((room, index) => {
        // Generate a date in the near future (5-15 days from now)
        const futureDate = new Date();
        futureDate.setDate(futureDate.getDate() + 5 + index * 3);

        return {
          room: room.name,
          date: futureDate.toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
          }),
          type: maintenanceTypes[
            Math.floor(Math.random() * maintenanceTypes.length)
          ],
        };
      });

      setMaintenanceData(maintenance);
    }
  }, [roomsData]);

  const barChartData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        label: "Bookings",
        data: [65, 59, 80, 81, 56, 55],
        backgroundColor: "#3b82f6",
      },
    ],
  };

  const doughnutChartData = {
    labels: ["Website", "Social Media", "Email", "Other"],
    datasets: [
      {
        data: [40, 25, 20, 15],
        backgroundColor: ["#3b82f6", "#10b981", "#f59e0b", "#ef4444"],
      },
    ],
  };

  const lineChartData = {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    datasets: [
      {
        label: "This Week",
        data: [12, 19, 3, 5, 2, 3, 9],
        borderColor: "#3b82f6",
        backgroundColor: "rgba(59, 130, 246, 0.5)",
      },
      {
        label: "Last Week",
        data: [8, 15, 5, 7, 4, 5, 7],
        borderColor: "#10b981",
        backgroundColor: "rgba(16, 185, 129, 0.5)",
      },
    ],
  };

  // Show loading state if data is still loading
  if (isLoadingBookings || isLoadingRooms) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Spin className="dot-spinner" size="large" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Sidebar */}
      <div className="w-64">
        <Sidebar />
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8 lg:pr-28">
        <header className="mb-8 flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-800">
            Meeting Room Dashboard
          </h1>
          <div className="flex space-x-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Search..."
                className="border rounded py-2 px-4 pr-10"
              />
              <svg
                className="w-5 h-5 text-gray-500 absolute right-3 top-2.5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
          </div>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-2">Total Bookings</h2>
            <p className="text-3xl font-bold text-blue-600">{totalBookings}</p>
            <p className="text-sm text-gray-600 mt-2">
              ↑ 12.5% from last month
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-2">Total Revenue</h2>
            <p className="text-3xl font-bold text-green-600">
              ${totalRevenue.toLocaleString()}
            </p>
            <p className="text-sm text-gray-600 mt-2">↑ 8.2% from last month</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-2">
              Customer Satisfaction
            </h2>
            <p className="text-3xl font-bold text-purple-600">92%</p>
            <p className="text-sm text-gray-600 mt-2">↑ 3% from last month</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-2">Available Rooms</h2>
            <p className="text-3xl font-bold text-yellow-600">
              {roomsData?.data?.rooms
                ? `${
                    roomsData.data.rooms.filter((r: Room) => !r.isDeleted)
                      .length
                  }/${roomsData.data.rooms.length}`
                : "0/0"}
            </p>
            <p className="text-sm text-gray-600 mt-2">
              {roomsData?.data?.rooms
                ? `${Math.round(
                    (roomsData.data.rooms.filter((r: Room) => !r.isDeleted)
                      .length /
                      roomsData.data.rooms.length) *
                      100
                  )}% availability rate`
                : "0% availability rate"}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">
              Monthly Booking Trends
            </h2>
            <Bar data={barChartData} />
          </div>

          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">Bookings by Source</h2>
            <div className="w-2/3 mx-auto">
              <Doughnut data={doughnutChartData} />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">Weekly Comparison</h2>
            <Line data={lineChartData} />
          </div>

          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">Room Utilization</h2>
            <div className="space-y-4">
              {roomUtilization.map((room) => (
                <div key={room.name}>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium">{room.name}</span>
                    <span className="text-sm font-medium">
                      {room.utilization}%
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div
                      className="bg-green-500 h-2.5 rounded-full"
                      style={{ width: `${room.utilization}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          <div className="bg-white p-6 rounded-lg shadow col-span-2">
            <h2 className="text-xl font-semibold mb-4">Top Booked Rooms</h2>
            <table className="w-full">
              <thead>
                <tr className="bg-gray-100">
                  <th className="text-left p-2">Room Name</th>
                  <th className="text-center p-2">Capacity</th>
                  <th className="text-center p-2">Bookings</th>
                  <th className="text-center p-2">Revenue</th>
                  <th className="text-center p-2">Satisfaction</th>
                </tr>
              </thead>
              <tbody>
                {topRooms.map((room, index) => {
                  // Calculate mock data for each room
                  const bookingCount = 42 - index * 4; // Mock booking count
                  const revenue = 2100 - index * 200; // Mock revenue
                  const satisfaction = 4.8 - index * 0.1; // Mock satisfaction rating

                  return (
                    <tr key={room._id} className="border-b">
                      <td className="p-2">{room.name}</td>
                      <td className="text-center">{room.capacity}</td>
                      <td className="text-center">{bookingCount}</td>
                      <td className="text-center">${revenue}</td>
                      <td className="text-center">
                        <div className="flex items-center justify-center">
                          <svg
                            className="w-5 h-5 text-yellow-400"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                          </svg>
                          <span className="ml-1">
                            {satisfaction.toFixed(1)}
                          </span>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">Upcoming Maintenance</h2>
            <ul className="space-y-4">
              {maintenanceData.length > 0 ? (
                maintenanceData.map((item, index) => (
                  <li
                    key={index}
                    className="flex items-center p-3 bg-gray-50 rounded-lg"
                  >
                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                      <svg
                        className="w-6 h-6 text-blue-500"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                        />
                      </svg>
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-900">
                        {item.room}
                      </p>
                      <p className="text-sm text-gray-500">
                        {item.date} - {item.type}
                      </p>
                    </div>
                  </li>
                ))
              ) : (
                <li className="p-3 text-gray-500 text-center">
                  No upcoming maintenance scheduled
                </li>
              )}
            </ul>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow mb-8">
          <h2 className="text-xl font-semibold mb-4">Recent Bookings</h2>
          <table className="w-full">
            <thead>
              <tr className="bg-gray-100">
                <th className="text-left p-2">Room</th>
                <th className="text-center p-2">Date</th>
                <th className="text-center p-2">Time</th>
                <th className="text-center p-2">Booked By</th>
                <th className="text-center p-2">Status</th>
              </tr>
            </thead>
            <tbody>
              {recentBookings.length > 0 ? (
                recentBookings.map((booking) => (
                  <tr key={booking._id} className="border-b">
                    <td className="p-2">{booking.room.name}</td>
                    <td className="text-center">
                      {new Date(booking.date).toLocaleDateString()}
                    </td>
                    <td className="text-center">
                      {booking.slots.length > 0
                        ? `${booking.slots[0].startTime} - ${
                            booking.slots[booking.slots.length - 1].endTime
                          }`
                        : "N/A"}
                    </td>
                    <td className="text-center">{booking.user.name}</td>
                    <td className="text-center">
                      <span
                        className={`${
                          booking.isConfirmed
                            ? "bg-green-100 text-green-800"
                            : "bg-yellow-100 text-yellow-800"
                        } py-1 px-2 rounded text-sm`}
                      >
                        {booking.isConfirmed ? "Confirmed" : "Pending"}
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="text-center p-4 text-gray-500">
                    No recent bookings found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

// import { Bar, Doughnut, Line } from "react-chartjs-2";
// import {
//   Chart as ChartJS,
//   CategoryScale,
//   LinearScale,
//   BarElement,
//   PointElement,
//   LineElement,
//   Title,
//   Tooltip,
//   Legend,
//   ArcElement,
// } from "chart.js";
// import Sidebar from "../../../components/ui/Sidebar";

// ChartJS.register(
//   CategoryScale,
//   LinearScale,
//   BarElement,
//   PointElement,
//   LineElement,
//   Title,
//   Tooltip,
//   Legend,
//   ArcElement
// );

// const Dashboard = () => {
//   const barChartData = {
//     labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
//     datasets: [
//       {
//         label: "Bookings",
//         data: [65, 59, 80, 81, 56, 55],
//         backgroundColor: "#3b82f6",
//       },
//     ],
//   };

//   const doughnutChartData = {
//     labels: ["Website", "Social Media", "Email", "Other"],
//     datasets: [
//       {
//         data: [40, 25, 20, 15],
//         backgroundColor: ["#3b82f6", "#10b981", "#f59e0b", "#ef4444"],
//       },
//     ],
//   };

//   const lineChartData = {
//     labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
//     datasets: [
//       {
//         label: "This Week",
//         data: [12, 19, 3, 5, 2, 3, 9],
//         borderColor: "#3b82f6",
//         backgroundColor: "rgba(59, 130, 246, 0.5)",
//       },
//       {
//         label: "Last Week",
//         data: [8, 15, 5, 7, 4, 5, 7],
//         borderColor: "#10b981",
//         backgroundColor: "rgba(16, 185, 129, 0.5)",
//       },
//     ],
//   };

//   return (

//   <div className="min-h-screen bg-gray-100 flex">
//     {/* Sidebar */}
//     <div className="w-64">
//       <Sidebar />
//     </div>

//     {/* Main Content */}
//     <div className="flex-1 p-8">
//       <header className="mb-8 flex justify-between items-center">
//         <h1 className="text-3xl font-bold text-gray-800">
//           Meeting Room Dashboard
//         </h1>
//         <div className="flex space-x-4">

//           <div className="relative">
//             <input
//               type="text"
//               placeholder="Search..."
//               className="border rounded py-2 px-4 pr-10"
//             />
//             <svg
//               className="w-5 h-5 text-gray-500 absolute right-3 top-2.5"
//               fill="none"
//               stroke="currentColor"
//               viewBox="0 0 24 24"
//               xmlns="http://www.w3.org/2000/svg"
//             >
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 strokeWidth={2}
//                 d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
//               />
//             </svg>
//           </div>
//         </div>
//       </header>

//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
//         <div className="bg-white p-6 rounded-lg shadow">
//           <h2 className="text-xl font-semibold mb-2">Total Bookings</h2>
//           <p className="text-3xl font-bold text-blue-600">245</p>
//           <p className="text-sm text-gray-600 mt-2">↑ 12.5% from last month</p>
//         </div>
//         <div className="bg-white p-6 rounded-lg shadow">
//           <h2 className="text-xl font-semibold mb-2">Total Revenue</h2>
//           <p className="text-3xl font-bold text-green-600">$12,450</p>
//           <p className="text-sm text-gray-600 mt-2">↑ 8.2% from last month</p>
//         </div>
//         <div className="bg-white p-6 rounded-lg shadow">
//           <h2 className="text-xl font-semibold mb-2">Customer Satisfaction</h2>
//           <p className="text-3xl font-bold text-purple-600">92%</p>
//           <p className="text-sm text-gray-600 mt-2">↑ 3% from last month</p>
//         </div>
//         <div className="bg-white p-6 rounded-lg shadow">
//           <h2 className="text-xl font-semibold mb-2">Available Rooms</h2>
//           <p className="text-3xl font-bold text-yellow-600">18/24</p>
//           <p className="text-sm text-gray-600 mt-2">75% availability rate</p>
//         </div>
//       </div>

//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
//         <div className="bg-white p-6 rounded-lg shadow">
//           <h2 className="text-xl font-semibold mb-4">Monthly Booking Trends</h2>
//           <Bar data={barChartData} />
//         </div>

//         <div className="bg-white p-6 rounded-lg shadow">
//           <h2 className="text-xl font-semibold mb-4">Bookings by Source</h2>
//           <div className="w-2/3 mx-auto">
//             <Doughnut data={doughnutChartData} />
//           </div>
//         </div>
//       </div>

//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
//         <div className="bg-white p-6 rounded-lg shadow">
//           <h2 className="text-xl font-semibold mb-4">Weekly Comparison</h2>
//           <Line data={lineChartData} />
//         </div>

//         <div className="bg-white p-6 rounded-lg shadow">
//           <h2 className="text-xl font-semibold mb-4">Room Utilization</h2>
//           <div className="space-y-4">
//             {[
//               { name: "Executive Boardroom", utilization: 85 },
//               { name: "Innovation Lab", utilization: 72 },
//               { name: "Collaboration Space", utilization: 68 },
//               { name: "Focus Room A", utilization: 55 },
//             ].map((room) => (
//               <div key={room.name}>
//                 <div className="flex justify-between mb-1">
//                   <span className="text-sm font-medium">{room.name}</span>
//                   <span className="text-sm font-medium">
//                     {room.utilization}%
//                   </span>
//                 </div>
//                 <div className="w-full bg-gray-200 rounded-full h-2.5">
//                   <div
//                     className="bg-green-500 h-2.5 rounded-full"
//                     style={{ width: `${room.utilization}%` }}
//                   ></div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>

//       <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
//         <div className="bg-white p-6 rounded-lg shadow col-span-2">
//           <h2 className="text-xl font-semibold mb-4">Top Booked Rooms</h2>
//           <table className="w-full">
//             <thead>
//               <tr className="bg-gray-100">
//                 <th className="text-left p-2">Room Name</th>
//                 <th className="text-center p-2">Capacity</th>
//                 <th className="text-center p-2">Bookings</th>
//                 <th className="text-center p-2">Revenue</th>
//                 <th className="text-center p-2">Satisfaction</th>
//               </tr>
//             </thead>
//             <tbody>
//               <tr className="border-b">
//                 <td className="p-2">Executive Boardroom</td>
//                 <td className="text-center">20</td>
//                 <td className="text-center">42</td>
//                 <td className="text-center">$2,100</td>
//                 <td className="text-center">
//                   <div className="flex items-center justify-center">
//                     <svg
//                       className="w-5 h-5 text-yellow-400"
//                       fill="currentColor"
//                       viewBox="0 0 20 20"
//                       xmlns="http://www.w3.org/2000/svg"
//                     >
//                       <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
//                     </svg>
//                     <span className="ml-1">4.8</span>
//                   </div>
//                 </td>
//               </tr>
//               <tr className="border-b">
//                 <td className="p-2">Innovation Lab</td>
//                 <td className="text-center">12</td>
//                 <td className="text-center">38</td>
//                 <td className="text-center">$1,900</td>
//                 <td className="text-center">
//                   <div className="flex items-center justify-center">
//                     <svg
//                       className="w-5 h-5 text-yellow-400"
//                       fill="currentColor"
//                       viewBox="0 0 20 20"
//                       xmlns="http://www.w3.org/2000/svg"
//                     >
//                       <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
//                     </svg>
//                     <span className="ml-1">4.6</span>
//                   </div>
//                 </td>
//               </tr>
//               <tr>
//                 <td className="p-2">Collaboration Space</td>
//                 <td className="text-center">8</td>
//                 <td className="text-center">35</td>
//                 <td className="text-center">$1,750</td>
//                 <td className="text-center">
//                   <div className="flex items-center justify-center">
//                     <svg
//                       className="w-5 h-5 text-yellow-400"
//                       fill="currentColor"
//                       viewBox="0 0 20 20"
//                       xmlns="http://www.w3.org/2000/svg"
//                     >
//                       <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
//                     </svg>
//                     <span className="ml-1">4.7</span>
//                   </div>
//                 </td>
//               </tr>
//             </tbody>
//           </table>
//         </div>

//         <div className="bg-white p-6 rounded-lg shadow">
//           <h2 className="text-xl font-semibold mb-4">Upcoming Maintenance</h2>
//           <ul className="space-y-4">
//             {[
//               {
//                 room: "Executive Boardroom",
//                 date: "Jun 20, 2023",
//                 type: "Deep Cleaning",
//               },
//               {
//                 room: "Innovation Lab",
//                 date: "Jun 22, 2023",
//                 type: "Equipment Update",
//               },
//               { room: "Focus Room A", date: "Jun 25, 2023", type: "Painting" },
//             ].map((item, index) => (
//               <li
//                 key={index}
//                 className="flex items-center p-3 bg-gray-50 rounded-lg"
//               >
//                 <div className="flex-shrink-0 w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
//                   <svg
//                     className="w-6 h-6 text-blue-500"
//                     fill="none"
//                     stroke="currentColor"
//                     viewBox="0 0 24 24"
//                     xmlns="http://www.w3.org/2000/svg"
//                   >
//                     <path
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                       strokeWidth={2}
//                       d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
//                     />
//                   </svg>
//                 </div>
//                 <div className="ml-4">
//                   <p className="text-sm font-medium text-gray-900">
//                     {item.room}
//                   </p>
//                   <p className="text-sm text-gray-500">
//                     {item.date} - {item.type}
//                   </p>
//                 </div>
//               </li>
//             ))}
//           </ul>
//         </div>
//       </div>

//       <div className="bg-white p-6 rounded-lg shadow mb-8">
//         <h2 className="text-xl font-semibold mb-4">Recent Bookings</h2>
//         <table className="w-full">
//           <thead>
//             <tr className="bg-gray-100">
//               <th className="text-left p-2">Room</th>
//               <th className="text-center p-2">Date</th>
//               <th className="text-center p-2">Time</th>
//               <th className="text-center p-2">Booked By</th>
//               <th className="text-center p-2">Status</th>
//             </tr>
//           </thead>
//           <tbody>
//             <tr className="border-b">
//               <td className="p-2">Executive Boardroom</td>
//               <td className="text-center">Jun 15, 2023</td>
//               <td className="text-center">09:00 - 10:30</td>
//               <td className="text-center">John Doe</td>
//               <td className="text-center">
//                 <span className="bg-green-100 text-green-800 py-1 px-2 rounded text-sm">
//                   Confirmed
//                 </span>
//               </td>
//             </tr>
//             <tr className="border-b">
//               <td className="p-2">Innovation Lab</td>
//               <td className="text-center">Jun 16, 2023</td>
//               <td className="text-center">13:00 - 15:00</td>
//               <td className="text-center">Jane Smith</td>
//               <td className="text-center">
//                 <span className="bg-yellow-100 text-yellow-800 py-1 px-2 rounded text-sm">
//                   Pending
//                 </span>
//               </td>
//             </tr>
//             <tr>
//               <td className="p-2">Collaboration Space</td>
//               <td className="text-center">Jun 17, 2023</td>
//               <td className="text-center">10:00 - 11:00</td>
//               <td className="text-center">Mike Johnson</td>
//               <td className="text-center">
//                 <span className="bg-green-100 text-green-800 py-1 px-2 rounded text-sm">
//                   Confirmed
//                 </span>
//               </td>
//             </tr>
//           </tbody>
//         </table>
//       </div>
//     </div>
//     </div>

//   );
// };

// export default Dashboard;
