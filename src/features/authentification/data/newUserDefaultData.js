import { collection } from "@firebase/firestore";

export const newUserDefaultData = {
  settings: {
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
      ratingQuestion: "How would you rate our social interaction?",
      promptQuestion:
        "If you did not choose a 10, what is your reasoning? Why do you think I am an imperfect being?",
      askForContactInfo: false,
    },
    billboardModeSettings: {
      billboardText: "Fight Club is a BAD Movie.",
    },
    promptModeSettings: {
      allPrompts: ["My First Communal Story"],
      promptDetails: {
        currentPromptId: 0,
        customPrompt: "",
        promptType: "story",
        promptTitle: "My First Communal Story",
        responses: [],
      },
    },
  },
  promptLog: {
    customPrompt: "",
    promptTitle: "My First Communal Story",
    promptType: "story",
    responses: [],
  },
};
