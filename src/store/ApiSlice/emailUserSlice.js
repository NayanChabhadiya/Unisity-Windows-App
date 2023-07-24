import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { axiosInstance } from "../../api/base";

const initialState = {
  emailUsers: [],
};

export const getEmailUsers = createAsyncThunk(
  "/emailUserSlice/getEmailUsers",
  async (body) => {
    try {
      const response = await axiosInstance.get(`events/get-events`, body);
      return response.data;
    } catch (e) {
      return e.response.data;
    }
  }
);

export const emailUserSlice = createSlice({
  name: "emailUsers",
  initialState: initialState,
  reducers: {
    // setSingleNote: (state, action) => {
    //   state.singleNote = action.payload;
    // },
  },
  extraReducers(builder) {
    builder
      .addCase(getEmailUsers.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getEmailUsers.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.emailUsers = action.payload;
      })
      .addCase(getEmailUsers.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const {} = emailUserSlice.actions;
export default emailUserSlice.reducer;
