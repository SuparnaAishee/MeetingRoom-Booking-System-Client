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

// import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// export const availabilityApi = createApi({
//   reducerPath: "availabilityApi",
//   baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3000/api/" }),
//   endpoints: (builder) => ({
//     // Query to get available slots for a specific date and room
//     // eslint-disable-next-line @typescript-eslint/no-explicit-any
//     getAvailableSlots: builder.query<any[], { date: string; roomId: string }>({
//       query: ({ date, roomId }) =>
//         `slots/availability?date=${date}&roomId=${roomId}`,
//     }),

//     // Query to get all slots (available and unavailable)
//     // eslint-disable-next-line @typescript-eslint/no-explicit-any
//     getAllSlots: builder.query<any[], { roomId?: string }>({
//       query: (arg = {}) => ({
//         url: "slots", // Ensure this matches your API endpoint
//         params: arg, // Pass query params (e.g., roomId) if needed
//       }),
//     }),
//   }),
// });

// export const { useGetAvailableSlotsQuery, useGetAllSlotsQuery } =
//   availabilityApi;


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

    // Mutation to delete a slot
    deleteSlot: builder.mutation<void, string>({
      query: (id) => ({
        url: `slots/${id}`,
        method: "DELETE",
      }),
      // // Invalidates cache or refetches the data
      // invalidatesTags: ["Slots"],
    }),

    // Mutation to update a slot
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    updateSlot: builder.mutation<void, { id: string; slot: any }>({
      query: ({ id, slot }) => ({
        url: `slots/${id}`,
        method: "PUT",
        body: slot,
      }),
      // // Invalidates cache or refetches the data
      // invalidatesTags: ["Slots"],
    }),

    // Mutation to add a new slot
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    addSlot: builder.mutation<void, any>({
      query: (newSlot) => ({
        url: "slots",
        method: "POST",
        body: newSlot,
      }),
      // // Invalidates cache or refetches the data
      // invalidatesTags: ["Slots"],
    }),
  }),
});

// Export hooks for the queries and mutations
export const {
  useGetAvailableSlotsQuery,
  useGetAllSlotsQuery,
  useDeleteSlotMutation,
  useUpdateSlotMutation,
  useAddSlotMutation,
} = availabilityApi;
