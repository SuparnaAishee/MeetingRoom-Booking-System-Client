
// import React, { useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import { useGetAvailableSlotsQuery } from "../../redux/features/slotsApi";
// import Calendar from "react-calendar";
// import "react-calendar/dist/Calendar.css";
// import "../../styles/custom.css";
// import { useAppSelector } from "../../hooks/hooks";
// import { authApi } from "../../redux/auth/authApi";
// import moment from "moment";

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
// }> = ({ slot, onSelect, isSelected }) => (
//   <div
//     className={`p-4 border rounded cursor-pointer ${
//       isSelected ? "bg-green-200 text-black" : "bg-white"
//     } ${slot.isBooked ? "opacity-50 cursor-not-allowed" : ""}`}
//     onClick={!slot.isBooked ? onSelect : undefined}
//   >
//     <h3 className="text-lg font-semibold">
//       {slot.startTime} - {slot.endTime}
//     </h3>
//     <p>{slot.isBooked ? "Not Available" : "Available"}</p>
//   </div>
// );

// const BookingPage: React.FC = () => {
//   const { roomId } = useParams<{ roomId: string }>();
//   const [selectedDate, setSelectedDate] = useState<string | null>(null);
//   const [selectedSlots, setSelectedSlots] = useState<
//     { id: string; time: string }[]
//   >([]);
//   const navigate = useNavigate();
//   const user = useAppSelector((state) => state.auth.user);

//   const {
//     data: userData,
//     isLoading: userLoading,
//     error: userError,
//   } = authApi.useGetUserByEmailQuery(user?.email || "", { skip: !user?.email });
//   const { data, error, isLoading } = useGetAvailableSlotsQuery(
//     { date: selectedDate || "", roomId: roomId || "" },
//     { skip: !selectedDate || !roomId }
//   );

//   const slots: Slot[] = (data as unknown as AvailableSlotsResponse)?.data || [];

//   const handleDayClick = (date: Date) => {
//     setSelectedDate(moment(date).format("YYYY-MM-DD"));
//     setSelectedSlots([]); 
//   };

//   const handleSlotSelect = (slot: Slot) => {
//     setSelectedSlots((prev) => {
//       const isSelected = prev.find((s) => s.id === slot._id);
//       return isSelected
//         ? prev.filter((s) => s.id !== slot._id) // Deselect
//         : [
//             ...prev,
//             { id: slot._id, time: `${slot.startTime} - ${slot.endTime}` },
//           ]; // Select
//     });
//   };

//   const handleCheckout = () => {
//     if (selectedSlots.length > 0 && roomId && selectedDate) {
//       const selectedSlotIds = selectedSlots.map((slot) => slot.id);
//       const selectedSlotTimes = selectedSlots.map((slot) => slot.time);
//       navigate("/checkout", {
//         state: {
//           user,
//           roomId,
//           selectedSlotIds,
//           selectedSlotTimes,
//           selectedDate,
//         },
//       });
//     }
//   };

//   return (
//     <div className="px-4 md:px-24 flex-grow min-h-screen layout-padding">
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

//         {/* {isLoading && <p>Loading available slots...</p>}
//         {error && (
//           <p>Error loading slots: {error.message || "Unknown error"}</p>
//         )} */}
//         {isLoading && <p>Loading available slots...</p>}
//         {error && (
//           <>
//             {error && "status" in error && error.status === 404 ? (
//               <p>Error loading slots: Resource not found (404)</p>
//             ) : error && "data" in error ? (
//               // If 'data' exists in FetchBaseQueryError, check if there's a message
//               <p>
//                 Error loading slots:{" "}
//                 {(error.data as { message?: string })?.message ||
//                   "Unknown error"}
//               </p>
//             ) : (
//               // Handle SerializedError or other error types
//               <p>Error loading slots: An unknown error occurred</p>
//             )}
//           </>
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
//                   onSelect={() => handleSlotSelect(slot)}
//                   isSelected={selectedSlots.some((s) => s.id === slot._id)}
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

//       {/* Display Selected Slots */}
//       {selectedSlots.length > 0 && (
//         <div className="selected-slots mt-4">
//           <h3 className="text-lg font-bold">Selected Slots:</h3>
//           <ul>
//             {selectedSlots.map((slot) => (
//               <li key={slot.id}>{slot.time}</li>
//             ))}
//           </ul>
//         </div>
//       )}
//     </div>
//   );
// };

// export default BookingPage;
"use client";

import type React from "react";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { Spin, Tooltip, Badge, Button, notification, Skeleton } from "antd";
import {
  CalendarIcon,
  ClockIcon,
  CheckCircleIcon,
  XCircleIcon,
  UserIcon,
  PhoneIcon,
  MailIcon,
  HomeIcon,
  ArrowLeftIcon,
  ShoppingCartIcon,
  InfoIcon,
  AlertTriangleIcon,
} from "lucide-react";
import moment from "moment";
import { useGetAvailableSlotsQuery } from "../../redux/features/slotsApi";
import { useAppSelector } from "../../hooks/hooks";
import { authApi } from "../../redux/auth/authApi";
import { useGetRoomByIdQuery } from "../../redux/features/roomsApi";

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
  // Parse times for better display
  const startTime = moment(slot.startTime, "HH:mm").format("h:mm A");
  const endTime = moment(slot.endTime, "HH:mm").format("h:mm A");
  const duration = moment
    .duration(
      moment(slot.endTime, "HH:mm").diff(moment(slot.startTime, "HH:mm"))
    )
    .asHours();

  return (
    <Tooltip
      title={
        slot.isBooked ? "This slot is already booked" : `${duration} hour slot`
      }
      placement="top"
    >
      <div
        className={`p-4 border rounded-lg shadow-sm transition-all duration-300 ${
          isSelected
            ? "bg-green-100 border-green-500 transform scale-105"
            : slot.isBooked
            ? "bg-gray-100 border-gray-300 opacity-60"
            : "bg-white hover:border-green-300 hover:shadow"
        } ${slot.isBooked ? "cursor-not-allowed" : "cursor-pointer"}`}
        onClick={!slot.isBooked ? onSelect : undefined}
      >
        <div className="flex justify-between items-center mb-2">
          <h3 className="text-lg font-semibold flex items-center">
            <ClockIcon className="w-4 h-4 mr-2 text-green-500" />
            <span>
              {startTime} - {endTime}
            </span>
          </h3>
          {isSelected ? (
            <CheckCircleIcon className="w-5 h-5 text-green-500" />
          ) : slot.isBooked ? (
            <XCircleIcon className="w-5 h-5 text-red-500" />
          ) : null}
        </div>
        <div className="flex justify-between items-center">
          <span
            className={`text-sm ${
              slot.isBooked ? "text-red-500" : "text-green-500"
            }`}
          >
            {slot.isBooked ? "Not Available" : "Available"}
          </span>
          <Badge
            count={`${duration}h`}
            style={{
              backgroundColor: isSelected ? "#10b981" : "#f5f5f5",
              color: isSelected ? "white" : "#666",
              border: "none",
            }}
          />
        </div>
      </div>
    </Tooltip>
  );
};

const BookingPage: React.FC = () => {
  const { roomId } = useParams<{ roomId: string }>();
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
  const [formattedDate, setFormattedDate] = useState<string>(
    moment(new Date()).format("YYYY-MM-DD")
  );
  const [selectedSlots, setSelectedSlots] = useState<
    { id: string; time: string }[]
  >([]);
  const navigate = useNavigate();
  const user = useAppSelector((state) => state.auth.user);

  // Get room details
  const { data: roomData, isLoading: roomLoading } = useGetRoomByIdQuery(
    roomId || ""
  );

  // Get user details
  const {
    data: userData,
    isLoading: userLoading,
    error: userError,
  } = authApi.useGetUserByEmailQuery(user?.email || "", { skip: !user?.email });

  // Get available slots
  const {
    data: slotsData,
    error: slotsError,
    isLoading: slotsLoading,
    refetch: refetchSlots,
  } = useGetAvailableSlotsQuery(
    { date: formattedDate, roomId: roomId || "" },
    { skip: !formattedDate || !roomId }
  );

  const slots: Slot[] =
    (slotsData as unknown as AvailableSlotsResponse)?.data || [];

  // Update formatted date when selected date changes
  useEffect(() => {
    if (selectedDate) {
      setFormattedDate(moment(selectedDate).format("YYYY-MM-DD"));
    }
  }, [selectedDate]);

  const handleDayClick = (date: Date) => {
    setSelectedDate(date);
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
    if (selectedSlots.length > 0 && roomId && formattedDate) {
      const selectedSlotIds = selectedSlots.map((slot) => slot.id);
      const selectedSlotTimes = selectedSlots.map((slot) => slot.time);

      // Show success notification
      notification.success({
        message: "Proceeding to checkout",
        description: `You've selected ${
          selectedSlots.length
        } slot(s) for ${moment(formattedDate).format("MMM DD, YYYY")}`,
        placement: "topRight",
      });

      // Navigate directly to checkout without showing modal
      navigate("/checkout", {
        state: {
          user,
          roomId,
          selectedSlotIds,
          selectedSlotTimes,
          selectedDate: formattedDate,
        },
      });
    } else {
      notification.warning({
        message: "No slots selected",
        description:
          "Please select at least one time slot to proceed to checkout.",
        placement: "topRight",
      });
    }
  };

  // Function to determine if a date should be disabled
  const tileDisabled = ({ date }: { date: Date }) => {
    // Disable past dates
    return date < new Date(new Date().setHours(0, 0, 0, 0));
  };

  // Function to add custom class to dates
  const tileClassName = ({ date }: { date: Date }) => {
    // Highlight today and selected date
    if (
      selectedDate &&
      moment(date).format("YYYY-MM-DD") ===
        moment(selectedDate).format("YYYY-MM-DD")
    ) {
      return "selected-date";
    }
    return null;
  };

  return (
    <div className="px-4 md:px-8 lg:px-12 py-6 min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto bg-gray-100 rounded-xl shadow-sm p-6">
        {/* Header with room info */}
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-green-600 mb-2">
            Book Your Slot
          </h1>
          {roomLoading ? (
            <Skeleton.Input active style={{ width: 300 }} />
          ) : (
            <p className="text-lg text-gray-600">
              {roomData?.data?.name || "Select a date to view available slots"}
            </p>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left column - Calendar and Room Image */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg overflow-hidden shadow-sm border border-gray-200 mb-6">
              <div className="p-4 border-b border-gray-200 bg-green-50">
                <h2 className="text-xl font-semibold text-green-700 flex items-center">
                  <CalendarIcon className="w-5 h-5 mr-2" />
                  Select Date
                </h2>
              </div>
              <div className="p-4">
                <Calendar
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                //@ts-ignore
                  onChange={handleDayClick}
                  value={selectedDate}
                  tileDisabled={tileDisabled}
                  tileClassName={tileClassName}
                  className="custom-calendar"
                  next2Label={null}
                  prev2Label={null}
                />
                {selectedDate && (
                  <div className="mt-4 p-3 bg-green-50 rounded-lg text-center">
                    <p className="text-green-700 font-medium">
                      Selected:{" "}
                      {moment(selectedDate).format("dddd, MMMM D, YYYY")}
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Room Image */}
            <div className="bg-white rounded-lg overflow-hidden shadow-sm border border-gray-200">
              <div className="p-4 border-b border-gray-200 bg-green-50">
                <h2 className="text-xl font-semibold text-green-700">
                  Room Preview
                </h2>
              </div>
              <div className="p-4">
                {roomLoading ? (
                  <Skeleton.Image
                    active
                    style={{ width: "100%", height: 200 }}
                  />
                ) : (
                  <img
                    src={
                      roomData?.data?.image?.[0] ||
                      "https://res.cloudinary.com/dwelabpll/image/upload/v1725890780/1686761825938_abqi7t.jpg" ||
                      "/placeholder.svg"
                    }
                    alt="Room preview"
                    className="w-full h-64 object-cover rounded-lg"
                  />
                )}
                {roomData?.data && (
                  <div className="mt-4">
                    <p className="font-medium text-gray-700">
                      {roomData.data.name}
                    </p>
                    <p className="text-green-600 font-bold">
                      ${roomData.data.pricePerSlot} per slot
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right column - Available Slots and User Info */}
          <div className="lg:col-span-2">
            {/* Available Slots */}
            <div className="bg-white rounded-lg overflow-hidden shadow-sm border border-gray-200 mb-6">
              <div className="p-4 border-b border-gray-200 bg-green-50">
                <h2 className="text-xl font-semibold text-green-700 flex items-center">
                  <ClockIcon className="w-5 h-5 mr-2" />
                  Available Slots
                </h2>
              </div>
              <div className="p-4">
                {slotsLoading ? (
                  <div className="flex justify-center items-center py-12">
                    <Spin size="large" />
                    <span className="ml-3 text-gray-500">
                      Loading available slots...
                    </span>
                  </div>
                ) : slotsError ? (
                  <div className="text-center py-8 text-red-500">
                    <AlertTriangleIcon className="w-12 h-12 mx-auto mb-2" />
                    <p>Error loading slots. Please try again.</p>
                    <Button
                      type="primary"
                      onClick={() => refetchSlots()}
                      className="mt-4 bg-green-500 hover:bg-green-600"
                    >
                      Retry
                    </Button>
                  </div>
                ) : slots.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {slots.map((slot) => (
                      <SlotCard
                        key={slot._id}
                        slot={slot}
                        onSelect={() => handleSlotSelect(slot)}
                        isSelected={selectedSlots.some(
                          (s) => s.id === slot._id
                        )}
                      />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12 bg-gray-50 rounded-lg">
                    <InfoIcon className="w-12 h-12 mx-auto mb-2 text-gray-400" />
                    <p className="text-gray-500">
                      No available slots for this date.
                    </p>
                    <p className="text-sm text-gray-400 mt-2">
                      Try selecting a different date.
                    </p>
                  </div>
                )}

                {/* Selected Slots Summary */}
                {selectedSlots.length > 0 && (
                  <div className="mt-6 p-4 bg-green-50 rounded-lg">
                    <h3 className="text-lg font-semibold text-green-700 mb-2 flex items-center">
                      <CheckCircleIcon className="w-5 h-5 mr-2" />
                      Selected Slots ({selectedSlots.length})
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      {selectedSlots.map((slot) => (
                        <div
                          key={slot.id}
                          className="flex items-center bg-white p-2 rounded border border-green-200"
                        >
                          <ClockIcon className="w-4 h-4 text-green-500 mr-2" />
                          <span>
                            {moment(slot.time.split(" - ")[0], "HH:mm").format(
                              "h:mm A"
                            )}{" "}
                            -{" "}
                            {moment(slot.time.split(" - ")[1], "HH:mm").format(
                              "h:mm A"
                            )}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* User Information */}
            <div className="bg-white rounded-lg overflow-hidden shadow-sm border border-gray-200">
              <div className="p-4 border-b border-gray-200 bg-green-50">
                <h2 className="text-xl font-semibold text-green-700 flex items-center">
                  <UserIcon className="w-5 h-5 mr-2" />
                  Your Information
                </h2>
              </div>
              <div className="p-4">
                {userLoading ? (
                  <div className="space-y-4">
                    <Skeleton active paragraph={{ rows: 3 }} />
                  </div>
                ) : userError ? (
                  <div className="text-center py-6 text-red-500">
                    <AlertTriangleIcon className="w-10 h-10 mx-auto mb-2" />
                    <p>Error fetching user information.</p>
                    <p className="text-sm mt-2">
                      Please try refreshing the page.
                    </p>
                  </div>
                ) : userData?.data ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex items-start">
                      <UserIcon className="w-5 h-5 text-green-500 mr-3 mt-1" />
                      <div>
                        <p className="text-sm text-gray-500">Name</p>
                        <p className="font-medium">{userData.data.name}</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <MailIcon className="w-5 h-5 text-green-500 mr-3 mt-1" />
                      <div>
                        <p className="text-sm text-gray-500">Email</p>
                        <p className="font-medium">{userData.data.email}</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <PhoneIcon className="w-5 h-5 text-green-500 mr-3 mt-1" />
                      <div>
                        <p className="text-sm text-gray-500">Phone</p>
                        <p className="font-medium">
                          {userData.data.phone || "Not provided"}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <HomeIcon className="w-5 h-5 text-green-500 mr-3 mt-1" />
                      <div>
                        <p className="text-sm text-gray-500">Address</p>
                        <p className="font-medium">
                          {userData.data.address || "Not provided"}
                        </p>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-6 text-gray-500">
                    <UserIcon className="w-10 h-10 mx-auto mb-2 text-gray-300" />
                    <p>User information not available.</p>
                    <p className="text-sm mt-2">Please log in to continue.</p>
                  </div>
                )}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="mt-6 flex flex-col sm:flex-row gap-4">
              <Button
                type="primary"
                size="large"
                className={`flex items-center justify-center ${
                  selectedSlots.length > 0
                    ? "bg-green-500 hover:bg-green-600"
                    : "bg-gray-300 hover:bg-gray-300 cursor-not-allowed"
                }`}
                onClick={handleCheckout}
                disabled={selectedSlots.length === 0}
                icon={<ShoppingCartIcon className="w-5 h-5 mr-2" />}
                style={{ flex: 1 }}
              >
                Proceed to Checkout
              </Button>
              <Button
                size="large"
                onClick={() => navigate(-1)}
                className="flex items-center justify-center"
                icon={<ArrowLeftIcon className="w-5 h-5 mr-2" />}
                style={{ flex: 1 }}
              >
                Back to Room Details
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingPage;

