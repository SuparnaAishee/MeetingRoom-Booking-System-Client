
// import React, { useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import { useGetAvailableSlotsQuery } from "../../redux/features/slotsApi";
// import Calendar from "react-calendar";
// import "react-calendar/dist/Calendar.css"; // Import Calendar styles
// import "../../styles/custom.css"; // Import custom styles
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

//   const slots: Slot[] = (data as unknown as AvailableSlotsResponse)?.data || [];

//   const handleDateChange = (value: Date | Date[] | [Date, Date] | null) => {
//     if (value instanceof Date) {
//       setSelectedDate(value);
//       setSelectedSlots([]); // Reset slot selection when date changes
//     } else if (Array.isArray(value) && value.length === 1) {
//       setSelectedDate(value[0]);
//       setSelectedSlots([]); // Reset slot selection when date changes
//     } else {
//       setSelectedDate(null);
//       setSelectedSlots([]); // Reset slot selection when date changes
//     }
//   };

//   const handleSlotSelect = (slotId: string) => {
//     if (selectedSlots.includes(slotId)) {
//       setSelectedSlots((prev) => prev.filter((id) => id !== slotId));
//     } else {
//       setSelectedSlots((prev) => [...prev, slotId]);
//     }
//   };

//   const handleCheckout = () => {
//     if (selectedSlots.length > 0) {
//       navigate("/checkout", { state: { selectedSlots, selectedDate } });
//     }
//   };

//   return (
//     <div className="pl-24 pr-24 bg-gray-100">
//       <div className="booking-page p-6">
//         <h1 className="text-3xl text-center text-green-500 font-bold">
//           Book Now
//         </h1>
//         <p className="text-center font-bold text-lg pb-2">
//           Select Date To Check The Available Slots
//         </p>

//         <div className="flex justify-center items-center mb-6 pt-2">
//           <div className="calendar-container">
//             <Calendar onChange={handleDateChange} value={selectedDate} />
//           </div>
//           <div className="ml-6 mb-4">
//             <img
//               src="https://res.cloudinary.com/dwelabpll/image/upload/v1725890780/1686761825938_abqi7t.jpg"
//               alt="Booking illustration"
//               className="object-cover max-w-[480px] rounded"
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

//         {Array.isArray(slots) && slots.length > 0 ? (
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

//         <div className="actions mt-6 flex justify-between">
//           <button
//             className={`py-2 px-4 rounded ${
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
//             className="bg-black text-white py-2 px-4 rounded"
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
import { FetchBaseQueryError } from "@reduxjs/toolkit/query/react";
import { SerializedError } from "@reduxjs/toolkit";

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
}> = ({ slot, onSelect, isSelected }) => {
  return (
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
};

const BookingPage: React.FC = () => {
  const { roomId } = useParams<{ roomId: string }>();
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedSlots, setSelectedSlots] = useState<string[]>([]);

  const navigate = useNavigate();

  const { data, error, isLoading } = useGetAvailableSlotsQuery(
    {
      date: selectedDate ? selectedDate.toISOString() : "",
      roomId: roomId || "",
    },
    { skip: !selectedDate || !roomId }
  );

  // Handle API data response
  const slots: Slot[] = (data as unknown as AvailableSlotsResponse)?.data || [];

  // Function to handle day click
  const handleDayClick = (date: Date) => {
    setSelectedDate(date);
    setSelectedSlots([]);
  };

  // Function to handle slot selection
  const handleSlotSelect = (slotId: string) => {
    setSelectedSlots((prev) =>
      prev.includes(slotId)
        ? prev.filter((id) => id !== slotId)
        : [...prev, slotId]
    );
  };

  // Function to handle checkout
  const handleCheckout = () => {
    if (selectedSlots.length > 0) {
      navigate("/checkout", { state: { selectedSlots, selectedDate } });
    }
  };

  return (
    <div className="px-4 md:px-24 flex-grow minn-h-screen layout-padding">
      <div className="booking-page p-4">
        <h1 className="text-3xl text-center text-green-500 font-bold">
          Book Now
        </h1>
        <p className="text-center font-bold text-lg pb-2">
          Select Date To Check The Available Slots
        </p>

        <div className="flex flex-col md:flex-row justify-center items-center mb-6  ">
          <div className="calendar-container">
            <Calendar onClickDay={handleDayClick} value={selectedDate} />
          </div>
          <div className="ml-0 md:ml-6 mt-4 ">
            <img
              src="https://res.cloudinary.com/dwelabpll/image/upload/v1725890780/1686761825938_abqi7t.jpg"
              alt="Booking illustration"
              className="object-cover max-w-[480px] w-full rounded"
            />
          </div>
        </div>

        {isLoading && <p>Loading available slots...</p>}
        {error && (
          <p>
            Error loading slots:{" "}
            {(error as FetchBaseQueryError)?.data?.message ||
              (error as SerializedError)?.message ||
              "Unknown error"}
          </p>
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
                  onSelect={() => handleSlotSelect(slot._id)}
                  isSelected={selectedSlots.includes(slot._id)}
                />
              ))}
            </div>
          </div>
        ) : (
          <p>No available slots.</p>
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
    </div>
  );
};

export default BookingPage;
