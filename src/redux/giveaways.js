import { createSlice } from "@reduxjs/toolkit";

export const giveawaySlice = createSlice({
  name: "giveaway",
  initialState: ["in-progress"],
  reducers: {
    getGiveaway: (state) => {
      return ["in-progress"];
    },
    setGiveaway: (state, action) => {
      const { payload } = action;
      return payload;
    },
  },
});

export const { getGiveaway, setGiveaway } = giveawaySlice.actions;

export default giveawaySlice.reducer;
