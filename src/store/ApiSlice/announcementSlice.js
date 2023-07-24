import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { axiosInstance } from "../../api/base";

const initialState = {
  announcements: [],
  singleAnnouncement: {},
};

export const getAnnouncements = createAsyncThunk(
  "/announceSlice/getAnnouncements",
  async (body) => {
    try {
      const response = await axiosInstance.get(`events/get-events`, body);
      return response.data;
    } catch (e) {
      return e.response.data;
    }
  }
);

export const announceSlice = createSlice({
  name: "announcements",
  initialState: initialState,
  reducers: {
    setSingleAnnouncement: (state, action) => {
      state.singleAnnouncement = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(getAnnouncements.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getAnnouncements.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.announcements = action.payload;
      })
      .addCase(getAnnouncements.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const { setSingleAnnouncement } = announceSlice.actions;
export default announceSlice.reducer;
