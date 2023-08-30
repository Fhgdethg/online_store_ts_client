import styled, { css } from 'styled-components';

import { theme } from '../../../theme/theme';

const { colors } = theme;

interface ISCGlobalButtonProps {
  button_type: 'color' | 'opacity';
}

const SCGlobalButton = styled.button<ISCGlobalButtonProps>`
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

  &:hover {
    transform: scale(1.02);
  }

  &:disabled {
    background: ${colors.grey};
  }

  ${(props) =>
    props.button_type === 'opacity' &&
    css`
      background: transparent;
      border: 2px solid ${colors.blue};
      color: ${colors.blue};

      &:disabled {
        background: ${colors.white};
        border-color: ${colors.grey};
        color: ${colors.grey};
      }
    `}
`;

export default SCGlobalButton;
