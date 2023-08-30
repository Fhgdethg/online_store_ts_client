import styled from 'styled-components';

import { theme } from '../../../theme/theme';

const { colors } = theme;

const SCGlobalInput = styled.div`
  flex-direction: column;
  display: flex;
  gap: 4px;

  input {
    background: transparent;
    color: ${colors.blue};
    font-weight: 700;
    font-size: 18px;
    outline: none;
    padding: 5px;
    border: none;
    border-bottom: 3px solid ${colors.blue};
    width: 100%;

    &::placeholder {
      color: ${colors.blue};
      font-weight: 700;
      font-size: 18px;
    }
  }

  p {
    color: ${colors.error};
    font-size: 13px;
  }
`;

export default SCGlobalInput;
