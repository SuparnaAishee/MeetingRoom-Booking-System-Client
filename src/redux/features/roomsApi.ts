// import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// export const roomsApi = createApi({
//   reducerPath: "roomsApi",
//   baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3000/api" }), // Adjust base URL based on your backend
//   endpoints: (builder) => ({
//     // Fetch all rooms with optional arguments for filters or pagination
//     getRooms: builder.query({
//       query: (arg = {}) => ({
//         url: "rooms",
//         params: arg, // Optional query params for pagination, filters, etc.
//       }),
//     }),

//     // Fetch a single room by ID
//     getRoomById: builder.query({
//       query: (id) => `rooms/${id}`, // Fetch room details by roomId
//     }),
//   }),
// });

// // Export hooks for usage in functional components
// export const { useGetRoomsQuery, useGetRoomByIdQuery } = roomsApi;

///
// import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// export const roomsApi = createApi({
//   reducerPath: "roomsApi",
//   baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3000/api" }), // Adjust base URL based on your backend
//   endpoints: (builder) => ({
//     // Fetch all rooms with optional arguments for filters or pagination
//     getRooms: builder.query({
//       query: (arg = {}) => ({
//         url: "rooms",
//         params: arg, // Optional query params for pagination, filters, etc.
//       }),
//     }),

//     // Fetch a single room by ID
//     getRoomById: builder.query({
//       query: (id) => `rooms/${id}`, // Fetch room details by roomId
//     }),

//     // Add a new room
//     addRoom: builder.mutation({
//       query: (newRoom) => ({
//         url: "rooms",
//         method: "POST",
//         body: newRoom,
//       }),
//     }),

//     // Update an existing room by ID
//     updateRoom: builder.mutation({
//       query: ({ id, ...updatedRoom }) => ({
//         url: `rooms/${id}`,
//         method: "PUT", // or PATCH, depending on your backend
//         body: updatedRoom,
//       }),
//     }),

//     // Delete a room by ID
//     deleteRoom: builder.mutation({
//       query: (id) => ({
//         url: `rooms/${id}`,
//         method: "DELETE",
//       }),
//     }),
//   }),
// });

// // Export hooks for usage in functional components
// export const {
//   useGetRoomsQuery,
//   useGetRoomByIdQuery,
//   useAddRoomMutation,
//   useUpdateRoomMutation,
//   useDeleteRoomMutation,
// } = roomsApi;
///
import { baseApi } from "../api/baseApi"; // Adjust the path as necessary

export const roomsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Fetch all rooms with optional arguments for filters or pagination
    getRooms: builder.query({
      query: (arg = {}) => ({
        url: "rooms",
        params: arg, // Optional query params for pagination, filters, etc.
      }),
    }),

    // Fetch a single room by roomId
    getRoomById: builder.query({
      query: (roomId) => `rooms/${roomId}`, // Fetch room details by roomId
    }),

    // Add a new room
    addRoom: builder.mutation({
      query: (newRoom) => ({
        url: "rooms",
        method: "POST",
        body: newRoom,
      }),
    }),

    // Update an existing room by roomId
    updateRoom: builder.mutation({
      query: ({ roomId, ...updatedRoom }) => ({
        url: `rooms/${roomId}`, // Ensure the roomId is correctly passed in the URL
        method: "PUT", // or PATCH, depending on your backend
        body: updatedRoom,
      }),
    }),

    // Delete a room by roomId
    deleteRoom: builder.mutation({
      query: (roomId) => ({
        url: `rooms/${roomId}`,
        method: "DELETE",
      }),
    }),
  }),
  overrideExisting: false,
});

// Export hooks for usage in functional components
export const {
  useGetRoomsQuery,
  useGetRoomByIdQuery,
  useAddRoomMutation,
  useUpdateRoomMutation,
  useDeleteRoomMutation,
} = roomsApi;
