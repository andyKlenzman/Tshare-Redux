import { createAsyncThunk } from "@reduxjs/toolkit";
import { db } from "../../../../firebase/config";
import { doc,  getDoc } from "@firebase/firestore";
/*
Purpose is to update auth state


Notes:

on new user creation (just as expected), it fetches a doc that hasn't been written yet.
These are things I can customize with the admin sdk and node js 





*/
export const authChange = createAsyncThunk(
  "user/authChange",
  async (uid, {rejectWithValue,fulfillWithValue}) => {
    try {

      const userDocRef = doc(db, 'users', `${uid}`)
      const userData = await getDoc(userDocRef);
      return {...userData.data()}
    } catch (err) {
      return rejectWithValue(err.code);
    }
  }
);
