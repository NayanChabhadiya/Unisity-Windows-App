import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { axiosInstance } from "../../api/base";

const initialState = {
  encharges: [],
  singleEncharge: {},
};

export const getEncharges = createAsyncThunk(
  "/enchargeSlice/getEncharges",
  async (body) => {
    try {
      const response = await axiosInstance.get(`events/get-events`, body);
      return response.data;
    } catch (e) {
      return e.response.data;
    }
  }
);

export const enchargeSlice = createSlice({
  name: "encharges",
  initialState: initialState,
  reducers: {
    setSingleEncharge: (state, action) => {
      state.singleEncharge = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(getEncharges.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getEncharges.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.encharges = action.payload;
      })
      .addCase(getEncharges.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const { setSingleEncharge } = enchargeSlice.actions;
export default enchargeSlice.reducer;
