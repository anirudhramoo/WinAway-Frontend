import { createSlice } from "@reduxjs/toolkit";

export const checkCreatedSlice = createSlice({
  name: "checkCreated",
  initialState: false,
  reducers: {
    getCheckCreated: (state) => {
      return state;
    },
    setCheckCreated: (state, action) => {
      const { payload } = action;
      return payload;
    },
  },
});

export const { getCheckCreated, setCheckCreated } = checkCreatedSlice.actions;

export default checkCreatedSlice.reducer;
