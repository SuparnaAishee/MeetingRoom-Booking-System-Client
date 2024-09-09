import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const availabilityApi = createApi({
  reducerPath: "availabilityApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3000/api/" }),
  endpoints: (builder) => ({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    getAvailableSlots: builder.query<any[], { date: string; roomId: string }>({
      query: ({ date, roomId }) =>
        `slots/availability?date=${date}&roomId=${roomId}`,
    }),
  }),
});

export const { useGetAvailableSlotsQuery } = availabilityApi;
