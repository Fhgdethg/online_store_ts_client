import React from 'react';

import SCGlobalButton from './SCGlobalButton';

import { IGlobalButtonProps } from './GlobalButtonTypes';

const GlobalButton: React.FC<IGlobalButtonProps> = ({
  buttonAction = undefined,
  buttonType = 'color',
  isDisabled = false,
  children,
}) => {
  return (
    <SCGlobalButton
      {...{
        button_type: buttonType,
        onClick: buttonAction,
        disabled: isDisabled,
      }}
    >
      {children}
    </SCGlobalButton>
  );
};

export default GlobalButton;
