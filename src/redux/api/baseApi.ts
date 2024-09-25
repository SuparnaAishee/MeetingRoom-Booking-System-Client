// import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// export const baseApi = createApi({
//   reducerPath: "baseApi", // Unique name for the reducer
//   baseQuery: fetchBaseQuery({
//     baseUrl: "http://localhost:3000/api", // Adjust this to your API's base URL
//   }),
//   tagTypes: ["booking", "slot"], // Define tags used for invalidation and providing
//   endpoints: () => ({}),
// });
///////
// import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
// import { RootState } from "../../hooks/store"; // Adjust based on your structure

// export const baseApi = createApi({
//   baseQuery: fetchBaseQuery({
//     baseUrl: "http://localhost:3000/api", 
//     prepareHeaders: (headers, { getState }) => {
//       const token = (getState() as RootState).auth.token;
//       if (token) {
//         headers.set("Authorization", `Bearer ${token}`);
//       }
//       return headers;
//     },
//   }),
 
//   endpoints: () => ({}), 
// });
////
// import {
//   BaseQueryApi,
//   createApi,
//   FetchArgs,
//   fetchBaseQuery,
// } from "@reduxjs/toolkit/query/react";
// import { RootState } from "../../hooks/store";
// import { setCredentials, logout } from "../../redux/auth/authSlice";

// const baseQuery = fetchBaseQuery({
//   baseUrl: "http://localhost:3000/api",
//   credentials: "include",
//   prepareHeaders: (headers, { getState }) => {
//     const token = (getState() as RootState).auth.token;
//     if (token) {
//       headers.set("Authorization", `Bearer ${token}`);
//     }
//     return headers;
//   },
// });

// // eslint-disable-next-line @typescript-eslint/ban-types
// const baseQueryWithRefreshToken = async (
//   args: string | FetchArgs,
//   api: BaseQueryApi,
//   // eslint-disable-next-line @typescript-eslint/ban-types
//   extraOptions: {}
// ) => {
//   let result = await baseQuery(args, api, extraOptions);

//   if (result.error?.status === 401) {
//     console.log("Token expired. Attempting to refresh token.");

//     // Attempt to refresh the token
//     const refreshResult = await fetch(
//       "http://localhost:3000/api/auth/refresh",
//       {
//         method: "POST",
//         credentials: "include",
//       }
//     );

//     if (refreshResult.ok) {
//       const data = await refreshResult.json();
//       const newToken = data.token;
//       const newRefreshToken = data.refreshToken;

//       // Get the current user
//       const user = (api.getState() as RootState).auth.user;

//       // Update the credentials in the store
//       api.dispatch(
//         setCredentials({ user, token: newToken, refreshToken: newRefreshToken })
//       );

//       // Retry the original request with the new token
//       result = await baseQuery(
//         {
//           ...args,
//           headers: {
//             ...(args as FetchArgs).headers,
//             Authorization: `Bearer ${newToken}`, // Set the new token
//           },
//         },
//         api,
//         extraOptions
//       );
//     } else {
//       console.log("Failed to refresh token. Logging out.");
//       api.dispatch(logout());
//     }
//   }

//   return result;
// };

// export const baseApi = createApi({
//   reducerPath: "baseApi",
//   baseQuery: baseQueryWithRefreshToken,
//   endpoints: () => ({}),
// });


// import {
//   BaseQueryApi,
//   createApi,
//   FetchArgs,
//   fetchBaseQuery,
// } from "@reduxjs/toolkit/query/react";
// import { RootState } from "../../hooks/store";
// import { setCredentials, logout } from "../../redux/auth/authSlice";

// const baseQuery = fetchBaseQuery({
//   baseUrl: "http://localhost:3000/api",
//   credentials: "include",
//   prepareHeaders: (headers, { getState }) => {
//     const token = (getState() as RootState).auth.token;
//     if (token) {
//       headers.set("Authorization", `Bearer ${token}`);
//     }
//     return headers;
//   },
// });

// // Middleware to handle token refresh
// export const baseQueryWithRefreshToken = async (
//   args: string | FetchArgs,
//   api: BaseQueryApi,
//   // eslint-disable-next-line @typescript-eslint/ban-types
//   extraOptions: {}
// ) => {
//   let result = await baseQuery(args, api, extraOptions);

//   // If the response indicates a token expired (401)
//   if (result.error?.status === 401) {
//     console.log("Token expired. Attempting to refresh token.");

//     const refreshToken = (api.getState() as RootState).auth.refreshToken;

//     const refreshResult = await fetch(
//       "http://localhost:3000/api/auth/refresh",
//       {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ refreshToken }),
//         credentials: "include",
//       }
//     );

//     if (refreshResult.ok) {
//       const data = await refreshResult.json();
//       const newToken = data.token;
//       const newRefreshToken = data.refreshToken;

//       const user = (api.getState() as RootState).auth.user;

//       // Dispatch the action to store the new tokens
//       api.dispatch(
//         setCredentials({ user, token: newToken, refreshToken: newRefreshToken })
//       );

//       // Retry the original request with the new token
//       result = await baseQuery(
//         {
//           ...args,
//           headers: {
//             ...(args as FetchArgs).headers,
//             Authorization: `Bearer ${newToken}`, // Set the new token
//           },
//         },
//         api,
//         extraOptions
//       );
//     } else {
//       console.log("Failed to refresh token. Logging out.");
//       api.dispatch(logout());
//     }
//   }

//   return result;
// };

// // Create the base API with the custom query
// export const baseApi = createApi({
//   reducerPath: "baseApi",
//   baseQuery: baseQueryWithRefreshToken,
//   endpoints: () => ({}),
// });


import {
  BaseQueryApi,
  createApi,
  FetchArgs,
  fetchBaseQuery,
} from "@reduxjs/toolkit/query/react";
import { RootState } from "../../hooks/store";
import { setCredentials, logout } from "../../redux/auth/authSlice";

// Base query definition
const baseQuery = fetchBaseQuery({
  baseUrl: "https://meeting-room-booking-server.vercel.app/api",
  // baseUrl: "http://localhost:3000/api",
  credentials: "include",
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).auth.token;
    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

// Middleware to handle token refresh
export const baseQueryWithRefreshToken = async (
  args: string | FetchArgs,
  api: BaseQueryApi,
  // eslint-disable-next-line @typescript-eslint/ban-types
  extraOptions: {}
) => {
  let result = await baseQuery(args, api, extraOptions);

  // Handle token expiration logic
  if (result.error?.status === 401) {
    const refreshToken = (api.getState() as RootState).auth.refreshToken;

    const refreshResult = await fetch(
      "https://meeting-room-booking-server.vercel.app/api/auth/refresh",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ refreshToken }),
        credentials: "include",
      }
    );

    if (refreshResult.ok) {
      const data = await refreshResult.json();
      const newToken = data.token;
      const user = (api.getState() as RootState).auth.user;

      // Dispatch action to store the new tokens
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      api.dispatch(setCredentials({ user, token: newToken }));

      // Retry original request with the new token
      result = await baseQuery(
        {
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          ...args,
          headers: {
            ...(args as FetchArgs).headers,
            Authorization: `Bearer ${newToken}`, // Use new token
          },
        },
        api,
        extraOptions
      );
    } else {
      // If refresh fails, log out
      api.dispatch(logout());
    }
  }

  return result;
};

// Create the base API with the custom query
export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: baseQueryWithRefreshToken, // Use the token refresh query
  endpoints: () => ({}),
});
