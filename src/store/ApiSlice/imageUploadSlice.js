import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { axiosInstance } from "../../api/base";

const initialState = {
  images: [],
};

export const uploadImage = createAsyncThunk(
  "/imageUploadSlice/uploadImage",
  async (body) => {
    try {
      const response = await axiosInstance.get(`events/get-events`, body);
      return response.data;
    } catch (e) {
      return e.response.data;
    }
  }
);

export const imageUploadSlice = createSlice({
  name: "images",
  initialState: initialState,
  reducers: {
    // setSingleNote: (state, action) => {
    //   state.singleNote = action.payload;
    // },
  },
  extraReducers(builder) {
    builder
      .addCase(uploadImage.pending, (state) => {
        state.status = "loading";
      })
      .addCase(uploadImage.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.images = action.payload;
      })
      .addCase(uploadImage.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const {} = imageUploadSlice.actions;
export default imageUploadSlice.reducer;
