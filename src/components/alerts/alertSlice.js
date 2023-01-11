import { createSlice } from "@reduxjs/toolkit";
import { uuidv4 } from "@firebase/util";
import produce from "immer"
const alertSlice = createSlice({
  name: "alert",
  initialState: { alerts: [] },
  reducers: {
    addAlert(state, action) {
        state.alerts.push({
          ...action.payload,
          id: uuidv4(),
        })
        
      }
    ,
    removeAlert(state, action) {
      return state.alerts.filter((alert) => {
        if (alert.id === action.payload.id) {
          return false;
        } else {
          return true;
        }
      });     
    },
  },
  extraReducers: {},
});

export const alertReducer = alertSlice.reducer;

export const selectAllAlertData = (state) => {
  return state.alert.alerts;
};
export const { addAlert,removeAlert } = alertSlice.actions;
