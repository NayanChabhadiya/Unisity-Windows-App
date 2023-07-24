import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  sidebar: true,
};

export const sideBarSlice = createSlice({
  name: "sidebar",
  initialState: initialState,
  reducers: {
    setSideBar: (state, action) => {
      state.sidebar = action.payload;
    },
  },
});

export const { setSideBar } = sideBarSlice.actions;
export default sideBarSlice.reducer;
