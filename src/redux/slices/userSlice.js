import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  };

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    USER: (state, action) => {
      state.user = action.payload;
    },
    USER_RESET: () => initialState,
  },
});

export const { USER, USER_RESET } =
  userSlice.actions;

export default userSlice.reducer;