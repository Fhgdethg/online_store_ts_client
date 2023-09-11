import { hideModal } from '../globalModal/globalModalSlice';

import { API_LIST } from '../apiList';
import { rtkKeys } from '../rtkKeys';
import {api, baseUrl} from './api';
import {lSKeys} from "../../constants/lSKeys";

export interface IFile {
  date: string;
  _id: string;
  name: string;
  type: string;
  size: number;
  path: string;
  user: string;
  childs: any[];
  __v: number;
  parent: string;
}

interface ICreationDirPayload {
  dirId: string | null;
  name: string;
}

interface IUploadFilePayload {
  file: any;
  currentDir: string | null;
}

export const filesApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getFiles: builder.query<IFile[], string | null>({
      query: (dirId) => `${API_LIST.files}${dirId ? `?parent=${dirId}` : ''}`,
      providesTags: [rtkKeys.files] as any,
    }),
    createDir: builder.mutation<IFile, ICreationDirPayload>({
      query: ({ dirId, name }) => ({
        url: `${API_LIST.files}`,
        method: 'POST',
        body: {
          name,
          parent: dirId,
          type: 'dir',
        },
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
          dispatch(hideModal());
        } catch (e) {
          dispatch(hideModal());
        }
      },
      invalidatesTags: [rtkKeys.files] as any,
    }),
    uploadFile: builder.mutation<any, IUploadFilePayload>({
      query: ({ file, currentDir }) => {
        const body = new FormData();
        const encodedFilename = encodeURIComponent(file.name);
        body.append('file', file, encodedFilename);
        console.log(body)
        if (currentDir) body.append('parent', currentDir);

        return {
          url: `${API_LIST.files}${API_LIST.upload}`,
          method: 'POST',
          body,
        };
      },

      invalidatesTags: [rtkKeys.files] as any,
    }),
    deleteFile: builder.mutation<any, any>({
      query: (file) => ({
        method: 'DELETE',
        url: `${API_LIST.files}?id=${file._id}`
      }),
      invalidatesTags: [rtkKeys.files] as any,
    }),

  }),
});

export const downloadFile = async (file: any) =>
{
  try {
    const response = await fetch(`${baseUrl}${API_LIST.files}${API_LIST.download}?id=${file._id}`, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem(lSKeys.t)}`
      },
    })
    if (response.status === 200) {
      const blob = await response.blob()
      const downloadUrl = URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = downloadUrl
      link.download = file.name
      document.body.appendChild(link)
      link.click()
      link.remove()
    }
  } catch (err) {
    console.log(err)
  }
}

export const { useGetFilesQuery, useCreateDirMutation, useUploadFileMutation, useDeleteFileMutation } =
  filesApi;

export default filesApi.reducer;
