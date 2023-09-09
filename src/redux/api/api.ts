import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { lSKeys } from '../../constants/lSKeys';
import { rtkKeys } from '../rtkKeys';

export const baseUrl = 'http://localhost:5000/api'
export const getBaseQueryFields = () => ({
  baseUrl,
  tagTypes: [rtkKeys.files],
  prepareHeaders: (headers: any) => {
    const token = localStorage.getItem(lSKeys.t);

    if (token) {
      headers.set('Authorization', `Bearer ${token}`);
    }

    return headers;
  },
});

export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery(getBaseQueryFields()),
  endpoints: (build) => ({}),
});

export default api.reducer;
