import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  login: false,
  signup: false,
};

export const popupSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    POP_UP_LOG: (state, action) => {
      state.login = action.payload;
    },
    POP_UP_REG: (state, action) => {
      state.signup = action.payload;
    },
    POP_UP_RESET: () => initialState,
  },
});

export const { POP_UP_LOG, POP_UP_REG, LOGIN_RESET } = popupSlice.actions;

export default popupSlice.reducer;
