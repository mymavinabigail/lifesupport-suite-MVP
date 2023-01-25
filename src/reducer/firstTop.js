import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: [],
};

export const FirstTop = createSlice({
  name: "FirstTop",
  initialState,
  reducers: {
    addFirstTop: (state, action) => {
      state.value.push(action.payload);
    },
    removeFirstTop: (state, action) => {
      console.log("removeFirstTop called")
      state.value = action.payload;
    },
  },
});

export const { addFirstTop, removeFirstTop } = FirstTop.actions;

export default FirstTop.reducer;
