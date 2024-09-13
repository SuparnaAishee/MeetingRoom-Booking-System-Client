// import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// export const baseApi = createApi({
//   reducerPath: "baseApi", // Unique name for the reducer
//   baseQuery: fetchBaseQuery({
//     baseUrl: "http://localhost:3000/api", // Adjust this to your API's base URL
//   }),
//   tagTypes: ["booking", "slot"], // Define tags used for invalidation and providing
//   endpoints: () => ({}),
// });
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "../../hooks/store"; // Adjust based on your structure

export const baseApi = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3000/api", // Adjust your backend API URL
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).auth.token;
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: () => ({}), // Add endpoints in the respective slices
});
