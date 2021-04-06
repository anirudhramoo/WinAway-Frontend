import { createSlice } from "@reduxjs/toolkit";

export const searchSlice = createSlice({
  name: "searchGiveaway",
  initialState: [],
  reducers: {
    getSearch: () => {
      return ["in-progress"];
    },
    setSearch: (state, action) => {
      const { payload } = action;
      return payload;
    },
  },
});

export const { getSearch, setSearch } = searchSlice.actions;

export default searchSlice.reducer;
