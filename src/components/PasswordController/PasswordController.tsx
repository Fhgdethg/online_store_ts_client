import React from 'react';
import { Controller } from 'react-hook-form';

import GlobalInput from '../ElementsAndActions/GlobalInput/GlobalInput';

interface IPasswordControllerProps {
  control: any;
}

const PasswordController: React.FC<IPasswordControllerProps> = ({
  control,
}: any) => {
  return (
    <Controller
      control={control}
      name='password'
      rules={passwordRules}
      render={({ field, fieldState: { error } }: any) => (
        <GlobalInput
          inputProps={{
            placeholder: 'Введите пароль...',
            type: 'password',
            ...field,
          }}
          error={error?.message ? error.message : null}
        />
      )}
    />
  );
};

const passwordRules: any = {
  required: {
    value: true,
    message: 'This field is required',
  },
  minLength: {
    value: 6,
    message: 'Password must be longer, that 6 chars',
  },
};

export default PasswordController;
