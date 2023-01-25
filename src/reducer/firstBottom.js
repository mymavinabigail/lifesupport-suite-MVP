import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: [],
};

export const FirstBottom = createSlice({
  name: "FirstBottom",
  initialState,
  reducers: {
    addFirstBottom: (state, action) => {
      state.value.push(action.payload);
    },
    removeFirstBottom: (state, action) => {
      console.log("removeFirstBottom called")
      state.value = action.payload;
    },
  },
});

export const { addFirstBottom, removeFirstBottom } = FirstBottom.actions;

export default FirstBottom.reducer;
