import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  type: ""
};

export const accTypeSlice = createSlice({
  name: "type",
  initialState,
  reducers: {
    ACC_TYPE: (state, action) => {
      state.type = action.payload;
    },
  },
});

export const { ACC_TYPE } = accTypeSlice.actions;

export default accTypeSlice.reducer;
