import { configureStore } from "@reduxjs/toolkit";
import paginationSlice from "./slices/paginationSlice";
import popupSlice from "./slices/popupSlice";
import jobListSlice from "./slices/jobListSlice";

export const store = configureStore({
  reducer: {
    pagination: paginationSlice,
    popups: popupSlice,
    jobs: jobListSlice,
  },
});
