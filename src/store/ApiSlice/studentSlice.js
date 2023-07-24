import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { axiosInstance } from "../../api/base";

const initialState = {
  students: [],
  singleStudent: {},
};

export const getStudents = createAsyncThunk(
  "/studentSlice/getStudents",
  async (body) => {
    try {
      const response = await axiosInstance.get(`events/get-events`, body);
      return response.data;
    } catch (e) {
      return e.response.data;
    }
  }
);

export const createStudent = createAsyncThunk(
  "/studentSlice/createStudent",
  async (body) => {
    try {
      const response = await axiosInstance.post(`Students`, body);
      return response.data;
    } catch (e) {
      return e.response.data;
    }
  }
);

export const deleteStudent = createAsyncThunk(
  "/studentSlice/deleteStudent",
  async (id) => {
    console.log("here", id);
    try {
      const response = await axiosInstance.delete(`Students/${id}`);
      return response.data;
    } catch (e) {
      return e.response.data;
    }
  }
);

export const studentSlice = createSlice({
  name: "students",
  initialState: initialState,
  reducers: {
    setSingleStudent: (state, action) => {
      state.singleStudent = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(getStudents.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getStudents.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.students = action.payload;
      })
      .addCase(getStudents.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const { setSingleStudent } = studentSlice.actions;
export default studentSlice.reducer;
