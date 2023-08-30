import React, { useEffect, useState } from 'react';

import SCWhiteWrapper from '../../../ui/SCWhiteWrapper';
import SCGlobalModal from './SCGlobalModal';
import SCOutsideClickWrp from '../../../ui/SCOutsideClickWrp';

import { useAppDispatch, useAppSelector } from '../../../redux/hooks';

import { getStoreGlobalModalData } from '../../../redux/globalModal/globalModalSelectors';
import { hideModal } from '../../../redux/globalModal/globalModalSlice';

import { getModalByType } from '../../_modals/modalsHelpers';
import { getQueryByNameFromUrl } from '../../../helpers/locationHelpers';
import { qKeys } from '../../../constants/qKeys';

const GlobalModal = () => {
  const dispatch = useAppDispatch();
  const { isShowGlobalModal } = useAppSelector(getStoreGlobalModalData);

  const hideModalHandler = () => dispatch(hideModal());

  const modalName = getQueryByNameFromUrl(qKeys.modalName);

  return (
    <>
      {isShowGlobalModal && (
        <SCGlobalModal>
          <SCOutsideClickWrp onClick={hideModalHandler} />
          <SCWhiteWrapper>{getModalByType(modalName)}</SCWhiteWrapper>
        </SCGlobalModal>
      )}
    </>
  );
};

export default GlobalModal;
