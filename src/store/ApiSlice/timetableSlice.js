import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { axiosInstance } from "../../api/base";

const initialState = {
  timeTables: [],
  singleTimetable: {},
};

export const getTimeTables = createAsyncThunk(
  "/timetableSlice/getTimeTables",
  async (body) => {
    try {
      const response = await axiosInstance.get(`events/get-events`, body);
      return response.data;
    } catch (e) {
      return e.response.data;
    }
  }
);

export const timetableSlice = createSlice({
  name: "timeTables",
  initialState: initialState,
  reducers: {
    setSingleTimetable: (state, action) => {
      state.singleTimetable = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(getTimeTables.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getTimeTables.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.timeTables = action.payload;
      })
      .addCase(getTimeTables.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const { setSingleTimetable } = timetableSlice.actions;
export default timetableSlice.reducer;
