// import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// export type TBooking = {
//   date: string;
//   slots: string[];
//   room: string;
//   user: string;
// };

// type TBookingState = {
//   bookingData: null | TBooking;
// };

// const initialState: TBookingState = {
//   bookingData: null,
// };

// export const bookingSlice = createSlice({
//   name: "booking",
//   initialState,
//   reducers: {
//     setBookingData: (state, action: PayloadAction<TBooking>) => {
//       state.bookingData = action.payload;
//     },
//     clearBookingData: (state) => {
//       state.bookingData = null;
//     },
//   },
// });

// // Action creators are generated for each case reducer function
// export const { setBookingData, clearBookingData } = bookingSlice.actions;

// export default bookingSlice.reducer;
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type TBooking = {
  date: string;
  slots: string[];
  room: string;
  user: string;
};

type TBookingState = {
  bookingData: null | TBooking;
  loading: boolean;
  error: string | null;
};

const initialState: TBookingState = {
  bookingData: null,
  loading: false,
  error: null,
};

export const bookingSlice = createSlice({
  name: "booking",
  initialState,
  reducers: {
    setBookingData: (state, action: PayloadAction<TBooking>) => {
      state.bookingData = action.payload;
      state.loading = false; 
      state.error = null; 
    },
    clearBookingData: (state) => {
      state.bookingData = null;
    },
    setLoading: (state) => {
      state.loading = true;
    },
    setError: (state, action: PayloadAction<string>) => {
      state.loading = false; 
      state.error = action.payload; 
    },
  },
});


export const { setBookingData, clearBookingData, setLoading, setError } =
  bookingSlice.actions;

export default bookingSlice.reducer;
