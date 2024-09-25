
// import React, { useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import { useGetAvailableSlotsQuery } from "../../redux/features/slotsApi";
// import Calendar from "react-calendar";
// import "react-calendar/dist/Calendar.css"; 
// import "../../styles/custom.css"; 
// import { FetchBaseQueryError } from "@reduxjs/toolkit/query/react";
// import { SerializedError } from "@reduxjs/toolkit";

// interface Slot {
//   _id: string;
//   startTime: string;
//   endTime: string;
//   isBooked: boolean;
// }

// interface AvailableSlotsResponse {
//   data: Slot[];
// }

// const SlotCard: React.FC<{
//   slot: Slot;
//   onSelect: () => void;
//   isSelected: boolean;
// }> = ({ slot, onSelect, isSelected }) => {
//   return (
//     <div
//       className={`p-4 border rounded cursor-pointer ${
//         isSelected ? "bg-green-200 text-black" : "bg-white"
//       } ${slot.isBooked ? "opacity-50 cursor-not-allowed" : ""}`}
//       onClick={!slot.isBooked ? onSelect : undefined}
//     >
//       <h3 className="text-lg font-semibold">
//         {slot.startTime} - {slot.endTime}
//       </h3>
//       <p>{slot.isBooked ? "Not Available" : "Available"}</p>
//     </div>
//   );
// };

// const BookingPage: React.FC = () => {
//   const { roomId } = useParams<{ roomId: string }>();
//   const [selectedDate, setSelectedDate] = useState<Date | null>(null);
//   const [selectedSlots, setSelectedSlots] = useState<string[]>([]);

//   const navigate = useNavigate();

//   const { data, error, isLoading } = useGetAvailableSlotsQuery(
//     {
//       date: selectedDate ? selectedDate.toISOString() : "",
//       roomId: roomId || "",
//     },
//     { skip: !selectedDate || !roomId }
//   );

//   // Handle API data response
//   const slots: Slot[] = (data as unknown as AvailableSlotsResponse)?.data || [];

//   // Function to handle day click
//   const handleDayClick = (date: Date) => {
//     setSelectedDate(date);
//     setSelectedSlots([]);
//   };

//   // Function to handle slot selection
//   const handleSlotSelect = (slotId: string) => {
//     setSelectedSlots((prev) =>
//       prev.includes(slotId)
//         ? prev.filter((id) => id !== slotId)
//         : [...prev, slotId]
//     );
//   };

//   // Function to handle checkout
//   const handleCheckout = () => {
//     if (selectedSlots.length > 0) {
//       navigate("/checkout", { state: { selectedSlots, selectedDate } });
//     }
//   };

//   return (
//     <div className="px-4 md:px-24 flex-grow minn-h-screen layout-padding">
//       <div className="booking-page p-4">
//         <h1 className="text-3xl text-center text-green-500 font-bold">
//           Book Now
//         </h1>
//         <p className="text-center font-bold text-lg pb-2">
//           Select Date To Check The Available Slots
//         </p>

//         <div className="flex flex-col md:flex-row justify-center items-center mb-6  ">
//           <div className="calendar-container">
//             <Calendar onClickDay={handleDayClick} value={selectedDate} />
//           </div>
//           <div className="ml-0 md:ml-6 mt-4 ">
//             <img
//               src="https://res.cloudinary.com/dwelabpll/image/upload/v1725890780/1686761825938_abqi7t.jpg"
//               alt="Booking illustration"
//               className="object-cover max-w-[480px] w-full rounded"
//             />
//           </div>
//         </div>

//         {isLoading && <p>Loading available slots...</p>}
//         {error && (
//           <p>
//             Error loading slots:{" "}
//             {(error as FetchBaseQueryError)?.data?.message ||
//               (error as SerializedError)?.message ||
//               "Unknown error"}
//           </p>
//         )}

//         {slots.length > 0 ? (
//           <div className="slots-container">
//             <h2 className="text-xl font-bold text-center text-green-500 mb-4">
//               Available Slots
//             </h2>
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
//               {slots.map((slot) => (
//                 <SlotCard
//                   key={slot._id}
//                   slot={slot}
//                   onSelect={() => handleSlotSelect(slot._id)}
//                   isSelected={selectedSlots.includes(slot._id)}
//                 />
//               ))}
//             </div>
//           </div>
//         ) : (
//           <p>No available slots.</p>
//         )}

//         <div className="actions mt-6 flex flex-col md:flex-row md:justify-between gap-4 w-full">
//           <button
//             className={`py-2 px-4 rounded w-full md:w-auto ${
//               selectedSlots.length > 0
//                 ? "bg-green-500 text-white"
//                 : "bg-gray-400 text-gray-200 cursor-not-allowed"
//             }`}
//             onClick={handleCheckout}
//             disabled={selectedSlots.length === 0}
//           >
//             Checkout
//           </button>
//           <button
//             className="bg-black text-white py-2 px-4 rounded w-full md:w-auto"
//             onClick={() => navigate(-1)}
//           >
//             Back to Details
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default BookingPage;
// import React, { useState } from "react";
// import { useParams, useNavigate, Link } from "react-router-dom";
// import { useGetAvailableSlotsQuery } from "../../redux/features/slotsApi";
// import Calendar from "react-calendar";
// import "react-calendar/dist/Calendar.css";
// import "../../styles/custom.css";
// import { useAppSelector } from "../../hooks/hooks";
// import { authApi } from "../../redux/auth/authApi";
// import moment from "moment"; // Import moment.js for better date handling

// interface Slot {
//   _id: string;
//   startTime: string;
//   endTime: string;
//   isBooked: boolean;
// }

// interface AvailableSlotsResponse {
//   data: Slot[];
// }

// const SlotCard: React.FC<{
//   slot: Slot;
//   onSelect: () => void;
//   isSelected: boolean;
// }> = ({ slot, onSelect, isSelected }) => {
//   return (
//     <div
//       className={`p-4 border rounded cursor-pointer ${
//         isSelected ? "bg-green-200 text-black" : "bg-white"
//       } ${slot.isBooked ? "opacity-50 cursor-not-allowed" : ""}`}
//       onClick={!slot.isBooked ? onSelect : undefined}
//     >
//       <h3 className="text-lg font-semibold">
//         {slot.startTime} - {slot.endTime}
//       </h3>
//       <p>{slot.isBooked ? "Not Available" : "Available"}</p>
//     </div>
//   );
// };

// const BookingPage: React.FC = () => {
//   const { roomId } = useParams<{ roomId: string }>();
//   const [selectedDate, setSelectedDate] = useState<string | null>(null);
//   const [selectedSlots, setSelectedSlots] = useState<string[]>([]);

//   const navigate = useNavigate();
//   const user = useAppSelector((state) => state.auth.user);

//   const {
//     data: userData,
//     isLoading: userLoading,
//     error: userError,
//   } = authApi.useGetUserByEmailQuery(user?.email || "", { skip: !user?.email });

//   const { data, error, isLoading } = useGetAvailableSlotsQuery(
//     {
//       date: selectedDate || "",
//       roomId: roomId || "",
//     },
//     { skip: !selectedDate || !roomId }
//   );

//   const slots: Slot[] = (data as unknown as AvailableSlotsResponse)?.data || [];

//   const handleDayClick = (date: Date) => {
//     const formattedDate = moment(date).format("YYYY-MM-DD"); // Format date as YYYY-MM-DD
//     setSelectedDate(formattedDate);
//     setSelectedSlots([]);
//   };

//   const handleSlotSelect = (slotId: string) => {
//     setSelectedSlots((prev) =>
//       prev.includes(slotId)
//         ? prev.filter((id) => id !== slotId)
//         : [...prev, slotId]
//     );
//   };

//   const handleCheckout = () => {
//     console.log("Selected Slots:", selectedSlots); // Log selected slots
//   console.log("Room ID:", roomId); // Log room ID
//   console.log("Selected Date:", selectedDate); 
//     if (selectedSlots.length > 0 && roomId && selectedDate) {
//       navigate("/checkout", {
//         state: { user, roomId, selectedSlots, selectedDate },
//       });
//     }
//   };

//   return (
//     <div className="px-4 md:px-24 flex-grow minn-h-screen layout-padding">
//       <div className="booking-page p-4">
//         <h1 className="text-3xl text-center text-green-500 font-bold">
//           Book Now
//         </h1>
//         <p className="text-center font-bold text-lg pb-2">
//           Select Date To Check The Available Slots
//         </p>

//         <div className="flex flex-col md:flex-row justify-center items-center mb-6">
//           <div className="calendar-container">
//             <Calendar
//               onClickDay={handleDayClick}
//               value={selectedDate ? new Date(selectedDate) : null}
//             />
//           </div>
//           <div className="ml-0 md:ml-6 mt-4">
//             <img
//               src="https://res.cloudinary.com/dwelabpll/image/upload/v1725890780/1686761825938_abqi7t.jpg"
//               alt="Booking illustration"
//               className="object-cover max-w-[480px] w-full rounded"
//             />
//           </div>
//         </div>

//         {isLoading && <p>Loading available slots...</p>}
//         {error && (
//           <p>Error loading slots: {error.message || "Unknown error"}</p>
//         )}

//         {slots.length > 0 ? (
//           <div className="slots-container">
//             <h2 className="text-xl font-bold text-center text-green-500 mb-4">
//               Available Slots
//             </h2>
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
//               {slots.map((slot) => (
//                 <SlotCard
//                   key={slot._id}
//                   slot={slot}
//                   onSelect={() => handleSlotSelect(slot._id)}
//                   isSelected={selectedSlots.includes(slot._id)}
//                 />
//               ))}
//             </div>
//           </div>
//         ) : (
//           <p>No available slots.</p>
//         )}

//         {userLoading ? (
//           <p>Loading user information...</p>
//         ) : userError ? (
//           <p>Error fetching user information.</p>
//         ) : userData ? (
//           <div className="bg-gray-200 p-4 rounded-lg mt-6 pl-6">
//             <h2 className="text-2xl font-semibold text-green-600">
//               Your Information
//             </h2>
//             <p className="text-lg">
//               <strong>Name:</strong> {userData.data.name}
//             </p>
//             <p className="text-lg">
//               <strong>Email:</strong> {userData.data.email}
//             </p>
//             <p className="text-lg">
//               <strong>Phone:</strong> {userData.data.phone}
//             </p>
//             <p className="text-lg">
//               <strong>Address:</strong> {userData.data.address}
//             </p>
//           </div>
//         ) : (
//           <p className="text-gray-500 mt-6">User information not available.</p>
//         )}

//         <div className="actions mt-6 flex flex-col md:flex-row md:justify-between gap-4 w-full">
//           <Link to="/checkout" />
//           <button
//             className={`py-2 px-4 rounded w-full md:w-auto ${
//               selectedSlots.length > 0
//                 ? "bg-green-500 text-white"
//                 : "bg-gray-400 text-gray-200 cursor-not-allowed"
//             }`}
//             onClick={handleCheckout}
//             disabled={selectedSlots.length === 0}
//           >
//             Checkout
//           </button>
//           <button
//             className="bg-black text-white py-2 px-4 rounded w-full md:w-auto"
//             onClick={() => navigate(-1)}
//           >
//             Back to Details
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default BookingPage;
import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useGetAvailableSlotsQuery } from "../../redux/features/slotsApi";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "../../styles/custom.css";
import { useAppSelector } from "../../hooks/hooks";
import { authApi } from "../../redux/auth/authApi";
import moment from "moment";

interface Slot {
  _id: string;
  startTime: string;
  endTime: string;
  isBooked: boolean;
}

interface AvailableSlotsResponse {
  data: Slot[];
}

const SlotCard: React.FC<{
  slot: Slot;
  onSelect: () => void;
  isSelected: boolean;
}> = ({ slot, onSelect, isSelected }) => (
  <div
    className={`p-4 border rounded cursor-pointer ${
      isSelected ? "bg-green-200 text-black" : "bg-white"
    } ${slot.isBooked ? "opacity-50 cursor-not-allowed" : ""}`}
    onClick={!slot.isBooked ? onSelect : undefined}
  >
    <h3 className="text-lg font-semibold">
      {slot.startTime} - {slot.endTime}
    </h3>
    <p>{slot.isBooked ? "Not Available" : "Available"}</p>
  </div>
);

const BookingPage: React.FC = () => {
  const { roomId } = useParams<{ roomId: string }>();
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedSlots, setSelectedSlots] = useState<
    { id: string; time: string }[]
  >([]);
  const navigate = useNavigate();
  const user = useAppSelector((state) => state.auth.user);

  const {
    data: userData,
    isLoading: userLoading,
    error: userError,
  } = authApi.useGetUserByEmailQuery(user?.email || "", { skip: !user?.email });
  const { data, error, isLoading } = useGetAvailableSlotsQuery(
    { date: selectedDate || "", roomId: roomId || "" },
    { skip: !selectedDate || !roomId }
  );

  const slots: Slot[] = (data as unknown as AvailableSlotsResponse)?.data || [];

  const handleDayClick = (date: Date) => {
    setSelectedDate(moment(date).format("YYYY-MM-DD"));
    setSelectedSlots([]); 
  };

  const handleSlotSelect = (slot: Slot) => {
    setSelectedSlots((prev) => {
      const isSelected = prev.find((s) => s.id === slot._id);
      return isSelected
        ? prev.filter((s) => s.id !== slot._id) // Deselect
        : [
            ...prev,
            { id: slot._id, time: `${slot.startTime} - ${slot.endTime}` },
          ]; // Select
    });
  };

  const handleCheckout = () => {
    if (selectedSlots.length > 0 && roomId && selectedDate) {
      const selectedSlotIds = selectedSlots.map((slot) => slot.id);
      const selectedSlotTimes = selectedSlots.map((slot) => slot.time);
      navigate("/checkout", {
        state: {
          user,
          roomId,
          selectedSlotIds,
          selectedSlotTimes,
          selectedDate,
        },
      });
    }
  };

  return (
    <div className="px-4 md:px-24 flex-grow min-h-screen layout-padding">
      <div className="booking-page p-4">
        <h1 className="text-3xl text-center text-green-500 font-bold">
          Book Now
        </h1>
        <p className="text-center font-bold text-lg pb-2">
          Select Date To Check The Available Slots
        </p>

        <div className="flex flex-col md:flex-row justify-center items-center mb-6">
          <div className="calendar-container">
            <Calendar
              onClickDay={handleDayClick}
              value={selectedDate ? new Date(selectedDate) : null}
            />
          </div>
          <div className="ml-0 md:ml-6 mt-4">
            <img
              src="https://res.cloudinary.com/dwelabpll/image/upload/v1725890780/1686761825938_abqi7t.jpg"
              alt="Booking illustration"
              className="object-cover max-w-[480px] w-full rounded"
            />
          </div>
        </div>

        {/* {isLoading && <p>Loading available slots...</p>}
        {error && (
          <p>Error loading slots: {error.message || "Unknown error"}</p>
        )} */}
        {isLoading && <p>Loading available slots...</p>}
        {error && (
          <>
            {error && "status" in error && error.status === 404 ? (
              <p>Error loading slots: Resource not found (404)</p>
            ) : error && "data" in error ? (
              // If 'data' exists in FetchBaseQueryError, check if there's a message
              <p>
                Error loading slots:{" "}
                {(error.data as { message?: string })?.message ||
                  "Unknown error"}
              </p>
            ) : (
              // Handle SerializedError or other error types
              <p>Error loading slots: An unknown error occurred</p>
            )}
          </>
        )}

        {slots.length > 0 ? (
          <div className="slots-container">
            <h2 className="text-xl font-bold text-center text-green-500 mb-4">
              Available Slots
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {slots.map((slot) => (
                <SlotCard
                  key={slot._id}
                  slot={slot}
                  onSelect={() => handleSlotSelect(slot)}
                  isSelected={selectedSlots.some((s) => s.id === slot._id)}
                />
              ))}
            </div>
          </div>
        ) : (
          <p>No available slots.</p>
        )}

        {userLoading ? (
          <p>Loading user information...</p>
        ) : userError ? (
          <p>Error fetching user information.</p>
        ) : userData ? (
          <div className="bg-gray-200 p-4 rounded-lg mt-6 pl-6">
            <h2 className="text-2xl font-semibold text-green-600">
              Your Information
            </h2>
            <p className="text-lg">
              <strong>Name:</strong> {userData.data.name}
            </p>
            <p className="text-lg">
              <strong>Email:</strong> {userData.data.email}
            </p>
            <p className="text-lg">
              <strong>Phone:</strong> {userData.data.phone}
            </p>
            <p className="text-lg">
              <strong>Address:</strong> {userData.data.address}
            </p>
          </div>
        ) : (
          <p className="text-gray-500 mt-6">User information not available.</p>
        )}

        <div className="actions mt-6 flex flex-col md:flex-row md:justify-between gap-4 w-full">
          <button
            className={`py-2 px-4 rounded w-full md:w-auto ${
              selectedSlots.length > 0
                ? "bg-green-500 text-white"
                : "bg-gray-400 text-gray-200 cursor-not-allowed"
            }`}
            onClick={handleCheckout}
            disabled={selectedSlots.length === 0}
          >
            Checkout
          </button>
          <button
            className="bg-black text-white py-2 px-4 rounded w-full md:w-auto"
            onClick={() => navigate(-1)}
          >
            Back to Details
          </button>
        </div>
      </div>

      {/* Display Selected Slots */}
      {selectedSlots.length > 0 && (
        <div className="selected-slots mt-4">
          <h3 className="text-lg font-bold">Selected Slots:</h3>
          <ul>
            {selectedSlots.map((slot) => (
              <li key={slot.id}>{slot.time}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default BookingPage;
