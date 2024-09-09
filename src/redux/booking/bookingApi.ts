// src/redux/booking/bookingApi.ts
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const bookingApi = createApi({
  reducerPath: "bookingApi",
  baseQuery: fetchBaseQuery({ baseUrl: "/api" }), // Adjust base URL as needed
  endpoints: (builder) => ({
    bookSlot: builder.mutation({
      query: (bookingData) => ({
        url: `/slots/book`,
        method: "POST",
        body: bookingData, // Send booking data (date, slots, roomId) to backend
      }),
    }),
  }),
});

export const { useBookSlotMutation } = bookingApi;
