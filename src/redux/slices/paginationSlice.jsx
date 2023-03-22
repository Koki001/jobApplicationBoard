import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  default: 1,
  current: 1,
  maxPages: 1,
  sort: "latest"
}

export const paginationSlice = createSlice({
  name: "pagination",
  initialState,
  reducers: {
    pagination: (state, action) => {
      state.current = action.payload;
    },
    PAGINATION_MAX: (state, action) => {
      state.maxPages = action.payload;
    },
    SORT: (state, action) => {
      state.sort = action.payload
    },
    PAGINATION_RESET: () => initialState,
  },
});

export const { pagination, PAGINATION_RESET, PAGINATION_MAX, SORT } = paginationSlice.actions;

export default paginationSlice.reducer
