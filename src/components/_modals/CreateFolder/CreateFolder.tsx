import React, { ChangeEvent, useState } from 'react';
import styled from 'styled-components';

import GlobalInput from '../../ElementsAndActions/GlobalInput/GlobalInput';
import GlobalButton from '../../ElementsAndActions/GlobalButton/GlobalButton';
import Spinner from '../../ElementsAndActions/Spinner/Spinner';

import SCGlobalButton from '../../ElementsAndActions/GlobalButton/SCGlobalButton';

import { useAppSelector } from '../../../redux/hooks';

import { getStoreCurrentDirData } from '../../../redux/currentDir/currentDirSelectors';
import {
  useCreateDirMutation,
} from '../../../redux/api/filesApi';

const SCCreateFolder = styled.div`
  ${SCGlobalButton} {
    margin-top: 20px;
    font-size: 19px;
  }
`;

const CreateFolder = () => {
  const [createDir, { isLoading: isCreationFolder }] = useCreateDirMutation();
  const { currentDir } = useAppSelector(getStoreCurrentDirData);

  const [folderName, setFolderName] = useState('');

  const folderNameHandler = (e: ChangeEvent<HTMLInputElement>) =>
    setFolderName(e.target.value);

  const createFolderHandler = () =>
    createDir({
      dirId: currentDir,
      name: folderName,
    });

  return (
    <SCCreateFolder>
      <GlobalInput
        inputProps={{
          value: folderName,
          onChange: folderNameHandler,
          placeholder: 'Введите имя папки',
        }}
      />
      <GlobalButton buttonAction={createFolderHandler}>
        {isCreationFolder ? (
          <Spinner color='white' size={22} />
        ) : (
          'Создать папку'
        )}
      </GlobalButton>
    </SCCreateFolder>
  );
};

export default CreateFolder;
