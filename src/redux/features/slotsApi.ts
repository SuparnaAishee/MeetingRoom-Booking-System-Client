// import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// export const availabilityApi = createApi({
//   reducerPath: "availabilityApi",
//   baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3000/api/" }),
//   endpoints: (builder) => ({
//     // eslint-disable-next-line @typescript-eslint/no-explicit-any
//     getAvailableSlots: builder.query<any[], { date: string; roomId: string }>({
//       query: ({ date, roomId }) =>
//         `slots/availability?date=${date}&roomId=${roomId}`,
//     }),
//   }),
// });

// export const { useGetAvailableSlotsQuery } = availabilityApi;

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const availabilityApi = createApi({
  reducerPath: "availabilityApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3000/api/" }),
  endpoints: (builder) => ({
    // Query to get available slots for a specific date and room
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    getAvailableSlots: builder.query<any[], { date: string; roomId: string }>({
      query: ({ date, roomId }) =>
        `slots/availability?date=${date}&roomId=${roomId}`,
    }),

    // Query to get all slots (available and unavailable)
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    getAllSlots: builder.query<any[], { roomId?: string }>({
      query: (arg = {}) => ({
        url: "slots", // Ensure this matches your API endpoint
        params: arg, // Pass query params (e.g., roomId) if needed
      }),
    }),
  }),
});

export const { useGetAvailableSlotsQuery, useGetAllSlotsQuery } =
  availabilityApi;

