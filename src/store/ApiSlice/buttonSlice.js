import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  buttonType: "",
};

export const buttonSlice = createSlice({
  name: "buttons",
  initialState: initialState,
  reducers: {
    setButtonType: (state, action) => {
      state.buttonType = action.payload;
    },
  },
  extraReducers(builder) {},
});

export const { setButtonType } = buttonSlice.actions;
export default buttonSlice.reducer;
