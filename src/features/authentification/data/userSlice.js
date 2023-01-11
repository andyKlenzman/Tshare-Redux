import { createSlice } from "@reduxjs/toolkit";
import { initialState } from "./initalState";
import { setCurrentUser } from "./asyncThunks/setCurrentUser";
import { createUser } from "./asyncThunks/createUser";
import { loginUser } from "./asyncThunks/loginUser";
import { logoutUser } from "./asyncThunks/logoutUser";
import { authChange } from "./asyncThunks/authChange";

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {


    clearLocalUser(state, action) {
      return {
        ...state,
        userArray: {
          pid: null,
          name: null,
          email: null
        },
      };
    },
  },
  extraReducers: {
    [setCurrentUser.pending]: (state) => {
      state.utils.authChange.isLoading = true;
    },
    [setCurrentUser.fulfilled]: (state, action) => {
      state.utils.authChange.isLoading = false;
      state.utils.authChange.errMsg = "";
      state.userArray.userArray = action.payload;
    },
    [setCurrentUser.rejected]: (state, action) => {
      state.utils.authChange.isLoading = false;
      state.utils.authChange.errMsg = action.error
        ? action.error.message
        : "Fetch failed";
    },
    [createUser.pending]: (state) => {
      state.utils.authChange.isLoading = true;
    },
    [createUser.fulfilled]: (state, action) => {

      state.utils.authChange.isLoading = false;
      state.utils.authChange.errMsg = "";
      if (action.payload){
        state.userArray = action.payload;
      }
    },
    [createUser.rejected]: (state, action) => {
      state.utils.authChange.isLoading = false;
      state.utils.authChange.errMsg = action.error
        ? action.error.message
        : "Fetch failed";
        
      },
  
      [loginUser.pending]: (state) => {
        state.utils.authChange.isLoading = true;
      },
      [loginUser.fulfilled]: (state, action) => {
        state.utils.authChange.isLoading = false;
        state.utils.authChange.errMsg = "";
        if (action.payload){
          state.userArray = action.payload;
        }
      },
      [loginUser.rejected]: (state, action) => {
        state.utils.authChange.isLoading = false;
        state.utils.authChange.errMsg = action.error
          ? action.error.message
          : "Fetch failed";
      },
  
      [logoutUser.pending]: (state) => {
        state.utils.authChange.isLoading = true;
      },
      [logoutUser.fulfilled]: (state, action) => {
        state.utils.authChange.isLoading = false;
        state.utils.authChange.errMsg = "";
        // if (action.payload){
        //   state.userArray = action.payload;
        // }
      },
      [logoutUser.rejected]: (state, action) => {
        state.utils.authChange.isLoading = false;
        state.utils.authChange.errMsg = action.error
          ? action.error.message
          : "Fetch failed";
      },
      [authChange.pending]: (state) => {
        state.utils.authChange.isLoading = true;
      },
      [authChange.fulfilled]: (state, action) => {
        state.utils.authChange.isLoading = false;
        state.utils.authChange.errMsg = "";
        state.userArray = action.payload;
        
      },
      [authChange.rejected]: (state, action) => {
        state.utils.authChange.isLoading = false;
        state.utils.authChange.errMsg = action.error
          ? action.error.message
          : "Fetch failed";
      },
  },
});

export const userReducer = userSlice.reducer;
export const selectCurrentUser = (state) => {
  return state.user;
};

export const {
  clearLocalUser
} = userSlice.actions;