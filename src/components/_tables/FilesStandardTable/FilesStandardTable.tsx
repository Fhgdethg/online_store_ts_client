import React from 'react';

import TableHeader from '../../ElementsAndActions/TableHeader/TableHeader';
import GlobalButton from '../../ElementsAndActions/GlobalButton/GlobalButton';
import Spinner from '../../ElementsAndActions/Spinner/Spinner';
import { ReactComponent as Dir } from '../../../assets/dir.svg';
import { ReactComponent as File } from '../../../assets/file.svg';
import { ReactComponent as Share } from '../../../assets/share.svg';
import { ReactComponent as Delete } from '../../../assets/delete.svg';

import SCFileStandardTable from './SCFileStandardTable';
import SCTableRow from '../../../ui/SCTableRow';

import { useAppDispatch, useAppSelector } from '../../../redux/hooks';

import { useGetFilesQuery } from '../../../redux/api/filesApi';
import SCTableBody from '../../../ui/SCTableBody';
import {
  changeCurrentDir,
  addDirInStack,
} from '../../../redux/currentDir/currentDirSlice';
import { getStoreCurrentDirData } from '../../../redux/currentDir/currentDirSelectors';
import SCTableCell from "../../../ui/SCTableCell";

const FilesStandardTable = () => {
  const dispatch = useAppDispatch();
  const { currentDir } = useAppSelector(getStoreCurrentDirData);
  const { data: files, isFetching: isLoadingFiles } =
    useGetFilesQuery(currentDir);

  const gridTemplate =
    'minmax(50px, 70px) minmax(120px, 2fr) minmax(200px, 1.4fr) minmax(200px, 1.4fr)';

  const headerItems = ['', 'Название', 'Дата', 'Размер'];

  const openFolderHandler = (dirId: string) => {
    dispatch(addDirInStack(currentDir));
    dispatch(changeCurrentDir(dirId));
  };

  return (
    <SCFileStandardTable>
      <TableHeader {...{ headerItems, gridTemplate }} />
      <SCTableBody>
        {files &&
          files.map((file: any) => (
            <SCTableRow
              grid_template={gridTemplate}
              key={file._id}
              onClick={
                file.type === 'dir'
                  ? () => openFolderHandler(file._id)
                  : undefined
              }
            >
              {file.type === 'dir' ? <Dir /> : <File />}
              <SCTableCell><p>{file.name}</p></SCTableCell>
              <SCTableCell><p>{file.date.slice(0, 10)}</p></SCTableCell>
              <SCTableCell className='file_size_and_extended'>
                <p>{file.size}b</p>
                <GlobalButton buttonType='opacity'>
                  <Share />
                </GlobalButton>
                <GlobalButton buttonType='opacity'>
                  <Delete />
                </GlobalButton>
              </SCTableCell>
            </SCTableRow>
          ))}
      </SCTableBody>

      <div className='spinner_wrp'>{isLoadingFiles && <Spinner />}</div>
    </SCFileStandardTable>
  );
};

export default FilesStandardTable;
