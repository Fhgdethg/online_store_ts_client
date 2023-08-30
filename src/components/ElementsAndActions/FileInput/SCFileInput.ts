import styled, { css } from 'styled-components';

import { theme } from '../../../theme/theme';
import { ChangeEvent } from 'react';

const { colors } = theme;

interface ISCFileInputProps {
  input_type: 'color' | 'opacity';
}

const SCFileInput = styled.label<ISCFileInputProps>`
  background: ${colors.blue};
  color: ${colors.white};
  border-radius: 12px;
  padding: 5px 17px;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 120px;
  border: none;
  font-size: 22px;
  font-weight: 700;
  transition: 0.2s;
  cursor: pointer;
  position: relative;

  input {
    position: absolute;
    top: 0;
    left: 0;
    width: 0;
    opacity: 0;
  }

  &:hover {
    transform: scale(1.02);
  }

  &:disabled {
    background: ${colors.grey};
  }

  ${(props) =>
    props.input_type === 'opacity' &&
    css`
      background: transparent;
      border: 2px dashed ${colors.blue};
      color: ${colors.blue};

      &:disabled {
        background: ${colors.white};
        border-color: ${colors.grey};
        color: ${colors.grey};
      }
    `}
`;

export default SCFileInput;
