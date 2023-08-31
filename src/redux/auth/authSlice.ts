import { createSlice } from '@reduxjs/toolkit';

import { lSKeys } from '../../constants/lSKeys';

import { authApi, ILoggedUser } from '../api/authApi';

interface IInitialState {
  isAuth: boolean;
  user: ILoggedUser;
}

const initialState: IInitialState = {
  isAuth: Boolean(localStorage.getItem(lSKeys.t)),
  user: {
    diskSpace: 0,
    email: '',
    id: '',
    usedSpace: 0,
  },
};

const authHandler = () => {
  const token = localStorage.getItem(lSKeys.t);

  return Boolean(token);
};

const { reducer, actions } = createSlice({
  name: 'AUTH',
  initialState,
  reducers: {
    changeAuth(state) {
      state.isAuth = authHandler();
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      authApi.endpoints.auth.matchRejected,
      (state, action) => {
        localStorage.removeItem(lSKeys.t)
        state.isAuth = authHandler();
      },
    );
  },
});

export const { changeAuth } = actions;

export default reducer;
