import { createAsyncThunk } from "@reduxjs/toolkit";
import { db } from "../../../../firebase/config";
import { getDocs, collection } from "@firebase/firestore";


/*
Purpose is to grab a users log subcollections based on user input.


Notes
- I think this should catch errors if there isn't a collection created yet. 
*/

export const getSelectedLogData = createAsyncThunk(
  "log/getSelectedLogData",
  async ({ pid, selectedLog }, {rejectWithValue}) => {
    try {
      const logSubCollectionRef = collection(
        db,
        "log",
        `${pid}`,
        `${selectedLog}`
      );
      const snapshot = await getDocs(logSubCollectionRef);
      console.log(snapshot);
      return {
        logData: snapshot.docs.map((doc) => doc.data()),
        selectedLog: `${selectedLog}`,
      };
    } catch (err) {
      console.log("Error retrieving the log data", err);
      return rejectWithValue(err);
    }
  }
);
