import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  photo: ""
  };

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    USER: (state, action) => {
      state.user = action.payload;
    },
    PHOTO: (state, action) => {
      state.photo = action.payload;
    },
    USER_RESET: () => initialState,
  },
});

export const { USER, PHOTO, USER_RESET } =
  userSlice.actions;

export default userSlice.reducer;