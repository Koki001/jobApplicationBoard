import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  default: 1,
  current: 1
}

export const paginationSlice = createSlice({
  name: "pagination",
  initialState,
  reducers: {
    pagination: (state, action) => {
      state.current = action.payload;
    },
    PAGINATION_RESET: () => initialState,
  },
});

export const { pagination, PAGINATION_RESET } = paginationSlice.actions;

export default paginationSlice.reducer
