import { createSlice } from '@reduxjs/toolkit';
import { PayloadAction } from '@reduxjs/toolkit/src/createAction';

import {
  getQueryByNameFromUrl,
  removeQueryFromUrl,
  setQueryToUrl,
} from '../../helpers/locationHelpers';
import { qKeys } from '../../constants/qKeys';

interface IInitialState {
  isShowGlobalModal: boolean;
}

const initialState: IInitialState = {
  isShowGlobalModal: Boolean(getQueryByNameFromUrl(qKeys.modalName)),
};

const { reducer, actions } = createSlice({
  name: 'AUTH',
  initialState,
  reducers: {
    showModal(state, { payload }: PayloadAction<string>) {
      setQueryToUrl(payload, qKeys.modalName);
      state.isShowGlobalModal = true;
    },
    hideModal(state) {
      state.isShowGlobalModal = false;
      removeQueryFromUrl(qKeys.modalName);
    },
  },
});

export const { showModal, hideModal } = actions;

export default reducer;
