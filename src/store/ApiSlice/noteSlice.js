import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { axiosInstance } from "../../api/base";

const initialState = {
  notes: [],
  singleNote: {},
};

export const getNotes = createAsyncThunk(
  "/noteSlice/getNotes",
  async (body) => {
    try {
      const response = await axiosInstance.get(`events/get-events`, body);
      return response.data;
    } catch (e) {
      return e.response.data;
    }
  }
);

export const noteSlice = createSlice({
  name: "notes",
  initialState: initialState,
  reducers: {
    setSingleNote: (state, action) => {
      state.singleNote = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(getNotes.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getNotes.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.notes = action.payload;
      })
      .addCase(getNotes.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const { setSingleNote } = noteSlice.actions;
export default noteSlice.reducer;
