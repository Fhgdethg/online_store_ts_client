import { hideModal } from '../globalModal/globalModalSlice';

import { API_LIST } from '../apiList';
import { rtkKeys } from '../rtkKeys';
import { api } from './api';

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
    downloadFile: builder.mutation<any, any>({
      query: (file) => ({
        url: `${API_LIST.files}${API_LIST.download}?id=${file._id}`,
        headers: {
          'Content-Type': 'text/plain',
          'Accept': 'text/plain'
          // 'X-Content-Type-Options': 'nosniff'
        },
      }),
      async onQueryStarted(file ,{dispatch, queryFulfilled})  {
        try {
          // let res: any;

          // console.log(file);
          // try {
            const response = await queryFulfilled;
          console.log(response)
          //   console.log(response)
          //   res = response
          // } catch (err: any) {
          //   console.log(err)
          //   if (err?.error?.data)
          //     res = err.error.data
          //   else throw new Error(err)
          // }
          // const {error: {data}}: any = err

          const blob = new Blob([JSON.stringify(response)]);
          // const blob = JSON.stringify(response).blob()
          const downloadUrl = URL.createObjectURL(blob)
          const link = document.createElement('a')
          link.href = downloadUrl
          link.download = file.name
          document.body.appendChild(link)
          link.click()
          link.remove()
          // return res
        } catch (err) {
          console.log(err)
        }
      }
    }),
  }),
});

export const { useGetFilesQuery, useCreateDirMutation, useUploadFileMutation, useDownloadFileMutation } =
  filesApi;

export default filesApi.reducer;
