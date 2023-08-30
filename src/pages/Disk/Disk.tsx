import React, { ChangeEvent } from 'react';

import GlobalButton from '../../components/ElementsAndActions/GlobalButton/GlobalButton';
import FilesStandardTable from '../../components/_tables/FilesStandardTable/FilesStandardTable';
import { ReactComponent as GoBack } from '../../assets/go_back.svg';

import SCDisk from './SCDisk';
import FileInput from '../../components/ElementsAndActions/FileInput/FileInput';

import { useAppDispatch, useAppSelector } from '../../redux/hooks';

import { showModal } from '../../redux/globalModal/globalModalSlice';
import { getStoreCurrentDirData } from '../../redux/currentDir/currentDirSelectors';
import { useUploadFileMutation } from '../../redux/api/filesApi';

import { modalNames } from '../../components/_modals/modalsHelpers';
import {
  changeCurrentDir,
  removeLastDirFromStack,
} from '../../redux/currentDir/currentDirSlice';
import Spinner from '../../components/ElementsAndActions/Spinner/Spinner';

interface CustomFile {
  lastModified: number;
  lastModifiedDate: Date;
  name: string;
  size: number;
  type: string;
  webkitRelativePath: string;
}

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

  // const parseFilesArrToStandardArr = (files: CustomFile[]) =>
  //   files.map((file) => ({
  //     lastModified: file.lastModified,
  //     lastModifiedDate: file.lastModifiedDate,
  //     name: file.name,
  //     size: file.size,
  //     type: file.type,
  //     webkitRelativePath: file.webkitRelativePath,
  //   }));

  const onChooseFile = (e: ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    console.log(files);
    // const filesArr = parseFilesArrToStandardArr(files);
    files.forEach((file) => uploadFile({ file, currentDir }));
  };

  return (
    <SCDisk>
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
    </SCDisk>
  );
};

export default Disk;
