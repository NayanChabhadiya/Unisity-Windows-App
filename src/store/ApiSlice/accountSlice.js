import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { axiosInstance } from "../../api/base";

const initialState = {
  accounts: [],
  singleAccount: {},
};

export const getAccounts = createAsyncThunk(
  "/accountSlice/getAccounts",
  async () => {
    try {
      const response = await axiosInstance.get(`Users`);
      return response.data;
    } catch (e) {
      return e.response.data;
    }
  }
);
export const getAccountsById = createAsyncThunk(
  "/accountSlice/getAccounts",
  async (id) => {
    try {
      const response = await axiosInstance.get(`Users/${id}`);
      return response.data;
    } catch (e) {
      return e.response.data;
    }
  }
);

export const accountSlice = createSlice({
  name: "accounts",
  initialState: initialState,
  reducers: {
    setSingleAccount: (state, action) => {
      state.singleAccount = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(getAccounts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getAccounts.fulfilled, (state, action) => {
        console.log("accounts", action.payload);
        state.status = "succeeded";
        state.accounts = action.payload;
      })
      .addCase(getAccounts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const { setSingleAccount } = accountSlice.actions;
export default accountSlice.reducer;
