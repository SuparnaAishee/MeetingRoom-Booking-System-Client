
// import { configureStore } from "@reduxjs/toolkit";
// import { roomsApi } from "../redux/features/roomsApi";

// export const store = configureStore({
//   reducer: {
//     [roomsApi.reducerPath]: roomsApi.reducer,
//   },
//   middleware: (getDefaultMiddleware) =>
//     getDefaultMiddleware().concat(roomsApi.middleware),
// });

// export type RootState = ReturnType<typeof store.getState>;
// export type AppDispatch = typeof store.dispatch;


//export default store;

import { configureStore } from "@reduxjs/toolkit";
import filtersReducer from "../redux/features/searchBarSlice";
import { roomsApi } from "../redux/features/roomsApi"; // Assuming you have this

const store = configureStore({
  reducer: {
    filters: filtersReducer,
    [roomsApi.reducerPath]: roomsApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(roomsApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;

