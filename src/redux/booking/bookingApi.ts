
// import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// export const bookingApi = createApi({
//   reducerPath: "bookingApi",
//   baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3000/api" }),
//   endpoints: (builder) => ({
//     // Mutation to create a booking
//     createBooking: builder.mutation({
//       query: (newBooking) => ({
//         url: "bookings",
//         method: "POST",
//         body: newBooking,
//       }),
//     }),
//     getBookingById: builder.query({
//       query: (id) => `bookings/${id}`,
//     }),
//   }),
// });

// export const { useCreateBookingMutation, useGetBookingByIdQuery } = bookingApi;
// redux/bookingApi.ts
// import { createApi } from "@reduxjs/toolkit/query/react";
// import { baseQueryWithRefreshToken } from "../api/baseApi"; // Adjust path as necessary

// export const bookingApi = createApi({
//   reducerPath: "bookingApi",
//   baseQuery: baseQueryWithRefreshToken,
//   endpoints: (builder) => ({
//     createBooking: builder.mutation({
//       query: (newBooking) => ({
//         url: "bookings",
//         method: "POST",
//         body: newBooking,
//       }),
//     }),
//     getBookingById: builder.query({
//       query: (id) => `bookings/${id}`,
//     }),
//     getMyBookings: builder.query({
//       query: () => `my-bookings`, // Endpoint for fetching "My Bookings"
//     }),
//     getAllBookings: builder.query({
//       query: () => `bookings`, // Endpoint for fetching all bookings
//     }),
//   }),
// });

// // Export hooks for usage in functional components
// export const {
//   useCreateBookingMutation,
//   useGetBookingByIdQuery,
//   useGetMyBookingsQuery,
//   useGetAllBookingsQuery, // Export the hook for getting all bookings
// } = bookingApi;


///correct

// import { createApi } from "@reduxjs/toolkit/query/react";
// import { baseQueryWithRefreshToken } from "../api/baseApi"; // Adjust the import path

// export const bookingApi = createApi({
//   reducerPath: "bookingApi",
//   baseQuery: baseQueryWithRefreshToken,
//   endpoints: (builder) => ({
//     createBooking: builder.mutation({
//       query: (newBooking) => ({
//         url: "bookings",
//         method: "POST",
//         body: newBooking,
//       }),
//     }),
//     getBookingById: builder.query({
//       query: (id) => `bookings/${id}`,
//     }),
//     getMyBookings: builder.query({
//       query: () => `my-bookings`,
//     }),
//     getAllBookings: builder.query({
//       query: () => `bookings`,
//     }),
//     deleteBooking: builder.mutation({
//       query: (id) => ({
//         url: `bookings/${id}`,
//         method: "DELETE",
//       }),
//     }),
//   }),
// });

// // Export hooks for using in components
// export const {
//   useCreateBookingMutation,
//   useGetBookingByIdQuery,
//   useGetMyBookingsQuery,
//   useGetAllBookingsQuery,
//   useDeleteBookingMutation,
// } = bookingApi;

import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithRefreshToken } from "../api/baseApi"; // Adjust the import path

export const bookingApi = createApi({
  reducerPath: "bookingApi",
  baseQuery: baseQueryWithRefreshToken,
  endpoints: (builder) => ({
    createBooking: builder.mutation({
      query: (newBooking) => ({
        url: "bookings",
        method: "POST",
        body: newBooking,
      }),
    }),
    getBookingById: builder.query({
      query: (id) => `bookings/${id}`,
    }),
    getMyBookings: builder.query({
      query: () => `my-bookings`,
    }),
    getAllBookings: builder.query({
      query: () => `bookings`,
    }),
    deleteBooking: builder.mutation({
      query: (id) => ({
        url: `bookings/${id}`,
        method: "DELETE",
      }),
    }),
    updateBooking: builder.mutation({
      query: ({ bookingId, updatedBooking }) => ({
        url: `bookings/${bookingId}`,
        method: "PUT",
        body: updatedBooking,
      }),
    }),
  }),
});

// Export hooks for using in components
export const {
  useCreateBookingMutation,
  useGetBookingByIdQuery,
  useGetMyBookingsQuery,
  useGetAllBookingsQuery,
  useDeleteBookingMutation,
  useUpdateBookingMutation, // Export the update hook
} = bookingApi;
