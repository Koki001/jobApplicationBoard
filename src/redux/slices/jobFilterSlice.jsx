import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  active: false,
  category: "",
  keyword: "",
  location: "",
  type: "",
  experience: "",
  salary: [30000, 150000],
};

export const jobFilterSlice = createSlice({
  name: "pagination",
  initialState,
  reducers: {
    FILTER_CATEGORY: (state, action) => {
      state.category = action.payload;
    },
    FILTER_KEYWORD: (state, action) => {
      state.keyword = action.payload;
    },
    FILTER_LOCATION: (state, action) => {
      state.location = action.payload;
    },
    FILTER_TYPE: (state, action) => {
      state.type = action.payload;
    },
    FILTER_EXPERIENCE: (state, action) => {
      state.experience = action.payload;
    },
    FILTER_SALARY: (state, action) => {
      state.salary = action.payload;
    },
    FILTER_ACTIVE: (state, action) => {
      state.active = action.payload;
    },
    FILTER_RESET: () => initialState,
  },
});

export const {
  FILTER_CATEGORY,
  FILTER_KEYWORD,
  FILTER_LOCATION,
  FILTER_TYPE,
  FILTER_EXPERIENCE,
  FILTER_SALARY,
  FILTER_ACTIVE,
  FILTER_RESET
} = jobFilterSlice.actions;

export default jobFilterSlice.reducer;
