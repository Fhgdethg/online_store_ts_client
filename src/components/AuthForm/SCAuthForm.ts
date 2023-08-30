import styled from 'styled-components';

import { theme } from '../../theme/theme';

const { colors } = theme;

const SCAuthForm = styled.form`
  flex-direction: column;
  margin-top: 27px;
  display: flex;
  gap: 20px;

  div {
    justify-content: flex-end;
    display: flex;
  }

  .message_wrapper {
    background: ${colors.lightGreyBg};
    justify-content: center;
    align-items: center;
    border-radius: 10px;
    max-width: 474px;
    min-height: 70px;
    display: flex;
    padding: 10px;

    p {
      color: ${colors.blue};
      font-size: 20px;
    }
  }
`;

export default SCAuthForm;
