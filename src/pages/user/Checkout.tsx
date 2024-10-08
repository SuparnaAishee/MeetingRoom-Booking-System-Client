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
// import React, { useState } from "react";
// import { useLocation } from "react-router-dom";
// import { useCreateBookingMutation } from "../../redux/booking/bookingApi";
// import { useGetRoomByIdQuery } from "../../redux/features/roomsApi";
// import { useAppSelector } from "../../hooks/hooks";

// const CheckoutPage: React.FC = () => {
//   const location = useLocation();
//   const { roomId, selectedSlotIds, selectedSlotTimes, selectedDate } = location.state || {};


//   const {
//     data: roomResponse,
//     error: roomError,
//     isLoading: roomLoading,
//   } = useGetRoomByIdQuery(roomId, {
//     skip: !roomId,
//   });

//   const userData = useAppSelector((state) => state.auth.user);
//   const [createBooking, { isLoading: bookingLoading, error: bookingError }] = useCreateBookingMutation();

//   const [promoCode, setPromoCode] = useState("");
//   const [discount, setDiscount] = useState(0);
//   const [paymentMethod, setPaymentMethod] = useState("cash");

//   const totalSlots = selectedSlotIds.length;
//   const pricePerSlot = roomResponse?.data?.pricePerSlot || 0;
//   const totalPrice = totalSlots * pricePerSlot;
//   const finalPrice = totalPrice - discount;

//   const handlePromoCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setPromoCode(e.target.value);
//   };

//   const applyPromoCode = () => {
//     if (promoCode === "FIRST10") {
//       setDiscount(totalPrice * 0.1); // 10% discount
//     } else {
//       setDiscount(0);
//       alert("Invalid promo code.");
//     }
//   };

//   const handlePaymentMethodChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setPaymentMethod(e.target.value);
//   };
// const handleCheckout = async () => {
//   console.log("Checkout button clicked");

  
//   console.log("roomId:", roomId);
//   console.log("selectedSlotIds:", selectedSlotIds);
//   console.log("selectedDate:", selectedDate);
//   console.log("userId:", userData?._id);


//   const bookingPayload = {
//     date: selectedDate, 
//     slots: selectedSlotIds, 
//     room: roomId, 
//     user: userData?._id, 
//   };

//   console.log("Booking Payload: ", bookingPayload); 

//   try {
    
//     await createBooking(bookingPayload).unwrap();
//     alert("Booking successful!");
//   } catch (err) {
//     console.error("Booking failed:", err);
//     alert(`Booking error: ${err.message || "Unknown error"}`);
//   }
// };





//   if (roomError) {
//     return <p>Error fetching room details: {roomError.message}</p>;
//   }

//   if (roomLoading) {
//     return <p>Loading room details...</p>;
//   }

//   return (
//     <div className="checkout-page bg-green-50 p-6 rounded-lg shadow-md max-w-5xl mx-auto">
//       <h1 className="text-2xl font-bold text-green-500 text-center">
//         Checkout
//       </h1>

//       {/* User Information Display */}
//       <div className="bg-white p-4 rounded-lg mt-6 ">
//         <h2 className="text-2xl font-semibold text-green-600 text-center">
//           User Information
//         </h2>
//         {userData ? (
//           <>
//             <p className="text-lg pl-6">
//               <strong>Name:</strong> {userData.name}
//             </p>
          
//             <p className="text-lg pl-6">
//               <strong>Email:</strong> {userData.email}
//             </p>
//             <p className="text-lg pl-6">
//               <strong>Phone:</strong> {userData.phone}
//             </p>
//             <p className="text-lg pl-6">
//               <strong>Address:</strong> {userData.address}
//             </p>
//           </>
//         ) : (
//           <p className="text-gray-500 mt-6">User information not available.</p>
//         )}
//       </div>

//       {/* Order Summary Card */}
//       <div className="bg-white shadow rounded-lg p-5 mt-4">
//         <h2 className="text-xl font-semibold text-green-500 text-center">
//           Order Summary
//         </h2>
//         <div className="pl-6 pt-4">
//           <p className="text-black text-lg">
//             <strong>Room Name:</strong> {roomResponse?.data.name || "N/A"}
//           </p>
//           <p className="text-black text-lg">
//             <strong>Price per Slot:</strong> ${pricePerSlot.toFixed(2) || "N/A"}
//           </p>
//           <p className="text-black text-lg">
//             <strong>Date:</strong> {selectedDate}
//           </p>
         
//           <h3 className="text-lg font-semibold text-black mt-2">
//             Total Slots: {totalSlots}
//           </h3>
//           <h3 className="text-lg font-semibold text-black mt-2">
//             Total Price: ${totalPrice.toFixed(2)}
//           </h3>
//           {totalSlots > 0 && (
//             <div>
//               <h4 className="text-lg font-semibold text-black mt-2">
//                 Selected Slots:
//               </h4>
//               <ul className="list-disc pl-6">
//                 {selectedSlotTimes.map((slotTime: string, index: number) => (
//                   <li key={index} className="text-black">
//                     {slotTime}
//                   </li>
//                 ))}
//               </ul>
//             </div>
//           )}
//         </div>
//       </div>

//       {/* Promo Code Card */}
//       <div className="bg-white shadow rounded-lg p-5 mt-4 pl-8">
//         <h3 className="text-lg font-semibold text-green-500">Promo Code:</h3>
//         <div className="flex items-center">
//           <input
//             type="text"
//             className="border border-green-300 rounded p-2 flex-2 mr-2"
//             value={promoCode}
//             onChange={handlePromoCodeChange}
//             placeholder="Promo code"
//           />
//           <button
//             className="bg-green-500 text-white px-4 py-1 rounded hover:bg-green-600"
//             onClick={applyPromoCode}
//           >
//             Apply
//           </button>
//         </div>
//         <h3 className="text-lg font-semibold text-black mt-2">
//           Discount: ${discount.toFixed(2)}
//         </h3>
//         <h3 className="text-lg font-semibold text-black">
//           Final Price: ${finalPrice.toFixed(2)}
//         </h3>
//       </div>

//       {/* Payment Method Card */}
//       <div className="bg-white shadow rounded-lg p-5 mt-4 pl-8">
//         <h3 className="text-lg font-semibold text-green-600">
//           Select Payment Method:
//         </h3>
//         <div className="flex flex-col">
//           <label className="text-black text-lg">
//             <input
//               type="radio"
//               value="cash"
//               checked={paymentMethod === "cash"}
//               onChange={handlePaymentMethodChange}
//               className="mr-2"
//             />
//             Cash on Delivery
//           </label>
       
//           <label className="text-black text-lg">
//             <input
//               type="radio"
//               value="amrpay"
//               checked={paymentMethod === "amrpay"}
//               onChange={handlePaymentMethodChange}
//               className="mr-2"
//             />
//            Online Payment
//           </label>
//         </div>
//       </div>

//       {/* Checkout Button */}
//       <button
      
//         onClick={handleCheckout}
//         disabled={bookingLoading}
//         className="bg-green-500 text-white rounded-lg px-6 py-2 mt-6 hover:bg-green-600"
//       >
//         {bookingLoading ? "Processing..." : "Confirm Booking"}
//       </button>

//       {bookingError && (
//         <p className="text-red-500 mt-4 text-center">{bookingError.message}</p>
//       )}
//     </div>
//   );
// };

// export default CheckoutPage;
import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { useCreateBookingMutation } from "../../redux/booking/bookingApi";
import { useGetRoomByIdQuery } from "../../redux/features/roomsApi";
import { useAppSelector } from "../../hooks/hooks";
import Swal from "sweetalert2"; 
import { Spin } from "antd";

const CheckoutPage: React.FC = () => {
  const location = useLocation();
  const { roomId, selectedSlotIds, selectedSlotTimes, selectedDate } =
    location.state || {};

  // Fetch room details using roomId
  const {
    data: roomResponse,
    error: roomError,
    isLoading: roomLoading,
  } = useGetRoomByIdQuery(roomId, {
    skip: !roomId,
  });

  const userData = useAppSelector((state) => state.auth.user);
  const [createBooking, { isLoading: bookingLoading, error: bookingError }] =
    useCreateBookingMutation();

  const [promoCode, setPromoCode] = useState("");
  const [discount, setDiscount] = useState(0);
  const [paymentMethod, setPaymentMethod] = useState("COD");

  const totalSlots = selectedSlotIds.length;
  const pricePerSlot = roomResponse?.data?.pricePerSlot || 0;
  const totalPrice = totalSlots * pricePerSlot;
  const finalPrice = totalPrice - discount;

  // Handle promo code input
  const handlePromoCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPromoCode(e.target.value);
  };

  // Apply promo code logic
  const applyPromoCode = () => {
    if (promoCode === "FIRST10") {
      setDiscount(totalPrice * 0.1); // 10% discount
    } else {
      setDiscount(0);
      alert("Invalid promo code.");
    }
  };

  // Handle payment method selection
  const handlePaymentMethodChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setPaymentMethod(e.target.value);
  };

  // Handle checkout process
  const handleCheckout = async () => {
    const bookingPayload = {
      date: selectedDate,
      slots: selectedSlotIds,
      room: roomId,
      user: userData?._id,
      paymentMethod,
    };

    try {
      const response = await createBooking(bookingPayload).unwrap();
      console.log("Booking Response:", response);

      // Access payment URL from the response
      const paymentUrl = response?.data?.booking?.paymentSession?.payment_url;

      // Check payment method
      if (paymentMethod === "COD") {
        Swal.fire({
          title: "Booking Successful!",
          text: "Your booking has been confirmed. You will pay cash on delivery.",
          icon: "success",
          confirmButtonText: "OK",
          customClass: {
            title: "text-green-600",
            icon: "text-green-500",
          },
        });
      } else if (paymentMethod === "amrpay" && paymentUrl) {
        // Redirect to payment URL
        window.location.href = paymentUrl;
      } else {
        alert("Payment URL not found.");
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      alert(`Booking error: ${err.message || "Unknown error"}`);
    }
  };

  // Error handling for room details
  // if (roomError) {
  //   return <p>Error fetching room details: {roomError.message}</p>;
  // }

  // if (roomLoading) {
  //   return <p>Loading room details...</p>;
  // }

  /////

  if (roomError) {
  
    const errorMessage =
      "status" in roomError
        ? `Error fetching room details: ${roomError.data}` // For FetchBaseQueryError
        : roomError.message || "An unknown error occurred."; // For SerializedError

    return <p className="text-red-500">{errorMessage}</p>;
  }

  if (roomLoading) {
     
       return (
         <div className="flex justify-center items-center h-screen ">
           <Spin className="dot-spinner" size="large" />
         </div>
       );
  }

  return (
    <div className="checkout-page bg-green-50 p-6 rounded-lg shadow-md max-w-5xl mx-auto">
      <h1 className="text-2xl font-bold text-green-500 text-center">
        Checkout
      </h1>

      {/* User Information Display */}
      <div className="bg-white p-4 rounded-lg mt-6">
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
              value="COD"
              checked={paymentMethod === "COD"}
              onChange={handlePaymentMethodChange}
              className="mr-2"
            />
            Cash on Delivery
          </label>

          <label className="text-black text-lg">
            <input
              type="radio"
              value="amrpay"
              checked={paymentMethod === "amrpay"}
              onChange={handlePaymentMethodChange}
              className="mr-2"
            />
            Online Payment
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

      {/* {bookingError && (
        <p className="text-red-500 mt-4 text-center">{bookingError.message}</p>
      )} */}
      {bookingError && (
        <p className="text-red-500 mt-4 text-center">
          {
            "status" in bookingError
              ? `Booking error: ${JSON.stringify(bookingError.data)}` 
              : bookingError.message || "An unknown error occurred." 
          }
        </p>
      )}
    </div>
  );
};

export default CheckoutPage;
