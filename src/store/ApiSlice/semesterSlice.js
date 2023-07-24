import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { axiosInstance } from "../../api/base";

const initialState = {
  semesters: [],
  singleSemester: {},
};

export const getSemesters = createAsyncThunk(
  "/semesterSlice/getSemesters",
  async (body) => {
    try {
      const response = await axiosInstance.get(`events/get-events`, body);
      return response.data;
    } catch (e) {
      return e.response.data;
    }
  }
);

export const semesterSlice = createSlice({
  name: "semesters",
  initialState: initialState,
  reducers: {
    setSingleSemester: (state, action) => {
      state.singleSemester = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(getSemesters.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getSemesters.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.semesters = action.payload;
      })
      .addCase(getSemesters.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const { setSingleSemester } = semesterSlice.actions;
export default semesterSlice.reducer;
