import { configureStore } from "@reduxjs/toolkit";
import paginationSlice from "./slices/paginationSlice";
import popupSlice from "./slices/popupSlice";

export const store = configureStore({
  reducer: {
    pagination: paginationSlice,
    popups: popupSlice,
  },
});
