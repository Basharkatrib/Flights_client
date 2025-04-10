import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  spinnerCount: 0, 
};

const spinnerSlice = createSlice({
  name: "spinner",
  initialState,
  reducers: {
    addSpinner: (state) => {
      state.spinnerCount += 1; 
    },
    removeSpinner: (state) => {
      state.spinnerCount = Math.max(state.spinnerCount - 1, 0); 
    },
  },
});

export const { addSpinner, removeSpinner } = spinnerSlice.actions;

export const selectSpinner = (state) => state.spinner.spinnerCount; 

export default spinnerSlice.reducer;
