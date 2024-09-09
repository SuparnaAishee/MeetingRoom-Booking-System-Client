import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const baseApi = createApi({
  reducerPath: "baseApi", // Unique name for the reducer
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3000/api", // Adjust this to your API's base URL
  }),
  tagTypes: ["booking", "slot"], // Define tags used for invalidation and providing
  endpoints: () => ({}),
});
