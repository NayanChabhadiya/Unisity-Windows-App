import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { axiosInstance } from "../../api/base";

const initialState = {
  faculties: [],
  singleFaculty: {},
};

export const getFaculties = createAsyncThunk(
  "/facultySlice/getFaculties",
  async (body) => {
    try {
      const response = await axiosInstance.get(`events/get-events`, body);
      return response.data;
    } catch (e) {
      return e.response.data;
    }
  }
);

export const createFaculty = createAsyncThunk(
  "/studentSlice/createFaculty",
  async (body) => {
    try {
      const response = await axiosInstance.post(`Faculties`, body);
      return response.data;
    } catch (e) {
      return e.response.data;
    }
  }
);

export const deleteFaculty = createAsyncThunk(
  "/studentSlice/deleteFaculty",
  async (id) => {
    try {
      const response = await axiosInstance.delete(`Faculties/${id}`);
      return response.data;
    } catch (e) {
      return e.response.data;
    }
  }
);

export const facultySlice = createSlice({
  name: "faculties",
  initialState: initialState,
  reducers: {
    setSingleFaculty: (state, action) => {
      state.singleFaculty = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(getFaculties.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getFaculties.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.faculties = action.payload;
      })
      .addCase(getFaculties.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const { setSingleFaculty } = facultySlice.actions;
export default facultySlice.reducer;
