import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router';

import AuthForm from '../../components/AuthForm/AuthForm';
import SCWhiteWrapper from '../../ui/SCWhiteWrapper';

import { useAppDispatch } from '../../redux/hooks';

import { changeAuth } from '../../redux/auth/authSlice';
import { ILoginResponse, useLoginMutation } from '../../redux/api/authApi';

import { lSKeys } from '../../constants/lSKeys';
import { routes } from '../../routes/routes';

import { IUserData } from '../../components/AuthForm/AuthFormTypes';

const SCLogin = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  h1 {
    text-align: center;
  }
`;

const Login = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [login, { isLoading }] = useLoginMutation();

  const formHandler = async (userData: IUserData) => {
    try {
      const { data }: ILoginResponse | any = await login(userData);

      if (data?.token) {
        localStorage.setItem(lSKeys.t, data.token);
        dispatch(changeAuth());
        navigate(routes.root);
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <SCLogin>
      <SCWhiteWrapper>
        <h1>Авторизация</h1>
        <AuthForm {...{ formHandler, isLoading }} />
      </SCWhiteWrapper>
    </SCLogin>
  );
};

export default Login;
