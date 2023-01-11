/*
THis slice is quickly becoming obsolete. Basically, settings is  */





export const initialState = {
    viewArray: {
        currentUrlPid: "",
      modeSelection: "",
      loveModeSettings: {
        includeYourName: true,
        yourName: "",
        includeTargetName: true,
        targetName: "",
        goal: "",
        dateDetails: "",
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
          promptType: "",
          promptTitle: "",
          responses: [],
        },
      },
    },
    utils: {
        view: {
            isLoading: false,
            errMsg: "",
        },
        submit: {
            isLoading: false,
            errMsg: "",
        }
      
    },
  };
  