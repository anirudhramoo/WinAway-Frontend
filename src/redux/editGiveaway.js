import { createSlice } from "@reduxjs/toolkit";

export const editSlice = createSlice({
  name: "editGiveaway",
  initialState: false,
  reducers: {
    setEdit: (state, action) => {
      const { payload } = action;
      return payload;
    },
  },
});

export const { setEdit } = editSlice.actions;

export default editSlice.reducer;
