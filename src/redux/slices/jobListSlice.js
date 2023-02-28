import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  details: {},
  list: {},
  active: false
};

export const jobListSlice = createSlice({
  name: "details",
  initialState,
  reducers: {
    JOB_DETAILS: (state, action) => {
      state.details = action.payload;
    },
    JOB_LIST: (state, action) => {
      state.list = action.payload;
    },
    JOB_ACTIVE: (state, action) => {
      state.active = action.payload;
    },
    JOB_RESET: () => initialState,
  },
});

export const { JOB_DETAILS, JOB_LIST, JOB_RESET, JOB_ACTIVE } = jobListSlice.actions;

export default jobListSlice.reducer;
