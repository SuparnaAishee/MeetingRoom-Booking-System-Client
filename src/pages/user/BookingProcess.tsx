// import React, { useState } from "react";
// import { useParams } from "react-router-dom";
// import { useGetAvailableSlotsQuery } from "../../redux/features/slotsApi";

// const SlotCard: React.FC<{ slot: any }> = ({ slot }) => {
//   // Debugging output
//   console.log("Slot Data:", slot);

//   return (
//     <div>
//       <h3>
//         {slot.startTime} - {slot.endTime}
//       </h3>
//       <p>{slot.isBooked ? "Not Available" : "Available"}</p>
//     </div>
//   );
// };

// const BookingPage: React.FC = () => {
//   const { roomId } = useParams<{ roomId: string }>(); // Extract roomId from URL params
//   const [selectedDate, setSelectedDate] = useState<string>("");

//   const { data, error, isLoading } = useGetAvailableSlotsQuery(
//     { date: selectedDate, roomId },
//     { skip: !selectedDate || !roomId } // Skip if no date or roomId
//   );

//   // Extract slots from data
//   const slots = data?.data || [];

//   const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     setSelectedDate(event.target.value);
//   };

//   // Debugging output
//   console.log("Slots Data:", slots);

//   return (
//     <div>
//       <h1>Book Now</h1>
//       <input type="date" value={selectedDate} onChange={handleDateChange} />
//       {isLoading && <p>Loading available slots...</p>}
//       {error && <p>Error loading slots: {error.message}</p>}
//       {Array.isArray(slots) && slots.length > 0 ? (
//         <div>
//           <h2>Available Slots</h2>
//           <div>
//             {slots.map((slot) => (
//               <SlotCard key={slot._id} slot={slot} />
//             ))}
//           </div>
//         </div>
//       ) : (
//         <p>No available slots.</p>
//       )}
//     </div>
//   );
// };

// export default BookingPage;
import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useGetAvailableSlotsQuery } from "../../redux/features/slotsApi";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css"; // Import Calendar styles
import "../../styles/custom.css"; // Import custom styles

const SlotCard: React.FC<{
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  slot: any;
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
  const { roomId } = useParams<{ roomId: string }>(); // Extract roomId from URL params
  const [selectedDate, setSelectedDate] = useState<Date | null>(null); // Date for Calendar
  const [selectedSlots, setSelectedSlots] = useState<string[]>([]); // List of selected slot IDs

  const navigate = useNavigate();

  const { data, error, isLoading } = useGetAvailableSlotsQuery(
    { date: selectedDate?.toISOString(), roomId },
    { skip: !selectedDate || !roomId }
  );

  const slots = data?.data || [];

  const handleDateChange = (date: Date) => {
    setSelectedDate(date);
    setSelectedSlots([]); // Reset slot selection when date changes
  };

  const handleSlotSelect = (slotId: string) => {
    if (selectedSlots.includes(slotId)) {
      setSelectedSlots((prev) => prev.filter((id) => id !== slotId));
    } else {
      setSelectedSlots((prev) => [...prev, slotId]);
    }
  };

  const handleCheckout = () => {
    // Navigate to checkout or trigger checkout process
    if (selectedSlots.length > 0) {
      navigate("/checkout", { state: { selectedSlots, selectedDate } });
    }
  };

  return (
    <div className="pl-24 pr-24 bg-gray-100 ">
      <div className="booking-page p-6 ">
        <h1 className="text-3xl text-center text-green-500 font-bold ">
          Book Now
        </h1>
        <p className="text-center font-bold text-lg pb-2">Select Date To Check The Avaiable Slots</p>

        <div className="flex justify-center items-center mb-6 pt-2">
          <div className="calendar-container ">
            <Calendar onChange={handleDateChange} value={selectedDate} />
          </div>
          <div className="ml-6 mb-4">
            <img
              src="https://res.cloudinary.com/dwelabpll/image/upload/v1725890780/1686761825938_abqi7t.jpg"
              alt="Booking illustration"
              className=" object-cover max-w-[480px]  rounded"
            />
          </div>
        </div>

        {isLoading && <p>Loading available slots...</p>}
        {error && <p>Error loading slots: {error.message}</p>}

        {Array.isArray(slots) && slots.length > 0 ? (
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

        <div className="actions mt-6 flex justify-between">
          <button
            className={`py-2 px-4 rounded ${
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
            className="bg-black text-white py-2 px-4 rounded"
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
