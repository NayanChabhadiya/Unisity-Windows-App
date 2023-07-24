import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { axiosInstance } from "../../api/base";

const initialState = {
  orgs: [],
  singleOrg: {},
};

export const getOrganizations = createAsyncThunk(
  "/orgSlice/getOrganizations",
  async (body) => {
    try {
      const response = await axiosInstance.get(`Organizations`, body);
      return response.data;
    } catch (e) {
      return e.response.data;
    }
  }
);

export const createOrg = createAsyncThunk(
  "/orgSlice/createOrg",
  async (body) => {
    try {
      const response = await axiosInstance.post(`Organizations`, body);
      return response.data;
    } catch (e) {
      return e.response.data;
    }
  }
);

export const deleteOrg = createAsyncThunk("/orgSlice/deleteOrg", async (id) => {
  try {
    const response = await axiosInstance.delete(`Organizations/${id}`);
    return response.data;
  } catch (e) {
    return e.response.data;
  }
});

export const orgSlice = createSlice({
  name: "orgs",
  initialState: initialState,
  reducers: {
    setSingleOrg: (state, action) => {
      state.singleOrg = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(getOrganizations.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getOrganizations.fulfilled, (state, action) => {
        console.log("orgs", action.payload);
        state.status = "succeeded";
        state.orgs = action.payload;
      })
      .addCase(getOrganizations.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const { setSingleOrg } = orgSlice.actions;
export default orgSlice.reducer;
