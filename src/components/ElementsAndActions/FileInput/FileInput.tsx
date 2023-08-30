import React, { ChangeEvent } from 'react';

import SCFileInput from './SCFileInput';

interface IFileInputProps {
  label?: string;
  inputType?: 'color' | 'opacity';
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  isMultiple?: boolean;
}

const FileInput: React.FC<IFileInputProps> = ({
  label = 'Загрузить файл',
  inputType = 'color',
  onChange,
  isMultiple = false,
}) => {
  return (
    <SCFileInput input_type={inputType}>
      {label}
      <input type='file' onChange={onChange} multiple={isMultiple} />
    </SCFileInput>
  );
};

export default FileInput;
