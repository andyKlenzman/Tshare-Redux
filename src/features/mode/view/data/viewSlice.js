import { createSlice } from "@reduxjs/toolkit";
import {initialState} from'./viewInitialState'
import { getAllView } from "./asyncThunks/getAllView";

const viewSlice = createSlice({
  name: "view",
  initialState,
  reducers: {},
  extraReducers: {
    [getAllView.pending]: (state) => {
      state.utils.view.isLoading = true;
    },
    [getAllView.fulfilled]: (state, action) => {
      state.utils.view.isLoading = false;
      state.utils.view.errMsg = "";
      state.viewArray = action.payload;
    },
    [getAllView.rejected]: (state, action) => {
      state.utils.view.isLoading = false;
      state.utils.view.errMsg = action.error
        ? action.error.message
        : "Fetch failed";
    }
  },
});

export const viewReducer = viewSlice.reducer;

