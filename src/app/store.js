import { configureStore } from '@reduxjs/toolkit';
import { userReducer } from '../features/authentification/data/userSlice';
import { settingsReducer } from '../features/mode/settings/data/settingsSlice';
import { mutatePromptMiddleware } from '../features/mode/settings/data/settingsSlice';
import { logReducer } from '../features/log/data/logSlice';
import { viewReducer } from '../features/mode/view/data/viewSlice';
import { alertReducer } from '../components/alerts/alertSlice';
import { animationReducer } from '../features/animation/data/animationSlice';

export const store = configureStore({

  reducer: {
    user: userReducer,
    settings: settingsReducer,
    log: logReducer,
    view: viewReducer,
    alert: alertReducer,
    animation: animationReducer

    
    
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(mutatePromptMiddleware)
  
});
