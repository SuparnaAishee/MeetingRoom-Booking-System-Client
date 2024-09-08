// features/filtersSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface FiltersState {
  search: string;
  capacity: [number, number] | undefined;
  priceRange: [number, number];
  sort: string;
}

const initialState: FiltersState = {
  search: "",
  capacity: undefined,
  priceRange: [0, 2000],
  sort: "",
};

const filtersSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    setSearch(state, action: PayloadAction<string>) {
      state.search = action.payload;
    },
    setCapacity(state, action: PayloadAction<[number, number] | undefined>) {
      state.capacity = action.payload;
    },
    setPriceRange(state, action: PayloadAction<[number, number]>) {
      state.priceRange = action.payload;
    },
    setSort(state, action: PayloadAction<string>) {
      state.sort = action.payload;
    },
    clearFilters(state) {
      state.search = "";
      state.capacity = undefined;
      state.priceRange = [0, 2000];
      state.sort = "";
    },
  },
});

export const { setSearch, setCapacity, setPriceRange, setSort, clearFilters } =
  filtersSlice.actions;

export default filtersSlice.reducer;
