export const selectAllSettings = (state) => {
    return state.settings;
  };
  
  export const selectMode = (state) => {
      return state.settings.settingsArray.modeSelection;
    }
  export const selectUtils = (state) => {
    return state.settings.utils;
  };
  export const selectUtilsSettingChange = (state) => {
    return state.settings.utils.settingsChange;
  };


  export const selectFetchSettingsUtils = (state) => {
    return state.settings.utils.fetchSettings;
  };
  
  export const selectLoveModeSettings = (state) => {
    return state.settings.settingsArray.loveModeSettings;
  };
  export const selectFeedbackModeSettings = (state) => {
    return state.settings.settingsArray.feedbackModeSettings;
  };



  
  export const selectBillboardModeSettings = (state) => {
    return state.settings.settingsArray.billboardModeSettings;
  };
  
  export const selectPromptModeSettings = (state) => {
    return state.settings.settingsArray.promptModeSettings;
  };


  export const selectPromptModeLoadingAndErr = (state) => {
    return state.settings.utils.promptMode;
  };
  export const selectModeSelectionUtils = (state) => {
    return state.settings.utils.modeSelection;
  };



  export const selectPromptDetails = (state) => {
    return state.settings.settingsArray.promptModeSettings.promptDetails;
  };


  export const selectViewerSettings = (state) => {
    return state.settings.utils.viewerSubmit
  }