// // store.ts

// import { configureStore } from "@reduxjs/toolkit";
// import { roomsApi } from "../redux/features/roomsApi";


// export const store = configureStore({
//   reducer: {
//     // Add the roomsApi reducer
//     [roomsApi.reducerPath]: roomsApi.reducer,
//   },
//   middleware: (getDefaultMiddleware) =>
//     getDefaultMiddleware().concat(roomsApi.middleware), // Add roomsApi middleware
// });

// // Export RootState and AppDispatch for usage in components
// export type RootState = ReturnType<typeof store.getState>;
// export type AppDispatch = typeof store.dispatch;
import { configureStore } from "@reduxjs/toolkit";
import { roomsApi } from "../redux/features/roomsApi";

export const store = configureStore({
  reducer: {
    [roomsApi.reducerPath]: roomsApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(roomsApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
