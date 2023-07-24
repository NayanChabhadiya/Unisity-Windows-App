import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { axiosInstance } from "../../api/base";

const initialState = {
  materials: [],
  singleMaterial: {},
};

export const getMaterials = createAsyncThunk(
  "/materialSlice/getMaterials",
  async (body) => {
    try {
      const response = await axiosInstance.get(`events/get-events`, body);
      return response.data;
    } catch (e) {
      return e.response.data;
    }
  }
);

export const materialSlice = createSlice({
  name: "materials",
  initialState: initialState,
  reducers: {
    setSingleMaterial: (state, action) => {
      state.singleMaterial = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(getMaterials.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getMaterials.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.materials = action.payload;
      })
      .addCase(getMaterials.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const { setSingleMaterial } = materialSlice.actions;
export default materialSlice.reducer;
