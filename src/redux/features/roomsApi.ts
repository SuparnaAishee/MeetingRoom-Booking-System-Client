import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const roomsApi = createApi({
  reducerPath: "roomsApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3000/api" }), // Adjust base URL based on your backend
  endpoints: (builder) => ({
    // Fetch all rooms with optional arguments for filters or pagination
    getRooms: builder.query({
      query: (arg = {}) => ({
        url: "rooms",
        params: arg, // Optional query params for pagination, filters, etc.
      }),
    }),

    // Fetch a single room by ID
    getRoomById: builder.query({
      query: (id) => `rooms/${id}`, // Fetch room details by roomId
    }),
  }),
});

// Export hooks for usage in functional components
export const { useGetRoomsQuery, useGetRoomByIdQuery } = roomsApi;
