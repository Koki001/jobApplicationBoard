import { configureStore } from "@reduxjs/toolkit";
import paginationSlice from "./slices/paginationSlice";
import popupSlice from "./slices/popupSlice";
import jobListSlice from "./slices/jobListSlice";
import userSlice from "./slices/userSlice";

export const store = configureStore({
  reducer: {
    pagination: paginationSlice,
    popups: popupSlice,
    jobs: jobListSlice,
    user: userSlice,
  },
});
