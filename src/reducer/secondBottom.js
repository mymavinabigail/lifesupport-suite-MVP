import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: [],
};

export const SecondBottom = createSlice({
  name: "SecondBottom",
  initialState,
  reducers: {
    addSecondBottom: (state, action) => {
      state.value.push(action.payload);
    },
    removeSecondBottom: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { addSecondBottom, removeSecondBottom } = SecondBottom.actions;

export default SecondBottom.reducer;
