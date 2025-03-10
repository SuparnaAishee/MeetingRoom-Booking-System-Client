
// import React, { useState } from "react";
// import { useLocation } from "react-router-dom";
// import { useCreateBookingMutation } from "../../redux/booking/bookingApi";
// import { useGetRoomByIdQuery } from "../../redux/features/roomsApi";
// import { useAppSelector } from "../../hooks/hooks";
// import Swal from "sweetalert2"; 
// import { Spin } from "antd";

// const CheckoutPage: React.FC = () => {
//   const location = useLocation();
//   const { roomId, selectedSlotIds, selectedSlotTimes, selectedDate } =
//     location.state || {};

//   // Fetch room details using roomId
//   const {
//     data: roomResponse,
//     error: roomError,
//     isLoading: roomLoading,
//   } = useGetRoomByIdQuery(roomId, {
//     skip: !roomId,
//   });

//   const userData = useAppSelector((state) => state.auth.user);
//   const [createBooking, { isLoading: bookingLoading, error: bookingError }] =
//     useCreateBookingMutation();

//   const [promoCode, setPromoCode] = useState("");
//   const [discount, setDiscount] = useState(0);
//   const [paymentMethod, setPaymentMethod] = useState("COD");

//   const totalSlots = selectedSlotIds.length;
//   const pricePerSlot = roomResponse?.data?.pricePerSlot || 0;
//   const totalPrice = totalSlots * pricePerSlot;
//   const finalPrice = totalPrice - discount;

//   // Handle promo code input
//   const handlePromoCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setPromoCode(e.target.value);
//   };

//   // Apply promo code logic
//   const applyPromoCode = () => {
//     if (promoCode === "FIRST10") {
//       setDiscount(totalPrice * 0.1); // 10% discount
//     } else {
//       setDiscount(0);
//       alert("Invalid promo code.");
//     }
//   };

//   // Handle payment method selection
//   const handlePaymentMethodChange = (
//     e: React.ChangeEvent<HTMLInputElement>
//   ) => {
//     setPaymentMethod(e.target.value);
//   };

//   // Handle checkout process
//   const handleCheckout = async () => {
//     const bookingPayload = {
//       date: selectedDate,
//       slots: selectedSlotIds,
//       room: roomId,
//       user: userData?._id,
//       paymentMethod,
//     };

//     try {
//       const response = await createBooking(bookingPayload).unwrap();
//       console.log("Booking Response:", response);

//       // Access payment URL from the response
//       const paymentUrl = response?.data?.booking?.paymentSession?.payment_url;

//       // Check payment method
//       if (paymentMethod === "COD") {
//         Swal.fire({
//           title: "Booking Successful!",
//           text: "Your booking has been confirmed. You will pay cash on delivery.",
//           icon: "success",
//           confirmButtonText: "OK",
//           customClass: {
//             title: "text-green-600",
//             icon: "text-green-500",
//           },
//         });
//       } else if (paymentMethod === "amrpay" && paymentUrl) {
//         // Redirect to payment URL
//         window.location.href = paymentUrl;
//       } else {
//         alert("Payment URL not found.");
//       }
//       // eslint-disable-next-line @typescript-eslint/no-explicit-any
//     } catch (err: any) {
//       alert(`Booking error: ${err.message || "Unknown error"}`);
//     }
//   };

//   // Error handling for room details
//   // if (roomError) {
//   //   return <p>Error fetching room details: {roomError.message}</p>;
//   // }

//   // if (roomLoading) {
//   //   return <p>Loading room details...</p>;
//   // }

//   /////

//   if (roomError) {
  
//     const errorMessage =
//       "status" in roomError
//         ? `Error fetching room details: ${roomError.data}` // For FetchBaseQueryError
//         : roomError.message || "An unknown error occurred."; // For SerializedError

//     return <p className="text-red-500">{errorMessage}</p>;
//   }

//   if (roomLoading) {
     
//        return (
//          <div className="flex justify-center items-center h-screen ">
//            <Spin className="dot-spinner" size="large" />
//          </div>
//        );
//   }

//   return (
//     <div className="checkout-page bg-green-50 p-6 rounded-lg shadow-md max-w-5xl mx-auto">
//       <h1 className="text-2xl font-bold text-green-500 text-center">
//         Checkout
//       </h1>

//       {/* User Information Display */}
//       <div className="bg-white p-4 rounded-lg mt-6">
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
//               value="COD"
//               checked={paymentMethod === "COD"}
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
//             Online Payment
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

//       {/* {bookingError && (
//         <p className="text-red-500 mt-4 text-center">{bookingError.message}</p>
//       )} */}
//       {bookingError && (
//         <p className="text-red-500 mt-4 text-center">
//           {
//             "status" in bookingError
//               ? `Booking error: ${JSON.stringify(bookingError.data)}` 
//               : bookingError.message || "An unknown error occurred." 
//           }
//         </p>
//       )}
//     </div>
//   );
// };

// export default CheckoutPage;

"use client";

import type React from "react";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import { useCreateBookingMutation } from "../../redux/booking/bookingApi";
import { useGetRoomByIdQuery } from "../../redux/features/roomsApi";
import { useAppSelector } from "../../hooks/hooks";
import Swal from "sweetalert2";
import { Spin, Steps } from "antd";
import {
  CreditCard,
  DollarSign,
  CheckCircle,
  Clock,
  User,
  Home,
  Tag,
  Calendar,
  ShoppingCart,
  AlertCircle,
} from "lucide-react";

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
  const [currentStep, setCurrentStep] = useState(0);
  const [promoCodeError, setPromoCodeError] = useState("");
  const [promoCodeSuccess, setPromoCodeSuccess] = useState("");

  const totalSlots = selectedSlotIds?.length || 0;
  const pricePerSlot = roomResponse?.data?.pricePerSlot || 0;
  const totalPrice = totalSlots * pricePerSlot;
  const finalPrice = totalPrice - discount;

  // Handle promo code input
  const handlePromoCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPromoCode(e.target.value);
    setPromoCodeError("");
    setPromoCodeSuccess("");
  };

  // Apply promo code logic
  const applyPromoCode = () => {
    if (!promoCode) {
      setPromoCodeError("Please enter a promo code");
      return;
    }

    if (promoCode.toUpperCase() === "FIRST10") {
      const discountAmount = totalPrice * 0.1; // 10% discount
      setDiscount(discountAmount);
      setPromoCodeSuccess(
        `Promo code applied! You saved $${discountAmount.toFixed(2)}`
      );
      setPromoCodeError("");
    } else {
      setDiscount(0);
      setPromoCodeError("Invalid promo code");
      setPromoCodeSuccess("");
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
    if (!userData?._id) {
      Swal.fire({
        title: "Error",
        text: "User information is missing. Please log in again.",
        icon: "error",
        confirmButtonText: "OK",
      });
      return;
    }

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
        setCurrentStep(2); // Move to confirmation step
      } else if (paymentMethod === "amrpay" && paymentUrl) {
        // Redirect to payment URL
        window.location.href = paymentUrl;
      } else {
        Swal.fire({
          title: "Error",
          text: "Payment URL not found. Please try again or choose a different payment method.",
          icon: "error",
          confirmButtonText: "OK",
        });
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      Swal.fire({
        title: "Booking Failed",
        text: err.message || "An unknown error occurred",
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  };

  // Error handling for room details
  if (roomError) {
    const errorMessage =
      "status" in roomError
        ? `Error fetching room details: ${roomError.data}` // For FetchBaseQueryError
        : roomError.message || "An unknown error occurred."; // For SerializedError

    return (
      <div className="flex flex-col items-center justify-center h-screen bg-red-50 p-6">
        <AlertCircle className="text-red-500 w-16 h-16 mb-4" />
        <p className="text-red-500 text-xl font-semibold">{errorMessage}</p>
        <button
          onClick={() => window.history.back()}
          className="mt-4 bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-600 transition-colors"
        >
          Go Back
        </button>
      </div>
    );
  }

  if (roomLoading) {
    return (
      <div className="flex justify-center items-center h-screen bg-green-50">
        <div className="text-center">
          <Spin className="dot-spinner" size="large" />
          <p className="mt-4 text-green-600 font-medium">
            Loading room details...
          </p>
        </div>
      </div>
    );
  }

  // Steps for checkout process
  const steps = [
    {
      title: "Review",
      icon: <ShoppingCart className="w-5 h-5" />,
      content: (
        <>
          {/* User Information Display */}
          <div className="bg-white p-6 rounded-lg shadow-md mt-6 transition-all duration-300 hover:shadow-lg">
            <div className="flex items-center mb-4">
              <User className="text-green-500 w-6 h-6 mr-2" />
              <h2 className="text-2xl font-semibold text-green-600">
                User Information
              </h2>
            </div>
            {userData ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pl-8">
                <p className="text-lg">
                  <span className="font-medium text-gray-600">Name:</span>{" "}
                  {userData.name}
                </p>
                <p className="text-lg">
                  <span className="font-medium text-gray-600">Email:</span>{" "}
                  {userData.email}
                </p>
                <p className="text-lg">
                  <span className="font-medium text-gray-600">Phone:</span>{" "}
                  {userData.phone}
                </p>
                <p className="text-lg">
                  <span className="font-medium text-gray-600">Address:</span>{" "}
                  {userData.address}
                </p>
              </div>
            ) : (
              <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mt-2">
                <p className="text-yellow-700">
                  User information not available. Please log in again.
                </p>
              </div>
            )}
          </div>

          {/* Order Summary Card */}
          <div className="bg-white shadow-md rounded-lg p-6 mt-6 transition-all duration-300 hover:shadow-lg">
            <div className="flex items-center mb-4">
              <ShoppingCart className="text-green-500 w-6 h-6 mr-2" />
              <h2 className="text-2xl font-semibold text-green-600">
                Order Summary
              </h2>
            </div>
            <div className="space-y-3 pl-8">
              <div className="flex items-start">
                <Home className="text-green-500 w-5 h-5 mr-2 mt-1" />
                <p className="text-lg">
                  <span className="font-medium text-gray-600">Room Name:</span>{" "}
                  {roomResponse?.data.name || "N/A"}
                </p>
              </div>
              <div className="flex items-start">
                <Tag className="text-green-500 w-5 h-5 mr-2 mt-1" />
                <p className="text-lg">
                  <span className="font-medium text-gray-600">
                    Price per Slot:
                  </span>{" "}
                  ${pricePerSlot.toFixed(2) || "N/A"}
                </p>
              </div>
              <div className="flex items-start">
                <Calendar className="text-green-500 w-5 h-5 mr-2 mt-1" />
                <p className="text-lg">
                  <span className="font-medium text-gray-600">Date:</span>{" "}
                  {selectedDate}
                </p>
              </div>

              <div className="border-t border-gray-200 pt-3 mt-3">
                <h3 className="text-lg font-semibold text-gray-700">
                  Total Slots:{" "}
                  <span className="text-green-600">{totalSlots}</span>
                </h3>
                <h3 className="text-lg font-semibold text-gray-700 mt-1">
                  Total Price:{" "}
                  <span className="text-green-600">
                    ${totalPrice.toFixed(2)}
                  </span>
                </h3>
              </div>

              {totalSlots > 0 && (
                <div className="border-t border-gray-200 pt-3 mt-3">
                  <div className="flex items-start">
                    <Clock className="text-green-500 w-5 h-5 mr-2 mt-1" />
                    <div>
                      <h4 className="text-lg font-semibold text-gray-700">
                        Selected Slots:
                      </h4>
                      <ul className="list-disc pl-6 mt-2 space-y-1">
                        {selectedSlotTimes?.map(
                          (slotTime: string, index: number) => (
                            <li key={index} className="text-gray-700">
                              {slotTime}
                            </li>
                          )
                        )}
                      </ul>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Promo Code Card */}
          <div className="bg-white shadow-md rounded-lg p-6 mt-6 transition-all duration-300 hover:shadow-lg">
            <div className="flex items-center mb-4">
              <Tag className="text-green-500 w-6 h-6 mr-2" />
              <h3 className="text-xl font-semibold text-green-600">
                Promo Code
              </h3>
            </div>
            <div className="pl-8">
              <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                <input
                  type="text"
                  className="border border-green-300 rounded-lg p-2 flex-grow focus:outline-none focus:ring-2 focus:ring-green-300"
                  value={promoCode}
                  onChange={handlePromoCodeChange}
                  placeholder="Enter promo code (try FIRST10)"
                />
                <button
                  className="bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-600 transition-colors"
                  onClick={applyPromoCode}
                >
                  Apply
                </button>
              </div>

              {promoCodeError && (
                <p className="text-red-500 mt-2">{promoCodeError}</p>
              )}

              {promoCodeSuccess && (
                <p className="text-green-600 mt-2 flex items-center">
                  <CheckCircle className="w-4 h-4 mr-1" /> {promoCodeSuccess}
                </p>
              )}

              <div className="mt-4 space-y-2">
                <h3 className="text-lg font-semibold text-gray-700 flex items-center">
                  <span>Discount:</span>
                  <span className="ml-2 text-green-600">
                    ${discount.toFixed(2)}
                  </span>
                </h3>
                <h3 className="text-xl font-bold text-gray-800 flex items-center">
                  <span>Final Price:</span>
                  <span className="ml-2 text-green-600">
                    ${finalPrice.toFixed(2)}
                  </span>
                </h3>
              </div>
            </div>
          </div>
        </>
      ),
    },
    {
      title: "Payment",
      icon: <CreditCard className="w-5 h-5" />,
      content: (
        <div className="bg-white shadow-md rounded-lg p-6 mt-6 transition-all duration-300 hover:shadow-lg">
          <div className="flex items-center mb-4">
            <CreditCard className="text-green-500 w-6 h-6 mr-2" />
            <h3 className="text-2xl font-semibold text-green-600">
              Select Payment Method
            </h3>
          </div>

          <div className="pl-8 space-y-4">
            <div className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-green-50 transition-colors cursor-pointer">
              <input
                type="radio"
                id="cod"
                value="COD"
                checked={paymentMethod === "COD"}
                onChange={handlePaymentMethodChange}
                className="w-5 h-5 text-green-600 focus:ring-green-500"
              />
              <label
                htmlFor="cod"
                className="ml-3 text-lg text-gray-700 flex items-center cursor-pointer"
              >
                <DollarSign className="w-5 h-5 mr-2 text-green-500" />
                Cash on Delivery
              </label>
            </div>

            <div className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-green-50 transition-colors cursor-pointer">
              <input
                type="radio"
                id="amrpay"
                value="amrpay"
                checked={paymentMethod === "amrpay"}
                onChange={handlePaymentMethodChange}
                className="w-5 h-5 text-green-600 focus:ring-green-500"
              />
              <label
                htmlFor="amrpay"
                className="ml-3 text-lg text-gray-700 flex items-center cursor-pointer"
              >
                <CreditCard className="w-5 h-5 mr-2 text-green-500" />
                Online Payment
              </label>
            </div>

            <div className="mt-6 pt-4 border-t border-gray-200">
              <div className="flex justify-between items-center">
                <span className="text-lg font-medium text-gray-700">
                  Total Amount:
                </span>
                <span className="text-xl font-bold text-green-600">
                  ${finalPrice.toFixed(2)}
                </span>
              </div>
            </div>
          </div>
        </div>
      ),
    },
    {
      title: "Confirmation",
      icon: <CheckCircle className="w-5 h-5" />,
      content: (
        <div className="bg-white shadow-md rounded-lg p-6 mt-6 text-center">
          <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-green-600 mb-2">
            Booking Confirmed!
          </h2>
          <p className="text-lg text-gray-700 mb-6">
            Thank you for your booking. Your reservation has been successfully
            processed.
          </p>
          <div className="bg-green-50 p-4 rounded-lg inline-block mx-auto">
            <p className="text-gray-700">
              <span className="font-medium">Room:</span>{" "}
              {roomResponse?.data.name}
            </p>
            <p className="text-gray-700">
              <span className="font-medium">Date:</span> {selectedDate}
            </p>
            <p className="text-gray-700">
              <span className="font-medium">Payment Method:</span>{" "}
              {paymentMethod === "COD" ? "Cash on Delivery" : "Online Payment"}
            </p>
            <p className="text-gray-700">
              <span className="font-medium">Total Amount:</span> $
              {finalPrice.toFixed(2)}
            </p>
          </div>
        </div>
      ),
    },
  ];

  const nextStep = () => {
    setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    setCurrentStep(currentStep - 1);
  };

  return (
    <div className="checkout-page bg-green-50 p-6 min-h-screen">
      <div className="max-w-5xl mx-auto bg-white rounded-xl shadow-lg p-6 mb-6">
        <h1 className="text-3xl font-bold text-green-600 text-center mb-6">
          Complete Your Booking
        </h1>

        <Steps
          current={currentStep}
          items={steps.map((item) => ({
            title: item.title,
            icon: item.icon,
          }))}
          className="mb-8"
        />

        <div className="steps-content">{steps[currentStep].content}</div>

        <div className="steps-action mt-8 flex justify-between">
          {currentStep > 0 && currentStep < 2 && (
            <button
              onClick={prevStep}
              className="bg-gray-100 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-200 transition-colors"
            >
              Back
            </button>
          )}

          {currentStep === 0 && (
            <button
              onClick={nextStep}
              className="ml-auto bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-600 transition-colors"
            >
              Proceed to Payment
            </button>
          )}

          {currentStep === 1 && (
            <button
              onClick={handleCheckout}
              disabled={bookingLoading}
              className="ml-auto bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-600 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center"
            >
              {bookingLoading ? (
                <>
                  <Spin className="mr-2" /> Processing...
                </>
              ) : (
                "Confirm Booking"
              )}
            </button>
          )}

          {currentStep === 2 && (
            <button
              onClick={() => (window.location.href = "/")}
              className="mx-auto bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-600 transition-colors"
            >
              Return to Home
            </button>
          )}
        </div>
      </div>

      {bookingError && (
        <div className="max-w-5xl mx-auto mt-4">
          <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-lg">
            <div className="flex items-center">
              <AlertCircle className="text-red-500 w-5 h-5 mr-2" />
              <p className="text-red-700 font-medium">
                {"status" in bookingError
                  ? `Booking error: ${JSON.stringify(bookingError.data)}`
                  : bookingError.message || "An unknown error occurred."}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CheckoutPage;

