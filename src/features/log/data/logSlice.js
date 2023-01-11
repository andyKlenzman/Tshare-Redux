import { createSlice } from "@reduxjs/toolkit";
import {initialState} from'./logInitialState'
import { getSelectedLogData } from "./asyncThunks/getSelectedLogData";

const logSlice = createSlice({
  name: "log",
  initialState: initialState,
  reducers: {},
  extraReducers: {
    [getSelectedLogData.pending]: (state) => {
      state.utils.allLog.isLoading = true;
    },
    [getSelectedLogData.fulfilled]: (state, action) => {
      state.utils.allLog.isLoading = false;
      state.utils.allLog.errMsg = "";
      state.logArray = {
        ...state.logArray,
        [`${action.payload.selectedLog}`]: {
          ...action.payload.logData
        }
        
    }},
    [getSelectedLogData.rejected]: (state, action) => {
      state.utils.allLog.isLoading = false;
      state.utils.allLog.errMsg = action.error
        ? action.error.message
        : "Fetch failed";
    },

    

  },
});

export const logReducer = logSlice.reducer;

