import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { axiosInstance } from "../../api/base";

const initialState = {
  user: {},
  isLoggedIn: false,
  errorSignIn: false,
  status: "idle",
  error: null,
};

export const signUp = createAsyncThunk(
  "/authentication/signup",
  async (body) => {
    try {
      const response = await axiosInstance.post(
        `userService/user/sign-up`,
        body
      );
      return response.data;
    } catch (e) {
      return e.response.data;
    }
  }
);

export const logIn = createAsyncThunk("/authentication/login", async (body) => {
  try {
    const response = await axiosInstance.post(`Auth/login`, body);
    return response.data;
  } catch (e) {
    return e.response.data;
  }
});

export const verifyEmail = createAsyncThunk(
  "/authentication/verifyEmail",
  async (body) => {
    try {
      const response = await axiosInstance.post(
        `userService/user/send-email`,
        body
      );
      return response.data;
    } catch (e) {
      return e.response.data;
    }
  }
);

export const verifyOtp = createAsyncThunk(
  "/authentication/verifyOtp",
  async (body) => {
    try {
      const response = await axiosInstance.post(
        `userService/user/verify-otp`,
        body
      );
      return response.data;
    } catch (e) {
      return e.response.data;
    }
  }
);

export const forgotPassword = createAsyncThunk(
  "/authentication/forgotPassword",
  async (body) => {
    try {
      const response = await axiosInstance.post(
        `userService/user/forgot-password`,
        body
      );
      return response.data;
    } catch (e) {
      return e.response.data;
    }
  }
);

export const setSessionData = (token, userInfo) => {
  const sessionData = {
    access_token: token,
    userInfo: userInfo,
  };
  // setSession(sessionData);
};

export const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    resetAuth: (state) => {
      state.user = {};
      state.isLoggedIn = false;
    },
    setUser: (state, action) => {
      state.user = action.payload;
      state.isLoggedIn = true;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(logIn.pending, (state) => {
        state.status = "loading";
      })
      .addCase(logIn.fulfilled, (state, action) => {
        let token = action.payload.data.accessToken;
        if (token) {
          state.status = "succeeded";
          state.isLoggedIn = true;
          localStorage.setItem("token", token);
          let userInfo = action.payload.data.user;
          state.user = { ...userInfo, token };
        }
      })
      .addCase(logIn.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const { setUser, resetAuth } = authSlice.actions;
export default authSlice.reducer;
