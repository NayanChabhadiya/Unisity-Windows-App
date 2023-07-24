import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { axiosInstance } from "../../api/base";

const initialState = {
  projects: [],
  singleProject: {},
};

export const getProjects = createAsyncThunk(
  "/projectSlice/getProjects",
  async (body) => {
    try {
      const response = await axiosInstance.get(`projects/get-projects`, body);
      return response.data;
    } catch (e) {
      return e.response.data;
    }
  }
);

export const projectSlice = createSlice({
  name: "projects",
  initialState: initialState,
  reducers: {
    setSingleProject: (state, action) => {
      state.singleProject = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(getProjects.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getProjects.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.projects = action.payload;
      })
      .addCase(getProjects.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const { setSingleProject} = projectSlice.actions;
export default projectSlice.reducer;
