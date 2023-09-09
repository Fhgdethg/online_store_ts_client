import React, {useEffect} from 'react';

import TableHeader from '../../ElementsAndActions/TableHeader/TableHeader';
import GlobalButton from '../../ElementsAndActions/GlobalButton/GlobalButton';
import Spinner from '../../ElementsAndActions/Spinner/Spinner';
import { ReactComponent as Dir } from '../../../assets/dir.svg';
import { ReactComponent as File } from '../../../assets/file.svg';
import { ReactComponent as Share } from '../../../assets/share.svg';
import { ReactComponent as Delete } from '../../../assets/delete.svg';

import SCFileStandardTable from './SCFileStandardTable';
import SCTableRow from '../../../ui/SCTableRow';
import SCTableBody from '../../../ui/SCTableBody';
import SCTableCell from "../../../ui/SCTableCell";

import { useAppDispatch, useAppSelector } from '../../../redux/hooks';

import { useGetFilesQuery, useDownloadFileMutation } from '../../../redux/api/filesApi';

import {
  changeCurrentDir,
  addDirInStack,
} from '../../../redux/currentDir/currentDirSlice';
import { getStoreCurrentDirData } from '../../../redux/currentDir/currentDirSelectors';

import {API_LIST} from '../../../redux/apiList'
import {lSKeys} from "../../../constants/lSKeys";
import {baseUrl} from "../../../redux/api/api";

const FilesStandardTable = () => {
  const dispatch = useAppDispatch();
  const { currentDir } = useAppSelector(getStoreCurrentDirData);
  const { data: files, isFetching: isLoadingFiles } =
    useGetFilesQuery(currentDir);
  const [downloadFile] = useDownloadFileMutation()

  const gridTemplate =
    'minmax(50px, 70px) minmax(120px, 2fr) minmax(200px, 1.4fr) minmax(200px, 1.4fr)';

  const headerItems = ['', 'Название', 'Дата', 'Размер'];

  const openFolderHandler = (dirId: string) => {
    dispatch(addDirInStack(currentDir));
    dispatch(changeCurrentDir(dirId));
  };

  const downloadFileHandler = async (file: any) =>
  {
    const response = await fetch(`${baseUrl}${API_LIST.files}${API_LIST.download}?id=${file._id}`, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem(lSKeys.t)}`
      },
    })
    // console.log(new Blob([JSON.stringify(response)]))
    if (response.status === 200) {
      const blob = await response.blob()
      // const blob = new Blob([JSON.stringify(response)]);
      const downloadUrl = URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = downloadUrl
      link.download = file.name
      document.body.appendChild(link)
      link.click()
      link.remove()
    }
  }
    // downloadFile(file)

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
                  Share
                </GlobalButton>
                {
                  file.type !== 'dir' &&
                  <GlobalButton buttonType='opacity' buttonAction={() => downloadFileHandler(file)}>
                    Download
                  </GlobalButton>
                }
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
