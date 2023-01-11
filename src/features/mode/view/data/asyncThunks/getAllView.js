import { createAsyncThunk } from "@reduxjs/toolkit";
import { db } from "../../../../../firebase/config"
import {
  getDoc,
  doc,

} from "@firebase/firestore";

export const getAllView = createAsyncThunk(
  "settings/getAllView",
  async (currentUrlPid) => {
    try {
      const docRef = doc(db, "settings", `${currentUrlPid}`);
      const response = await getDoc(docRef);
      if (response.exists()) {
        console.log("Settings Document data:", response.data());
        const localData = {
            currentUrlPid,

            ...response.data()
        }
        return localData
      } 
    } catch (err) {
      console.log("Error retrieving the document", err);
      return err
    }
  }
);