import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: null || JSON.parse(localStorage.getItem("userData")),
  reducers: {
    getUser: (state) => {
      const data = JSON.parse(localStorage.getItem("userData"));
      if (!data) return state;
      return data;
    },
    logout: (state) => {
      localStorage.removeItem("userData");
      return null;
    },
  },
});

export const { getUser, logout } = userSlice.actions;

export default userSlice.reducer;
