import React, { FormEvent } from 'react';
import { useForm } from 'react-hook-form';

import PasswordController from '../PasswordController/PasswordController';
import EmailController from '../EmailController/EmailController';
import GlobalButton from '../ElementsAndActions/GlobalButton/GlobalButton';
import Spinner from '../ElementsAndActions/Spinner/Spinner';

import SCAuthForm from './SCAuthForm';

import { IUserData } from './AuthFormTypes';

interface IAuthFormProps {
  isFormFirstlySubmitted?: boolean;
  registrationMessage?: string;
  formHandler: (data: IUserData) => void;
  isLoading?: boolean;
}

const AuthForm: React.FC<IAuthFormProps> = ({
  isFormFirstlySubmitted = false,
  registrationMessage = null,
  formHandler,
  isLoading = false,
}) => {
  const { control, handleSubmit } = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleSubmit(formHandler)();
  };

  return (
    <SCAuthForm onSubmit={onSubmit}>
      <EmailController {...{ control }} />
      <PasswordController {...{ control }} />
      <div>
        <GlobalButton isDisabled={Boolean(isLoading)}>
          {isLoading ? <Spinner color='white' size={25} /> : 'Отправить'}
        </GlobalButton>
      </div>
      {isFormFirstlySubmitted && (
        <div className='message_wrapper'>
          <p>{registrationMessage || '-------'}</p>
        </div>
      )}
    </SCAuthForm>
  );
};

export default AuthForm;
