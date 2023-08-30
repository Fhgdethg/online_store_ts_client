import { createSlice } from '@reduxjs/toolkit';
import { PayloadAction } from '@reduxjs/toolkit/src/createAction';
import { authApi, IAuthResponse, ILoginResponse } from '../api/authApi';

interface IInitialState {
  currentDir: null | string;
  dirStack: (string | null)[];
}

const initialState: IInitialState = {
  currentDir: null,
  dirStack: [],
};

const { reducer, actions } = createSlice({
  name: 'CURRENT_DIR',
  initialState,
  reducers: {
    changeCurrentDir(state, { payload }: PayloadAction<string | null>) {
      state.currentDir = payload;
    },
    addDirInStack(state, { payload }: PayloadAction<string | null>) {
      state.dirStack.push(payload);
    },
    removeLastDirFromStack(state) {
      state.dirStack.pop();
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      authApi.endpoints.login.matchFulfilled,
      (state, { payload }: PayloadAction<ILoginResponse>) => {
        state.currentDir = payload.user.id;
      },
    );
    builder.addMatcher(
      authApi.endpoints.auth.matchFulfilled,
      (state, { payload }: PayloadAction<IAuthResponse>) => {
        state.currentDir = payload._id;
      },
    );
  },
});

export const { changeCurrentDir, addDirInStack, removeLastDirFromStack } =
  actions;

export default reducer;
