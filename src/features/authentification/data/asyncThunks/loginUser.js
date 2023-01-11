import { createAsyncThunk } from "@reduxjs/toolkit";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { doc, getDoc } from "@firebase/firestore";
import { db } from "../../../../firebase/config";
/**
 * 
 * Notes 
 * - Another rought async function that can be three lines when I learn node.js
 */
export const loginUser = createAsyncThunk(
  "user/loginUser",
  async (values, {rejectWithValue}) => {
    try {

        const auth = getAuth();
        const { email, password } = values
        console.log("in async thuin", values, email, password)
        const userCredential = await signInWithEmailAndPassword(auth, email, password)
        console.log(userCredential.user.uid)
        const userDocRef = doc(db, 'users', `${userCredential.user.uid}`)
        const userData = await getDoc(userDocRef);
        return userData.data().pid

    } catch (err) {
      console.log("Sign in failed: ", err.message, err.code);
      return rejectWithValue(...err)
    }
  }
);
