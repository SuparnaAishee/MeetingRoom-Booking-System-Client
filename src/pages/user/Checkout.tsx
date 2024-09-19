// import React from "react";
// import { useLocation } from "react-router-dom";
// import { useCreateBookingMutation } from "../../redux/booking/bookingApi"; // Ensure this is the correct import

// const CheckoutPage: React.FC = () => {
//   const location = useLocation();
//   const { roomId, selectedSlots, selectedDate } = location.state || {};

//   const [createBooking, { isLoading, error }] = useCreateBookingMutation();

//   const handleCheckout = async () => {
//     if (roomId && selectedSlots.length > 0 && selectedDate) {
//       const bookingPayload = {
//         roomId,
//         slots: selectedSlots,
//         date: selectedDate.toISOString(), // Convert to string if necessary
//         userId: user.id, // Assuming you have the user ID from context or state
//       };

//       try {
//         const result = await createBooking(bookingPayload).unwrap();
//         console.log("Booking successful:", result);
//         // Redirect to a success page or order summary
//       } catch (err) {
//         console.error("Booking error:", err);
//       }
//     }
//   };

//   return (
//     <div className="checkout-page">
//       <h1>Checkout</h1>
//       {/* Display selected room, date, and slots */}
//       <p>Room ID: {roomId}</p>
//       <p>Date: {selectedDate?.toDateString()}</p>
//       <h2>Selected Slots:</h2>
//       <ul>
//         {selectedSlots.map((slotId) => (
//           <li key={slotId}>Slot ID: {slotId}</li>
//         ))}
//       </ul>
//       <button onClick={handleCheckout} disabled={isLoading}>
//         Confirm Booking
//       </button>
//       {error && <p>Error: {error.message}</p>}
//     </div>
//   );
// };

// export default CheckoutPage;
import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { useCreateBookingMutation } from "../../redux/booking/bookingApi";
import { useGetRoomByIdQuery } from "../../redux/features/roomsApi";
import { useAppSelector } from "../../hooks/hooks";

const CheckoutPage: React.FC = () => {
  const location = useLocation();
  const { roomId, selectedSlotIds, selectedSlotTimes, selectedDate } = location.state || {};

  // Fetch room details
  const {
    data: roomResponse,
    error: roomError,
    isLoading: roomLoading,
  } = useGetRoomByIdQuery(roomId, {
    skip: !roomId,
  });

  const userData = useAppSelector((state) => state.auth.user);
  const [createBooking, { isLoading: bookingLoading, error: bookingError }] = useCreateBookingMutation();

  const [promoCode, setPromoCode] = useState("");
  const [discount, setDiscount] = useState(0);
  const [paymentMethod, setPaymentMethod] = useState("cash");

  const totalSlots = selectedSlotIds.length;
  const pricePerSlot = roomResponse?.data?.pricePerSlot || 0;
  const totalPrice = totalSlots * pricePerSlot;
  const finalPrice = totalPrice - discount;

  const handlePromoCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPromoCode(e.target.value);
  };

  const applyPromoCode = () => {
    if (promoCode === "FIRST10") {
      setDiscount(totalPrice * 0.1); // 10% discount
    } else {
      setDiscount(0);
      alert("Invalid promo code.");
    }
  };

  const handlePaymentMethodChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPaymentMethod(e.target.value);
  };
const handleCheckout = async () => {
  console.log("Checkout button clicked");

  // Log all the fields to ensure they're being captured
  console.log("roomId:", roomId);
  console.log("selectedSlotIds:", selectedSlotIds);
  console.log("selectedDate:", selectedDate);
  console.log("userId:", userData?._id);

  // Prepare booking payload with actual values
  const bookingPayload = {
    date: selectedDate, // No default, just use the actual value
    slots: selectedSlotIds, // No default, actual selected slots
    room: roomId, // Actual roomId
    user: userData?._id, // Actual userId from logged in user
  };

  console.log("Booking Payload: ", bookingPayload); // Log payload before sending

  try {
    // Make the API call to create the booking, even if fields are missing
    await createBooking(bookingPayload).unwrap();
    alert("Booking successful!");
  } catch (err) {
    console.error("Booking failed:", err);
    alert(`Booking error: ${err.message || "Unknown error"}`);
  }
};



  if (roomError) {
    return <p>Error fetching room details: {roomError.message}</p>;
  }

  if (roomLoading) {
    return <p>Loading room details...</p>;
  }

  return (
    <div className="checkout-page bg-green-50 p-6 rounded-lg shadow-md max-w-5xl mx-auto">
      <h1 className="text-2xl font-bold text-green-500 text-center">
        Checkout
      </h1>

      {/* User Information Display */}
      <div className="bg-white p-4 rounded-lg mt-6 ">
        <h2 className="text-2xl font-semibold text-green-600 text-center">
          User Information
        </h2>
        {userData ? (
          <>
            <p className="text-lg pl-6">
              <strong>Name:</strong> {userData.name}
            </p>
          
            <p className="text-lg pl-6">
              <strong>Email:</strong> {userData.email}
            </p>
            <p className="text-lg pl-6">
              <strong>Phone:</strong> {userData.phone}
            </p>
            <p className="text-lg pl-6">
              <strong>Address:</strong> {userData.address}
            </p>
          </>
        ) : (
          <p className="text-gray-500 mt-6">User information not available.</p>
        )}
      </div>

      {/* Order Summary Card */}
      <div className="bg-white shadow rounded-lg p-5 mt-4">
        <h2 className="text-xl font-semibold text-green-500 text-center">
          Order Summary
        </h2>
        <div className="pl-6 pt-4">
          <p className="text-black text-lg">
            <strong>Room Name:</strong> {roomResponse?.data.name || "N/A"}
          </p>
          <p className="text-black text-lg">
            <strong>Price per Slot:</strong> ${pricePerSlot.toFixed(2) || "N/A"}
          </p>
          <p className="text-black text-lg">
            <strong>Date:</strong> {selectedDate}
          </p>
         
          <h3 className="text-lg font-semibold text-black mt-2">
            Total Slots: {totalSlots}
          </h3>
          <h3 className="text-lg font-semibold text-black mt-2">
            Total Price: ${totalPrice.toFixed(2)}
          </h3>
          {totalSlots > 0 && (
            <div>
              <h4 className="text-lg font-semibold text-black mt-2">
                Selected Slots:
              </h4>
              <ul className="list-disc pl-6">
                {selectedSlotTimes.map((slotTime: string, index: number) => (
                  <li key={index} className="text-black">
                    {slotTime}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>

      {/* Promo Code Card */}
      <div className="bg-white shadow rounded-lg p-5 mt-4 pl-8">
        <h3 className="text-lg font-semibold text-green-500">Promo Code:</h3>
        <div className="flex items-center">
          <input
            type="text"
            className="border border-green-300 rounded p-2 flex-2 mr-2"
            value={promoCode}
            onChange={handlePromoCodeChange}
            placeholder="Promo code"
          />
          <button
            className="bg-green-500 text-white px-4 py-1 rounded hover:bg-green-600"
            onClick={applyPromoCode}
          >
            Apply
          </button>
        </div>
        <h3 className="text-lg font-semibold text-black mt-2">
          Discount: ${discount.toFixed(2)}
        </h3>
        <h3 className="text-lg font-semibold text-black">
          Final Price: ${finalPrice.toFixed(2)}
        </h3>
      </div>

      {/* Payment Method Card */}
      <div className="bg-white shadow rounded-lg p-5 mt-4 pl-8">
        <h3 className="text-lg font-semibold text-green-600">
          Select Payment Method:
        </h3>
        <div className="flex flex-col">
          <label className="text-black text-lg">
            <input
              type="radio"
              value="cash"
              checked={paymentMethod === "cash"}
              onChange={handlePaymentMethodChange}
              className="mr-2"
            />
            Cash on Delivery
          </label>
          <label className="text-black text-lg">
            <input
              type="radio"
              value="card"
              checked={paymentMethod === "card"}
              onChange={handlePaymentMethodChange}
              className="mr-2"
            />
            Credit/Debit Card
          </label>
          <label className="text-black text-lg">
            <input
              type="radio"
              value="paypal"
              checked={paymentMethod === "paypal"}
              onChange={handlePaymentMethodChange}
              className="mr-2"
            />
            PayPal
          </label>
        </div>
      </div>

      {/* Checkout Button */}
      <button
      
        onClick={handleCheckout}
        disabled={bookingLoading}
        className="bg-green-500 text-white rounded-lg px-6 py-2 mt-6 hover:bg-green-600"
      >
        {bookingLoading ? "Processing..." : "Confirm Booking"}
      </button>

      {/* Error Message Display */}
      {bookingError && (
        <p className="text-red-500 mt-4 text-center">{bookingError.message}</p>
      )}
    </div>
  );
};

export default CheckoutPage;
