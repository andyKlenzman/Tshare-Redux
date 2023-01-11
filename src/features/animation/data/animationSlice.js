import { createSlice } from "@reduxjs/toolkit";
export const initialState = {
  blob: {
    maxColor: 300,
    minColor: 200,
    rad: 50,
    bgColor: 250,
    bgSat: "100%",
    bgLight: "15%",
  },
};

const animationSlice = createSlice({
  name: "animation",
  initialState,
  reducers: {
    updateBg(state, action) {
      return {
        ...state,
        blob: {
          ...state.blob,
          ...action.payload,
        },
      };
    },
  },
  extraReducers: {},
});
export const { updateBg } = animationSlice.actions;
export const animationReducer = animationSlice.reducer;

export const selectAnimation = (state) => {
  return state.animation.blob;
};
