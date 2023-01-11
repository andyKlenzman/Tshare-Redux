import { createAsyncThunk, isRejected } from "@reduxjs/toolkit";
import { getAuth, signOut } from "firebase/auth";
import { auth } from "../../../../firebase/config";

export const logoutUser = createAsyncThunk(
  "user/logoutUser",
//   I need to check for errors each step of the way and undo previous changes if they fail
  async () => {
    try {
        await signOut(auth)
        
         

    } catch (err) {
      console.log("Logout Failed failed: ", err.message, err.code);
      return isRejected
    }
  }
);
