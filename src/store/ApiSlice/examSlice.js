import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { axiosInstance } from "../../api/base";

const initialState = {
  exams: [],
  singleExam: {},
};

export const getExams = createAsyncThunk(
  "/examSlice/getExams",
  async (body) => {
    try {
      const response = await axiosInstance.get(`events/get-events`, body);
      return response.data;
    } catch (e) {
      return e.response.data;
    }
  }
);

export const examSlice = createSlice({
  name: "exams",
  initialState: initialState,
  reducers: {
    setSingleExam: (state, action) => {
      state.singleExam = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(getExams.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getExams.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.exams = action.payload;
      })
      .addCase(getExams.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const { setSingleExam } = examSlice.actions;
export default examSlice.reducer;
