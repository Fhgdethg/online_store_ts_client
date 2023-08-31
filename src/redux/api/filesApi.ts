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
          headers: {
            // 'Content-Type': 'multipart/form-data',
            // onUploadProgress: (progressEvent: any) => {
            //   const totalLength = progressEvent.lengthComputable
            //     ? progressEvent.total
            //     : progressEvent.target.getResponseHeader('content-length') ||
            //       progressEvent.target.getResponseHeader(
            //         'x-decompressed-content-length',
            //       );
            //   console.log('total', totalLength);
            //   if (totalLength) {
            //     const progress = Math.round(
            //       (progressEvent.loaded * 100) / totalLength,
            //     );
            //     console.log(progress);
            //   }
            // },
          },
          body,
        };
      },

      invalidatesTags: [rtkKeys.files] as any,
    }),
  }),
});

export const { useGetFilesQuery, useCreateDirMutation, useUploadFileMutation } =
  filesApi;

export default filesApi.reducer;
