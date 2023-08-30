import React, { useState } from 'react';
import styled from 'styled-components';

import AuthForm from '../../components/AuthForm/AuthForm';

import SCWhiteWrapper from '../../ui/SCWhiteWrapper';

import { useRegistrationMutation } from '../../redux/api/authApi';

import { IUserData } from '../../components/AuthForm/AuthFormTypes';

const SCRegistration = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  h1 {
    text-align: center;
  }
`;

const Registration = () => {
  const [registration, { isLoading, data: registrationRes }] =
    useRegistrationMutation();

  const registrationMessage = registrationRes?.message;

  const [isFormFirstlySubmitted, setIsFormFirstlySubmitted] = useState(false);

  const formHandler = async (data: IUserData) => {
    await registration(data);

    if (!isFormFirstlySubmitted) setIsFormFirstlySubmitted(true);
  };

  return (
    <SCRegistration>
      <SCWhiteWrapper>
        <h1>Регистрация</h1>
        <AuthForm
          {...{
            formHandler,
            isLoading,
            isFormFirstlySubmitted,
            registrationMessage,
          }}
        />
      </SCWhiteWrapper>
    </SCRegistration>
  );
};

export default Registration;
