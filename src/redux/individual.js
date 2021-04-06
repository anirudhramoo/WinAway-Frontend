import { createSlice } from "@reduxjs/toolkit";

export const individualSlice = createSlice({
  name: "individual",
  initialState: "in-progress",
  reducers: {
    getIndividual: (state) => {
      return "in-progress";
    },
    setIndividual: (state, action) => {
      const { payload } = action;
      return payload;
    },
  },
});

export const { getIndividual, setIndividual } = individualSlice.actions;

export default individualSlice.reducer;
