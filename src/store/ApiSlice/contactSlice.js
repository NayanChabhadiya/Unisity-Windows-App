import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { axiosInstance } from "../../api/base";

const initialState = {
  contacts: [],
  singleContact: {},
};

export const getContacts = createAsyncThunk(
  "/contactSlice/getContacts",
  async (body) => {
    try {
      const response = await axiosInstance.get(`events/get-events`, body);
      return response.data;
    } catch (e) {
      return e.response.data;
    }
  }
);

export const contactSlice = createSlice({
  name: "contacts",
  initialState: initialState,
  reducers: {
    setSingleContact: (state, action) => {
      state.singleContact = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(getContacts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getContacts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.contacts = action.payload;
      })
      .addCase(getContacts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const { setSingleContact } = contactSlice.actions;
export default contactSlice.reducer;
