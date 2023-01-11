import { createAsyncThunk } from "@reduxjs/toolkit";
import { db } from "../../../../firebase/config";
import { doc, collection, getDocs } from "@firebase/firestore";
import { getAuth, createUserWithEmailAndPassword } from "@firebase/auth";
import { runTransaction, writeBatch } from "firebase/firestore";
import { newUserDefaultData } from "../newUserDefaultData";

/**
 * Purpose is to create a new user in the server, including firebase auth, writing default settings, log, and user docs
 */

export const createUser = createAsyncThunk(
  "user/createUser",
  async (values, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { name, email, password } = values;
      const auth = getAuth();

      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      const localData = await runTransaction(db, async (transaction) => {
        const pid = await getDocs(collection(db, "users")).then((snap) => {
          const pid = snap?.size || 0;
          return pid;
        });

        const batch = writeBatch(db);
        const userDocRef = doc(db, "users", `${user.uid}`);
        batch.set(userDocRef, {
          name,
          email,
          pid,
        });

        const settingsDocRef = doc(db, "settings", `${pid}`);
        batch.set(settingsDocRef, {
          ...newUserDefaultData.settings,
        });

        const logDocRef = doc(db, "log", `${pid}`);
        batch.set(logDocRef, {});

        const promptLogSubcollectionRef = doc(
          db,
          "log",
          `${pid}`,
          "promptLog",
          "0"
        );
        batch.set(promptLogSubcollectionRef, {
          ...newUserDefaultData.promptLog,
        });

        await batch.commit();

        return { name, email, pid };
      });

      return localData;
    } catch (err) {
      return rejectWithValue(err.code);
    }
  }
);

// const promptLogSubcollectionRef = doc(
//   db,
//   "log",
//   `${pid}`,
//   "promptLog",
//   "0"
// );
// const loveLogSubcollectionRef = doc(
//   db,
//   "log",
//   `${pid}`,
//   "loveLog",
//   "0"
// );
// const feedbackLogSubcollectionRef = doc(
//   db,
//   "log",
//   `${pid}`,
//   "feedbackLog",
//   "0"
// );
// const billboardLogSubcollectionRef = doc(
//   db,
//   "log",
//   `${pid}`,
//   "billboardLog",
//   "0"
// );

// batch.set(promptLogSubcollectionRef, {});
// batch.set(loveLogSubcollectionRef, {});
// batch.set(feedbackLogSubcollectionRef, {});
// batch.set(billboardLogSubcollectionRef, {});
