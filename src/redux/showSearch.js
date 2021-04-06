import { createSlice } from "@reduxjs/toolkit";

export const showSlice = createSlice({
  name: "showSearch",
  initialState: false,
  reducers: {
    setShow: (state, action) => {
      const { payload } = action;
      return payload;
    },
  },
});

export const { setShow } = showSlice.actions;

export default showSlice.reducer;
