import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { axiosInstance } from "../../api/base";

const initialState = {
  events: [],
  singleEvent: {},
};

export const getEvents = createAsyncThunk(
  "/eventSlice/getEvents",
  async (body) => {
    try {
      const response = await axiosInstance.get(`events/get-events`, body);
      return response.data;
    } catch (e) {
      return e.response.data;
    }
  }
);

export const eventSlice = createSlice({
  name: "events",
  initialState: initialState,
  reducers: {
    setSingleEvent: (state, action) => {
      state.singleEvent = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(getEvents.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getEvents.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.events = action.payload.payload.event;
      })
      .addCase(getEvents.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const { setSingleEvent } = eventSlice.actions;
export default eventSlice.reducer;
