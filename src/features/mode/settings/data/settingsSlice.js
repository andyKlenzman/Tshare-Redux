import { createSlice } from "@reduxjs/toolkit";
import { initialState } from "./initialState";
import {
  fetchSettings,
  selectPrompt,
  createPrompt,
  updateBillboard,
  updateLove,
  updateFeedback,
  updateMode,
  addPromptInput,
  addLoveInput,
  addFeedbackInput,
} from "./asyncThunks";

const settingsSlice = createSlice({
  name: "settings",
  initialState,
  reducers: {
    loveModeSettingsUpdated(state, action) {
      return {
        ...state,
        settingsArray: {
          ...state.settingsArray,
          loveModeSettings: {
            ...action.payload,
          },
        },
      };
    },
    resetSettings(state, action) {
      return {
        ...state,
        ...initialState,
      };
    },
    modeSelectionUpdated(state, action) {
      return {
        ...state,
        settingsArray: {
          ...state.settingsArray,
          modeSelection: action.payload.modeSelection,
        },
      };
    },
    feedbackModeSettingsUpdated(state, action) {
      return {
        ...state,
        settingsArray: {
          ...state.settingsArray,
          feedbackModeSettings: {
            ...action.payload,
          },
        },
      };
    },
    billboardModeSettingsUpdated(state, action) {
      return {
        ...state,
        settingsArray: {
          ...state.settingsArray,
          billboardModeSettings: {
            ...action.payload,
          },
        },
      };
    },
    promptModeSettingsAdded(state, action) {
      return {
        ...state,
        settingsArray: {
          ...state.settingsArray,
          promptModeSettings: {
            ...state.settingsArray.promptModeSettings,
            promptDetails: {
              ...action.payload.promptDetails,
            },
            allPrompts: [
              ...state.settingsArray.promptModeSettings.allPrompts,
              action.payload.promptDetails.promptTitle,
            ],
          },
        },
      };
    },
    promptModeSettingsUpdated(state, action) {
      return {
        ...state,
        settingsArray: {
          ...state.settingsArray,
          promptModeSettings: {
            ...state.settingsArray.promptModeSettings,
            promptDetails: {
              ...action.payload.promptDetails,
            },
          },
        },
      };
    },
  },
  extraReducers: {
    [fetchSettings.pending]: (state) => {
      state.utils.fetchSettings.isLoading = true;
    },
    [fetchSettings.fulfilled]: (state, action) => {
      state.utils.fetchSettings.isLoading = false;
      state.utils.fetchSettings.errMsg = "";
      state.settingsArray = action.payload;
    },
    [fetchSettings.rejected]: (state, action) => {
      state.utils.fetchSettings.isLoading = false;
      state.utils.fetchSettings.errMsg = action.error
        ? action.error.message
        : "Fetch failed";
    },
    // PROMPT MODE
    [selectPrompt.pending]: (state) => {
      state.utils.settingsChange.isLoading = true;
    },
    [selectPrompt.fulfilled]: (state, action) => {
      state.utils.settingsChange.isLoading = false;
      state.utils.settingsChange.errMsg = "";
      state.settingsArray.promptModeSettings.promptDetails = action.payload;
    },
    [selectPrompt.rejected]: (state, action) => {
      state.utils.settingsChange.isLoading = false;
      state.utils.settingsChange.errMsg = action.error
        ? action.error.message
        : "Fetch failed";
    },
    [createPrompt.pending]: (state) => {
      state.utils.settingsChange.isLoading = true;
    },
    [createPrompt.fulfilled]: (state, action) => {
      state.utils.settingsChange.isLoading = false;
      state.utils.settingsChange.errMsg = "";
      state.settingsArray.promptModeSettings = action.payload;
    },
    [createPrompt.rejected]: (state, action) => {
      state.utils.settingsChange.isLoading = false;
      state.utils.settingsChangee.errMsg = action.error
        ? action.error.message
        : "Fetch failed";
    },

    // BILLBOARD MODE
    // higher order functions to wrap error handling for react
    [updateBillboard.pending]: (state) => {
      state.utils.settingsChange.isLoading = true;
    },
    [updateBillboard.fulfilled]: (state, action) => {
      state.utils.settingsChange.isLoading = false;
      state.utils.settingsChange.errMsg = "";
      state.settingsArray.billboardModeSettings.billboardText = action.payload;
    },
    [updateBillboard.rejected]: (state, action) => {
      state.utils.settingsChange.isLoading = false;
      state.utils.settingsChange.errMsg = action.error
        ? action.error.message
        : "Fetch failed";
    },

    // LOVE MODE4

    [updateLove.pending]: (state) => {
      state.utils.settingsChange.isLoading = true;
    },
    [updateLove.fulfilled]: (state, action) => {
      state.utils.settingsChange.isLoading = false;
      state.utils.settingsChange.errMsg = "";
      state.settingsArray.loveModeSettings = action.payload;
    },
    [updateLove.rejected]: (state, action) => {
      state.utils.settingsChange.isLoading = false;
      state.utils.settingsChange.errMsg = action.error
        ? action.error.message
        : "Fetch failed";
    },

    // Feedback Mode
    [updateFeedback.pending]: (state) => {
      state.utils.settingsChange.isLoading = true;
    },
    [updateFeedback.fulfilled]: (state, action) => {
      state.utils.settingsChange.isLoading = false;
      state.utils.settingsChange.errMsg = "";
      state.settingsArray.feedbackModeSettings = action.payload;
    },
    [updateFeedback.rejected]: (state, action) => {
      state.utils.settingsChange.isLoading = false;
      state.utils.settingsChange.errMsg = action.error
        ? action.error.message
        : "Fetch failed";
    },

    // update Mode

    [updateMode.pending]: (state) => {
      state.utils.settingsChange.isLoading = false;
    },
    [updateMode.fulfilled]: (state, action) => {
      state.utils.settingsChange.isLoading = false;
      state.utils.settingsChange.errMsg = "";
      state.settingsArray.modeSelection = action.payload;
    },
    [updateMode.rejected]: (state, action) => {
      state.utils.settingsChange.isLoading = false;
      state.utils.settingsChange.errMsg = action.error
        ? action.error.message
        : "Fetch failed";
    },
    [addPromptInput.pending]: (state) => {
      state.utils.viewerSubmit.isLoading = true;
    },
    [addPromptInput.fulfilled]: (state, action) => {
      state.utils.viewerSubmit.isLoading = false;
      state.utils.viewerSubmit.errMsg = "";
      state.settingsArray.promptModeSettings.promptDetails.responses =
        action.payload;
    },
    [addPromptInput.rejected]: (state, action) => {
      state.utils.viewerSubmit.isLoading = false;
      state.utils.viewerSubmit.errMsg = action.error
        ? action.error.message
        : "Fetch failed";
    },
    [addLoveInput.pending]: (state) => {
      state.utils.viewerSubmit.isLoading = true;
    },
    [addLoveInput.fulfilled]: (state, action) => {
      state.utils.viewerSubmit.isLoading = false;
      state.utils.viewerSubmit.errMsg = "";
    },
    [addLoveInput.rejected]: (state, action) => {
      state.utils.viewerSubmit.isLoading = false;
      state.utils.viewerSubmit.errMsg = action.error
        ? action.error.message
        : "Fetch failed";
    },
    [addFeedbackInput.pending]: (state) => {
      state.utils.viewerSubmit.isLoading = true;
    },
    [addFeedbackInput.fulfilled]: (state, action) => {
      state.utils.viewerSubmit.isLoading = false;
      state.utils.viewerSubmit.errMsg = "";
    },
    [addFeedbackInput.rejected]: (state, action) => {
      state.utils.viewerSubmit.isLoading = false;
      state.utils.viewerSubmit.errMsg = action.error
        ? action.error.message
        : "Fetch failed";
    },
  },
});

export const settingsReducer = settingsSlice.reducer;
export const {
  loveModeSettingsUpdated,
  modeSelectionUpdated,
  feedbackModeSettingsUpdated,
  billboardModeSettingsUpdated,
  promptModeSettingsUpdated,
  promptModeSettingsAdded,
  resetSettings,
} = settingsSlice.actions;

export const mutatePromptMiddleware = (store) => (next) => (action) => {
  if (action.type === "settings/updatePromptModeSettings") {
    // In other words: the currentPromptId = length of allPrompts array.
    // Purpose: set the currentPromptId to the index where the new prompt will be pushed to
    action.payload.promptDetails.currentPromptId =
      action.payload.allPrompts.length;

    // Purpose: clear the responses from the old prompt to the new one
    action.payload.promptDetails.responses = {};
  }

  next(action);
};
