import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';

import authReducer from './auth/authSlice';
import globalModalReducer from './globalModal/globalModalSlice';
import currentDirReducer from './currentDir/currentDirSlice';

import apiReducer, { api } from './api/api';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    globalModal: globalModalReducer,
    currentDir: currentDirReducer,

    api: apiReducer,
  },
  middleware: (getDefaultMiddleware: any) => [
    ...getDefaultMiddleware(),
    api.middleware,
  ],
});

setupListeners(store.dispatch);
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
