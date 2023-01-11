import { createAsyncThunk } from "@reduxjs/toolkit";
import { db } from "../../../../firebase/config";
import { getDoc, setDoc, doc, updateDoc, serverTimestamp, addDoc, collection } from "@firebase/firestore";
import { runTransaction, writeBatch } from "firebase/firestore";

/**
 * The purpose of this file is to store all of the functions that handle side effects in redux
 *
 * Reflections:
 * - Put each function in each country
 *
 */

export const fetchSettings = createAsyncThunk(
  "settings/fetchSettings",
  async ( pid , { rejectWithValue }) => {
    try {
      console.log("PID param for fetchSettings", pid);
      const docRef = doc(db, "settings", `${pid}`);
      const response = await getDoc(docRef);
      console.log("response from fetchSettings", response.data());
      if (response.exists()) {
        console.log("Settings Document data:", response.data());
        return response.data();
      }
      if (response.data() === undefined) {
        return rejectWithValue(response.data());
      }
    } catch (err) {
      console.log("Error retrieving the document", err);
      return rejectWithValue(err);
    }
  }
);

/*
Purpose is to get the user their selected prompt and update the local state

Reflections: 
- different pattern than createPrompt, could I make them more consistent to improve readability?
- Another Async that could be greatly simplified with node.js

*/

export const selectPrompt = createAsyncThunk(
  "settings/selectPrompt",
  async (values) => {
    try {
      const promptLogDoc = doc(
        db,
        "log",
        `${values.pid}`,
        "promptLog",
        `${values.promptDetails.currentPromptId}`
      );
      const promptLogData = await getDoc(promptLogDoc);
      const data = promptLogData.data();

      const promptSettingsDoc = doc(db, "settings", `${values.pid}`);
      await updateDoc(promptSettingsDoc, {
        promptModeSettings: {
          promptDetails: {
            ...data,
            currentPromptId: values.promptDetails.currentPromptId,
          },
          allPrompts: values.allPrompts,
        },
      });

      const localStateData = {
        ...data,
        currentPromptId: values.promptDetails.currentPromptId,
      };
      return localStateData;
    } catch (err) {
      console.log("Error retrieving the document", err);
    }
  }
);

/*Purpose is to create a new prompt to server and pass the action to update local state

Note: newId is the length of the allResponses array. 
*/
export const createPrompt = createAsyncThunk(
  "settings/createPrompt",
  async (values, {rejectWithValue}) => {
    try {
      const newPromptLogDoc = doc(
        db,
        "log",
        `${values.pid}`,
        "promptLog",
        `${values.newId}`
      );

      await setDoc(newPromptLogDoc, {
        customPrompt: values.promptDetails.customPrompt,
        promptTitle: values.promptDetails.promptTitle,
        promptType: values.promptDetails.promptType,
        responses: [],
      });

      const promptSettings = doc(db, "settings", `${values.pid}`);

      const promptDetails = {
        ...values.promptDetails,
        responses: [],
        currentPromptId: `${values.newId}`,
      };

      await updateDoc(promptSettings, {
        promptModeSettings: {
          promptDetails: { ...promptDetails },
          allPrompts: [...values.allPrompts, values.promptDetails.promptTitle],
        },
      });

      const localStateData = {
        promptDetails,
        allPrompts: [...values.allPrompts, values.promptDetails.promptTitle],
      };
      return localStateData;
    } catch (err) {
      console.log("Error retrieving the document", err);
      return rejectWithValue(err)
    }
  }
);

//🔥
export const updateBillboard = createAsyncThunk(
  "settings/updateBillboard",
  async (values) => {
    const { pid, billboardText } = values;
    const billboardSettings = doc(db, "settings", `${pid}`);
    try {
      console.log(pid, billboardText);
      const response = await updateDoc(billboardSettings, {
        billboardModeSettings: {
          billboardText: billboardText,
        },
      });
      return billboardText;
    } catch (err) {
      console.log("Error retrieving the document", err);
      return err;
    }
  }
);

export const updateLove = createAsyncThunk(
  "settings/updateLove",
  async (values) => {
    try {
      const { pid, ...data } = values;
      const loveSettings = doc(db, "settings", `${pid}`);
      const response = await updateDoc(loveSettings, {
        loveModeSettings: {
          ...data,
        },
      });

      return data;
    } catch (err) {
      console.log("Error retrieving the document", err);
      return err;
    }
  }
);

export const updateFeedback = createAsyncThunk(
  "settings/updateFeedback",
  async (values) => {
    try {
      const { pid, ...data } = values;
      const feedbackSettings = doc(db, "settings", `${pid}`);
      const response = await updateDoc(feedbackSettings, {
        feedbackModeSettings: {
          ...data,
        },
      });
      return data;
    } catch (err) {
      console.log("Error retrieving the document", err);
      return err;
    }
  }
);

export const updateMode = createAsyncThunk(
  "settings/updateMode",
  async (values) => {
    try {
      const { pid, modeId } = values;
      const settingsDocRef = doc(db, "settings", `${pid}`);
      await updateDoc(settingsDocRef, {
        modeSelection: `${modeId}`,
      });
      return modeId;
    } catch (err) {
      console.log("Error updated modeSelection", err);
      return err.code;
    }
  }
);

/*
Purpose: handle viewer prompt inputs.


Notes
- THis one makes writes to logs and settings. Right now, I think this is the only one that does it right now,
but in the future this could be come a more common pattern. Write the 


*/
export const addPromptInput = createAsyncThunk(
  "settings/addPromptInput",
  async (values, {rejectWithValue}) => {
    try {
      console.log("addinput values ", values);
      const { pid, promptId, responses, name, text, isAnonymous } = values;
      const localData = await runTransaction(db, async (transaction) => {
        const batch = writeBatch(db);
        const promptSettingsDocRef = doc(db, "settings", `${pid}`);
        batch.update(promptSettingsDocRef, {
          "promptModeSettings.promptDetails.responses": [...responses, { name, text }]
        });
        const promptLogDocRef = doc(
          db,
          "log",
          `${pid}`,
          "promptLog",
          `${promptId}`
        );
        batch.update(promptLogDocRef, {
            "responses": [...responses, { name, text }],
          },
        );

        await batch.commit();
        return [...responses, { name, text }];
      });
      return localData;
    } catch (err) {
      return rejectWithValue(err)
    }
  }
);



export const addLoveInput = createAsyncThunk(
  "settings/addLoveInput",
  async (values, {rejectWithValue}) => {
    const { pid, name, response, contactInfo } = values;
    try {
      console.log("addLoveInput values ", values);
        const loveLogCollectionRef = collection(
          db,
          "log",
          `${pid}`,
          "loveLog",
        
        );
        addDoc(loveLogCollectionRef,{ 
          name,
          response,
          contactInfo,
        }         
        );
      return values;
    } catch (err) {
      console.log("Error updated modeSelection", err);
      return rejectWithValue(err)
    }
  }
);



export const addFeedbackInput = createAsyncThunk(
  "settings/addFeedbackInput",
  async (values, {rejectWithValue}) => {
    const { pid, contactInfo, ratingResponse, promptResponse, ratingQuestion, promptQuestion } = values;
    try {
      console.log("addLoveInput values ", values);
        const feedbackLogCollectionRef = collection(
          db,
          "log",
          `${pid}`,
          "feedbackLog",
        
        );
        addDoc(feedbackLogCollectionRef,{ 
          ratingResponse, promptResponse, ratingQuestion, promptQuestion, contactInfo
        }         
        );
      return values;
    } catch (err) {
      console.log("Error updated modeSelection", err);
      return rejectWithValue(err)
    }
  }
);
