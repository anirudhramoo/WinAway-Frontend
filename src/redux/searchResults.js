import { createSlice } from "@reduxjs/toolkit";

export const resultsSlice = createSlice({
  name: "resultsSearch",
  initialState: false,
  reducers: {
    setSearchResults: (state, action) => {
      const { payload } = action;
      return payload;
    },
  },
});

export const { setSearchResults } = resultsSlice.actions;

export default resultsSlice.reducer;
