import { api } from './api';
import { API_LIST } from '../apiList';

interface IUser {
  email: string;
  password: string;
}

interface IRegistrationResponse {
  message: string;
}

export interface ILoggedUser {
  id: string;
  email: string;
  diskSpace: number;
  usedSpace: number;
}

export interface ILoginResponse {
  token: string;
  user: ILoggedUser;
}

export interface IAuthResponse {
  _id: string;
  email: string;
  password: string;
  diskSpace: number;
  usedSpace: number;
  files: any[];
  __v: number;
}

export const authApi = api.injectEndpoints({
  endpoints: (builder) => ({
    registration: builder.mutation<IRegistrationResponse, IUser>({
      query: (body) => ({
        url: `${API_LIST.auth}${API_LIST.registration}`,
        method: 'POST',
        body,
      }),
    }),
    login: builder.mutation<ILoginResponse, IUser>({
      query: (body) => ({
        url: `${API_LIST.auth}${API_LIST.login}`,
        method: 'POST',
        body,
      }),
    }),
    auth: builder.query<IAuthResponse, void>({
      query: () => `${API_LIST.auth}${API_LIST.auth}`,
    }),
  }),
});

export const { useRegistrationMutation, useLoginMutation, useAuthQuery } =
  authApi;
