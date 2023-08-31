import React, { ChangeEvent } from 'react';

import GlobalButton from '../../components/ElementsAndActions/GlobalButton/GlobalButton';
import FilesStandardTable from '../../components/_tables/FilesStandardTable/FilesStandardTable';
import FileInput from '../../components/ElementsAndActions/FileInput/FileInput';
import Spinner from '../../components/ElementsAndActions/Spinner/Spinner';
import DndWrapper from "../../components/DndWrapper/DndWrapper";
import { ReactComponent as GoBack } from '../../assets/go_back.svg';

import SCDisk from './SCDisk';

import { useAppDispatch, useAppSelector } from '../../redux/hooks';

import { showModal } from '../../redux/globalModal/globalModalSlice';
import { getStoreCurrentDirData } from '../../redux/currentDir/currentDirSelectors';
import { useUploadFileMutation } from '../../redux/api/filesApi';

import { modalNames } from '../../components/_modals/modalsHelpers';
import {
  changeCurrentDir,
  removeLastDirFromStack,
} from '../../redux/currentDir/currentDirSlice';

const Disk = () => {
  const dispatch = useAppDispatch();
  const [uploadFile, { isLoading: isUploadingFile }] = useUploadFileMutation();
  const { currentDir, dirStack } = useAppSelector(getStoreCurrentDirData);

  const goBackHandler = () => {
    if (dirStack.length) {
      const lastBackDirIndex = dirStack.length - 1;
      const backDir = dirStack[lastBackDirIndex >= 0 ? lastBackDirIndex : 0];
      dispatch(changeCurrentDir(backDir ? backDir : null));
      dispatch(removeLastDirFromStack());
    }
  };

  const openCreateFolder = () => dispatch(showModal(modalNames.createFolder));

  const onChooseFile = (e: any) => {
    const files = Array.from(e.target.files || []);
    files.forEach((file) => uploadFile({ file, currentDir }));
  };

  return (
    <SCDisk>
      <DndWrapper onChooseFile={onChooseFile}>
        <div className='functional_buttons'>
          <GlobalButton buttonType='opacity' buttonAction={goBackHandler}>
            <GoBack />
          </GlobalButton>
          <GlobalButton buttonType='opacity' buttonAction={openCreateFolder}>
            Создать папку
          </GlobalButton>
          {isUploadingFile && <Spinner />}
          <FileInput inputType='opacity' onChange={onChooseFile} isMultiple />
        </div>
        <FilesStandardTable />
      </DndWrapper>
    </SCDisk>
  );
};

export default Disk;
