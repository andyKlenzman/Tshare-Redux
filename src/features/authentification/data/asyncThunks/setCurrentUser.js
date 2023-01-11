import { createAsyncThunk } from "@reduxjs/toolkit";
import { db } from "../../../../firebase/config";
import {
  getDoc,
  setDoc,
  doc,

} from "@firebase/firestore";


export const setCurrentUser = createAsyncThunk(
  "user/setCurrentUser",
//   I need to check for errors each step of the way and undo previous changes if they fail
  async (user) => {
    try {
        // not sure if there will be data here
        const userDocRef = doc(db, "users", `${user.uid}`)
        const userData = getDoc(userDocRef)
        return userData


    } catch (err) {
      console.log("Sign in failed: ", err.message, err.code);
    }
  }
);
