import React from 'react';
import { Controller } from 'react-hook-form';

import GlobalInput from '../ElementsAndActions/GlobalInput/GlobalInput';

interface IEmailControllerProps {
  control: any;
}

const EmailController: React.FC<IEmailControllerProps> = ({ control }) => {
  return (
    <Controller
      control={control}
      name='email'
      rules={emailRules}
      render={({ field, fieldState: { error } }: any) => (
        <GlobalInput
          inputProps={{
            placeholder: 'Введите адрес электронной почты...',
            ...field,
          }}
          error={error?.message ? error.message : null}
        />
      )}
    />
  );
};

const emailRules: any = {
  required: {
    value: true,
    message: 'This field is required',
  },
  pattern: {
    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
    message: 'Data is not correct',
  },
};

export default EmailController;
