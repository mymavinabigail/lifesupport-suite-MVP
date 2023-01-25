import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: [],
};

export const SecondTop = createSlice({
  name: "SecondTop",
  initialState,
  reducers: {
    addSecondTop: (state, action) => {
      state.value.push(action.payload);
    },

    removeSecondTop: (state, action) => {
      console.log("removeSecondTop called")
      state.value = action.payload;
    },
  },
});

export const { addSecondTop, removeSecondTop } = SecondTop.actions;

export default SecondTop.reducer;
