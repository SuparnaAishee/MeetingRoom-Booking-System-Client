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
/////////
// import { configureStore } from "@reduxjs/toolkit";
// import filtersReducer from "../redux/features/searchBarSlice";
// import { roomsApi } from "../redux/features/roomsApi"; // Assuming you have this
// import { baseApi } from "../redux/api/baseApi";

// const store = configureStore({
//   reducer: {
//     filters: filtersReducer,
//     [roomsApi.reducerPath]: roomsApi.reducer,
//     [baseApi.reducerPath]: baseApi.reducer,
   
//   },
//   middleware: (getDefaultMiddleware) =>
//     getDefaultMiddleware().concat(roomsApi.middleware),
   
// });

// export type RootState = ReturnType<typeof store.getState>;
// export type AppDispatch = typeof store.dispatch;

// export default store;

//////

import { configureStore } from "@reduxjs/toolkit";
import filtersReducer from "../redux/features/searchBarSlice";
import { roomsApi } from "../redux/features/roomsApi";
// import { baseApi } from "../redux/api/baseApi";
import { bookingApi } from "../redux/booking/bookingApi";
import { availabilityApi } from "../redux/features/slotsApi"; // Import availabilityApi
// eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/ban-ts-comment
// @ts-ignore
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import authReducer,{AuthState} from "../redux/auth/authSlice"
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";

import storage from "redux-persist/lib/storage"
const persistConfig={
  key:"auth",
  storage
};

const persistAuthReducer =persistReducer(persistConfig,authReducer);


export const store = configureStore({
  reducer: {
    filters: filtersReducer,
    auth: persistAuthReducer,
    [roomsApi.reducerPath]: roomsApi.reducer,
    // [baseApi.reducerPath]: baseApi.reducer,
    [bookingApi.reducerPath]: bookingApi.reducer,
    [availabilityApi.reducerPath]: availabilityApi.reducer,
  },
  
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    })
      .concat(roomsApi.middleware)
      // .concat(baseApi.middleware)
      .concat(bookingApi.middleware)
      .concat(availabilityApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const persistor =persistStore(store);



