/*
I could really condense this error handling code by incorperatting an object model or place to dyanmically put which position it is, then create a component that can handle all of my use cases. 


*/

export const initialState = {
  settingsArray: {
    modeSelection: "billboard",
    loveModeSettings: {
      includeYourName: true,
      yourName: "Bert",
      includeTargetName: true,
      targetName: "Ernie",
      goal: "date",
      dateDetails: "Walk in the park at sunset",
    },
    feedbackModeSettings: {
      ratingQuestion: "",
      promptQuestion: "",
      askForContactInfo: true,
    },
    billboardModeSettings: {
      billboardText: "",
    },
    promptModeSettings: {
      allPrompts: [],
      promptDetails: {
        currentPromptId: 0,
        customPrompt: "",
        promptType: "story",
        promptTitle: "story",
        responses: [],
      },
    },
  },
  utils: {
    fetchSettings: {
      isLoading: false,
      errMsg: "",
    },
    settingsChange: {
      isLoading: false,
      errMsg: "",
    },
    viewerSubmit: {
      isLoading: false,
      errMsg: "",
    },
  },
};
